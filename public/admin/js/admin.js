$(function () {
//    公共配置
//    显示进度条
//    进度条配置
    NProgress.configure({
        //    关闭进度环
        showSpinner: false,
    });
    $(window).ajaxStart(function () {
        //发送ajax开启进度条
        NProgress.start();
    });
    $(window).ajaxStop(function () {
        //完成ajax结束进度条
        NProgress.done();
    });
//    侧边栏隐藏 二级菜单显示
    $('[data-menu]').on('click', function () {
        $('.ad_aside').toggle();
        $('.ad_section').toggleClass('menu');

    });
    $('[href="javascript:;"]').on('click', function () {
        $(this).siblings('.child').slideToggle();
    });


//    模态框
    var logoutModal=['<div class="modal fade" id="logout">',
        '    <div class="modal-dialog modal-sm">',
        '        <div class="modal-content">',
        '            <div class="modal-header">',
        '                <button type="button" class="close" data-dismiss="modal" ><span aria-hidden="true">&times;</span></button>',
        '                <h4 class="modal-title">温馨提示：</h4>',
        '            </div>',
        '            <div class="modal-body">',
        '                <p class="text-danger">确定要退出登录吗？</p>',
        '            </div>',
        '            <div class="modal-footer">',
        '                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>',
        '                <button type="button" class="btn btn-primary">确定</button>',
        '            </div>',
        '        </div>',
        '    </div>',
        '</div>'].join("");
//添加模态框到页面
    $('body').append(logoutModal);
//    退出登录
    $('[data-logout]').on('click', function () {
        //弹出模态框
        $('#logout').modal('show');
    });

    $('#logout').find('.btn-primary').on('click', function () {
        //    确定退出
        $.ajax({
            url: '/employee/employeeLogout',
            type: 'get',
            data: {},
            dataType: 'json',
            success: function (data) {
                //    退出成功
                if (data.success) {
                    $('.model').modal('hide');
                    //   跳到登录页
                    location.href = '/admin/login.html';
                }
            }
        });
    })

});