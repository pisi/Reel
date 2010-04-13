/**
 * .reel Unit Tests
 */
(function($){

  module('API');

  test( 'Exposed publicly as jQuery.fn.reel', function()
  {
    ok( $.fn.reel!==undefined );
    ok( $.reel===undefined );
  });

})(jQuery);