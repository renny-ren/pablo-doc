$(function(){
  download_flag = 0;  // 0 --- edit mode,  1 --- download mode
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

  $('.draggable').click(function(){
    if (download_flag == 1) {
      $(this).addClass('selected-text');
      localStorage.setItem("original_top", $(this).css('top'));
      while ( parseInt($(this).css('top')) > 515 ) {
        $(this).css('top', parseInt($(this).css('top')) - 515 + 'px');
      }

      // hide other text, only show selected one
      $('.draggable').hide();
      $(this).show();
      $('.logo-item').show();

      // refresh notice
      $('#download-text').addClass('download-text-ready').attr('title', 'click to cancel select');
      $('.text-status').addClass('text-status-ready').text('selected!');
      $('.step-notice').text('2- Click on the image which you want to share or download to select it');

      $('.background-selected').removeClass('background-not');
      if ($('#download-image').hasClass('download-image-ready') == false){
        $('.select-button').trigger('click');
      }
    }
  });

  $('#download-text').click(function(){
    download_flag = 1;  // restore download mode 
    $('.step-notice').hide();
    $('.draggable').show();
    $('.selected-text').css('top', localStorage.getItem('original_top')).removeClass('selected-text');  // resume text position and remove class
    $('.draggable').css('cursor', 'pointer');    // make text clickable;
    
    $('.text-status').removeClass('text-status-ready').text('waiting for select');
    $(this).removeClass('download-text-ready').removeAttr('title');
  });

  $('#download-image').click(function(){
    download_flag = 1;  // restore download mode 
    $('.step-notice').hide();
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

  $('body').on('click', '.share-download', function(){
    // if ( $('#downloadable').val() == 1 ){
    // }
    // else{
      // e.preventDefault();  // stop trigger download
    // }
    if ($(this).hasClass('expanded') == false){
      if ( $('.selected').length > 0 && $('.selected-text').length > 0) {
        $('.step-notice').hide();
        $('.share-download-button').prop('disabled', true).val('Please wait...');
        $('.waiting-notice').show();

        get_left();
        $.ajax({
          type: "POST",
          url: '/create_image', 
          data:(
            'download_src=' + $('.selected').attr('src') + '&' +
            'logo_src=' + $('.resizable-logo').attr('src') + '&' +
            'image_height=' + $('.selected').height() + '&' +
            'image_width=' + $('.selected').width() + '&' +
            'image_left=' + image_left + '&' +
            'image_filter=' + $('.selected').css('filter') + '&' +
            'download_text=' + $('.selected-text').text().trim() + '&' +
            'font_size=' + $($('.selected-text').children().get(0)).css('font-size') + '&' +
            'font_top=' + $('.selected-text').css('top') + '&' +
            'font_family=' + $($('.selected-text').children().get(0)).css('font-family') + '&' +
            'font_weight=' + $($('.selected-text').children().get(0)).css('font-weight') + '&' +
            'font_style=' + $($('.selected-text').children().get(0)).css('font-style') + '&' +
            'font_color=' + $($('.selected-text').children().get(0)).css('color')
          )
        })
        $('.share-download').addClass('expanded');

      }
      
        $.post(
    'https://graph.facebook.com',
    {
        id: 'http://word-doc.herokuapp.com/share_download.png',
        scrape: true
    },
    function(response){
        console.log(response);
    }
);
      else{
        download_flag = 1;
        $('.download-notice').show();
        $('.draggable').css('cursor', 'pointer');    // make text clickable;
        $('.draggable').hover(function(){
          $(this).toggleClass('download-text-hover');
        });
        $('.background-selected').addClass('background-not');
        $('.step-notice').show();
        $('.step-notice').click(function(){
          $(this).fadeOut();
        })
      } 
    }
  });

  $('#download-logo').click(function(){
    $('.logo-status').removeClass('logo-status-ready').text('waiting for select');
    $(this).removeClass('download-logo-ready');
  });
});

function get_left(){
  if ( $('.selected').parent().hasClass('ui-wrapper') ){
    image_left = $('.selected').parent().css('left'); 
  }
  else{
    image_left = $('.selected').css('left');
  }
}