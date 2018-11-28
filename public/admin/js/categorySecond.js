$(function () {
    window.page = 1;

//    添加分类
    var render = function () {
        //    首页默认显示
        getSecondData(function (data) {
            // 页面渲染
            $('table tbody').html(template('categorySecond', data));
            //    分页功能
            var options = {
                bootstrapMajorVersion: 3,
                currentPage: window.page,//当前页数
                totalPages: Math.ceil(data.total / data.size),//总页数
                numberOfPages: 3,
                onPageClicked: function (event, originalEvent, type, page) {
                    //    重新渲染页面
                    window.page = page;
                    render();
                }
            };
            $(".pagination").bootstrapPaginator(options);
        });
    };
    render();

//    模态框一级分类选择
    getFirstData(function (data) {
        // 页面渲染
        $('.dropdown-menu').html(template('dropdownData', data));
        //    选中值显示
        $('.dropdown-menu').on('click', 'li', function () {
            var $aTarget = $(this).find('a');
            $('#dropdownMenu1').html($aTarget.html());
            //    隐藏表单元素提交一级分类选中值
            $('[name="categoryId"]').val($aTarget.attr('data-id'));
        //    表单检验 选中变为正确
            $('#addCategoryForm').data('bootstrapValidator').updateStatus('categoryId','VALID');
        });
    });
    //    预览分类图片
    initFileUpload();

//    校验表单 提交数据
    $('#addCategoryForm').bootstrapValidator({
        //默认不检验隐藏表单元素
        excluded:[],
        /*默认样式*/
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        /*校验的字段*/
        fields:{
            categoryId:{
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName:{
                validators: {
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            },
            brandLogo:{
                validators: {
                    notEmpty: {
                        message: '请上传二级分类Logo'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        var $form=$(e.target);
        // 发送ajax
        $.ajax({
            url:'/category/addSecondCategory',
            type:'post',
            data: $form.serialize(),
            dataType:'json',
            success:function(data){
                if(data.success){
                    window.page=1;
                    render();
                    //     关闭模态框
                    $('#addCategory').modal('hide');
                }
            }
        });
    });
});

var getSecondData = function (callback) {
    $.ajax({
        url: '/category/querySecondCategoryPaging',
        type: 'get',
        data: {
            page: window.page || 1,
            pageSize: 3
        },
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
};
var getFirstData = function (callback) {
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 100
        },
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
};

var initFileUpload = function () {
    //初始化上传图片
    $('[name="pic1"]').fileupload({
        url: '/category/addSecondCategoryPic',
        dataType: 'json',
        done: function (e, data) {
            $('#categoryPic').attr('src', data.result.picAddr);
            $('[name="brandLogo"]').val(data.result.picAddr);
            $('#addCategoryForm').data('bootstrapValidator').updateStatus('brandLogo','VALID');
        }
    });
};
