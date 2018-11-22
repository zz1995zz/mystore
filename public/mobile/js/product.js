$(function(){
//  区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false //是否显示滚动条
    });

    getProductData(  CT.getParamsBuyUrl().productId,function(data){
        //    清除加载
        $('.loading').remove();
    //   页面渲染
        $('.mui-scroll').html(template('detail',data));
        //轮播图
        mui('.mui-slider').slider({
            interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
        });
    });

});
//获取商品数据
var getProductData=function(productId,callback){
  $.ajax({
      url:'/product/queryProductDetail',
      type:'get',
      data:{id:productId},
      dataType:'json',
      success:function(data){
          callback&&callback(data);
      }
  })
};
