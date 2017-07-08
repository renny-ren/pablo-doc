$(function(){
  setInterval(function(){
    if ($('#header').children().length > 1 && background.children().length == 0){
      rearrange();
      clearInterval();
    }
   }, 1000);
  toolbar = document.getElementById('toolbar');

  $('body').on('click', '.text-item', function(){
    select_element(this);
  });

  $('#change-size').click(function(){
    $('.size-menu').toggle();
  });

  $('.size-12').click(function(){
    changeSize('12px');
  });

  $('.size-16').click(function(){
    changeSize('16px');
  });

  $('.size-24').click(function(){
    changeSize('24px');
  });

  $('.size-32').click(function(){
    changeSize('32px');
  });

  $('.size-36').click(function(){
    changeSize('36px');
  });

  $('.size-40').click(function(){
    changeSize('40px');
  });

  $('.size-45').click(function(){
    changeSize('45px');
  });

  $('#change-italic').click(function(){
    getText();
    $(text).toggleClass('font-italic');
  });

  $('#change-weight').click(function(){
    getText();
    $(text).toggleClass('font-bold');
  });

  $('#change-align').click(function(){
    getText();
    var data = $(this).data('data') || 1 
    switch(data){
      case 1:
        $(text).css('text-align', 'center');
        $(this).html('<i class="fa fa-align-center"></i>');
        break;
      case 2:
        $(text).css('text-align', 'right');
        $(this).html('<i class="fa fa-align-right"></i>');
        break;
      case 3:
        $(text).css('text-align', 'left');
        $(this).html('<i class="fa fa-align-left"></i>');
        break;
    }
    data++;
    if (data > 3) data = 1;
    $(this).data('data', data);
  })

  $('#change-color').click(function(){
    $('.color-menu').toggle();
  });

  $('.color-white').click(function(){
    changeColor('white');
  });

  $('.color-black').click(function(){
    changeColor('black');
  });

  $('.color-blue').click(function(){
    changeColor('#3498DB');
  }); 

  $('.color-green').click(function(){
    changeColor('#2ECC71');
  }); 

  $('.color-gray').click(function(){
    changeColor('#808080');
  }); 

  $('.color-purple').click(function(){
    changeColor('#9B59B6');
  }); 

  $('.color-red').click(function(){
    changeColor('#E74C3C');
  }); 

  $('.color-yellow').click(function(){
    changeColor('#F1C40F');
  }); 

  $('.color-aqua').click(function(){
    changeColor('#00ffff');
  }); 

  $('.color-darkorange').click(function(){
    changeColor('#ff8c00');
  }); 

  var deg = 0;
  $('.change-font').click(function(){
    $('.font-menu').toggle();
    deg = (deg + 180) % 360;
    $('.change-font-arrow').css('transform', 'rotate(' + deg + 'deg)');
  })

  $('.font-Vibur').click(function(){
    changeFont('Vibur');
  });

  $('.font-Satisfy').click(function(){
    changeFont('Satisfy');
  });

  $('.font-PermanentMarker').click(function(){
    changeFont('Permanent Marker');
  });

  $('.font-Pacifico').click(function(){
    changeFont('Pacifico');
  });

  $('.font-Oswald').click(function(){
    changeFont('Oswald');
  });

  $('.font-Mogra').click(function(){
    changeFont('Mogra');
  });

  $('.font-MarckScript').click(function(){
    changeFont('Marck Script');
  });

  $('.font-DancingScript').click(function(){
    changeFont('Dancing Script');
  });

  $('.font-Lobster').click(function(){
    changeFont('Lobster');
  });

  $('.font-Lato').click(function(){
    changeFont('Lato');
  });

  $('#delete').click(function(){
    blur_flag = 1;
    $("#item-selected").trigger('blur');
  });
}); 

function getText(){
  if ($('#item-selected').parent().attr('id') == 'header'){
    text = $('#item-selected').children();
  }
  else{
    text = $('#item-selected');
  }
  // if ($('#item-selected').is(':has(*)') == true) {
  //   text = $('#item-selected').children().get(0);
  // }
  // else{
  //   text = $('#item-selected');
  // }
}

function changeSize(size){
  getText();
  $(text).css('font-size', size);
  $('.size-menu').hide();
}

function changeColor(color){
  getText();
  $(text).css('color', color);
  $('#change-color').css('background', color);
  $('.color-menu').hide();
}

function changeFont(obj){
  getText();
  $(text).css('font-family', obj);
  $($('.font-name'))
    .html(obj)
    .css('font-family', obj);
}

function select_element(obj){
  if ( $('#item-selected').length > 0 ) {
    $('.ui-resizable-e').removeClass('ui-resizable-e');
    $('.ui-resizable-w').removeClass('ui-resizable-w');
    $('.resizable-text').removeClass('resizable-text');
    $('#item-selected').attr('id', localStorage.getItem("original_id"));
  }
  // $(obj).css('position', 'relative');
  $(obj).addClass('resizable-text');
  resizable();
  localStorage.setItem("original_id", obj.id);
  obj.id = 'item-selected';

  toolbar.style.display = 'block';
  toolbar.style.top = obj.offsetTop + 20 + 'px';
  if ($('.canvas-center').hasClass('canvas-center-leftbar')){
    var tmp = 200;
  }
  else{
    var tmp = 0;
  }
  toolbar.style.left = obj.offsetLeft + 110 + tmp + 'px';
  blur_flag = 1;

  $('#toolbar').mousedown(function(){
    blur_flag = 0;
  });

  $("#item-selected").blur(function(){
    if (blur_flag == 1) {
      $(this).attr('id', localStorage.getItem("original_id"));
      this.style.border = 'none';
      toolbar.style.display = 'none';
      $('.ui-resizable-e').removeClass('ui-resizable-e');
      $('.ui-resizable-w').removeClass('ui-resizable-w');
      $(this).removeClass('resizable-text');
      $(this).css('position', 'absolute');
    }
  });

  $('body').click(function(){
    blur_flag = 1;
  });
}

// function delete_element(){
//   $('#toolbar').hide();
//   $('#item-selected').remove();
//   getQuantity();
//   // document.getElementById('item-selected').id = 'item-deleted';
//   // refresh_trash(); 
// }

// function refresh_trash(){
//   var trash = document.getElementById('trash');
//   var deleted = document.getElementById('item-deleted');
//   deleted.classList.add('item-deleted');
//   trash.appendChild(deleted.cloneNode(true));   // add to trash
//   deleted.parentNode.removeChild(deleted);  //remove original one
// }
