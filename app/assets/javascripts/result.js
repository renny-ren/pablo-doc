$(function(){
  toolbar = document.getElementById('toolbar');
}); 

function select_element(obj){
  // toolbar.style.display = "block";
  // toolbar.style.top = getComputedStyle(obj, null).top;
  // toolbar.style.left = parseInt(getComputedStyle(obj, null).left.replace(/[^0-9]/ig,"")) + 15 + "px";
  obj.id = 'item-selected';

  $("#item-selected").blur(function(){
    $(this).removeAttr('id');
    // toolbar.style.display = "none";
  });
}

function delete_element(){
  document.getElementById('item-selected').id = 'item-deleted';
  $('#toolbar').hide();
  refresh_trash(); 
}

function refresh_trash(){
  var trash = document.getElementById('trash');
  var deleted = document.getElementById('item-deleted');
  deleted.classList.add('item-deleted');
  trash.appendChild(deleted.cloneNode(true));   // add to trash
  deleted.parentNode.removeChild(deleted);  //remove original one
}
