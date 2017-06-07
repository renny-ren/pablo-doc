$(function(){
  if ($('.download-content').length > 0){
    var img_src = localStorage.getItem("WC");
    var img = document.createElement('img');
    img.src = img_src;
    $('.download-content').append(img);
  }

  $('.download-button').click(function(){
    var ci = $($('#background-images').children().get(0)).attr('src');
    localStorage.setItem("WC", ci);
  });

})