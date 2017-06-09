$(function(){
  $('body').on("click", ".shuffle", function(){  
    $.ajax({
      url: "home/refresh_part"
    })
  })
});