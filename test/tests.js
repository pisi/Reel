/**
 * .reel Unit Test
 */
(function($){


  QUnit.done = function(failures, total, config) {
    if (failures){
      $('body').addClass('failure');
    }
  }


})(jQuery);
