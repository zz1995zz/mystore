$(function () {
    barChart();
    pieChart();
});
//注册人数柱状图
var barData = [{
    name: '七月',
    value: 10
},
    {
        name: '八月',
        value: 52
    },
    {
        name: '九月',
        value: 200
    },
    {
        name: '十月',
        value: 320
    },
    {
        name: '十一月',
        value: 189
    },
    {
        name: '十二月',
        value: 150
    }];
var xData = [], yData = [];
barData.forEach(function (item, i) {
    xData[i] = item.name;
    yData[i] = item.value;
});
var barChart = function () {
//初始化
    var myChart = echarts.init(document.querySelector('.picTable:first-child'));
    var option = {
        color: ['#3398DB'],
        title: {
            text: '2018年注册人数'
        },
        legend: {
            data: ['注册人数'],
            right: 0
        },
        tooltip: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['七月', '八月', '九月', '十月', '十一月', '十二月'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '注册人数',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330]
            }
        ]
    };
    option.xAxis[0].data = xData;
    option.series[0].data = yData;
    myChart.setOption(option);
};
//销售情况饼状图
var pieChart = function () {
//初始化
    var myChart = echarts.init(document.querySelector('.picTable:last-child'));
   var option = {
       title : {
           text: '热销品牌排行榜',
           subtext: '2018年',
           x:'center'
       },
       tooltip : {
           trigger: 'item',
           formatter: "{a} <br/>{b} : {c} ({d}%)"
       },
       legend: {
           orient: 'vertical',
           left: 'left',
           data: ['耐克','阿迪达斯','优衣库','无印良品','太平鸟']
       },
       series : [
           {
               name: '',
               type: 'pie',
               radius : '55%',
               center: ['50%', '60%'],
               data:[
                   {value:335, name:'耐克'},
                   {value:310, name:'阿迪达斯'},
                   {value:234, name:'优衣库'},
                   {value:135, name:'无印良品'},
                   {value:1548, name:'太平鸟'}
               ],
               itemStyle: {
                   emphasis: {
                       shadowBlur: 10,
                       shadowOffsetX: 0,
                       shadowColor: 'rgba(0, 0, 0, 0.5)'
                   }
               }
           }
       ]
   };
    myChart.setOption(option);
};