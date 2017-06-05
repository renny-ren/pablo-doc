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
  var quotation = document.getElementById('quotation');
  var quotations = quotation.children;
  var bullet = document.getElementById('bullet');
  var bullets = bullet.children;
  var bold = document.getElementById('bold');
  var bolds = bold.children;
  var result = document.getElementsByClassName('result').item(0);

  if (obj.classList.contains('gallery-item-selected')) {       // if the image already selected
    for (var i = 0; i < image_num; i++) {
      background.removeChild(background.lastChild);              // remove images from canvas-center
    }

    obj.classList.toggle("gallery-item-selected", false);     // unselect the image
    if (document.querySelector(".gallery-item-selected")) {
      result.removeChild(result.lastChild);     // remove headers from canvas-center
      result.removeChild(result.lastChild);     // remove quotations from canvas-center
      result.removeChild(result.lastChild);     // remove bullet from canvas-center
      result.removeChild(result.lastChild);     // remove bold from canvas-center
    }
    else{
      for (var i = 0; i < header_num; i++) {
        // rearrange headers
        headers.item(i).style.position = 'relative';
        headers.item(i).style.top = 0;
      }

      for (var i = 0; i < quotation_num; i++) {
        // rearrange quotations
        quotations.item(i).style.position = 'relative';
        quotations.item(i).style.top = 0;
      }

      for (var i = 0; i < bullet_num; i++) {
        // rearrange bullet
        bullets.item(i).style.position = 'relative';
        bullets.item(i).style.top = 0;
      }

      for (var i = 0; i < bold_num; i++) {
        // rearrange bold-text
        bolds.item(i).style.position = 'relative';
        bolds.item(i).style.top = 0;
      }

    }

    result.style.height = background.offsetHeight + "px"; // amend height
  }
  else{
    for (var i = 0; i < image_num; i++) {
      var img = background.appendChild(obj.childNodes[0].cloneNode(true));   //add images to canvas-center

      img.classList.add('background-selected');  // apply css
      img.removeAttribute('height');
      img.removeAttribute('width');
    }

    rearrange();

    if (document.querySelector(".gallery-item-selected") || document.querySelector(".template-item-selected")) {     // if select multiple images
        var header_copy = result.appendChild(header.cloneNode(true));   // clone headers 
        header_copy.style.position = 'relative';
        header_copy.style.top = result.style.height;  // rearrange headers

        var quotation_copy = result.appendChild(quotation.cloneNode(true));  // clone quotations
        quotation_copy.style.position = 'relative';
        quotation_copy.style.top = result.style.height;  // rearrange quotations

        var bullet_copy = result.appendChild(bullet.cloneNode(true));  // clone bullet 
        bullet_copy.style.position = 'relative';
        bullet_copy.style.top = result.style.height;  // rearrange bullet

        var bold_copy = result.appendChild(bold.cloneNode(true));  // clone bold-text
        bold_copy.style.position = 'relative';
        bold_copy.style.top = result.style.height;  // rearrange bold-text

        draggable_editable();
    }

    obj.classList.toggle("gallery-item-selected", true);   // select the image
    result.style.height = background.offsetHeight + "px";  // amend height

    // var c = document.getElementById("background-images");
    // var ctx = c.getContext("2d");
    // var img = obj.childNodes[0];

    // ctx.drawImage(img, 0, 0, 200, 100);
  }  
}


function rearrange(){
  var background = document.getElementById('background-images');
  var header = document.getElementById('header');
  var headers = header.children;
  var quotation = document.getElementById('quotation');
  var quotations = quotation.children;
  var bullet = document.getElementById('bullet');
  var bullets = bullet.children;
  var bold = document.getElementById('bold');
  var bolds = bold.children;

  for (var i = 0; i < header_num; i++) {
    // rearrange headers
    headers.item(i).style.position = 'absolute';
    headers.item(i).style.top = background.childNodes[i].offsetTop - 60 + 'px';
    j = i + 1;
  }

  for (var i = 0; i < quotation_num; i++) {
    // rearrange quotations
    quotations.item(i).style.position = 'absolute';
    quotations.item(i).style.top = background.childNodes[j].offsetTop - 60 + 'px';
    j++;
  }

  for (var i = 0; i < bullet_num; i++) {
    // rearrange bullet
    bullets.item(i).style.position = 'absolute';
    bullets.item(i).style.top = background.childNodes[j].offsetTop - 60 + 'px';
    j++;
  }

  for (var i = 0; i < bold_num; i++) {
    // rearrange bold-text
    bolds.item(i).style.position = 'absolute';
    bolds.item(i).style.top = background.childNodes[j].offsetTop - 60 + 'px';
    j++;
  }
}