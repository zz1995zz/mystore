/**
 * Created by Administrator on 2018/11/20.
 */
$(function () {
//  区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false //是否显示滚动条
    });

//    页面搜索框显示数据
//  通过url地址获取数据
    var urlParams = CT.getParamsBuyUrl();
    var $input = $('input').val(urlParams.key || '');

//    初始加载第一页4条数据
    getSearchData({
        proName: urlParams.key,
        page: 1,
        pageSize: 4
    }, function (data) {
        $('.ct_product').html(template('list', data));
    });


//    用户重新搜索
    $('.ct_search a').on('tap', function () {
        var key = $input.val().trim();
        //   判断key是否存在
        if (!key) {
            mui.toast('请输入商品名！', {duration: 'short', type: 'div'});
            return;
        }
        getSearchData({
            proName: key,
            page: 1,
            pageSize: 4
        }, function (data) {
            $('.ct_product').html(template('list', data));
        });
    });

//    点击上架时间进行排序 默认降序
//    点击价格进行排序 默认降序
//    点击销量进行排序 默认降序
//    点击折扣进行排序 默认降序
    $('.ct_order a').on('tap', function () {
     //   修改样式
    var $this=$(this);
    if($this.hasClass('now')){
    //    当前有now
        if($this.find('span').hasClass('fa-angle-down')){
            $this.find('span').removeClass('fa-angle-down').addClass('fa-angle-up');
        }else{
            $this.find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
    }else{
    //    当前无now
        $this.addClass('now').siblings().removeClass('now');
        $this.siblings().find('span').removeClass('fa-angle-up').addClass('fa-angle-down');
    }
    //    获取当前排序数据
        var order=$this.attr('data-order');
        var orderVal=$this.find('span').hasClass('fa-angle-down')?2:1;
        var key = $input.val().trim();
        //   判断key是否存在
        if (!key) {
            mui.toast('请输入商品名！', {duration: 'short', type: 'div'});
            return;
        }
        var params={
            proName: key,
            page: 1,
            pageSize: 4
        };
        params[order]=orderVal;
    //    页面渲染
        getSearchData(params, function (data) {
            $('.ct_product').html(template('list', data));
        });
    });

//    下拉刷新页面
//    上拉加载下一页

});


//获取搜索列表数据
var getSearchData = function (params, callback) {
    $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: params,
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    })
};