$(function(){
  background = $('#background-images');
  header = $('#header');
  quotation = $('#quotation');
  bullet = $('#bullet');
  bold = $('#bold');
  result = $('.result').get(0);
  getQuantity();
  flag = 0;
  msg_flag = 1;
  // arr = [];

  $('[id=header-item]').find('span').removeAttr('style');

  $("#goTopBtn").click(function(){
    var sc = $(window).scrollTop();
    $('body, html').animate({ scrollTop: 0 }, 50);
   })

  $(window).scroll(function(){
    var sc = $(window).scrollTop();
    var rwidth = $(window).width();
    if (sc > 1000){
      $("#goTopBtn").show();
      $("#goTopBtn").css("left", (rwidth - 56) + "px")
     }
    else{
      $("#goTopBtn").hide();
     }
   })

  $("#goTopBtn").click(function(){
    var sc = $(window).scrollTop();
    $('body, html').animate({ scrollTop: 0 }, 50);
   })
    
  $('.text-toggle').click(function(){
    if ($('.text-toggle-selected').length == 1 && $(this).hasClass('text-toggle-selected')) {
      alert("You can't unselect this as there would be no result");
    }
    else{
      // var text = document.getElementById(this.innerHTML.toLowerCase());
      var type = $(this).text().toLowerCase();
      // getQuantity();

      if ($(this).hasClass('text-toggle-selected')) {
        eval(type + "_num" + '=' + 0);
        $("[id=" + type + "]").children().removeClass('text-item').addClass('text-item-hide');
      }
      else{
        eval(type + "_num" + '=' + type + '.children().length');
        $("[id=" + type + "]").children().addClass('text-item').removeClass('text-item-hide');
      }
      image_num =  header_num + quotation_num + bullet_num + bold_num;

      if ($('.background-selected').length > 0){
        background.empty();     // remove all images 

        for (var i = 0; i < $('.gallery-item-selected').length; i++){
          for (var j = 0; j < image_num; j++) {
            var image_canvas = document.createElement('div');
            $(image_canvas).attr('class', 'image-canvas');
            background.append(image_canvas);
            var bg_img = $($('.gallery-item-selected').children().get(i)).clone();
            $('.image-canvas').last().append(bg_img);   //add images
          }
        }
        $('.image-canvas').children()
          .addClass('background-selected size-wide')   // apply css
          .removeAttr('height').removeAttr('width'); 
        amendHeight();

        var share_button = document.createElement('i');
        var delete_button = document.createElement('i');
        $(share_button).addClass('fa fa-share-alt-square fa-2x each-share-button');
        $(delete_button).addClass('fa fa-trash fa-2x each-delete-button');
        $('.image-canvas').after(delete_button);
        $('.image-canvas').after(share_button);
        rearrange($('.gallery-item-selected'));
      }

      $(this).toggleClass('text-toggle-selected');
      $("[id=" + type + "]").toggle();
      }
  });

  $('body').on('click', '.blank-image', function(){  // this is for safari user
    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
      if ($('.gallery-item-selected').length > 0 && $('.gallery-item-selected').hasClass('blank-image') == false) {  // if there is picture selected
        if(confirm("select this will clear other pictures you've selected, do you want to continue?")){
          if ($(".gallery-item-selected").length >= 2) {
            for (var i = 0; i < $('.gallery-item-selected').length - 1; i++){
              var j = 0;
              while(j < 4){
                $(result).children().last().remove();     // remove all texts
                j++;
              }
            }
          }
          background.empty();  // remove all images
          $('.gallery-item-selected').removeClass('gallery-item-selected');
          amendHeight();
        }
        else{
          stopPropagation();
          preventDefault();
        }
      }
    }
  });

  $('body').on('click', '.gallery-item', function(){
    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 && $(this).hasClass('blank-image') == false && $('.gallery-item-selected').hasClass('blank-image')) {
      alert("You can't select this picture since you've selected color image, please unselect them first");
    }
    else{
      if ( $(".gallery-item-selected").length >= 2 ) {
        for ( var i = 0; i < $('.gallery-item-selected').length - 1; i++ ) {
          var j = 0;
          while( j < 4 ) {
            $(result).children().last().remove();     // remove all texts
            j++;
          }
        }
      }
      background.empty();     // remove all images
      $(this).toggleClass('gallery-item-selected');

      for (var i = 0; i < $('.gallery-item-selected').length; i++){
        for (var j = 0; j < image_num; j++) {
          var image_canvas = document.createElement('div');
          $(image_canvas).attr('class', 'image-canvas');
          background.append(image_canvas);
          var bg_img = $($('.gallery-item-selected').children().get(i)).clone();
          $('.image-canvas').last().append(bg_img);   //add images

          // var horizontal_line = document.createElement('div');
          // $('#hor_line').append(horizontal_line).css('display', 'none');   // add auxiliary line for each image
          // $('#hor_line').children().get(i).style.top = background.children().get(i).offsetTop +75 + 'px';       
          // $('#hor_line').children().addClass('horizontal_line');

          // arr[i] = background.children().get(i).offsetTop +75 - $(header.children().get(i)).height()/2 + 'px';  // get array of where horizontal line shoud show
        }
      }
      $('.image-canvas').children()
          .addClass('background-selected size-wide')   // apply css
          .removeAttr('height').removeAttr('width'); 

      if ($(".gallery-item-selected").length >= 2) {     // if select multiple images
        for (var i = 0; i < $('.gallery-item-selected').length - 1; i++){
          $(result).append(header.clone()); 
          $(result).append(quotation.clone()); 
          $(result).append(bullet.clone()); 
          $(result).append(bold.clone()); 
        }
      }
      draggable();
      editable();

      var share_button = document.createElement('i');
      var delete_button = document.createElement('i');
      $(share_button).addClass('fa fa-share-alt-square fa-2x each-share-button');
      $(delete_button).addClass('fa fa-trash fa-2x each-delete-button');
      $('.image-canvas').after(delete_button);
      $('.image-canvas').after(share_button);
      getQuantity();
      rearrange(this);
      amendHeight();
    }
  });

  $('body').on('click', '.selectable', function(){
    $(this).toggleClass('selected');
    // $('#download-image').addClass('download-image-ready').attr('title', 'click to cancel select');
    // $('.image-status').addClass('image-status-ready').text('selected!');
    // if ( $('.selected').length > 0 && $('.selected-text').length > 0) {
    //   $('.download-notice').addClass('download-ready');
    //   $('.step-notice').text('Great! You can share & download now');
    // // Great! You can share & download now, or click on the disc to cancel select
    // }

    // if (download_flag == 1){
    //   // hide other images
    //   if ($(this).parent().hasClass('ui-wrapper')) {
    //     $(this).parent().siblings().hide();
    //   }
    //   else{
    //     $(this).siblings().hide();
    //   } 
    // }
    // download_flag = 0;
  });

  $('body').on('click', '.each-delete-button', function(){
    if(confirm("Are you sure want to delete this image?")){
      var text_top_min = parseInt($(this).prev().css('top')) - 400;
      var text_top_max = parseInt($(this).prev().css('top'));
      var text_left_min = parseInt($(this).prev().css('left'));
      var text_left_max = parseInt($(this).prev().css('left')) + 300;
      for (var i = 0; i < $('.text-item').length; i++) {
        if (parseInt($($('.text-item').get(i)).css('top')) >= text_top_min && parseInt($($('.text-item').get(i)).css('top')) < text_top_max && parseInt($($('.text-item').get(i)).css('left')) < text_left_max && parseInt($($('.text-item').get(i)).css('left')) >= text_left_min) {
          $($('.text-item').get(i)).addClass('selected-text');
          break;
        }
      }
      $('.selected-text').remove();  // remove text
      $(this).prev().prev().remove();   // remove iamge
      $(this).prev().remove();   // remove share button
      $(this).remove();   // remove delete button
      $('.selected-text').removeClass('selected-text');
      getQuantity();
      rearrange();
      amendHeight();
    };
  });
});

function amendHeight(){
  $(result).css('height', background.height() - 10 + "px");
  $('.canvas-center').css('height', background.height() - 45 + "px");
  // if (parseInt($(result).css('height')) < 100) {
  //   $(result).css('height', background.children().last().offset().top + 235 + 'px');
  // }
  $('.vertical_line').css('height', $(result).css('height'));
}

function getQuantity(){
  header_num = header.children().length;
  quotation_num = quotation.children().length;
  bullet_num = bullet.children().length;
  bold_num = bold.children().length;
  image_num =  header_num + quotation_num + bullet_num + bold_num;
}

function rearrange(galleryItem){
  header.children().css('position', 'absolute');
  quotation.children().css('position', 'absolute');
  bullet.children().css('position', 'absolute');
  bold.children().css('position', 'absolute');

  // rearrange text
  $('#header-item').get(0).style.left = '0px';
  if ($('.image-canvas').height() == null){
    image_height = 249;
  }
  else{
    image_height = $('.image-canvas').height();
  }
  for (var i = 0, left_now = 0, top_now = 0, text_shift = 0; i < $('.text-item').length; i++, left_now += 330) {
    $('.text-item').get(i).style.top = top_now - text_shift + 'px';
    $('.text-item').get(i).style.left = left_now + 'px';
    if (left_now == 990) {
      left_now = -330;
      top_now += image_height + 50;
      text_shift += 4;
      if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 && ($(galleryItem).hasClass('blank-image') == false) ) {   // if user's browser is safari
        text_shift += 6;
      }
    }
  }

  // rearrange share and delete button
  if ($('.each-share-button').length > 0){
    $('.each-share-button').get(0).style.top = image_height + 'px';
    $('.each-share-button').get(0).style.left = '0px';
    $('.each-delete-button').get(0).style.top = image_height + 'px';
    $('.each-delete-button').get(0).style.left = '270px';
    for (var i = 1, left_now = 330, top_now = image_height, shift = 0; i < $('.text-item').length; i++, left_now += 330) {
      $('.each-share-button').get(i).style.left = left_now + 'px';
      $('.each-share-button').get(i).style.top = top_now - shift + 'px';
      $('.each-delete-button').get(i).style.left = left_now + 270 + 'px';
      $('.each-delete-button').get(i).style.top = top_now - shift + 'px';
      if (left_now == 990) {
        left_now = -330;
        top_now += image_height + 50;
        shift += 4;
        if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1 && ($(galleryItem).hasClass('blank-image') == false) ) {   // if user's browser is safari
          shift += 6;
        }
      }
    }
  }
}
