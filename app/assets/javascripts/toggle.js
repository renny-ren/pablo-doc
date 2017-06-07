$(function(){
  background = $('#background-images');
  header = $('#header');
  quotation = $('#quotation');
  bullet = $('#bullet');
  bold = $('#bold');
  result = $('.result').get(0);
  header_num = header.children().length;
  quotation_num = quotation.children().length;
  bullet_num = bullet.children().length;
  bold_num = bold.children().length;
  image_num =  header_num + quotation_num + bullet_num + bold_num;

  $('.text-toggle').click(function(){
    var text = document.getElementById(this.innerHTML.toLowerCase());
    var type = $(this).text().toLowerCase();

    if ($(this).hasClass('text-toggle-selected')) {
      eval(type + "_num" + '=' + 0);
    }
    else{
      eval(type + "_num" + '=' + type + '.children().length');
    }

    image_num =  header_num + quotation_num + bullet_num + bold_num;
    background.children().remove();     // remove all images from canvas-center

    for (var i = 0; i < image_num; i++) {
       background.append($($('.gallery-item-selected').children().get(0)).clone());   //add images to canvas-center
       $(background).children().last()
         .addClass('background-selected')  // apply css
         .removeAttr('height').removeAttr('width');        
     }
    rearrange();
    amendHeight();

    $(this).toggleClass('text-toggle-selected');
    $(text).toggle();
  });

  $('.gallery-item').click(function(){
    if ($(this).hasClass('gallery-item-selected')) {
      for (var i = 0; i < image_num; i++) {
        background.children().last().remove();           // remove images from canvas-center
      }

      $(this).removeClass('gallery-item-selected');     // unselect the image
      if ($(".gallery-item-selected").length > 0) {
        var i = 0;
        while(i < 4){
          $(result).children().last().remove();     // remove headers, quotes, bullets and bold from canvas-center
          i++;
        }  
      }
      else{
        resetPosition();
      }
    amendHeight();
    }
    else{
      for (var i = 0; i < image_num; i++) {
        var bg_img = $($(this).children().get(0)).clone();
        if ($(this).hasClass('blank-image')) {
          bg_img.css('display', 'block');
        }
        background.append(bg_img);   //add images to canvas-center
        $(background).children().last()
          .addClass('background-selected')  // apply css
          .removeAttr('height').removeAttr('width');        
      }

      rearrange();

      if ($(".gallery-item-selected").length > 0 || $(".template-item-selected").length > 0) {     // if select multiple images
        appendText(header.clone());
        appendText(quotation.clone());
        appendText(bullet.clone());
        appendText(bold.clone());

        draggable_editable();
      }

      $(this).addClass('gallery-item-selected');   // select the image
      amendHeight();
    }
  });
});

function amendHeight(){
  $(result).css('height', background.height() - 10 + "px");
  if (parseInt($(result).css('height')) < 100) {
    $(result).css('height', background.children().last().offset().top + 235 + 'px');
  }
}

function resetPosition(){
  for (var i = 0; i < header_num; i++) {
    $(header.children().get(i))
      .css('position', 'relative')
      .css('top', 0);
  }

  for (var i = 0; i < quotation_num; i++) {
    $(quotation.children().get(i))
      .css('position', 'relative')
      .css('top', 0);
  }

  for (var i = 0; i < bullet_num; i++) {
    $(bullet.children().get(i))
      .css('position', 'relative')
      .css('top', 0);
  }

  for (var i = 0; i < bold_num; i++) {
    $(bold.children().get(i))
      .css('position', 'relative')
      .css('top', 0);
  }
}

function appendText(obj){
  $(result).append(obj); 
  obj                                     //adjust position
    .css('position', 'relative')
    .css('top', $(result).height());
}

function rearrange(){
  header.children().css('position', 'absolute');
  quotation.children().css('position', 'absolute');
  bullet.children().css('position', 'absolute');
  bold.children().css('position', 'absolute');
  j = 0;

  for (var i = 0; i < header_num; j = i + 1, i++) {
    header.children().get(i).style.top = background.children().get(i).offsetTop - 60 + 'px';
  }

  for (var i = 0; i < quotation_num; i++, j++) {
    quotation.children().get(i).style.top = background.children().get(j).offsetTop - 60 + 'px';
  }

  for (var i = 0; i < bullet_num; i++, j++) {
    bullet.children().get(i).style.top = background.children().get(j).offsetTop - 60 + 'px';
  }

  for (var i = 0; i < bold_num; i++, j++) {
    bold.children().get(i).style.top = background.children().get(j).offsetTop - 60 + 'px';
  }
}
