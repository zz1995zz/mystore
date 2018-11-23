$(function(){
//  区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false //是否显示滚动条
    });

    mui.init({
        pullRefresh : {
            container:"#refreshContainer",
            //下拉
            down : {
                auto: true,
                callback :function(){
                    var that=this;
                    //把下拉对象保存到全局，以便重新刷新使用
                    window.down=that;
                  setTimeout(function(){
                     getCartData(function(data){
                         //停止下拉刷新
                         that.endPulldownToRefresh();
                         //    渲染页面
                         $('.mui-table-view').html(template('cart',data));
                     });
                  },1000);
                }
            }
        }
    });

//    重新刷新
    $('.fa-refresh').on('tap',function(){
     //   刷新
     window.down.pulldownLoading();
    });

});

//获取购物车数据
var getCartData=function(callback){
    $.ajax({
        url:'/cart/queryCartPaging',
        type:'get',
        data:{
           page:1,
            pageSize:100
        },
        dataType:'json',
        success:function(data){
            callback&&callback(data);
        }
    });
};