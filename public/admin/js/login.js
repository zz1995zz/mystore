$(function () {
//    表单验证插件
//    表单元素要有name属性  必须有submit提交按钮
    $('.form-horizontal').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //需要检验的表单元素
        fields: {
            username: {
                validators: {
                    notEmpty: {
                        message: '用户名不能为空'
                    },
                    //配置后台登录检验规则
                    callback: {
                        message: '用户名不存在'
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: '密码不能为空'
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '密码为6-12位'
                    },
                    //配置后台登录检验规则
                    callback: {
                        message: '密码不正确'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        //阻止submit的默认提交，改用ajax的方式
        e.preventDefault();
        //    发送ajax请求
        var $form = $(e.target);
        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: $form.serialize(),
            dataType: 'json',
            success: function (data) {
                //    登陆成功
                if (data.success) {
                    //    跳到首页
                    location.href = '/admin/index.html';
                } else if (data.error == 1000) {
                    //    用户名错误
                //    检验规则
                    $form.data('bootstrapValidator').updateStatus('username','INVALID','callback');
                }else if(data.error=1001){
                    //    密码错误
                //    检验规则
                    $form.data('bootstrapValidator').updateStatus('password','INVALID','callback');
                }


            }
        });

    })
});
