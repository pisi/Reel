/**
 * .reel Unit Tests
 */
(function($){

  module('Rendering', reel_test_module_routine);

  test( 'The DOM element gets its own generated ID if it doesn\'t currently has one', function(){
    expect(3);
    var
      $reel_with_id= $('#image').reel(),
      $reel_without_id= $('.no_id:first').reel()

    // Given ID attribute
    equal( $reel_with_id.attr('id'), 'image');

    // The generated ID consists of "reel-" followed by a timestamp
    equal( $reel_without_id.attr('id').substr(0, 5), 'reel-');
    equal( Math.floor(+$reel_without_id.attr('id').substr(5) / 10000), Math.floor(+new Date() / 10000));
  });

  test( 'Overlay: is created with proper ID', function(){
    expect(1);
    var
      suffix= '-abc',
      $reel= $('#image').reel({ suffix: suffix }),
      $overlay= $('#image' + suffix)

    ok( $overlay.length, 'Has the right ID (original image ID + `suffix`)' );
  });

  test( 'Overlay: has the proper `reel-overlay` class', function(){
    expect(1);
    var
      $reel= $('#image').reel(),
      $overlay= $('#image-reel')

    ok( $overlay.hasClass('reel-overlay'), 'Has the class');
  });

  asyncTest( 'Indicator: is sticked to the bottom edge of the container no matter its size', function(){
    expect(1);
    var
      $reel= $('#image').reel({ indicator: 5 })

    $(document).bind('loaded.test', function(e){
      equiv( $('#image-reel .reel-indicator').css('bottom'), 0 );
      start();
    });
  });

  $.each([5, 10, 30], function(index, sample){
    asyncTest( 'Indicator: `indicator` option value ('+sample+')is the height of the indicator', function(){
      expect(2);
      var
        size= sample,
        $reel= $('#image').reel({ indicator: size, speed: 2 }),
        portion= Math.round($('#image').width() / 36),
        $indicator= $('#image-reel .reel-indicator')

      $(document).bind('loaded.test', function(){
        equiv( $indicator.css('width'), portion );
        equiv( $indicator.css('height'), size );
        start();
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
      equal( $reel.data('frame'), 1, 'It is frame number 1');
      equiv( $indicator.css('left'), '0px' );
      start();
    });
  });

  test( 'Indicator: is sticked to the bottom right corner when on max frame (36)', function(){
    expect(1);
    var
      $image= $('#image'),
      weight= $image.width() / 36,
      $reel= $image.reel({ indicator: 10 }),
      width= parseInt($reel.css('width')),
      $indicator= $('#image-reel .reel-indicator');

    // As the indicator indicates the beginning of the frame and not its end we need to simulate
    // the "end" by providing a fraction as near to 1 as possible, but not quite
    $reel.trigger('fractionChange', [0.9999]);

    equiv( $indicator.css('left'), Math.round(width - weight) + 'px' );
  });

  asyncTest( 'Indicator: reacts on frame change', function(){
    expect(1);
    var
      $reel= $('#image').reel({ indicator: 20, frame: 1 }),
      $indicator= $('#image-reel .reel-indicator'),
      before= $indicator.css('left')

      $(document).bind('loaded.test', function(){
        $reel.reel('frame', 3);
        $(document).bind('frameChange.test', function(e, depr, frame){
          ok( before != $indicator.css('left'), 'Position change after frame change' );
          start();
        });
      });
  });

  test( 'Indicator: Custom style may be applied to indicator via `.reel-indicator`', function(){
    expect(2);
    var
      $reel= $('#image').reel({ indicator: 10 }),
      $indicator= $('#image-reel .reel-indicator');

    $indicator.css({         // This may as well be done in external CSS
      background: '#fff',
      opacity: 0.5
    })
    equiv( $indicator.css('backgroundColor'), '#ffffff', 'Custom background' );
    equiv( $indicator.css('opacity'), '0.5', 'Custom opacity' );
  });

  test( 'Indicator:  is disabled (not rendered) when `indicator` option evaluates false', function(){
    expect(3);
    try_different_values([false, undefined, 0]);

    function try_different_values(values){
      $(values).each(function try_value(ix, value){
        $('#image').unreel()
        var
          $reel= $('#image').reel({ indicator: value }),
          $indicator= $('#image-reel .reel-indicator');

        equal( $indicator.length, 0, 'When ' + value );
      });
    }
  });

  asyncTest( 'Preload cache `img`s have defined dimensions of the stage #10', function(){
    expect(3);
    var
      $reel= $('#image').reel({
        images: [ 'resources/f1.jpg' ]
      })

    $(document).bind('loaded.test', function(){
      var
        $cached= $reel.siblings('img[width][height]').first()

      equal($cached.length, 1, 'Image has dimensions');
      equal($cached.attr('width'), $reel.data('dimensions').x, 'Width equals')
      equal($cached.attr('height'), $reel.data('dimensions').y, 'Height equals')
      start();
    });
  });

  asyncTest( 'Preload cache `img`s have defined sprite dimensions in multiplies of stage #10', function(){
    expect(3);
    var
      footage= 6,
      frames= 36,
      $reel= $('#image').reel({
        footage: footage,
        frames: frames
      })

    $(document).bind('loaded.test', function(){
      var
        $cached= $reel.siblings('img[width][height]').first()

      equal($cached.length, 1, 'Image has dimensions');
      equal($cached.attr('width'), $reel.data('dimensions').x * footage, 'Width equals')
      equal($cached.attr('height'), $reel.data('dimensions').y * (frames / footage), 'Height equals')
      start();
    });
  });

  test( 'For each instance there is a stylesheet prepended to stylesheets existing at that time', function(){
    expect(4);
    var
      $reel= $('#image').reel(),
      $style= $reel.data('style')

    ok( is('Object', $style), '`"style"` data key on instance');
    equiv( $style[0].nodeName, 'style', '`<style>` DOM node');
    ok( !$style.prevAll('style').length, 'At the bottom of the stack (all others inherit from it)');

    $reel.unreel();
    ok( !$style.parent().length, 'Each instance removes its own style from the DOM at teardown');
  });

  test( 'Instance wrapper carries a class name defined by the `klass` option', function(){
    expect(2);
    var
      $reel= $('#image').reel({
        klass: 'my_own_class'
      })

    ok( $reel.parent().is('.my_own_class'), '`.my_own_class` it is on the wrapper');
    ok( !$reel.parent().find('.my_own_class').length, 'and not anywhere within');
  });

  asyncTest( 'When no `cursor` option is specified, default cursor is used', function(){
    expect(4);
    var
      // Touch clients and Opera don't support custom cursors
      opera= (/opera/i).test(navigator.userAgent),
      touchy= $.reel.touchy,
      unsupported = touchy ? 'auto' : opera ? 'move' : false,
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
      touchy= $.reel.touchy,
      unsupported = touchy ? 'auto' : opera ? 'move' : false,
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
      touchy= $.reel.touchy,
      $reel= $('#image').reel({
        cursor: 'pointer'
      })

    $(document).bind('loaded.test', function(){
      equal( $reel.css('cursor'), touchy ? 'auto' : 'pointer');

      // Simulate dragging/panning
      $('html').addClass('reel-panning');
      equiv( $reel.css('cursor').split(/, ?/)[0], touchy ? 'auto' : 'pointer', 'instance');
      equiv( $('html').css('cursor').split(/, ?/)[0], touchy ? 'auto' : 'pointer', '`html`');
      equiv( $('body').css('cursor').split(/, ?/)[0], touchy ? 'auto' : 'pointer', '`html *`');
      $('html').removeClass('reel-panning');

      start();
    });
  });

  asyncTest( 'Instance being preloaded has a "hourglass" cursor to indicate the pending loading', function(){
    expect(4);
    var
      // Touch clients don't support cursors
      touchy= $.reel.touchy,
      $reel= $('#image').reel({
      })

    ok( $reel.parent().is('.reel-loading'), 'Is `reel-loading` at the very start');
    equal ($reel.css('cursor'), touchy ? 'auto' : 'wait', 'Has the "wait" cursor');
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
        $images= $reel.siblings('img.reel-cached')

      equal( $images.length, frames, frames+' cached images found');
      equal( $images.first().attr('src'), '001.jpg', 'First cache image `src` is set');
      ok( $images.first().attr('src') != $images.last().attr('src'), '`src` of last image differs from the first');
      start();
    });
  });

})(jQuery);
