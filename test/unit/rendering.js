/**
 * .reel Unit Tests
 */
(function($){

  module('Rendering', reel_test_module_routine);

  asyncTest( 'The DOM element gets its own generated ID if it doesn\'t currently has one', function(){
    expect(3);
    var
      $reel_with_id= $('#image').reel(),
      $reel_without_id= $('.no_id:first').reel()

    // Given ID attribute
    equal( $reel_with_id.attr('id'), 'image');

    // The generated ID consists of "reel-" followed by a timestamp
    equal( $reel_without_id.attr('id').substr(0, 5), 'reel-');
    equal( Math.floor(+$reel_without_id.attr('id').substr(5) / 10000), Math.floor(+new Date() / 10000));
    start();
  });

  asyncTest( 'Overlay: is created with proper ID', function(){
    expect(1);
    var
      suffix= '-abc',
      $reel= $('#image').reel({ suffix: suffix }),
      $overlay= $('#image' + suffix)

    ok( $overlay.length, 'Has the right ID (original image ID + `suffix`)' );
    start();
  });

  asyncTest( 'Overlay: has the proper `reel-overlay` class', function(){
    expect(1);
    var
      $reel= $('#image').reel(),
      $overlay= $('#image-reel')

    ok( $overlay.hasClass('reel-overlay'), 'Has the class');
    start();
  });

  asyncTest( 'Indicator: is sticked to the bottom edge of the container', function(){
    expect(4);
    var
      samples= [10, 20, 50, 100],
      index= 0

    try_sizes_one_by_one();

    function try_sizes_one_by_one(){
      var
        size= samples[index],
        $reel= $('#image').reel({ indicator: size }),
        $indicator= $('#image-reel .reel-indicator')

      $reel.parent().bind('loaded.test', function(e){
        index++;
        equiv( $indicator.css('top'), 126 - size );
        if (index == samples.length){
          start();
        }else{
          $('#image').unbind('.test').unreel()
          try_sizes_one_by_one()
        }
      })
    }
  });

  asyncTest( 'Indicator: `indicator` option value is the size of the indicator', function(){
    expect(6);
    var
      samples= [5, 10, 30],
      index= 0

    try_sizes_one_by_one();

    function try_sizes_one_by_one(){
      var
        size= samples[index],
        $reel= $('#image').reel({ indicator: size }),
        $indicator= $('#image-reel .reel-indicator')

      $reel.parent().bind('loaded.test', function(){
        index++;
        equiv( $indicator.css('width'), size );
        equiv( $indicator.css('height'), size );
        if (index == samples.length){
          start();
        }else{
          try_sizes_one_by_one();
        }
      });
    }
  });

  asyncTest( 'Indicator: is sticked to the bottom left corner when on min frame (1)', function(){
    expect(1);
    var
      size= 10,
      $reel= $('#image').reel({ indicator: size, frames: 36, frame: 1 }),
      $indicator= $('#image-reel .reel-indicator');

    $reel.parent().bind('loaded.test', function(){
      equiv( $indicator.css('left'), '0px' );
      start();
    });
  });

  asyncTest( 'Indicator: is sticked to the bottom right corner when on max frame (36)', function(){
    expect(1);
    var
      size= 10,
      $reel= $('#image').reel({ indicator: size }),
      width= parseInt($reel.css('width')),
      $indicator= $('#image-reel .reel-indicator');

    /*
    As the indicator indicates the beginning of the frame and not its end we need to simulate
    the "end" by providing a fraction as near to 1 as possible, but not quite
    */
    $reel.trigger('fractionChange', [0.9999]);

    equiv( $indicator.css('left'), (width - size) + 'px' );
    start();
  });

  asyncTest( 'Indicator: reacts on frame change', function(){
    expect(1);
    var
      $reel= $('#image').reel({ indicator: 20, frame: 1 }),
      before= $('#image-reel .reel-indicator').css('left');

    $reel.bind('loaded.test', function(){
      $reel.trigger('frameChange', 5);
      $reel.one('frameChange.test', function(){
        var
          after= $('#image-reel .reel-indicator').css('left');

        ok( before != after, 'Position change after frame change' );
        start();
      });
    })
  });

  asyncTest( 'Indicator: Custom style may be applied to indicator via `.reel-indicator`', function(){
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
    start();
  });

  asyncTest( 'Indicator:  is disabled (not rendered) when `indicator` option evaluates false', function(){
    expect(3);
    try_different_values([false, undefined, 0]);
    start();

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

  asyncTest( 'Preload cache `img`s have defined stage dimensions #10', function(){
    expect(3);
    var
      $reel= $('#image').reel()

    $reel.bind('loaded.test', function(){
      var
        $cached= $reel.siblings('img[width][height]')

      equal($cached.length, 1, 'Image has dimensions');
      equal($cached.attr('width'), $reel.data('dimensions').x, 'Width equals')
      equal($cached.attr('height'), $reel.data('dimensions').y, 'Height equals')
      start();
    });
  });

  asyncTest( 'For each instance there is a stylesheet prepended to stylesheets existing at that time', function(){
    expect(4);
    var
      $reel= $('#image').reel(),
      $style= $reel.data('style')

    ok( is('Object', $style), '`"style"` data key on instance');
    equiv( $style[0].nodeName, 'style', '`<style>` DOM node');
    ok( !$style.prevAll('style').length, 'At the bottom of the stack (all others inherit from it)');

    $reel.unreel();
    ok( !$style.parent().length, 'Each instance removes its own style from the DOM at teardown');
    start();
  });

  asyncTest( 'Instance wrapper carries a class name defined by the `klass` option', function(){
    expect(2);
    var
      $reel= $('#image').reel({
        klass: 'my_own_class'
      })

    ok( $reel.parent().is('.my_own_class'), '`.my_own_class` it is on the wrapper');
    ok( !$reel.parent().find('.my_own_class').length, 'and not anywhere within');

    start();
  });

  asyncTest( 'When no `cursor` option is specified, default cursor is used with color based on OS (black for Mac, white for Windows and Linux)', function(){
    expect(1);
    var
      mac= (/macintosh/i).test(navigator.userAgent),
      $reel= $('#image').reel({
      })

    $reel.bind('loaded.test', function(){
      equal( $(this).css('cursor').replace(' ', ''), 'url(http://code.vostrel.cz/jquery.reel-'+(mac? 'black':'white')+'.cur),move');
      start();
    });
  });

  asyncTest( 'When `cursor: "hand"` is given the legacy grasping hand cursor will be used', function(){
    expect(2);
    var
      $reel= $('#image').reel({
        cursor: 'hand'
      })

    $reel.bind('loaded.test', function(){
      equal( $(this).css('cursor').replace(' ', ''), 'url(http://code.vostrel.cz/jquery.reel-drag.cur),move');

      // Simulate dragging/panning
      $('html').addClass('reel-panning');
      equal( $(this).css('cursor').replace(' ', ''), 'url(http://code.vostrel.cz/jquery.reel-drag-down.cur),move');
      $('html').removeClass('reel-panning');

      start();
    });
  });

  asyncTest( 'Otherwise `cursor` option accepts any valid CSS cursor declaration', function(){
    expect(1);
    var
      $reel= $('#image').reel({
        cursor: 'pointer'
      })

    $reel.bind('loaded.test', function(){
      equal( $(this).css('cursor'), 'pointer');
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
    $reel.bind('loaded.test', function(){
      ok( !$reel.parent().is('.reel-loading'), 'No longer has the `reel-loading` class when loaded');
      ok ($reel.css('cursor') != 'wait', 'Does not have the "wait" cursor after the load');
      start();
    });
  });

})(jQuery);
