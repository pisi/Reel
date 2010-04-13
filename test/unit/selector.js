/**
 * .reel Unit Tests
 */
(function($){

  module('Selector');

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
  test( 'Accepts image tag with dimensions set in CSS, not in HTML', function()
  {
    var selector= '#image_no_dimensions',
        $reel= $(selector).reel();
    equal( $reel.length, 1);
  });
  test( 'Does not accept non-image tag (like DIV)', function()
  {
    var selector= '#non_image',
        $reel= $(selector).reel();
    equal( $reel.length, 0);
  });
  test( 'Accepts ONLY proper image tag', function()
  {
    var selector= '#image',
        $reel= $(selector).reel();
    equal( $reel.length, 1);
  });

})(jQuery);