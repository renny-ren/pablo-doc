$(function(){
  draggable_editable();
});

function draggable_editable(){
  $(".draggable")
    .draggable({
      cursor: "move",
      containment: '.result'
    })

    .click(function(){
      if ( $(this).is('.ui-draggable-dragging') ) {
        return;
      }
      $(this).draggable("option", "disabled", true );
      $(this).attr('contenteditable', true);
    })

    .blur(function(){
      $(this).draggable('option', 'disabled', false);
      $(this).attr('contenteditable', false);
    })
}