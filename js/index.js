$(function(){
    //1.轮播图
    banner();

    //2.滚动navBar
    navBar();

    // 3.产品区块提示初始化
    $('[data-toggle="tooltip"]').tooltip();


});

// var banner=function(){
//     // 1.获取数据
//     $.ajax({
//         type:"get",
//         data:"",
//         url:"js/data.json",
//         dataType:"json",
//         success:function(data){
//             // console.log(data);

//             var isMobile=$(window).width()<768;
//             // console.log(isMobile);

//             // 2.模板引擎传递参数并渲染
//             var pointHtml=template('pointTemplate',{list:data});
//             // console.log(pointHtml);
//             var imageHtml=template('imageTemplate',{list:data,isM:isMobile});
//             // console.log(imageHtml);
//             $('.carousel-indicators').html(pointHtml);
//             $('.carousel-inner').html(imageHtml);

            
//         }
//     });

// }




// 测试功能,页面大小改变就重新渲染页面
var banner=function(){
    // 1.获取数据
    var getData=function(callback){
        if(window.data){
            //有数据直接渲染,避免多次发送请求
            callback&&callback(window.data);

        }else{
            // 无数据,请求数据
            $.ajax({
                type:"get",
                data:"",
                url:"js/data.json",
                dataType:"json",
                success:function(data){
                    // console.log(data);
                    // 存储数据
                    window.data=data;
                    callback&&callback(window.data);
                }
            });
    
        }
    
    };

    //2.渲染数据
    var render=function(){
        getData(function(data){
            var isMobile=$(window).width()<768;
            // console.log(isMobile);

            // 2.模板引擎传递参数并渲染
            var pointHtml=template('pointTemplate',{list:data});
            // console.log(pointHtml);
            var imageHtml=template('imageTemplate',{list:data,isM:isMobile});
            // console.log(imageHtml);
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);            

        })
    };

    //3.页面尺寸改变就熏染页面
    $(window).on('resize',function(){
        render();
    }).trigger('resize');



    //4.根据手势滑动轮播图
    var startX=0;
    var distanceX=0;
    var isMove=false;
    $('.wjs_banner').on('touchstart',function(e){
        // console.log(e);
        startX=e.originalEvent.touches[0].clientX;
    }).on('touchmove',function(e){
        isMove=true;
        var endX=e.originalEvent.touches[0].clientX;
        distanceX=endX-startX;
    }).on('touchend',function(e){
        if(isMove&&Math.abs(distanceX)>50){
            if(distanceX>0){
                console.log('prev');
                $('.carousel').carousel('prev');
            }else{
                console.log('next');
                $('.carousel').carousel('next');

            }
        }
        startX=0;
        distanceX=0;
        isMove=false;
    });

}



//滚动navBar
var navBar=function(){
    // 1.移动端使tabs在一行显示
    var navTabs=$('.wjs_product .nav-tabs');
    var width=0;
    navTabs.find('li').each(function(index,item){
        var tabWidth=$(item).outerWidth(true);
        width+=tabWidth;

    });
    console.log(width);
    navTabs.width(width);

    //2.给navTabs添加夫标签

    //3.navTabs 添加滚动
    new IScroll($('.nav-tabs-parent')[0],{
        scrollX:true,
        scrollY:false,
        click:true
    })
}
