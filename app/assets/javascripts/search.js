$(function(){
  $('body').on('focus', '#search_image', function(){
    $('.fa-search').attr('class', 'fa fa-close');
  });

  $('body').on('click', '.fa-close', function(){
    $('.shuffle').click();
  });

  $('body').on('keyup', '#search_image', function(event){
    if (event.keyCode == 13) {
      $('#search_image')
        .val('Searching ' + $('#search_image').val() + '...')
        .prop('disabled', true);
    }
  });
});