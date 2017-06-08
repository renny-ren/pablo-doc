$(function(){
  toolbar = document.getElementById('toolbar');

  $('.share-download').click(function(){
    // alert("Under developing...");
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

  $('.size-20').click(function(){
    changeSize('20px');
  });

  $('.size-24').click(function(){
    changeSize('24px');
  });

  $('.size-28').click(function(){
    changeSize('28px');
  });

  $('.size-32').click(function(){
    changeSize('32px');
  });

  $('.size-36').click(function(){
    changeSize('36px');
  });

  $('#change-italic').click(function(){
    if ($('#item-selected').css('font-style') != 'italic') {
      $('#item-selected').css('font-style', 'italic');
    }
    else{
      $('#item-selected').css('font-style', 'normal');
    }
  });

  $('#change-weight').click(function(){
    var text = $('#item-selected').children().get(0);
    if ($(text).css('font-weight') == 700) {
      $(text).css('font-weight', 'normal');
    }
    else{
      $(text).css('font-weight', 'bold');
    }
  });

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
    deg = (deg+180)%360;
    $('.change-font-arrow').css('transform', 'rotate(' + deg + 'deg)');
  });

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
}); 

function changeSize(size){
  var text = $('#item-selected').children().get(0);
  $(text).css('font-size', size);
  $('.size-menu').hide();
}

function changeColor(color){
  var text = $('#item-selected');
  $(text).css('color', color);
  $('#change-color').css('background', color);
  $('.color-menu').hide();
}

function changeFont(obj){
  var text = $('#item-selected').children().get(0);
    $(text).css('font-family', obj);
    $($('.font-name'))
      .html(obj)
      .css('font-family', obj);
}

function select_element(obj){
  $('#item-selected').removeAttr('id');
  toolbar.style.display = 'block';
  // toolbar.style.top = getComputedStyle(obj, null).top;
  toolbar.style.top = obj.offsetTop - 40 + obj.parentNode.offsetTop + 'px';
  // toolbar.style.left = parseInt(getComputedStyle(obj, null).left.replace(/[^0-9]/ig,"")) + 15 + "px";
  toolbar.style.left = obj.offsetLeft + 40 + "px";
  obj.id = 'item-selected';
  obj.style.border = 'dotted 2px #168EEA';

  $("#item-selected").blur(function(){
    $(this).removeAttr('id');
    this.style.border = 'none';
    toolbar.style.display = 'none';
  });
}

function delete_element(){
  // document.getElementById('item-selected').id = 'item-deleted';
  $('#toolbar').hide();
  $('#item-selected').hide();
  // refresh_trash(); 
}

// function refresh_trash(){
//   var trash = document.getElementById('trash');
//   var deleted = document.getElementById('item-deleted');
//   deleted.classList.add('item-deleted');
//   trash.appendChild(deleted.cloneNode(true));   // add to trash
//   deleted.parentNode.removeChild(deleted);  //remove original one
// }
