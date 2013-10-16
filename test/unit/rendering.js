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

  module('Rendering', reel_test_module_routine);

  asyncTest( 'The DOM element gets its own generated ID if it doesn\'t currently has one', function(){
    expect(3);
    var
      $reel_with_id= $('#image').reel(),
      now= new Date(),
      $reel_without_id= $('.no_id:first').reel()

    $(document).bind('loaded.test', function(){
      // Given ID attribute
      equal( $reel_with_id.attr('id'), 'image');

      // The generated ID consists of "reel-" followed by a timestamp
      equal( $reel_without_id.attr('id').substr(0, 5), 'reel-');
      equal( Math.floor(+$reel_without_id.attr('id').substr(5) / 10000), Math.floor(+now / 10000));

      start();
    });
  });

  asyncTest( 'Overlay: is created with proper ID', function(){
    expect(1);
    var
      suffix= '-abc',
      $reel= $('#image').reel({ suffix: suffix }),
      $overlay= $('#image' + suffix)

    $(document).bind('loaded.test', function(){
      ok( $overlay.length, 'Has the right ID (original image ID + `suffix`)' );
      start();
    });
  });

  asyncTest( 'Overlay: has the proper `reel-overlay` class', function(){
    expect(1);
    var
      $reel= $('#image').reel(),
      $overlay= $('#image-reel')

    $(document).bind('loaded.test', function(){
      ok( $overlay.hasClass('reel-overlay'), 'Has the class');
      start();
    });
  });

  asyncTest( 'Indicator: is sticked to the bottom edge of the container no matter its size', function(){
    expect(1);
    var
      $reel= $('#image').reel({ indicator: 5 })

    $(document).bind('loaded.test', function(e){
      setTimeout(function(){
        equiv( $('#image-reel .reel-indicator').css('bottom'), 0 );
        start();
      }, 100);
    });
  });

  $.each([5, 10, 30], function(index, sample){
    asyncTest( 'Indicator: `indicator` option value ('+sample+') is the height of the indicator', function(){
      expect(2);
      var
        size= sample,
        $reel= $('#image').reel({ indicator: size, speed: 2 }),
        portion= Math.round($('#image').width() / 36),
        $indicator= $('#image-reel .reel-indicator')

      $(document).bind('loaded.test', function(){
        setTimeout(function(){
          equiv( $indicator.css('width'), portion );
          equiv( $indicator.css('height'), size );
          start();
        }, 100);
      });
    });
  });

  asyncTest( 'Indicator: is sticked to the bottom left corner when on min frame (1)', function(){
    expect(2);
    var
      size= 10,
      $reel= $('#image').reel({
        indicator: size,
        frames: 36,
        frame: 1
      }),
      $indicator= $('#image-reel .reel-indicator');

    $(document).bind('loaded.test', function(){
      setTimeout(function(){
        equal( $reel.data('frame'), 1, 'It is frame number 1');
        equiv( $indicator.css('left'), '0px' );
        start();
      }, 100);
    });
  });

  asyncTest( 'Indicator: is sticked to the bottom right corner when on max frame (36)', function(){
    expect(1);
    var
      $image= $('#image'),
      weight= $image.width() / 36,
      $reel= $image.reel({ indicator: 10 }),
      width= parseInt($reel.css('width')),
      $indicator= $('#image-reel .reel-indicator');

    $(document).bind('loaded.test', function(){
      // As the indicator indicates the beginning of the frame and not its end we need to simulate
      // the "end" by providing a fraction as near to 1 as possible, but not quite
      $reel.reel('fraction', 0.9999);

      setTimeout(function(){
        equiv( $indicator.css('left'), Math.round(width - weight) + 'px' );
        start();
      }, 100);
    });
  });

  asyncTest( 'Indicator: reacts on frame change', function(){
    expect(1);
    var
      $reel= $('#image').reel({ indicator: 20, frame: 1 }),
      $indicator= $('#image-reel .reel-indicator'),
      before= $indicator.css('left')

      $(document).bind('loaded.test', function(){
        $(document).bind('frameChange.test', function(e, depr, frame){
          ok( before != $indicator.css('left'), 'Position change after frame change' );
          start();
        });
        $reel.reel('frame', 3);
      });
  });

  asyncTest( 'Indicator: Custom style may be applied to indicator via `.reel-indicator`', function(){
    expect(2);
    var
      $reel= $('#image').reel({ indicator: 10 }),
      $indicator= $('#image-reel .reel-indicator');

    $(document).bind('loaded.test', function(){
      $indicator.css({         // This may as well be done in external CSS
        background: '#fff',
        opacity: 0.5
      })
      equiv( $indicator.css('backgroundColor'), '#ffffff', 'Custom background' );
      equiv( $indicator.css('opacity'), '0.5', 'Custom opacity' );

      start();
    });
  });

  $.each([
    false,
    undefined,
    0
  ],
  function( ix, value ){
    asyncTest( 'Indicator:  is disabled (not rendered) when `indicator` option evaluates false like `'+value+'`', function(){
      expect( 1 );
      var
        $reel= $('#image').reel({ indicator: value }),
        $indicator= $('#image-reel .reel-indicator')

      $( document ).bind('loaded.test', function(){
        equal( $indicator.length, 0, 'No indicator');
        start();
      })
    });
  });

  asyncTest( 'For each instance there is a stylesheet prepended to stylesheets existing at that time', function(){
    expect(4);
    var
      $reel= $('#image').reel(),
      $style= $reel.data('style')

    $(document).bind('loaded.test', function(){
      ok( is('Object', $style), '`"style"` data key on instance');
      equiv( $style[0].nodeName, 'style', '`<style>` DOM node');
      ok( !$style.prevAll('style').length, 'At the bottom of the stack (all others inherit from it)');

      $reel.unreel();
      ok( !$style.parent().length, 'Each instance removes its own style from the DOM at teardown');
      start();
    });
  });

  asyncTest( 'Instance wrapper carries a class name defined by the `klass` option', function(){
    expect(2);
    var
      $reel= $('#image').reel({
        klass: 'my_own_class'
      })

    $(document).bind('loaded.test', function(){
      ok( $reel.parent().is('.my_own_class'), '`.my_own_class` it is on the wrapper');
      ok( !$reel.parent().find('.my_own_class').length, 'and not anywhere within');
      start();
    });
  });

  asyncTest( 'When no `cursor` option is specified, default cursor is used', function(){
    expect(4);
    var
      // Touch clients and Opera don't support custom cursors
      opera= (/opera/i).test(navigator.userAgent),
      unsupported = opera ? 'move' : false,
      $reel= $('#image').reel({
      })

    $(document).bind('loaded.test', function(){
      equiv( $reel.css('cursor').split(/, ?/)[0], unsupported || 'url('+$.reel.cdn+'jquery.reel.cur)', 'instance');

      // Simulate dragging/panning
      $('html').addClass('reel-panning');
      equiv( $reel.css('cursor').split(/, ?/)[0], unsupported || 'url('+$.reel.cdn+'jquery.reel.cur)', 'instance');
      equiv( $('html').css('cursor').split(/, ?/)[0], unsupported || 'url('+$.reel.cdn+'jquery.reel.cur)', '`html`');
      equiv( $('body').css('cursor').split(/, ?/)[0], unsupported || 'url('+$.reel.cdn+'jquery.reel.cur)', '`html *`');
      $('html').removeClass('reel-panning');
      start();
    });
  });

  asyncTest( 'When `cursor: "hand"` is given the legacy grasping hand cursor will be used', function(){
    expect(4);
    var
      // Touch clients and Opera don't support custom cursors
      opera= (/opera/i).test(navigator.userAgent),
      unsupported = opera ? 'move' : false,
      $reel= $('#image').reel({
        cursor: 'hand'
      })

    $(document).bind('loaded.test', function(){
      equiv( $reel.css('cursor').split(/, ?/)[0], unsupported || 'url('+$.reel.cdn+'jquery.reel-drag.cur)');

      // Simulate dragging/panning
      $('html').addClass('reel-panning');
      equiv( $reel.css('cursor').split(/, ?/)[0], unsupported || 'url('+$.reel.cdn+'jquery.reel-drag-down.cur)', 'instance');
      equiv( $('html').css('cursor').split(/, ?/)[0], unsupported || 'url('+$.reel.cdn+'jquery.reel-drag-down.cur)', '`html`');
      equiv( $('body').css('cursor').split(/, ?/)[0], unsupported || 'url('+$.reel.cdn+'jquery.reel-drag-down.cur)', '`html *`');
      $('html').removeClass('reel-panning');

      start();
    });
  });

  asyncTest( 'Otherwise `cursor` option accepts any valid CSS cursor declaration', function(){
    expect(4);
    var
      // Touch clients and Opera don't support custom cursors
      opera= (/opera/i).test(navigator.userAgent),
      $reel= $('#image').reel({
        cursor: 'pointer'
      })

    $(document).bind('loaded.test', function(){
      equal( $reel.css('cursor'), 'pointer');

      // Simulate dragging/panning
      $('html').addClass('reel-panning');
      equiv( $reel.css('cursor').split(/, ?/)[0], 'pointer', 'instance');
      equiv( $('html').css('cursor').split(/, ?/)[0], 'pointer', '`html`');
      equiv( $('body').css('cursor').split(/, ?/)[0], 'pointer', '`html *`');
      $('html').removeClass('reel-panning');

      start();
    });
  });

  asyncTest( 'Instance being preloaded has a "hourglass" cursor to indicate the pending loading', function(){
    expect(4);
    var
      $reel= $('#image').reel({
      })

    ok( $reel.parent().is('.reel-loading'), 'Is `reel-loading` at the very start');
    equal ($reel.css('cursor'), 'wait', 'Has the "wait" cursor');
    $(document).bind('loaded.test', function(){
      ok( !$reel.parent().is('.reel-loading'), 'No longer has the `reel-loading` class when loaded');
      ok ($reel.css('cursor') != 'wait', 'Does not have the "wait" cursor after the load');
      start();
    });
  });

  asyncTest( 'Instance being preloaded has a "hourglass" cursor to indicate the pending loading', function(){
    expect(3);
    var
      frames= 5,
      $reel= $('#image').reel({
        frames: frames,
        preload: 'linear', // Using linear for simplicity of testing the last frame
        images: '###.jpg'
      })

    $(document).bind('loaded.test', function(){
      var
        $images= $reel.reel('cache').children()

      equal( $images.length, frames, frames+' cached images found');
      equal( $images.first().attr('src'), '001.jpg', 'First cache image `src` is set');
      ok( $images.first().attr('src') != $images.last().attr('src'), '`src` of last image differs from the first');
      start();
    });
  });

  asyncTest( 'Instance creates a stylesheet just once per its existence', function(){
    expect(3);
    var
      before= 'image/to/start/with.jpg',
      after= 'different/image.jpg',
      pass= 0,
      styles= $('style').length,
      $reel= $('#image').reel({
        image: before
      })

    equal( styles, 1, 'One test framework stylesheet');

    $(document).bind('loaded.test', function(){
      switch(++pass){
        case 1:
          equal( styles + 1, $('style').length, 'Plus one for Reel instance');
          styles= $('style').length;
          $reel.reel('image', after);
          break;
        case 2:
          equal( $('style').length, styles, 'No zombie stylesheets after reload');
          start();
          break;
      }
    });
  });

  $.each({
    'for sprite': { options: { frames: 18, footage: 4 }, expected: '1104px 630px' },
    'for responsive sprite': { options: { frames: 18, footage: 4, responsive: true }, expected: '3600px 2055px' },
    'for stitched': { options: { stitched: 500 }, expected: '500px 126px' },
    'for responsive stitched': { options: { stitched: 500, responsive: true }, expected: '1630px 411px' },
    '(none) for sequence': { options: { images: '#.jpg' }, expected: 'auto' },
    '(none) for responsive sequence': { options: { images: '#.jpg', responsive: true }, expected: 'auto' },
  },
  // Test image dimensions are 276x126px
  // Fixed tests stage width is 900px
  function(name, def){
    asyncTest( 'Correct background size '+name, function()
    {
      expect(1);
      var
        $reel= $('#image').reel(def.options)

      $(document).bind('loaded.test', function(){
        if (browser.msie && browser.version > 8){
          equiv( $reel.css('backgroundSize'), def.expected, '');
        }else{
          ok( 'Tests omitted. IE8- doesn\'t have support for this' )
        }
        start();
      });

    });
  });

})(jQuery);
