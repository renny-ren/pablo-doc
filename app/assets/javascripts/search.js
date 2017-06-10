$(function(){
  $('body').on('focus', '#search_image', function(){
    $('.fa-search').attr('class', 'fa fa-close');
  });

  $('body').on('click', '.fa-close', function(){
    $('.shuffle').click();
  });

  $('#search_image').keyup(function(e){
    if (e.keyCode == 13) {

    }
  });
});