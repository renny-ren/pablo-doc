$(function(){
  $(window).scroll(function(){
    var sc = $(window).scrollTop();
    if (sc > 20){
      $(".welcome").css('color', 'black');
     }
    else{
      $(".welcome").css('color', 'white');
     }
   })
});