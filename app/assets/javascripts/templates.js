$(function(){
  $('.templates-label').click(function(){
    $('.templates-list').toggle('fast');
  });

  $('.templates-item').click(function(){
    select_template(this, this.className.split(' ')[1]);
    // $(this).toggleClass('template-item-selected');
  });

  $('body').dblclick(function(){
    $('.templates-list').hide();
  });
});

function set_template(description){
  switch(description)
  {
  case "templates-item-blank":
    img_src = "https://buffer-uploads.s3.amazonaws.com/543fa321d1a3122967f7c525/2c0e0f6fb8ed76ef9432d8d82e1aaf13.jpg";
    posY = 1;
    font = 'SignPainter';
    break;
  case "templates-item-quote":
    img_src = "https://buffer-uploads.s3.amazonaws.com/543fa321d1a3122967f7c525/8cd544c0e2bde65231fd36b05f5b4ed2.jpg";
    posY = 1;
    font = "";
    break;
  case "templates-item-announcement":
    img_src = "https://buffer-uploads.s3.amazonaws.com/543fa321d1a3122967f7c525/c5d960ec4632db3244e9fa54b049eb16.jpg";
    posY = 1;
    font = "";
    break;
  case "templates-item-promotion":
    img_src = "https://buffer-uploads.s3.amazonaws.com/543fa321d1a3122967f7c525/a8dfd2e1de84e8f5202f5c9723f0d318.jpg";
    posY = 1;
    font = "Arial Black";
    break;
  case "templates-item-love":
    img_src = "https://buffer-uploads.s3.amazonaws.com/543fa321d1a3122967f7c525/4337433d7fb54b0b7498e6806f373b4e.jpg";
    posY = 1;
    font = "";
    break;
  case "templates-item-outreach":
    img_src = "https://buffer-uploads.s3.amazonaws.com/543fa321d1a3122967f7c525/399de537115c29aaa5261a3f8d9a0c18.jpg";
    posY = 50;
    font = "";
    break;
  }
}

function select_template(obj, description){
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
  set_template(description);
  
  if (obj.classList.contains('template-item-selected')) {       // if the template already selected
    for (var i = 0; i < image_num; i++) {
      background.removeChild(background.lastChild);              // remove corresponding images from canvas-center
    }

    obj.classList.toggle("template-item-selected", false);     // unselect the template
    if (document.querySelector(".template-item-selected") || document.querySelector(".gallery-item-selected")) {
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
      var img = document.createElement('img');
      img.src = img_src;
      background.appendChild(img);   //add images to canvas-center

      img.classList.add('background-selected');  // apply css
    }

    if (document.querySelector(".gallery-item-selected") || document.querySelector(".template-item-selected")) {   // if selection not the first one
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
    
    for (var i = 0; i < header_num; i++) {
      // rearrange headers
      headers.item(i).style.position = 'absolute';
      headers.item(i).style.top = background.childNodes[i].offsetTop - posY + 'px';
      if (font.length != 0){
        headers.item(i).style.fontFamily = font;     
      }
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

    obj.classList.toggle("template-item-selected", true);   // select the template
    result.style.height = background.offsetHeight + "px";  // amend height
  }  
}

