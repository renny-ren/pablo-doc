$(function(){
  draggable_editable();
});

function draggable_editable(){
  $(".draggable")
    .draggable({
      // drag: function(){
      //   // $('#hor_line').hide();
      //   // if ($.inArray(this.style.top, arr) != -1){
      //   //   $('#hor_line').show();
      //   // }
      //  // alert(parseInt(this.style.left) + $(this).width()/2);
      //  $('.vertical_line').hide();
      //  var tmp = parseInt(this.style.left) + $(this).width()/2;
      //   if ( tmp > 252 && tmp < 255 ) {
      //     $('.vertical_line').show();
      //   }
      // },
      // stop: function(){
      //   $('.vertical_line').hide();
      // },
      cursor: "move"
      // containment: '.result'
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