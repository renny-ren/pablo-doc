function select_text(obj){
  var text = document.getElementById(obj.innerHTML.toLowerCase());
  if(obj.className == 'text-toggle-selected'){
    obj.className = "text-toggle";
    text.style.display = "none";
  }
  else{
    obj.className = "text-toggle-selected"; 
    text.style.display = "block";
  }  
}

function select_image(obj){
  var background = document.getElementById('background-images');
  var header = document.getElementById('header');
  var headers = header.children;
  var result = document.getElementsByClassName('result').item(0);

  if (obj.classList.contains('gallery-item-selected')) {       // if the image already selected
    for (var i = 0; i < header_num; i++) {
      background.removeChild(background.lastChild);              // remove images from canvas-center
    }

    obj.classList.toggle("gallery-item-selected", false);     // unselect the image
    if (document.querySelector(".gallery-item-selected")) {
      result.removeChild(result.lastChild);     // remove headers from canvas-center
    }

    result.style.height = background.offsetHeight + "px"; // amend height
  }
  else{
    for (var i = 0; i < header_num; i++) {
      var img = background.appendChild(obj.childNodes[0].cloneNode(true));   //add images to canvas-center
      img.classList.add('background-selected');  // apply css

      // rearrange headers
      // if (i != 0) {
      //   headers.item(i).style.top = parseInt(headers.item(i-1).style.top.replace(/[^0-9|-]/ig,"")) + 15 + "em";
      //   // header.item(i).style.top = header.item(i-1).offsetTop + 180 + "px";
      // }
      // else{
      //   headers.item(0).style.top = "-6px";
      // }

    }
    if (document.querySelector(".gallery-item-selected")) {
      // for (var i = 0; i < header_num; i++) {
        var header_copy = result.appendChild(header.cloneNode(true));  // clone headers if select multiple images
        header_copy.style.top = result.style.height;  // rearrange headers
        header_copy.style.position = 'absolute';
        draggable_editable();
      // }
    }

    obj.classList.toggle("gallery-item-selected", true);   // select the image
    result.style.height = background.offsetHeight + "px";  // amend height

    // var c = document.getElementById("background");
    // var ctx = c.getContext("2d");
    // var img = obj.childNodes[0];
    // ctx.drawImage(img, 0, 0, 400, 200);
  }  
}
