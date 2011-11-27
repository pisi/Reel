/**
 * .reel Unit Tests
 */
(function($){

  module('Selector', reel_test_module_routine);

  test( 'Does not accept image tag without source', function()
  {
    expect(1);
    var selector= '#image_no_src',
        $reel= $(selector).reel();
    equal( $reel.length, 0);
  });
  test( 'Does not accept image tag with empty source', function()
  {
    expect(1);
    var selector= '#image_empty_src',
        $reel= $(selector).reel();
    equal( $reel.length, 0);
  });
  test( 'Accepts only valid image tags from a multi-selector', function()
  {
    expect(1);
    var selector= '#image, #image_empty_src, #image2, #image_width_only',
        $reel= $(selector).reel();
    equal( $reel.length, 3);
  });
  test( 'Accepts image tag with one dimension missing', function()
  {
    expect(2);
    var
      $reel= $('#image_width_only').reel();
    equal( $reel.length, 1);
    var
      $reel= $('#image_height_only').reel();
    equal( $reel.length, 1);
  });
  test( 'Accepts image tag without dimensions', function()
  {
    expect(1);
    var
      $reel= $('#image_no_dimensions').reel();
    equal( $reel.length, 1);
  });
  test( 'Does not accept non-image tag (like DIV)', function()
  {
    expect(1);
    var selector= '#non_image',
        $reel= $(selector).reel();
    equal( $reel.length, 0);
  });
  test( 'Accepts ONLY proper image tag with dimensions', function()
  {
    expect(1);
    var selector= '#image',
        $reel= $(selector).reel();
    equal( $reel.length, 1);
  });
  test( 'Accepts image tag with dimensions set in CSS, not in HTML', function()
  {
    expect(1);
    var selector= '#image_css_dimensions',
        $reel= $(selector).reel();
    equal( $reel.length, 1);
  });
  test( 'Returns proper "reel"-classed elements in the resulting jQuery', function()
  {
    expect(1);
    var selector= '#image',
        $reel= $(selector).reel();
    equal( $reel.hasClass('reel'), true, 'Returned element has a proper class name');
  });

})(jQuery);
