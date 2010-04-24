/**
 * .reel Unit Tests
 */
(function($){

  module('Selector', { teardown: function teardown(){
    $('.jquery-reel').trigger('teardown');
  }});

  test( 'Does not accept image tag without source', function()
  {
    var selector= '#image_no_src',
        $reel= $(selector).reel();
    equal( $reel.length, 0);
  });
  test( 'Does not accept image tag with empty source', function()
  {
    var selector= '#image_empty_src',
        $reel= $(selector).reel();
    equal( $reel.length, 0);
  });
  test( 'Accepts only valid image tags from a multi-selector', function()
  {
    var selector= '#image, #image_empty_src, #image2, #image_width_only',
        $reel= $(selector).reel();
    equal( $reel.length, 2);
  });
  test( 'Does not accept image tag with one dimension missing', function()
  {
    var
      $reel= $('#image_width_only').reel();
    equal( $reel.length, 0);
    var
      $reel= $('#image_height_only').reel();
    equal( $reel.length, 0);
  });
  test( 'Does not accept image tag without dimensions', function()
  {
    var
      $reel= $('#image_no_dimensions').reel();
    equal( $reel.length, 0);
  });
  test( 'Does not accept non-image tag (like DIV)', function()
  {
    var selector= '#non_image',
        $reel= $(selector).reel();
    equal( $reel.length, 0);
  });
  test( 'Accepts ONLY proper image tag with dimensions', function()
  {
    var selector= '#image',
        $reel= $(selector).reel();
    equal( $reel.length, 1);
  });
  test( 'Accepts image tag with dimensions set in CSS, not in HTML', function()
  {
    var selector= '#image_css_dimensions',
        $reel= $(selector).reel();
    equal( $reel.length, 1);
  });
  test( 'Returns proper "jquery-reel"-classed elements in the resulting jQuery', function()
  {
    var selector= '#image',
        $reel= $(selector).reel();
    equal( $reel.hasClass('jquery-reel'), true, 'Returned element has a proper class name');
  });

})(jQuery);