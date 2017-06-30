$(function(){
  if (localStorage.getItem("content_generated") == 1){
    $('.options-bar').show();
    $('.type-box').css('left', 0).hide();
    $('.url-bar').css('left', 0).css('margin-left', '10px').hide();
    $('.option-item-images').addClass('option-item-selected');
    $('.canvas-center').addClass('canvas-center-leftbar');
    $('.reload-gallery').show();
    localStorage.removeItem("content_generated");
  }

  $('.option-item')
    .hover(function(){
      $(this).toggleClass('option-item-hover');
    })
    .click(function(){
      $('.canvas-center').toggleClass('canvas-center-leftbar');
    });

  $('.generate-btn').click(function(){
    localStorage.setItem("content_generated", 1);
  });

  $('.option-item-content').click(function(){
    $(this).toggleClass('option-item-selected');
    $('.type-box').toggle();
    $('.url-bar').toggle();
  });

  $('.option-item-text').click(function(){
    $(this).toggleClass('option-item-selected');
    $('.image-extra-options').toggle();
  });

  $('.option-item-images').click(function(){
    $(this).toggleClass('option-item-selected');
    $('.reload-gallery').toggle();
  });

  $('.option-item-sizes').click(function(){
    $(this).toggleClass('option-item-selected');
    $('.image-sizes').toggle();
  });

  $('.option-item-filters').click(function(){
    $(this).toggleClass('option-item-selected');
    $('.image-filters').toggle();
  });

  $('.option-item-logo').click(function(){
    $(this).toggleClass('option-item-selected');
    $('.image-logo').toggle();
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
    changeOptionSize('size-tall');
  });

  $('.square').click(function(){
    changeOptionSize('size-square');
  });

  $('.wide').click(function(){
    changeOptionSize('size-wide');
  });

  $('.none').click(function(){
    $('.background-selected').removeAttr('style');
  })

  $('.light-contrast').click(function(){
    // $('.background-selected').removeAttr('id');
    // $('.background-selected').id = 'background-light-contrast';
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

function changeOptionSize(size){
  if ($('.background-selected').hasClass('selected') == false){
    $('.background-selected').removeClass('size-tall size-square size-wide');
    $('.background-selected').addClass(size);
  }
  else{
    $('.selected').removeClass('size-tall size-square size-wide');
    $('.selected').addClass(size);
  }
  rearrange();
}