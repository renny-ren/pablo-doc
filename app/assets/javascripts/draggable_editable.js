$(function() {
  $(".draggable")
    .draggable()
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
});