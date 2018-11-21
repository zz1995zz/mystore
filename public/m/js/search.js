/**
 * Created by Administrator on 2018/11/19.
 */
$(function(){
//    给a标签注册事件
    $('.ct_search a').on('tap',function(){
        //获取数据
        var key=$('.ct_search input').val();
    //   判断key是否存在
        if(!key){
            mui.toast('请输入商品名！',{ duration:'short', type:'div' });
            return;
        }
    //    设置cookie
        
    //   跳转页面
        location.href='searchList.html?key='+key;
    });
});
