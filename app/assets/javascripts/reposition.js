$(function(){
  $('.reposition').click(function(){
    if ($('.selected').length > 1) {
      alert("Hi, you've selected more than one image, you can only reposition one image at one time.");
      return;
    }
    else{
      if ($('.selected').length == 0) { 
        if(confirm("You didn't select any images, reposition will apply to the first image, do you want to continue?")){
          $($('#background-images').children().get(0)).addClass('selected');
        }
        else{
          return;
        }
      }  
    }
    $('.selected').addClass('resizable');
    var left_now = $('.selected').css('left');
    resizable();
    draggable();
    reposition();
    $('.selected').css('left', parseInt(left_now) + shift + 'px');
    $('.background-selected').removeClass('selectable');
    
   
  });

  $('.done').click(function(){
    reposition();
    var left_now = $('.selected').css('left');
    $('.selected').css('left', parseInt(left_now) - shift + 'px');
    
    $('.select-button').text("Select Image");
    $('#background-images').children().show();
    // $('.ui-wrapper').removeClass('resizable selected');
    $('.ui-wrapper').removeAttr('style');
  });

  
});

function reposition(){
  $('.selected').removeClass('selected');
  $('.ui-wrapper').toggleClass('selected');
  // $('.resize-button').toggle();
  $('.selected').siblings().hide();
  $('.image-options').toggle();
  $('.gallery').toggle();
  $('.result').toggleClass('result-reposition');
  // $('.selected').toggleClass('background-selected-reposition');
  $('.crop-frame').toggleClass('crop-frame-reposition');
  $('.doc-container').toggleClass('doc-container-reposition');

  

  if ($('.image-sizes-item-selected').hasClass('tall')) {
    $('.canvas-center').toggleClass('canvas-center-reposition-tall');
    // decreaseHeight('730px');
    $('.crop-frame-reposition').css('height', '725px');
    shift = 542;
  }
  else if ($('.image-sizes-item-selected').hasClass('square')) {
    $('.canvas-center').toggleClass('canvas-center-reposition-square');
    // decreaseHeight('490px');
    $('.crop-frame-reposition').css('height', '484px');
    shift = 279;  
  }
  else{
    $('.canvas-center').toggleClass('canvas-center-reposition-wide');
    // decreaseHeight('250px');
    $('.crop-frame-reposition').css('height', '242px');
    shift = 43;
  }
  
}

// function decreaseHeight(height){
  // $('.doc-container').css('height', height);
  // $('.background-image').css('height', height);
// }