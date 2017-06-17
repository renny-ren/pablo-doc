$(function(){
  if ($('.download-content').length > 0){    
    $('.cav-img').css({
      'position' : 'relative',
      'height' : gon.image_height,
      'width' : gon.image_width,
      'left' : gon.image_left,
      '-webkit-filter' : gon.image_filter
    });

    $('.download-text').text(gon.download_text);
    $('.download-text').css({
      'font-size' : gon.font_size,
      'top' : gon.font_top,
      'font-family' : gon.font_family,
      'font-weight' : gon.font_weight,
      'font-style' : gon.font_style,
      'color' : gon.font_color
    })
  }

  $('.download-button').click(function(e){
    if ( $('.selected').length > 0 && $('.selected-text').length > 0) {
      $('.step-notice').hide();
      $.ajax({
        type: "POST",
        url: '/create_image', 
        data:(
          'download_src=' + $('.selected').attr('src') + '&' +
          'image_height=' + $('.selected').height() + '&' +
          'image_width=' + $('.selected').width() + '&' +
          'image_left=' + $('.selected').parent().css('left') + '&' +
          'image_filter=' + $('.selected').css('filter') + '&' +
          'download_text=' + $('.selected-text').text() + '&' +
          'font_size=' + $($('.selected-text').children().get(0)).css('font-size') + '&' +
          'font_top=' + $('.selected-text').css('top') + '&' +
          'font_family=' + $($('.selected-text').children().get(0)).css('font-family') + '&' +
          'font_weight=' + $($('.selected-text').children().get(0)).css('font-weight') + '&' +
          'font_style=' + $($('.selected-text').children().get(0)).css('font-style') + '&' +
          'font_color=' + $($('.selected-text').children().get(0)).css('color')
        )
      })
    }
    else{
      e.preventDefault();
      $('.download-notice').show();
      $('.draggable').css('cursor', 'pointer');    // make text clickable;
      $('.draggable').hover(function(){
        $(this).toggleClass('download-text-hover');
      });
      $('.step-notice').show();
      $('.step-notice').click(function(){
        $(this).fadeOut();
      })
    } 
  });

  $('.draggable').click(function(){
    $(this).addClass('selected-text');
    localStorage.setItem("original_top", $(this).css('top'));
    while ( parseInt($(this).css('top')) > 515 ) {
      $(this).css('top', parseInt($(this).css('top')) - 515 + 'px');
    }

    // hide other text, only show selected one
    $('.draggable').hide();
    $(this).show();

    // refresh notice
    $('#download-text').addClass('download-text-ready').attr('title', 'click to cancel select');
    $('.text-status').addClass('text-status-ready').text('Selected!');

    $('.step-notice').text('2- Click on the image which you want to share or download to select it');

    $('.select-button').trigger('click');
  });

  $('#download-text').click(function(){
    $('.draggable').show();
    $('.selected-text').css('top', localStorage.getItem('original_top')).removeClass('selected-text');
    
    $('.text-status').removeClass('text-status-ready').text('waiting for select');
    $(this).removeClass('download-text-ready').removeAttr('title');
  });

  $('#download-image').click(function(){
    // show other images
    if ($('.selected').parent().hasClass('ui-wrapper')) {
      $('.selected').parent().siblings().show();
    }
    else{
      $('.selected').siblings().show();
    }

    $('.selected').removeClass('selected');
    $('.image-status').removeClass('image-status-ready').text('waiting for select');
    $(this).removeClass('download-image-ready').removeAttr('title');
  });

  $('.download-notice').click(function(){
    if ( $('.selected').length > 0 && $('.selected-text').length > 0) {
      $(this).addClass('download-ready');
    }
    else{
      $(this).removeClass('download-ready');
    }
  });
})