$(function(){
//  区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false //是否显示滚动条
    });
   var id=CT.getParamsBuyUrl().productId;
    getProductData( id,function(data){
        //    清除加载
        $('.loading').remove();
    //   页面渲染
        $('.mui-scroll').html(template('detail',data));
        //轮播图
        mui('.mui-slider').slider({
            interval:2000//自动轮播周期，若为0则不自动播放，默认为0；
        });

    //    选择尺码
        $('.btn_size').on('tap',function () {
            $(this).addClass('now').siblings().removeClass('now');
        });
    //    选择数量
        $('.p_number span').on('tap',function(){
            var currentNum=$('.p_number input').val();
            //字符串转数字
            var maxNum=parseInt($('.p_number input').attr('data-max'));
        //    判断加减
            if($(this).hasClass('jian')){
               if(currentNum>0){
                   currentNum--;
               }
            }else{
               if(currentNum<maxNum){
                   currentNum++;
               }else{
                   mui.toast('已达库存上限！');
               }
            }
            $('.p_number input').val(currentNum);
        });
    //    加入购物车
        $('.btn_addCart').on('tap',function(){
            var $sizeBtn=$('.btn_size.now');
            var num=$('.p_number input').val();
            if($sizeBtn.length==0){
                mui.toast('未选择尺寸！');
                return false;
            }
            if(num==0){
                mui.toast('未选择数量！');
                return false;
            }
            CT.loginAjax({
                url:'/cart/addCart',
                type:'post',
                data:{
                    productId:id,
                    num:num,
                    size:$sizeBtn.html()
                },
                dataType: 'json',
                success:function(data){
                if(data.success=true){
                //    弹框
                    var btnArray = ['是', '否'];
                    mui.confirm('添加成功，要到购物车看看？', '温馨提示', btnArray, function(e) {
                        if (e.index == 0) {
                            location.href='/mobile/user/cart.html';
                        } else {

                        }
                    });
                }
                }
            });
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
