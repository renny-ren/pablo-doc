$(function(){
  $("#search_image").keyup(function(event){
    if(event.keyCode == 13){
        $(".fa-search").click();
    }
  });
})