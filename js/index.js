$(function(){
    banner();
});

var banner=function(){
    $.ajax({
        type:"get",
        data:"",
        url:"js/data.json",
        dataType:"json",
        success:function(data){
            // console.log(data);

            var isMobile=$(window).width()<768;
            // console.log(isMobile);

            // 模板引擎传递参数
            var pointHtml=template('pointTemplate',{list:data});
            console.log(pointHtml);
            var imageHtml=template('imageTemplate',{list:data,isM:isMobile});
            console.log(imageHtml);
            $('.carousel-indicators').html(pointHtml);
            $('.carousel-inner').html(imageHtml);

            
        }
    });
}
