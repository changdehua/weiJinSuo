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
            console.log(data);

            var isMobile=$(window).width()>768;
            console.log(isMobile);

            // 模板引擎传递参数
            var pointTemplate=template('pointTemplate',{data:data});
            var imageTemplate=template('imageTemplate',{data:data,isM:isMobile});
            $('.carousel-indicators').html(pointTemplate);
            $('.carousel-inner').html(imageTemplate);

            
        }
    });
}
