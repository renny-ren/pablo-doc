$(function(){
  if ($('.download-content').length > 0){
    // $('.download-image').empty();
    // $('.download-text').empty();        // empty images first
    // var download_src = "<%= @b %>"
    // var image_height = localStorage.getItem("HEIGHT");
    // var image_width = localStorage.getItem("WIDTH");
    // var image_left = localStorage.getItem("LEFT");
    // var img = document.createElement('img');

    // img.src = download_src;
    // $(img)
    //   .css('height', image_height)
    //   .css('width', image_width)
    //   .css('position', 'relative')
    //   .css('left', image_left);
    // $('.download-image').append(img);     // set background image
  }

  $('.download-button').mouseenter(function(){
    $.ajax({
       // type: "POST",
       url: '/download', //Defined in your routes file
       data:(
         'download_src=' + $('.selected').attr('src') + '&' +
         'image_left=' + $('.selected').css('left')
       )
    })

    // localStorage.setItem("SRC", $('.selected').attr('src'));
    // localStorage.setItem("HEIGHT", $('.selected').height());
    // localStorage.setItem("WIDTH", $('.selected').width());
    // localStorage.setItem("LEFT", $('.selected').css('left'));


    // alert(localStorage.getItem("LEFT"));
  });

})