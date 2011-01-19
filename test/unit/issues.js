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
		expect(2);
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
		expect(2);
    var
      stitched= 1652,
      $pano= $('#stitched_looping').reel({ stitched: stitched, loops: true }),
      travel= stitched

    $pano.trigger('frameChange', 1);
    equal($pano.css('backgroundPosition'), '0px 0px', 'Looping - frame 1 (min)');
    $pano.trigger('frameChange', 36);
    equal($pano.css('backgroundPosition'), -travel+'px 0px', 'Looping - frame 36 (max)');
  });

  asyncTest( 'GH-11 Proper background positioning range for stitched looping panoramas', function(){
    /* Github issue 11 bugfix
     * http://github.com/pisi/Reel/issues/#issue/11
     * Replacement of original image source with embedded transparent sprite
     * can not happen when using `images` option
     */
		expect(1);
    var
      $pano= $('#sequence').reel({
        footage:  10,
        cw:       true,
        orbital:  3,
        inversed: true,
        path:     'samples/phone/',
        images:   phone_frames(20)
      })

    $pano.bind('loaded', function(){
      equal($pano.attr('src'), 'samples/phone/01.png', 'Image is from the sequence');
      start();
    });

    /*
      Borrowed from test/sampler.html
    */
    function phone_frames(frames){
      var every= 1, stack= []
      for(var i= 1; i <= frames; i+= every){
        var name= [i, '.png'].join('')
        while (name.length < 6) name= '0'+name
        stack.push(name)
      }
      return stack
    }
  });

})(jQuery);