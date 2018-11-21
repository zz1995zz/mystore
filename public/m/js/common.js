/**
 * Created by Administrator on 2018/11/20.
 */
//通过url地址获取数据
window.CT={};
CT.getParamsBuyUrl=function (){
    var search=location.search;
    search=search.replace('?','');
    //    把数据存到对象中
    var params={};
    if(search){
        //    取出多组数据值  &
        var arr=search.split('&');
        arr.forEach(function(item,i){
            item=item.split('=');
            params[item[0]]=item[1];
        });
    }
    return params;
};