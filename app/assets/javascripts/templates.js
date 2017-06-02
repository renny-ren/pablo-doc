$(function(){
  $('.templates-label').click(function(){
    $('.templates-list').toggle('fast');
  });

  $('body').dblclick(function(){
    $('.templates-list').hide();
  });

  $('.templates-item-blank').click(function(){  });

  $('.templates-item').click(function(e){
    this.toggleClass('template-item-selected');
  });

});

function select_template(obj){
  var background = document.getElementById('background-images');
  var header = document.getElementById('header');
  var headers = header.children;
  var result = document.getElementsByClassName('result').item(0);

  if (obj.classList.contains('template-item-selected')) {       // if the template already selected
    // for (var i = 0; i < header_num; i++) {
    //   background.removeChild(background.lastChild);              // remove images from canvas-center
    // }

    obj.classList.toggle("template-item-selected", false);     // unselect the template
    // if (document.querySelector(".gallery-item-selected")) {
    //   result.removeChild(result.lastChild);     // remove headers from canvas-center
    // }

    // result.style.height = background.offsetHeight + "px"; // amend height
  }
  else{
    // for (var i = 0; i < header_num; i++) {
    //   var img = background.appendChild(obj.childNodes[0].cloneNode(true));   //add images to canvas-center
    //   img.classList.add('background-selected');  // apply css

    //   // rearrange headers
    //   if(i != 0){
    //     headers.item(i).style.top = parseInt(headers.item(i-1).style.top.replace(/[^0-9|-]/ig,"")) + 15 + "em";
    //   }
    //   else{
    //     headers.item(0).style.top = "-6px";
    //   }

    // }
    // if (document.querySelector(".gallery-item-selected")) {
    //     var header_copy = result.appendChild(header.cloneNode(true));  // clone headers if select multiple images
    //     header_copy.style.top = result.style.height;  // rearrange headers
    //     header_copy.style.position = 'absolute';
    //     draggable_editable();
    // }

    obj.classList.toggle("template-item-selected", true);   // select the template
    // result.style.height = background.offsetHeight + "px";  // amend height
  }  
}

