$(function(){
  toolbar = document.getElementById('toolbar');
  header_num = $('#header').children().length;
  quotation_num = $('#quotation').children().length;
  bullet_num = $('#bullet').children().length;
  bold_num = $('#bold').children().length;
  image_num =  header_num + quotation_num + bullet_num + bold_num;


  $('.share-download').click(function(){
    alert("Under developing...");
  })
}); 

function select_element(obj){
  $('#item-selected').removeAttr('id');
  toolbar.style.display = 'block';
  // toolbar.style.top = getComputedStyle(obj, null).top;
  toolbar.style.top = obj.offsetTop - 30 + obj.parentNode.offsetTop + 'px';
  // toolbar.style.left = parseInt(getComputedStyle(obj, null).left.replace(/[^0-9]/ig,"")) + 15 + "px";
  toolbar.style.left = obj.offsetLeft + 120 + "px";
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

function change_color(){
  item = document.getElementById('item-selected');
  if(item.style.color == 'white'){
    item.style.color = 'black';
  }
  else{
    item.style.color = 'white';
  }
}

function change_weight(){
  var text = $('#item-selected').children().get(0);
  if ($(text).css('font-weight') == 700) {
    $(text).css('font-weight', 'normal');
  }
  else{
    $(text).css('font-weight', 'bold');
  }
}


// function refresh_trash(){
//   var trash = document.getElementById('trash');
//   var deleted = document.getElementById('item-deleted');
//   deleted.classList.add('item-deleted');
//   trash.appendChild(deleted.cloneNode(true));   // add to trash
//   deleted.parentNode.removeChild(deleted);  //remove original one
// }
