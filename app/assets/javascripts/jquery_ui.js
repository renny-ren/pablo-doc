$(function(){
  draggable();
  editable();
});

function draggable(){
  $(".draggable").draggable({
    drag: function(){
      // $('#hor_line').hide();
      // if ($.inArray(this.style.top, arr) != -1){
      //   $('#hor_line').show();
      // }
     // alert(parseInt(this.style.left) + $(this).width()/2);
     $('.vertical_line').hide();
     var tmp = parseInt(this.style.left) + $(this).width()/2;
      if ( tmp > 252 && tmp < 255 ) {
        $('.vertical_line').show();
      }
    },
    stop: function(){
      $('.vertical_line').hide();
    },
    cursor: "move",
    containment: '.canvas-center'
  })

  $('.ui-wrapper').draggable({
    cursor: "move",
    axis: "x",
    containment: '.canvas-center',
    cancel: '.logo-item'
  })
};

function editable(){
  $(".draggable")
    .click(function(){
      if ( $(this).is('.ui-draggable-dragging') ) {
        return;
      }
      $(this).draggable("option", "disabled", true);
      $(this).attr('contenteditable', true);
    })

    .blur(function(){
      $(this).draggable('option', 'disabled', false);
      $(this).attr('contenteditable', false);
    })
}

function resizable(){
  $('.resizable-tall').resizable({
    minHeight: 725,
    minWidth: 1024,
    maxHeithgt: 800,
    maxWidth: 1200
  });

  $('.resizable-square').resizable({
    minHeight: 484,
    minWidth: 760,
    maxHeithgt: 762,
    maxWidth: 1160
  });

  $('.resizable-wide').resizable({
    minHeight: 242,
    minWidth: 488,
    maxHeithgt: 600,
    maxWidth: 1000
  });

  $('.resizable-logo').resizable({
    minHeight: 10,
    minWidth: 10,
    maxHeithgt: 760,
    maxWidth: 500
  });

  $('.resizable-text').resizable({
    handles: "w, e"
  });
}