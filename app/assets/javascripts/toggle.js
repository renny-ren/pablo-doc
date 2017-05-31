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
  var selectedEl = document.querySelector(".gallery-item-selected");

  if(selectedEl){
    selectedEl.classList.remove("gallery-item-selected");
  }

  if(obj.classList.contains('gallery-item-selected')){
    // obj.classList.toggle("gallery-item-selected", false);
    // text.style.display = "none";

  }
  else{
    obj.classList.toggle("gallery-item-selected", true);

    var c = document.getElementById('background-images');
    var header = document.getElementById('header').children;

    // c.innerHTML = "";
    for (var i = 0; i < header.length; i++) {
      var img = c.appendChild(obj.childNodes[0].cloneNode(true));
      if(i != 0){
        header.item(i).style.top = parseInt(header.item(i-1).style.top.replace(/[^0-9|-]/ig,"")) + 15 + "em";
        // header.item(i).style.top = header.item(i-1).offsetTop + 180 + "px";
      }
      else{
        header.item(0).style.top = "-6px";
      }
      img.classList.add('background-selected');
    }
    
    // var c = document.getElementById("background");
    // var ctx = c.getContext("2d");
    // var img = obj.childNodes[0];
    // ctx.drawImage(img, 0, 0, 400, 200);
  }  
}

// function select_all(){
//   document.getElementsByClassName('text-toggle').className = "text-toggle-selected"
// }