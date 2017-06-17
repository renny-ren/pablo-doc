$(function(){
  if ($('.download-content').length > 0){    
    $('.cav-img')
      .css('position', 'relative')
      .css('height', gon.image_height)
      .css('width', gon.image_width)
      .css('left', gon.image_left);
  }

  $('.download-button').mouseenter(function(){
    $.ajax({
       type: "POST",
       url: '/create_image', 
       data:(
         'download_src=' + $('.selected').attr('src') + '&' +
         'image_height=' + $('.selected').height() + '&' +
         'image_width=' + $('.selected').width() + '&' +
         'image_left=' + $('.selected').parent().css('left')
       )
    })


  });
})