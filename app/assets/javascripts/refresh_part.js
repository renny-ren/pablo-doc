$(function(){
  $('body').on("click", ".shuffle", function(){  
    $.ajax({
      url: "home/refresh_part"
    })
  });

  // $('body').on("click", ".fa-search", function(){  
  //   $.ajax({
  //     url: "/search",
  //     success: function(data) {
  //       $('#search-images').html(data);
  //       alert("hh");
  //     }
  //   });

  // });
});