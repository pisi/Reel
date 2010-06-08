/**
 * .reel Unit Tests
 */
(function($){

  module('Issues', { teardown: function teardown(){
    $('.jquery-reel').trigger('teardown');
  }});

  test( 'GH-4 Proper background positioning range for stitched non-looping panoramas', function(){
    /* Github issue 4 bugfix
     * http://github.com/pisi/Reel/issues/#issue/4
     */
    var
      stitched= 1652,
      $pano= $('#stitched_nonlooping').reel({ stitched: stitched, loops: false }),
      travel= stitched - parseInt($pano.css('width'))

    $pano.trigger('frameChange', 1);
    equal($pano.css('backgroundPosition'), '0px 0px', 'Frame 1 (min)');
    $pano.trigger('frameChange', 36);
    equal($pano.css('backgroundPosition'), -travel+'px 0px', 'Frame 36 (max)');
  });

  test( 'GH-6 Proper background positioning range for stitched looping panoramas', function(){
    /* Github issue 6 bugfix
     * http://github.com/pisi/Reel/issues/#issue/6
     */
    var
      stitched= 1652,
      $pano= $('#stitched_looping').reel({ stitched: stitched, loops: true }),
      travel= Math.round(stitched - stitched / 36)

    $pano.trigger('frameChange', 1);
    equal($pano.css('backgroundPosition'), '0px 0px', 'Looping - frame 1 (min)');
    $pano.trigger('frameChange', 36);
    equal($pano.css('backgroundPosition'), -travel+'px 0px', 'Looping - frame 36 (max)');
  });

})(jQuery);