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
    var header_num = document.getElementById('header').children.length;

    // c.innerHTML = "";
    for (var i = 0; i < header_num; i++) {
      var img = c.appendChild(obj.childNodes[0].cloneNode(true));
      img.classList.add('background-selected');
      // document.getElementById('header').childNodes[header_num].style.width = "100px";
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