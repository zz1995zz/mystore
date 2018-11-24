$(function () {
//  区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false //是否显示滚动条
    });

    mui.init({
        pullRefresh: {
            container: "#refreshContainer",
            //下拉
            down: {
                auto: true,
                callback: function () {
                    var that = this;
                    setTimeout(function () {
                        getCartData(function (data) {
                            //停止下拉刷新
                            that.endPulldownToRefresh();
                            //    渲染页面
                            $('.mui-table-view').html(template('cart', data));
                        });
                    }, 1000);
                }
            }
        }
    });

//    重新刷新
    $('.fa-refresh').on('tap', function () {
        //   刷新
        mui('#refreshContainer').pullRefresh().pulldownLoading();
    });

//    点击编辑 弹出编辑框
    $('.mui-table-view').on('tap', '.mui-icon-compose', function () {
        //所有复选框已选择的商品的id
        var checkedId = [];
        $('[type=checkbox]:checked').each(function (i, item) {
            checkedId[i] = $(item).attr('data-id');
        });

        //    弹框
        var id = $(this).parent().attr('data-id');
        var item = getArrData(window.cartData.data, id);
        var html = template('edit', item).replace(/\n/g, '');
        mui.confirm(html, '商品编辑', ['确认', '取消'], function (e) {
            if (e.index == 0) {
                //    发送修改请求
                var size = $('.btn_size.now').text();
                var num = $('.p_number input').val();
                CT.loginAjax({
                    url: '/cart/updateCart',
                    type: 'post',
                    data: {
                        id: id,
                        size: size,
                        num: num
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.success) {
                            //   修改数据重新渲染
                            item.num = num;
                            item.size = size;
                            $('.mui-table-view').html(template('cart', window.cartData));
                            //恢复复选框选择状态
                            checkedId.forEach(function (item, i) {
                                var query = 'input[data-id="' + `${item}"]`;
                                $(query).prop('checked', true);
                            });
                            getAmount();
                        }
                    }
                });
            }
        });
    });
//    点击删除 删除数据
    $('.mui-table-view').on('tap', '.mui-icon-trash', function () {
        var $that = $(this);
        var id = $that.parent().attr('data-id');
        mui.confirm('确定删除该商品吗？', '商品删除', ['确认', '取消'], function (e) {
            if (e.index == 0) {
                //    发送删除请求
                CT.loginAjax({
                    url: '/cart/deleteCart',
                    type: 'get',
                    data: {
                        id: id,
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.success) {
                            //   删除元素
                            $that.parent().parent().remove();
                            //    重新计算金额
                            getAmount();
                        }
                    }
                });
            }
        });
    });
//    编辑框尺码和数量注册事件
    $('body').on('tap', '.p_size span', function () {
        $(this).addClass('now').siblings().removeClass('now');
    });
    $('body').on('tap', '.p_number span', function () {
        var currentNum = $('.p_number input').val();
        //字符串转数字
        var maxNum = parseInt($('.p_number input').attr('data-max'));
        //    判断加减
        if ($(this).hasClass('jian')) {
            if (currentNum > 1) {
                currentNum--;
            } else {
                mui.toast('至少选择一件！');
            }
        } else {
            if (currentNum < maxNum) {
                currentNum++;
            } else {
                mui.toast('已达库存上限！');
            }
        }
        $('.p_number input').val(currentNum);
    });

//    金额计算  复选框注册事件
    $('.mui-table-view').on('change', '[type=checkbox]', function () {
        getAmount();
    });

});

//获取购物车数据
var getCartData = function (callback) {
    $.ajax({
        url: '/cart/queryCartPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 100
        },
        dataType: 'json',
        success: function (data) {
            window.cartData = data;
            callback && callback(data);
        }
    });
};

//获取总金额
var getAmount = function () {
    //获取复选框对象
    var $checkBox = $('[type=checkbox]:checked');
    var amountSum = 0;
    $checkBox.each(function (i, item) {
        //    金额=数量*单价
        var id = $(this).attr('data-id');
        var item = getArrData(window.cartData.data, id);
        var num = item.num;
        var price = item.price;
        var amount = num * price;
        amountSum = parseFloat(amountSum) + amount;
        //保留两位小数  只舍不入
        if (Math.floor(amountSum * 100) % 10) {
            amountSum = Math.floor(amountSum * 100) / 100;
        } else {
            amountSum = Math.floor(amountSum * 100) / 100;
            amountSum = amountSum.toString() + '0';
        }
    });
//    显示金额
    $('#cartAmount').html(amountSum);
};