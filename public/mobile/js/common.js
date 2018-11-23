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

//未登录跳到登录页面   需要登录的ajax请求
CT.loginUrl='/mobile/user/login.html';
CT.cartUrl='/mobile/user/cart.html';
CT.userUrl='/mobile/user/index.html';
CT.loginAjax=function(params){
    $.ajax({
        url:params.url,
        type:params.type,
        data:params.data,
        dataType:params.dataType,
        success:function(data){
        //    当error：400未登录
            if(data.error==400){
            //    跳转到登录页
               location.href=CT.loginUrl+'?returnUrl='+location.href;
               return false;
            }else{
              params.success||params.success(data);
            }
        },
        error:function(){
            mui.toast('服务器繁忙！');
        }
    })
};

//json反序列化 转化为对象
CT.serialize2json=function(str){
    var obj={};
    str.split('&').forEach(function(item,i){
        var arr=item.split('=');
        obj[arr[0]]=arr[1];
    });
    return obj;
};