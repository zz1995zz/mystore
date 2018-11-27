$(function () {
    window.page = 1;

//    点击添加分类弹窗
//    添加分类
    var render = function () {
        //    首页默认显示
        getSecondData(function (data) {
            // 页面渲染
            $('table tbody').html(template('categorySecond', data));
            //    分页功能
            var options = {
                bootstrapMajorVersion: 3,
                currentPage: window.page,//当前页数
                totalPages: Math.ceil(data.total / data.size),//总页数
                numberOfPages: 3,
                onPageClicked: function (event, originalEvent, type, page) {
                //    重新渲染页面
                    window.page=page;
                    render();
                }
            };
            $(".pagination").bootstrapPaginator(options);
        });
    };
    render();
});
var getSecondData = function (callback) {
    $.ajax({
        url: '/category/querySecondCategoryPaging',
        type: 'get',
        data: {
            page: window.page || 1,
            pageSize: 3
        },
        dataType: 'json',
        success: function (data) {
            callback && callback(data);
        }
    });
};