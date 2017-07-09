$(function(){
  if (localStorage.getItem("content_generated") == 1){
    $('.options-bar').show();
    $('.type-box').css('left', '100px').hide();
    $('.url-bar').css('left', '100px').css('margin-left', '10px').hide();
    $('.option-item-images').addClass('option-item-selected');
    $('.canvas-center').addClass('canvas-center-leftbar');
    $('.reload-gallery').show();
    localStorage.removeItem("content_generated");
  }

  $('.image-extra-options, .image-sizes, .image-filters, .reload-gallery').mouseleave(function(){
    $(this).fadeOut();
    $('.option-item-selected').removeClass('option-item-selected');
    if ($('.selected').length > 0 && $($('.option-item-select').children().last()).text() == "Cancel"){
      $('.option-item-select').addClass('option-item-selected');
    }
    $('.canvas-center-leftbar').removeClass('canvas-center-leftbar');
  });

  $('.option-item')
    .hover(function(){
      $(this).toggleClass('option-item-hover');
    })
    .click(function(){
      if ($(this).hasClass('option-item-selected')) {
        $(this).removeClass('option-item-selected');
        $('.canvas-center').removeClass('canvas-center-leftbar');
      }
      else{
        $('.option-item-selected').removeClass('option-item-selected');
        $(this).addClass('option-item-selected');
        $('.canvas-center').addClass('canvas-center-leftbar');
        if ($(this).hasClass('option-item-crop')) {
          $('.canvas-center').removeClass('canvas-center-leftbar');
        }
        hideOthers();
      }
    });

  $('.generate-btn').click(function(){
    localStorage.setItem("content_generated", 1);
  });

  $('.option-item-content').click(function(){
    $('.type-box').toggle();
    $('.url-bar').toggle();
    if ($('.canvas-center').hasClass('canvas-center-leftbar')){
      $("#goTopBtn").trigger('click');
    }
  });

  $('.option-item-text').click(function(){
    $('.image-extra-options').toggle();
  });

  $('.option-item-images').click(function(){
    $('.reload-gallery').toggle();
  });

  $('.option-item-select').click(function(){
    $('.canvas-center').removeClass('canvas-center-leftbar');

    if ($($(this).children().last()).text() == "Select"){
      $(this).children().last().text("Cancel");
    }
    else{
      $(this).children().last().text("Select");
    }
    if (flag == 0) {
      alert("Now you can click on the image to select it, then you can crop or change their size, filter.");
      flag = 1;
    }
    $('.background-selected').toggleClass('selectable');
    $('.ui-wrapper').toggleClass('selectable');
    $('.selected').removeClass('selected');

    // if ($('.selectable').parent().hasClass('ui-wrapper')) {
    //   $('.selectable')
    //     .css('position', 'relative')
    //     .css('left', $('.selectable').parent().css('left'));
    // }

    msg_flag = -1;
  });

  $('.option-item-sizes').click(function(){
    $('.image-sizes').toggle();
  });

  $('.option-item-filters').click(function(){
    $('.image-filters').toggle();
  });

  $('.option-item-logo').click(function(){
    $('.image-logo').toggle();
  });

  $('.option-item-clear').click(function(){
    $('.canvas-center').removeClass('canvas-center-leftbar');
    $(this).removeClass('option-item-selected');
    if(confirm("This operation will delete all the current images, are you sure?")){
      if ($(".gallery-item-selected").length >= 2) {
        for (var i = 0; i < $('.gallery-item-selected').length - 1; i++){
          var j = 0;
          while(j < 4){
            $(result).children().last().remove();     // remove all texts
            j++;
          }
        }
      }
      background.empty();  // remove all images
      $('.gallery-item-selected').removeClass('gallery-item-selected');
      amendHeight();
    };
  });

  $('.image-sizes-item').click(function(){
    $('.image-sizes-item-selected').removeClass('image-sizes-item-selected');
    $(this).addClass('image-sizes-item-selected');
  });

  var deg = 0;
  $('.image-filters-selector').click(function(){
    deg = (deg+180)%360;
    $('.filter-arrow').css('transform', 'rotate(' + deg + 'deg)');
    $('.image-filters-list').toggle();
  });

  $('.image-filters-reset').click(function(){
    $('.background-selected').removeAttr('style');
    $('.image-filters-selector').children().get(0).className = 'filter-icon filter-none';
    $($('.image-filters-selector').children().get(1)).html('None');
  })

  $('.image-filters-option, .size-option, .change-font').hover(
    function(){
      $(this).css('background', 'aliceblue');
    },
    function(){
      $(this).css('background', 'none');
    }
  )

  $('.image-filters-option').click(function(){
      $('.image-filters-list').hide();
      $('.image-filters-selector').children().get(0).className = $(this).children().get(0).className;
      $($('.image-filters-selector').children().get(1)).html($($(this).children().get(1)).html());
      deg = (deg+180)%360;
      $('.filter-arrow').css('transform', 'rotate(' + deg + 'deg)');
    });

  $('.tall').click(function(){
    changeOptionSize('size-tall', 'canvas-tall');
  });

  $('.square').click(function(){
    changeOptionSize('size-square', 'canvas-square');
  });

  $('.wide').click(function(){
    changeOptionSize('size-wide', 'canvas-wide');
  });

  $('.none').click(function(){
    $('.background-selected').removeAttr('style');
  })

  $('.light-contrast').click(function(){
    addFilter("contrast(0.6)");
  });

  $('.heavy-contrast').click(function(){
    addFilter("contrast(0.2)");
  });

  $('.light-blur').click(function(){
    addFilter("contrast(0.9) blur(1px)");
  });

  $('.heavy-blur').click(function(){
    addFilter("contrast(0.8) blur(3px)");
  });

  $('.sepia').click(function(){
    addFilter("sepia(1)");
  });

  $('.saturate').click(function(){
    addFilter("saturate(1.5)");
  });

  $('.grayscale').click(function(){
    addFilter("grayscale(1)");
  });

  $('.blur-grayscale').click(function(){
    addFilter('blur(1px) grayscale(1)');
  });

  $('.opacity').click(function(){
    addFilter('opacity(0.6)');
  });

  $('body').on('mouseenter', '.logo-item', function(){
    $(this).css('margin', 0);
    draggable();
    resizable();
  });

  $('body').on('click', '.logo-remove', function(){
    $(".logo-item").remove();
  });

  $('body').on('mouseenter', '.logo-info', function(){
    $(".logo-notice").show();
  });

  $('body').on('mouseleave', '.logo-info', function(){
    $(".logo-notice").hide();
  });
});

function addFilter(filter){
  if ($('.background-selected').hasClass('selected') == false){
    $('.background-selected').css('filter', filter);
  }
  else{
    $('.selected').css('filter', filter);
  }
}

function changeOptionSize(size, canvasSize){
  if ($('.background-selected').hasClass('selected') == false){
    $('.background-selected').removeClass('size-tall size-square size-wide');
    $('.background-selected').addClass(size);
    $('.image-canvas').removeClass('canvas-tall canvas-square canvas-wide');
    $('.image-canvas').addClass(canvasSize);
  }
  else{
    $('.selected').removeClass('size-tall size-square size-wide');
    $('.selected').addClass(size);
  }
  rearrange();
}

function hideOthers(){
  $('.share-button').hide();
  $('.buffer-button').hide();
  $('.download-button').hide();
  $('.type-box').hide();
  $('.url-bar').hide();
  $('.image-extra-options').hide();
  $('.reload-gallery').hide();
  $('.image-sizes').hide();
  $('.image-filters').hide();
  $('.image-logo').hide();
}