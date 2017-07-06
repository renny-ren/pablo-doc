$(function(){
  $.ajax({
    url: "home/refresh_part"
  })
  
  file_uploaded = 0;
  $('body').on("click", ".shuffle", function(){  
    $.ajax({
      url: "home/refresh_part"
    })
  });

  $('body').on('click', '.upload-image, .upload-logo', function(){
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

  $('body').on('click', '.upload-logo', function(){
    $('#download-logo').addClass('download-logo-ready');
    $('.logo-status').addClass('logo-status-ready').text('selected!');
  });

  $('body').on('change', '#bg_img, #logo', function(){
    file_uploaded = 1;
  });
});