$(function () {
    $('#submit').on('tap', function () {
        //表单序列化 serialize()   serializeArray()
        //序列化的数据作为ajax的请求数据
        var data = $('.mui-input-group').serialize();

        // 转化为json对象
        var dataObj = CT.serialize2json(data);

        //    检验
        if (!dataObj.username) {
            mui.toast('请输入用户名！');
            return false;
        }
        if (!dataObj.password) {
            mui.toast('请输入密码！');
            return false;
        }

        //    发送ajax请求
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: dataObj,
            dataType: 'json',
            success: function (data) {
                if (data.success) {
                    //    跳转页面
                    var returnUrl = location.search.replace('?returnUrl=', '');
                    if (returnUrl) {
                        //    调回原地址
                        location.href = returnUrl;
                    } else {
                        //    跳去个人中心
                        location.href = CT.userUrl;
                    }

                } else {
                    mui.toast(data.message);
                }
            }
        })
    });

});