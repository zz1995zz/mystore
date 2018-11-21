/**
 * Created by Administrator on 2018/11/19.
 */
$(function(){
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        indicators: false, //是否显示滚动条
        deceleration:0.0006 //阻尼系数,系数越小滑动越灵敏
    });

    //获取一级分类数据
    var getFirstCategoryData=function(callback){
        $.ajax({
            url:'/category/queryTopCategory',
            type:'get',
            data:{},
            dataType:'json',
            success:function(data){
                callback&&callback(data);
            }
        });
    };
//    获取二级分类数据
    var getSecondCategoryData=function(params,callback){
        $.ajax({
            url:'/category/querySecondCategory',
            type:'get',
            data: params,
            dataType:'json',
            success:function(data){
                callback&&callback(data);
            }
        });
    };

//    一级分类默认渲染
    getFirstCategoryData(function(data){
        $('.cate_left ul').html(template('firstTemplate',data));
        // 一级分类的id
        var  categoryId = $('.cate_left ul li:first-child').find('a').attr('data-id');
        //    二级分类渲染
        getSecondCategoryData({id:categoryId},function(data){
            $('.ct_right ul').html(template('secondTemplate',data));
        });

        //    给一级分类注册tap事件
        $('.cate_left ul').on('tap','li',function(){
            $(this).addClass('now').siblings().removeClass('now');
            categoryId=$(this).find('a').attr('data-id');
            //二级分类渲染
            getSecondCategoryData({id:categoryId},function(data){
                $('.ct_right ul').html(template('secondTemplate',data));
            });
        });
    });



});