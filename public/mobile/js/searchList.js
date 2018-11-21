/**
 * Created by Administrator on 2018/11/20.
 */
$(function(){
//  区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators: false //是否显示滚动条
    });

//    页面搜索框显示数据
//  通过url地址获取数据
    var urlParams=CT.getParamsBuyUrl();
    var $input=$('input').val(urlParams.key||'');

//    初始加载第一页4条数据
    getSearchData({
        proName:urlParams.key,
        page:1,
        pageSize:4
    },function(data){
        $('.ct_product').html(template('list',data));
    });

    
//    用户重新搜索
    $('.ct_search a').on('tap',function(){
        var key=$input.val().trim();
        //   判断key是否存在
        if(!key){
            mui.toast('请输入商品名！',{ duration:'short', type:'div' });
            return;
        }
        getSearchData({
            proName:key,
            page:1,
            pageSize:4
        },function(data){
            $('.ct_product').html(template('list',data));
        });
    });
//    点击上架时间进行排序 默认降序
//    点击价格进行排序 默认降序
//    点击销量进行排序 默认降序
//    点击折扣进行排序 默认降序
//    下拉刷新页面
//    上拉加载下一页

});

//获取搜索列表数据
var getSearchData=function(params,callback){
  $.ajax({
      url:'/product/queryProduct',
      type:'get',
      data:params,
      dataType:'json',
      success:function(data){
          callback&&callback(data);
      }
  })
};