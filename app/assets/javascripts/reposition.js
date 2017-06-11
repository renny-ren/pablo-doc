$(function(){
  $('.reposition').click(function(){
    reposition();
  });

  $('.done').click(function(){
    reposition();

    // $('.result').css('width', '500px');
    // $('.canvas-center').css('width', '550px');
    // $('.background-selected').css('width', '500px').css('height', '280px');
  });

  $('.crop-frame').mousedown(function(){
    // $('')
  });
});

function reposition(){
  $('.image-options').toggle();
  $('.gallery').toggle();
  $('.result').toggleClass('result-reposition');
  $('.canvas-center').toggleClass('canvas-center-reposition');
  $('.background-selected').toggleClass('background-selected-reposition');
  $('.crop-frame').toggleClass('crop-frame-reposition');
}