$(function(){
  $('.templates-label').mouseenter(function(){
    $('.templates-list').fadeIn();
  });

  $('.templates-list').mouseleave(function(){
    $(this).fadeOut();
  }); 

  $('.templates-item').click(function(){
    select_template(this, this.className.split(' ')[1]);
    $(this).toggleClass('template-item-selected');
  });
});

function set_template(description){
  switch(description)
  {
  case "templates-item-blank":
    // image_src = "https://buffer-uploads.s3.amazonaws.com/543fa321d1a3122967f7c525/2c0e0f6fb8ed76ef9432d8d82e1aaf13.jpg";
    font = 'Lato';
    break;
  case "templates-item-quote":
    // image_src = "https://buffer-uploads.s3.amazonaws.com/543fa321d1a3122967f7c525/8cd544c0e2bde65231fd36b05f5b4ed2.jpg";
    font = "Satisfy";
    break;
  case "templates-item-announcement":
    // image_src = "https://buffer-uploads.s3.amazonaws.com/543fa321d1a3122967f7c525/c5d960ec4632db3244e9fa54b049eb16.jpg";
    font = "Permanent Marker";
    break;
  case "templates-item-promotion":
    // image_src = "https://buffer-uploads.s3.amazonaws.com/543fa321d1a3122967f7c525/a8dfd2e1de84e8f5202f5c9723f0d318.jpg";
    font = "Arial Black";
    break;
  case "templates-item-love":
    // image_src = "https://buffer-uploads.s3.amazonaws.com/543fa321d1a3122967f7c525/4337433d7fb54b0b7498e6806f373b4e.jpg";
    font = "Lobster";
    break;
  case "templates-item-outreach":
    // image_src = "https://buffer-uploads.s3.amazonaws.com/543fa321d1a3122967f7c525/399de537115c29aaa5261a3f8d9a0c18.jpg";
    font = "Mogra";
    break;
  }
}

function select_template(obj, description){  
  if ($(obj).hasClass('template-item-selected')) {       // if the template already selected
    if ($('.result').length > 1) {
      changeTextFont();
      $('.result').last().remove();
      $('#background-images').last().remove();
    }
    else{
      $(".text-item").find('*').css('color', 'black');
      $(".text-item").css('color', 'black');
    }
  }
  else{
    // for (var i = 0; i < image_num; i++) {
    //   var img = document.createElement('img');
    //   img.src = image_src;
    //   background.appendChild(img);   //add images to canvas-center
    //   img.classList.add('background-selected');  // apply css
    // }
    set_template(description);
    if ($(".template-item-selected").length > 0) {        // if selection not the first one
      var template_content = $('#background-images').clone();
      // template_content.children().attr('src', image_src);
      $('.canvas-center').append(template_content);     // add template image
      var content_copy = $('.result').last().clone();
      content_copy.css('top', parseInt($('.result').last().css('top')) + parseInt(content_copy.height()) + 20 + 'px');
      content_copy.find(".text-item").find('*').css('font-family', font).css('color', 'white');
      content_copy.find(".text-item").css('font-family', font).css('color', 'white');  // change style of quotation 
      $('.result').last().after(content_copy);  // add content

      draggable();
      editable();
    }
    else{
      changeTextFont();
    }
  }  
}

function changeTextFont(){
  $(".text-item").find('*').css('font-family', font).css('color', 'white');
  $(".text-item").css('font-family', font).css('color', 'white');  // change style of quotation 
  // if (header.is(':has(*)') == true) {
  //   content = header.children();
  // }
  // else{
  //   content = header;
  // }
  // content.css('font-family', font);
}
