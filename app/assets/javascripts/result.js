$(function(){
  toolbar = document.getElementById('toolbar');

  $('.share-download').click(function(){
    // alert("Under developing...");
  });

  $('#change-size').click(function(){
    var text = $('#item-selected').children().get(0);
    var fontSize = parseInt($(text).css('font-size'));
    var unit = $(text).css('font-size').slice(-2);

    if (fontSize < 36 && unit == 'px') {
      $(text).css('font-size', fontSize + 4 + unit);
    }
    else {
      $(text).css('font-size', '12px');
    }
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
    var text = $('#item-selected');
    $(text).css('color', 'white');
    $('#change-color').css('background', 'white');
    $('.color-menu').hide();
  });

  $('.color-black').click(function(){
    var text = $('#item-selected');
    $(text).css('color', 'black');
    $('#change-color').css('background', 'black');
    $('.color-menu').hide();
  });

  var deg = 0;
  $('#change-font').click(function(){
    $('.font-menu').toggle();
    deg = (deg+180)%360;
    $('.change-font-arrow').css('transform', 'rotate(' + deg + 'deg)');
  });


  $('.font-1').click(function(){
    $('.font-menu').hide();

  });
}); 

function select_element(obj){
  $('#item-selected').removeAttr('id');
  toolbar.style.display = 'block';
  // toolbar.style.top = getComputedStyle(obj, null).top;
  toolbar.style.top = obj.offsetTop - 40 + obj.parentNode.offsetTop + 'px';
  // toolbar.style.left = parseInt(getComputedStyle(obj, null).left.replace(/[^0-9]/ig,"")) + 15 + "px";
  toolbar.style.left = obj.offsetLeft + 130 + "px";
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
