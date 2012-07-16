/**
 * .reel Unit Tests
 */
(function($){

  module('Options', reel_test_module_routine);

  $.each({
    'no revolution set': {
      options: {},
      hor: 552, // 2 * 276 (width)
      ver: 0
    },
    'no revolution set for stitched pano': {
      options: {
        stitched: 1000
      },
      hor: 500, // 1000 / 2
      ver: 0
    },
    'numeric revolution': {
      options: {
        revolution: 200
      },
      hor: 200,
      ver: 0
    },
    'object notation with `x` axis': {
      options: {
        revolution: { x: 200 }
      },
      hor: 200,
      ver: 0
    },
    'object notation with both axes for a single-row movie': {
      options: {
        revolution: { x: 200, y: 300 }
      },
      hor: 200,
      ver: 0 // Single-rows don't have vertical revolution despite being set in options
    },
    'object notation with both axes for a multi-row movie': {
      options: {
        rows: 5,
        revolution: { x: 200, y: 300 }
      },
      hor: 200,
      ver: 300
    },
    'object notation with just the `y` axis': {
      options: {
        rows: 2,
        revolution: { y: 300 }
      },
      hor: 552, // Default revolution of twice the width
      ver: 300
    }
  }, function(name, def){
    test( '`revolution` option: '+name+'', function(){
      expect( 2 );
      var
        $pano= $('#image').reel(def.options)

      equal( $pano.reel('revolution'), def.hor );
      equal( $pano.reel('revolution_y'), def.ver );
    });
  })

})(jQuery);
