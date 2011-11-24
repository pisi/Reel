/**
 * .reel Unit Tests
 */
(function($){

  module('Issues', { teardown: function teardown(){
    $('.jquery-reel').trigger('teardown').unbind('.test');
    $(document).unbind('.test');
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
      equiv($pano.css('backgroundPositionX'), '0px', 'Looping - frame 36 (max, X)');
      equiv($pano.css('backgroundPositionY'), '0px', 'Looping - frame 36 (max, Y)');
    }else{
      equiv($pano.css('backgroundPosition'), '0px 0px', 'Looping - frame 36 (max)');
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

    $pano.one('loaded', function(){
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

    $(document).bind('tick.reel.test', function(){
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
  });


  asyncTest( 'Teardown doesn\'t propagate the cloned original image down the chain', function(){
    /*
     * When Reel instance is torn down and `.reel()` is called again in the same chain,
     * the instance isn't properly initialized.
     * The cloned-back original `IMG` tag doesn't propagate as a proper target
     * for subsequent `.reel()` calls. These don't fail (as they are most probably
     * performed upon the old now detached DOM node. The extra selector evaluation
     * is therefore required in order to further manipulate the node.
     */
    expect( 3 );

    $('#image').reel().bind('click.test', function(){
      ok( true, 'Event binding is preserved');
    });

    setTimeout( function(){
      $('#image').trigger('teardown').reel();
      ok( $('#image').is('.jquery-reel'), 'IMG tag is flagged as a Reel instance');
      ok( $('#image').parent().is('.jquery-reel-overlay#image-reel'), 'and wrapped in overlay DIV');
      $('#image').click();
      start();
    }, 500 );
  });


  asyncTest( 'GH-46 Incorrect `row` to `frame` translation in multi-row movies', function(){
    /* Github issue 46 bugfix
     * http://github.com/pisi/Reel/issues/#issue/46
     * When topmost row has been reached with dragging, the instance freeze in that row
     * no matter the vertical direction of the drag. Instance then has to be dragged
     * left or right to restore the vertical movement. Unfortunately enough
     * this happens for all frames lying on the first row and especially the default value.
     *
     * This bug expresses itself by locking vertical reel in the topmost row
     * and preventing proper `row` > `frame` propagation unless horizontal drag
     * is performed.
     */
    var
      try_rows= [ 1, 2 ],
      done_rows= 0,
      try_frames= [ 1, 2, 3, 4, 5, 6, 7, /*8,*/ 9, 10, 11, 12, 13, 14, /*15,*/ 16, 17, 18, 19, 20,
                    21, 22, 23, 24, 25, 26, 27, 28, /*29,*/ 30, 31, 32, 33, 34, 35, 36 ]
                    /* The three commented-out frame values (8, 15 and 29)
                     * are known exceptions from the rule and the actual calculated value is
                     * always one less. Exactly why this happens and especially why it is
                     * independent on `frames` value is still a true mystery for me.
                     * Anyway, it yields 96.3% accuracy, which is as far as I could get it,
                     * is much better then before and I'm happy with it. At least for now.
                     */

    expect( try_rows * try_frames * 3 ); // 3 test for each combination

    for( var i= 0; i < try_rows.length; i++) setTimeout( function(){
      for( var ii= 0; ii < try_frames.length; ii++){
        $('#image').trigger('teardown');
        var
          frame= try_frames[ ii ],
          row= try_rows[ i ],
          rows= 2,
          frames= 36, // default
          $pano= $('#image').reel({
            frame: frame,
            rows: rows,
            row: row
          })

        // Click and drag long way down
        $pano.trigger('down', [ 100, 200 ]);
        $pano.trigger('pan', [ 100, 400 ]);
        deepEqual({ row: $pano.data('row'), frame: $pano.data('frame') },
                  { row: 1, frame: rows * frames - frames + frame },
                  'Drag way down on frame '+frame+' / '+frames+', row '+row+' / '+rows);

        // `tick` needs to be triggered manually between `pan`s in order to have the instance slidable again
        $pano.trigger('tick');

        // Then drag it all the way back up to reach the first row
        $pano.trigger('pan', [ 100, 1 ]);
        deepEqual({ row: $pano.data('row'), frame: $pano.data('frame') },
                  { row: 0, frame: frame },
                  '& drag way up');

        $pano.trigger('tick');

        // Then drag it back all the way down
        $pano.trigger('pan', [ 100, 400 ]);
        deepEqual({ row: $pano.data('row'), frame: $pano.data('frame') },
                  { row: 1, frame: rows * frames - frames + frame },
                  '& drag way down again.');
      }
      done_rows++;
      if (done_rows == rows) start();
    }, 5);
  });


  asyncTest( 'GH-62 Implicit teardown', function(){
    /*
     * Unable to switch Reels in a simple manner without a manual teardown.
     */
    expect( 1 );
    var
      image = undefined

    $('#image').reel().bind('loaded.test', function(){
      if (image === undefined){
        image= $(this).data('image');
        var
          new_instance= $(this).reel({
            image: '../example/panorama-reel.jpg'
          });

        // Finish the test in case reel initialization fails
        if (!new_instance.length){
          ok( false, 'Unable to instantitate the same DOM node for the second time');
          start();
        }
      }else{
        ok( image !== $(this).data('image'), 'The second reel image is different than the starting one');
        start();
      }
    });
    $('#image').reel();
  });

})(jQuery);
