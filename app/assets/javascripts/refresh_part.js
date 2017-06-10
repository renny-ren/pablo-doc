$(function(){
  $('body').on("click", ".shuffle", function(){  
    $.ajax({
      url: "home/refresh_part"
    })
  });

  // $('body').on("click", ".fa-search", function(e){  
  //   $.ajax({
  //     // url: "/search"
  //   });
  //   // e.preventDefault();
  // });
});