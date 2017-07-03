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
    $('body,html').animate({ scrollTop: 0 }, 50);
   })
    
  $('.text-toggle').click(function(){
    var text = document.getElementById(this.innerHTML.toLowerCase());
    var type = $(this).text().toLowerCase();

    if ($(this).hasClass('text-toggle-selected')) {
      eval(type + "_num" + '=' + 0);
    }
    else{
      eval(type + "_num" + '=' + type + '.children().length');
    }
    image_num =  header_num + quotation_num + bullet_num + bold_num;  // change text quantity
    
    if ($('.background-selected').length > 0){
      background.empty();     // remove all images from canvas-center

      for (var i = 0; i < image_num; i++) {
        var image_canvas = document.createElement('div');
        $(image_canvas).attr('class', 'image-canvas');
        background.append(image_canvas);
      }
      amendHeight();

      var bg_img = $($('.gallery-item-selected').children().get(0)).clone();
      $('.image-canvas').append(bg_img);   //add images
      $('.image-canvas').children()
        .addClass('background-selected size-wide')   // apply css
        .removeAttr('height').removeAttr('width'); 

      var share_button = document.createElement('i');
      var delete_button = document.createElement('i');
      $(share_button).addClass('fa fa-share-alt-square fa-2x each-share-button');
      $(delete_button).addClass('fa fa-trash fa-2x each-delete-button');
      $('.image-canvas').after(delete_button);
      $('.image-canvas').after(share_button);
      rearrange();
    }

    $(this).toggleClass('text-toggle-selected');
    $(text).toggle();
  });

  $('body').on('click', '.gallery-item', function(){
    if ($(this).hasClass('gallery-item-selected')) {
      for (var i = 0; i < image_num; i++) {
        background.children().last().remove();           // remove images from canvas-center
      }

      $(this).removeClass('gallery-item-selected');     // unselect the image
      if ($(".gallery-item-selected").length > 0) {
        var i = 0;
        while(i < 4){
          $(result).children().last().remove();     // remove headers, quotes, bullets and bold from canvas-center
          i++;
        }  
      }
      else{
        resetPosition();
      }
    amendHeight();
    }
    else{
      $('.option-item-images').trigger('click');
      for (var i = 0; i < image_num; i++) {
        var image_canvas = document.createElement('div');
        $(image_canvas).attr('class', 'image-canvas');
        background.append(image_canvas);

        // var horizontal_line = document.createElement('div');
        // $('#hor_line').append(horizontal_line).css('display', 'none');   // add auxiliary line for each image
        // $('#hor_line').children().get(i).style.top = background.children().get(i).offsetTop +75 + 'px';       
        // $('#hor_line').children().addClass('horizontal_line');

        // arr[i] = background.children().get(i).offsetTop +75 - $(header.children().get(i)).height()/2 + 'px';  // get array of where horizontal line shoud show
      }
      var bg_img = $($(this).children().get(0)).clone();
      if ($(this).hasClass('blank-image')) {
        bg_img.css('display', 'block');
      }
      $('.image-canvas').append(bg_img);   //add images
      $('.image-canvas').children()
        .addClass('background-selected size-wide')   // apply css
        .removeAttr('height').removeAttr('width'); 

      draggable();
      editable();

      var share_button = document.createElement('i');
      var delete_button = document.createElement('i');
      $(share_button).addClass('fa fa-share-alt-square fa-2x each-share-button');
      $(delete_button).addClass('fa fa-trash fa-2x each-delete-button');
      $('.image-canvas').after(delete_button);
      $('.image-canvas').after(share_button);
      rearrange();    

      if ($(".gallery-item-selected").length > 0 || $(".template-item-selected").length > 0) {     // if select multiple images
        appendText(header.clone());
        appendText(quotation.clone());
        appendText(bullet.clone());
        appendText(bold.clone());

        draggable();
        editable();
      }

      $(this).addClass('gallery-item-selected');   // select the image
      amendHeight();
    }
  });

  $('body').on('click', '.selectable', function(){
    $(this).toggleClass('selected');
    $('#download-image').addClass('download-image-ready').attr('title', 'click to cancel select');
    $('.image-status').addClass('image-status-ready').text('selected!');
    if ( $('.selected').length > 0 && $('.selected-text').length > 0) {
      $('.download-notice').addClass('download-ready');
      $('.step-notice').text('Great! You can share & download now');
    // Great! You can share & download now, or click on the disc to cancel select
    }

    if (download_flag == 1){
      // hide other images
      if ($(this).parent().hasClass('ui-wrapper')) {
        $(this).parent().siblings().hide();
      }
      else{
        $(this).siblings().hide();
      } 
    }

    download_flag = 0;
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
  if (parseInt($(result).css('height')) < 100) {
    $(result).css('height', background.children().last().offset().top + 235 + 'px');
  }
  $('.vertical_line').css('height', $(result).css('height'));
}

function resetPosition(){
  for (var i = 0; i < header_num; i++) {
    $(header.children().get(i))
      .css('position', 'relative')
      .css('top', 0);
  }

  for (var i = 0; i < quotation_num; i++) {
    $(quotation.children().get(i))
      .css('position', 'relative')
      .css('top', 0);
  }

  for (var i = 0; i < bullet_num; i++) {
    $(bullet.children().get(i))
      .css('position', 'relative')
      .css('top', 0);
  }

  for (var i = 0; i < bold_num; i++) {
    $(bold.children().get(i))
      .css('position', 'relative')
      .css('top', 0);
  }
}

function appendText(obj){
  $(result).append(obj); 
  obj                                     //adjust position
    .css('position', 'relative')
    .css('top', $(result).height());
}

function rearrange(){
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
  for (var i = 1, left_now = 330, top_now = 0; i < header_num; i++, left_now += 330) {
    // if (i % 4 == 0){
    //   top_now = parseInt(header.children().get(i-4).style.top) + 520 + 'px';
    //   header.children().get(i).style.left = 0;
    // }
    // else{
    //   header.children().get(i).style.left = parseInt(header.children().get(i - 1).style.left) + 330 + 'px';
    // }
    // header.children().get(i).style.top = top_now;
    header.children().get(i).style.left = left_now + 'px';
    header.children().get(i).style.top = top_now + 'px';
    if (left_now == 990) {
      left_now = -330;
      top_now += image_height + 50;
    }
  }
  change_left_top(quotation, quotation_num);
  change_left_top(bullet, bullet_num);
  change_left_top(bold, bold_num);

  function change_left_top(item, num){
    for (var i = 0; i < num; i++, left_now += 330) {
      item.children().get(i).style.left = left_now + 'px';
      item.children().get(i).style.top = top_now + 'px';
      if (left_now == 990) {
        left_now = -330;
        top_now += image_height + 50;
      }
    }
  }

  // rearrange share and delete button
  if ($('.each-share-button').length > 0){
    $('.each-share-button').get(0).style.top = image_height + 'px';
    $('.each-share-button').get(0).style.left = '0px';
    $('.each-delete-button').get(0).style.top = image_height + 'px';
    $('.each-delete-button').get(0).style.left = '270px';
    for (var i = 1, left_now = 330, top_now = image_height, shift = 0; i < image_num; i++, left_now += 330) {  
      $('.each-share-button').get(i).style.left = left_now + 'px';
      $('.each-share-button').get(i).style.top = top_now - shift + 'px';
      $('.each-delete-button').get(i).style.left = left_now + 270 + 'px';
      $('.each-delete-button').get(i).style.top = top_now - shift + 'px';
      if (left_now == 990) {
        left_now = -330;
        top_now += image_height + 50;
        shift += 4;
      }
    }
  } 

  // for (var i = 0; i < quotation_num; i++, j++) {
  //   quotation.children().get(i).style.top = background.children().get(j).offsetTop - 90 + 'px';
  // }

  // for (var i = 0; i < bullet_num; i++, j++) {
  //   bullet.children().get(i).style.top = background.children().get(j).offsetTop - 90 + 'px';
  // }

  // for (var i = 0; i < bold_num; i++, j++) {
  //   bold.children().get(i).style.top = background.children().get(j).offsetTop - 90 + 'px';
  // }
}

function getQuantity(){
  header_num = header.children().length;
  quotation_num = quotation.children().length;
  bullet_num = bullet.children().length;
  bold_num = bold.children().length;
  image_num =  header_num + quotation_num + bullet_num + bold_num;
}
