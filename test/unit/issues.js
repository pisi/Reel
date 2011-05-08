/**
 * .reel Unit Tests
 */
(function($){

  module('Issues', { teardown: function teardown(){
    $('.jquery-reel').trigger('teardown');
    $(document).unbind('tick.reel');
  }});

  test( 'GH-4 Proper background positioning range for stitched non-looping panoramas', function(){
    /* Github issue 4 bugfix
     * http://github.com/pisi/Reel/issues/#issue/4
     */
    expect($.browser.msie ? 4 : 2);
    var
      stitched= 1652,
      $pano= $('#stitched_nonlooping').reel({ stitched: stitched, loops: false }),
      travel= stitched - parseInt($pano.css('width'))

    $pano.trigger('frameChange', 1);
    if ($.browser.msie){
      // MSIE returns undefined backgroundPosition, so we need to check individual ones
      equiv($pano.css('backgroundPositionX'), '0px', 'Frame 1 (min, X)');
      equiv($pano.css('backgroundPositionY'), '0px', 'Frame 1 (min, Y)');
    }else{
      equiv($pano.css('backgroundPosition'), '0px 0px', 'Frame 1 (min)');
    }
    $pano.trigger('frameChange', 36);
    if ($.browser.msie){
      // MSIE returns undefined backgroundPosition, so we need to check individual ones
      equiv($pano.css('backgroundPositionX'), -travel+'px', 'Frame 36 (max, X)');
      equiv($pano.css('backgroundPositionY'), '0px', 'Frame 36 (max, Y)');
    }else{
      equiv($pano.css('backgroundPosition'), -travel+'px 0px', 'Frame 36 (max)');
    }
  });

  test( 'GH-6 Proper background positioning range for stitched looping panoramas', function(){
    /* Github issue 6 bugfix
     * http://github.com/pisi/Reel/issues/#issue/6
     */
    expect($.browser.msie ? 4 : 2);
    var
      stitched= 1652,
      $pano= $('#stitched_looping').reel({ stitched: stitched, loops: true }),
      travel= stitched

    $pano.trigger('frameChange', 1);
    if ($.browser.msie){
      // MSIE returns undefined backgroundPosition, so we need to check individual ones
      equiv($pano.css('backgroundPositionX'), '0px', 'Looping - frame 1 (min, X)');
      equiv($pano.css('backgroundPositionY'), '0px', 'Looping - frame 1 (min, Y)');
    }else{
      equiv($pano.css('backgroundPosition'), '0px 0px', 'Looping - frame 1 (min)');
    }
    $pano.trigger('frameChange', 36);
    if ($.browser.msie){
      // MSIE returns undefined backgroundPosition, so we need to check individual ones
      equiv($pano.css('backgroundPositionX'), -travel+'px', 'Looping - frame 36 (max, X)');
      equiv($pano.css('backgroundPositionY'), '0px', 'Looping - frame 36 (max, Y)');
    }else{
      equiv($pano.css('backgroundPosition'), -travel+'px 0px', 'Looping - frame 36 (max)');
    }
  });

  asyncTest( 'GH-11 First frame disappears after image sequence loading is complete', function(){
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

  asyncTest( 'GH-30 Broken "play" in IE', function(){
    /* Github issue 30 bugfix
     * http://github.com/pisi/Reel/issues/#issue/30
     * First of all, private `slidable` boolean flag leaked into global scope
     * and also caused Reel to throw JS errors.
     * Then adaptive ticker timeout sometimes went sub-zero causing IE to invalidate such `setTimeout` call
     * and thus effectively ceised the timer completely.
     * Another IE issue: broken image overlay in IE 7 or lower was caused by no support for "data:" protocol URLs,
     * so to workaround it a CDN-served blank image is be used instead.
     */
    expect(4);
    var
      $pano= $('#image').reel(),
      ticks= 0

    equal(typeof slidable, 'undefined', '`slidable` is undefined in the global scope');
    equal(typeof window.slidable, 'undefined', '`window.slidable` is also undefined');

    $(document).bind('tick.reel', function(){
      ticks++;
      if (ticks == 100){
        ok(true, 'Ticked 100 times - ticker runs ;)');

        var
          protocol= $('#image').attr('src').split(':')[0]

        if ($.browser.msie && +$.browser.version <= 7) equal(protocol, 'http', 'CDN-served transparent image.')
        else equal(protocol, 'data', 'Embedded transparent image.');

        start();
      }
    });
  });

  asyncTest( '`stage_pool` private variable leaked into global scope', function()
  {
    expect(1);

    var
      $reel= $('#image').reel()

    setTimeout(function(){
      ok( typeof stage_pool === 'undefined', 'No leaked `stage_pool` accessible in the global scope');
      start();
    }, 100)
  })

})(jQuery);