/**
 * .reel Unit Tests
 */
(function($){

  var
    browser = (function( ua ) {
      // Adapted from jQuery Migrate
      // https://github.com/jquery/jquery-migrate/blob/master/src/core.js
      var
        match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
                /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
                /(msie) ([\w.]+)/.exec( ua ) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
                [],
        browser = {
          browser: match[ 1 ] || "",
          version: match[ 2 ] || "0"
        }

      if (browser.browser){
        browser[browser.browser] = true;
      }
      return browser;

    })(navigator.userAgent.toLowerCase())

  module('Issues', reel_test_module_routine);

  test( 'GH-4 Proper background positioning range for stitched non-looping panoramas', function(){
    /* Github issue 4 bugfix
     * http://github.com/pisi/Reel/issues/#issue/4
     */
    var
      iesaurus = browser.msie && +browser.version < 9, // Flag for IE 8- quirks
      stitched= 1652,
      $pano= $('#stitched_nonlooping').reel({ stitched: stitched, loops: false }),
      travel= stitched - parseInt($pano.css('width'))

    expect(iesaurus ? 4 : 2);

    $pano.trigger('frameChange', 1);
    if (iesaurus){
      equiv($pano.css('backgroundPositionX'), '0px', 'Frame 1 (min, X)');
      equiv($pano.css('backgroundPositionY'), '0px', 'Frame 1 (min, Y)');
    }else{
      equiv($pano.css('backgroundPosition'), '0px 0px', 'Frame 1 (min)');
    }
    $pano.trigger('frameChange', 36);
    if (iesaurus){
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
    var
      iesaurus = browser.msie && +browser.version < 9, // Flag for IE 8- quirks
      stitched= 1652,
      $pano= $('#stitched_looping').reel({ stitched: stitched, loops: true }),
      travel= stitched

    expect(iesaurus ? 4 : 2);

    $pano.trigger('frameChange', 1);
    if (iesaurus){
      equiv($pano.css('backgroundPositionX'), '0px', 'Looping - frame 1 (min, X)');
      equiv($pano.css('backgroundPositionY'), '0px', 'Looping - frame 1 (min, Y)');
    }else{
      equiv($pano.css('backgroundPosition'), '0px 0px', 'Looping - frame 1 (min)');
    }
    $pano.trigger('frameChange', 36);
    if (iesaurus){
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
        path:     'resources/phone/',
        images:   phone_frames(20)
      })

    $(document).bind('loaded.test', function(){
      equal($pano.attr('src'), 'resources/phone/01.png', 'Image is from the sequence');
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
          protocol= $('#image').attr('src').split(':')[0],
          dot= '.',
          browser_version= +browser.version.split(dot).slice(0,2).join(dot),
          ie= browser.msie

        if (!ie || (ie && browser_version > 7)){
          equal(protocol, 'data', 'Embedded transparent image.');
        }else{
          equal(protocol, 'http', 'Transparent image from CDN.');
        }

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

  asyncTest( '`footage` private variable leaked into global scope', function()
  {
    expect(1);

    var
      $reel= $('#image').reel()

    setTimeout(function(){
      ok( typeof footage === 'undefined', 'No leaked `footage` accessible in the global scope');
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

    var
      $reel= $('#image').reel().bind('click.test', function(){
        ok( true, 'Event binding is preserved');
      });

    setTimeout( function(){
      $reel.unreel().reel();
      ok( $reel.is('.reel'), 'IMG tag is flagged as a Reel instance');
      ok( $reel.parent().is('.reel-overlay'), 'and wrapped in overlay DIV');
      $reel.click();
      start();
    }, 500 );
  });

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
  $.each([
    1,
    2
  ],
  function(ix, row){
    $.each([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      31, 32, 33, 34, 35, 36
    ],
    function(iix, frame){
      asyncTest( 'GH-46 Incorrect `row` to `frame` translation in multi-row movies (' + row + '/2 to ' + frame + '/36)', function(){
        expect( 3 );
        var
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
        deepEqual({ row: $pano.data('row'), tier: $pano.data('tier'), frame: $pano.data('frame') },
                  { row: rows,              tier: 1,                  frame: rows * frames - frames + frame },
                  'Drag way down on frame '+frame+' / '+frames+', row '+row+' / '+rows);

        // `tick` needs to be triggered manually between `pan`s in order to have the instance slidable again
        $pano.trigger('tick');

        // Then drag it all the way back up to reach the first row
        $pano.trigger('pan', [ 100, 1 ]);
        deepEqual({ row: $pano.data('row'), tier: $pano.data('tier'), frame: $pano.data('frame') },
                  { row: 1,                 tier: 0,                  frame: frame },
                  '& drag way up');

        $pano.trigger('tick');

        // Then drag it back all the way down
        $pano.trigger('pan', [ 100, 400 ]);
        deepEqual({ row: $pano.data('row'), tier: $pano.data('tier'), frame: $pano.data('frame') },
                  { row: rows,              tier: 1,                  frame: rows * frames - frames + frame },
                  '& drag way down again.');

        // Conclude the drag
        $pano.trigger('up');
        start();
      });
    });
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
            image: 'resources/green-reel.jpg'
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

  asyncTest( 'GH-103 Incorrect frame with vertical sprite organization', function(){
    /*
     * When using 'vertical:true' with images array the reel starts at frame (image) number 7
     * and continue past the end of the array with image url "undefined"
     */
    expect( 4 );
    var
      images = (function(){
        var images= []
        for (var i= 0; i < 15; i++) images.push('resources/phone/01.png?' + (i+1))
        return images
      })(),
      $reel = $('#image').reel({
        vertical: true,
        images: images
      })

    $reel.bind('loaded.test', function(){
      equal( $reel.data('frame'), 1);
      equal( $reel.attr('src'), images[0]);

      $reel.reel('frame', 15);
      equal( $reel.data('frame'), 15);
      equal( $reel.attr('src'), images[14]);
      start();
    })
  });

  asyncTest( 'GH-113 Unescaped sprite URIs cause nothing to be displayed', function(){
    /*
     * When image URL contains an unescaped space, this is not further handled by Reel
     * resulting in a non-working URL used and nothing displayed.
     */
    expect( 2 );
    var
      raw = 're sources/object-reel.jpg',
      escaped = 're%20sources/object-reel.jpg',
      $reel = $('#image_with_unescaped_url').reel()

    $reel.parent().bind('loaded.test', function(){
      var
        // Isolate the actual filename used
        image = $reel.css('backgroundImage').replace(/['"]?\)$/, '')
        actual = image.substr(image.length - escaped.length)

      equal( $reel.data('image'), raw, 'Given raw image URL (escaped or unescaped)');
      equal( actual, escaped, 'Actual escaped URL used');
      start();
    })
  });

  asyncTest( 'GH-113 Unescaped sequence URIs cause nothing to be displayed', function(){
    /*
     * When image or sprite URL contains an unescaped space, this is not further handled by Reel
     * resulting in a non-working URL used and nothing displayed.
     */
    expect( 2 );
    var
      sequence= 're sources/phone/##.jpg'
      raw=      're sources/phone/01.jpg',
      escaped=  're%20sources/phone/01.jpg',
      $reel = $('#image_with_unescaped_url').reel({
        frames: 2,
        images: sequence
      })

    $reel.parent().bind('loaded.test', function(){
      equal( $reel.data('images')[0], raw, 'Given raw sequence frame URL (escaped or unescaped)');
      equal( $reel.attr('src'), escaped, 'Actual escaped URL used');
      start();
    })
  });

  asyncTest( 'GH-117 Ticker does not restart after instance gets lost from the DOM', function(){
    /*
     * When an instance is removed from the DOM indirectly by removing some of its ancestors
     * and another instances is created, the new one doesn't animate and can not be dragged
     * [demo](http://jsfiddle.net/FeeDy/2/)
     */
    expect( 5 );
    var
      $container = $('#non_image'),
      $image = $('<img>', {
        id: 'injected_image',
        src: 'resources/object.jpg',
        width: 276,
        height: 126
      }).appendTo($container),
      $reel = $('#injected_image').reel({
        frames: 35,
        speed: 0.2
      })

    $reel.one('loaded.test', function(){
      $container.empty();
      ok( !$('#injected_image').length, '`#injected_image` no longer present in the DOM' )
      equal( $.reel.leader('tempo'), null, 'No leader tempo, ticker stopped' );

      var
        ticked= false

      $(document).bind('tick.reel.test', function(){
        ticked= true;
      });
      setTimeout(function(){
        ok( !ticked, 'Ticker positively not ticking');
        var
          new_tempo = 15,
          $container = $('#non_image'),
          $image = $('<img>', {
            id: 'injected_image',
            src: 'resources/object.jpg',
            width: 276,
            height: 126
          }).appendTo($container),
          $reel = $('#injected_image').reel({
            frames: 35,
            tempo: new_tempo,
            speed: 0.2
          })

        $reel.bind('loaded.test', function(){
          var
            ticked= false

          $(document).bind('tick.reel.test', function(){
            ticked= true;
          });
          equal( $.reel.leader('tempo'), new_tempo, 'Leader tempo reported again' );
          setTimeout(function(){
            ok( ticked, 'Newly created instance restarts the ticker')
            $reel.unreel();
            $container.empty();
            start();
          }, 200);
        });
      }, 200);
    })
  });

  asyncTest( 'GH-125 URLs containing parentheses fail when used in `background` CSS declaration', function(){
    /*
     * When image or sprite URL contains an unescaped space, this is not further handled by Reel
     * resulting in a non-working URL used and nothing displayed.
     */
    expect( 1 );
    var
      url=      'resources/object(2).jpg',
      sprite=   'resources/object(2)-reel.jpg',
      $reel = $('#image').reel({
        attr: {
          src: url
        }
      })

    $reel.parent().bind('loaded.test', function(){
      var
        image= $reel.css('backgroundImage').replace(/['"]?\)$/, ''),
        is= image.substr(image.length - sprite.length)
      equal( is, sprite );
      start();
    })
  });

  $.each({
    'non-steppable': {
      steppable: false,
      label: 'Only the plain `up` event handler is bound',
      expect: 1
    },
    'steppable': {
      steppable: true,
      label: 'One plain `up` and one `up.steppable` event handlers are bound',
      expect: 2
    }
  }, function(name, def){
    asyncTest( 'GH-126 Disabling stepping with `steppable` option ('+name+' case)', function(){
      /*
       * The stepping click handler of the `up.steppable` event hasn't been properly unbinded
       * when `steppable` option is set to `false`.
       */
      expect( 1 );
      var
        $reel = $('#image').reel({
          steppable: def.steppable
        })

      $reel.parent().bind('loaded.test', function(){
        var
          $area= $reel.reel('area')

        equal( $._data($area[0], 'events')['up'].length, def.expect, def.label);
        start();
      })
    });
  });

})(jQuery);
