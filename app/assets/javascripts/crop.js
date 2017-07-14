$(function(){
  $('.option-item-crop').click(function(){
    if ($('.selected').length > 1) {
      alert("Hi, you've selected more than one image, you can only modify one image at one time.");
      return;
    }
    else{
      if ($('.selected').length == 0) { 
        if(confirm("You haven't select any images, crop will apply to the first image, do you want to continue?")){
          var first_image = $('.image-canvas').children().first();
          $(first_image).addClass('selected');
          msg_flag = 0;
        }
        else{
          return;
        }
      }
      else{
        if (msg_flag == 0){
          msg_flag = 1;
        }
      }
    }
    $("#goTopBtn").trigger('click');
    $('.options-bar').hide();
    $('.image-options').hide();
    $('.reload-gallery').hide();
    $('.selected').parent().siblings().hide();
    reposition();

    var current_left = $('.selected').css('left');
    $('.selected').css('left', parseInt(current_left) + left_shift + 'px');
    $('.background-selected').removeClass('selectable');
    
    if ($('.selected').hasClass('ui-wrapper') == false) {
      $('.selected').addClass('resizable').addClass(resize_type);
      resizable();
      $('.ui-wrapper').css('overflow', 'initial');
      $('.selected').css('position', 'static');
    }

    if ($('.selected').parent().hasClass('ui-wrapper')) {
      $('.selected').parent().addClass('selected');  
    }
    $('.resizable').removeClass('selected');
    draggable();
    
    if (msg_flag == 1){
      $(".msg").fadeIn().delay(2000).fadeOut(); 
    }
  });

  $('.done').click(function(){
    $('.options-bar').show();
    $('.image-options').show();
    $('.option-item-select').removeClass('option-item-selected');
    $('.option-item-select').children().last().text("Select");
    $('.option-item-crop').removeClass('option-item-selected');
    $('.canvas-center').removeClass('canvas-center-leftbar');

    reposition();
    var current_left = $('.selected').css('left');
    $('.selected').css('left', parseInt(current_left) - left_shift + 'px');
    $('.ui-wrapper').css('overflow', 'hidden');
    $('#background-images').children().show();
    msg_flag = 0;
  });

  $('.reposition-reset').click(function(){
    $('.selected').css('left', left_shift);
    switch(resize_type){
      case "resizable-tall":
        $('.resizable').css('height', 725).css('width', 1024);
        break;
      case "resizable-square":
        $('.resizable').css('height', 484).css('width', 760);
        break;
      case "resizable-wide":
        $('.resizable').css('height', 249).css('width', 488);
        break;
     }
  });
});

function reposition(){
  $('.result').toggleClass('result-reposition');
  $('.crop-frame').toggleClass('crop-frame-reposition');
  $('.image-canvas').toggleClass('image-canvas-reposition');
  $('.reposition-bar').toggle();

  if ($('.image-sizes-item-selected').hasClass('tall')) {
    $('.canvas-center').toggleClass('canvas-center-reposition-tall');
    $('.crop-frame-reposition').css('height', '725px');
    $('.ui-wrapper').css('height', '725px');
    left_shift = 542;
    resize_type = "resizable-tall";
  }
  else if ($('.image-sizes-item-selected').hasClass('square')) {
    $('.canvas-center').toggleClass('canvas-center-reposition-square');
    $('.crop-frame-reposition').css('height', '484px');
    $('.ui-wrapper').css('height', '484px');
    left_shift = 270;  
    resize_type = "resizable-square";
  }
  else{
    $('.canvas-center').toggleClass('canvas-center-reposition-wide');
    $('.crop-frame-reposition').css('height', '249px');
    $('.ui-wrapper').css('height', '242px');
    left_shift = 73;
    resize_type = "resizable-wide";
  }
}