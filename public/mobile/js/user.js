$(function () {
    var userStatus = false;
//查询个人登录信息
    $.ajax({
        url: '/user/queryUserMessage',
        type: 'get',
        data: {},
        dataType: 'json',
        success: function (data) {
            if (!data.error) {
                userStatus = true;
                //    显示个人信息
                $('.mui-media-body').html(data.username + '<p class="mui-ellipsis">绑定手机：' + data.mobile + '</p>');
            }
        }
    });

//    退出登录
    $('.btn_outLogin').on('tap', function () {
        //先判断已登录
        if (!userStatus) {
            mui.toast('请先登录！');
            return false;
        }
        //    弹框
        mui.confirm('确定退出登录？', '温馨提示', ['是', '否'], function (e) {
            if (e.index == 0) {
                $.ajax({
                    url: '/user/logout',
                    type: 'get',
                    data: {},
                    dataType: 'json',
                    success: function (data) {
                        if (data.success) {
                            userStatus = false;
                            mui.toast('退出成功！');
                            //    清除个人信息展示
                            $('.mui-media-body').html(' 未登录' + '<p class="mui-ellipsis">请登录后绑定手机</p>');
                        }
                    }
                });
            }
        });

    });
});
