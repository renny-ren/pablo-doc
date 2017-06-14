$(function(){
  file_uploaded = 0;
  $('body').on("click", ".shuffle", function(){  
    $.ajax({
      url: "home/refresh_part"
    })
  });

  $('body').on('click', '.upload-image', function(){
    if (file_uploaded == 1){
      alert('Successfully uploaded.');
      setTimeout(function(){
        $('.shuffle').trigger('click');
      }, 1000);
      file_uploaded = 0;
    }
    else{
      alert("No file chosen");
    }
  });

  $('body').on('change', '#bg_img', function(){
    file_uploaded = 1;
  });

  // $('body').on('mouseleave', '.upload-image', function(){
  //   $.ajax({
  //     url: "home/refresh_part"
  //   })
  // });

  // $('body').on("click", ".fa-search", function(e){  
  //   $.ajax({
  //     // url: "/search"
  //   });
  //   // e.preventDefault();
  // });
});