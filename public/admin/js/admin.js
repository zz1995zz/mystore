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
});