$(function(){
  $('.reposition').click(function(){
    if ($('.selected').length > 1) {
      alert("Hi, you've selected more than one image, you can only reposition one image at one time.");
      return;
    }
    else{
      if ($('.selected').length == 0) { 
        if(confirm("You didn't select any images, reposition will apply to the first image, do you want to continue?")){
          var first_image = $('#background-images').children().get(0);
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
    reposition();

    var left_now = $('.selected').css('left');
    $('.selected').css('left', parseInt(left_now) + shift + 'px');
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
    $('.selected').siblings().hide();
    
    if (msg_flag == 1){
      $(".msg").fadeIn().delay(2000).fadeOut(); 
    }
  });

  $('.done').click(function(){
    reposition();
    var left_now = $('.selected').css('left');
    $('.selected').css('left', parseInt(left_now) - shift + 'px');
    $('.ui-wrapper').css('overflow', 'hidden');
    $('.select-button').text("Select Image");
    $('#background-images').children().show();
    msg_flag = 0;
  });

  $('.reposition-reset').click(function(){
    $('.selected').css('left', shift);
    switch(resize_type){
      case "resizable-tall":
        $('.resizable').css('height', 725).css('width', 1024);
        break;
      case "resizable-square":
        $('.resizable').css('height', 484).css('width', 760);
        break;
      case "resizable-wide":
        $('.resizable').css('height', 242).css('width', 524);
        break;
     }
  });
});

function reposition(){
  $('.image-options').toggle();
  $('.gallery').toggle();
  $('.result').toggleClass('result-reposition');
  $('.crop-frame').toggleClass('crop-frame-reposition');
  $('.doc-container').toggleClass('doc-container-reposition');
  $('#background-images').toggleClass('background-images-reposition');
  $('.reposition-bar').toggle();

  if ($('.image-sizes-item-selected').hasClass('tall')) {
    $('.canvas-center').toggleClass('canvas-center-reposition-tall');
    // decreaseHeight('730px');
    $('.crop-frame-reposition').css('height', '725px');
    $('.ui-wrapper').css('height', '725px');
    shift = 542;
    resize_type = "resizable-tall";
  }
  else if ($('.image-sizes-item-selected').hasClass('square')) {
    $('.canvas-center').toggleClass('canvas-center-reposition-square');
    // decreaseHeight('490px');
    $('.crop-frame-reposition').css('height', '484px');
    $('.ui-wrapper').css('height', '484px');
    shift = 270;  
    resize_type = "resizable-square";
  }
  else{
    $('.canvas-center').toggleClass('canvas-center-reposition-wide');
    // decreaseHeight('250px');
    $('.crop-frame-reposition').css('height', '242px');
    $('.ui-wrapper').css('height', '242px');
    shift = 43;
    resize_type = "resizable-wide";
  }
}

// function decreaseHeight(height){
  // $('.doc-container').css('height', height);
  // $('.background-image').css('height', height);
// }