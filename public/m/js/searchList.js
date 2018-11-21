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
//    点击上架时间进行排序 默认降序
//    点击价格进行排序 默认降序
//    点击销量进行排序 默认降序
//    点击折扣进行排序 默认降序
//    下拉刷新页面
//    上拉加载下一页

});