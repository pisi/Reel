/**
 * .reel Unit Tests
 */
(function($){

  module('Events', reel_test_module_routine);

  asyncTest( '(Deprecated) Internal data setting triggers "store" event and passes name and value to the handler', function(){
    expect(3);
    var
      $reel= $('#image').reel({ frame: 1, speed: 1 }),
      compare= false

    $reel
      .bind('loaded.test', function(){
        setTimeout(function(){
          compare= true;
        }, 500);
      })
      .bind('store.test', function(e, name, value){
        if (compare && name == 'frame'){
          ok(name, '`name` is passed as first param');
          ok(value, '`value` is passed as second param');
          ok(value != 1, 'Frame passed in "store" binding differs from original frame 1');
          compare= false;
          start();
        }
      })
  });

  asyncTest( '(Deprecated) Internal data getting triggers "recall" event and passes name of the value in question', function(){
    expect(3);
    var
      $reel= $('#image').reel(),
      compare= false

    $reel
      .bind('loaded.test', function(){
        setTimeout(function(){
          compare= true;
        }, 500);
      })
      .bind('recall.test', function(e, name, value){
        if (compare){
          ok(true, '"recall" event is being triggered');
          ok(name, '`name` is passed as first param');
          ok(typeof value != 'undefined', '`value` is passed as second param');
          compare= false;
          start();
        }
      })
  });

  asyncTest( '`"openingDone"` event is triggered at the end of opening animation', function(){
    expect(2);
    var
      $reel= $('#image').reel({
        opening: 1
      })

    $(document)
      .bind('play.test', function(){
        ok( true, '`"play" event has fired just preceeding the `"openingDone"`');
      })
      .bind('openingDone.test', function(){
        ok( true, '`"openingDone"` has been triggered');
        start();
      })
  });

  asyncTest( 'Default handling of `"openingDone"` event is cancelable by returning false from the handler', function(){
    expect(2);
    var
      $reel= $('#image').reel({
        opening: 1
      })

    $reel
      .bind('openingDone.test', function(){
        ok( true, '`"openingDone"` has been triggered and set to prevent event bubbling');
        setTimeout(function(){
          ok( true, 'The cancelled `"play"` correctly didn\'t fire (waited for it half a second)');
          start();
        }, 500);
        return false
      })
      .bind('play.test', function(){
        start();
      })
  });

  asyncTest( '`"play"` event starts to animate when `speed` option is set', function(){
    expect(2);
    var
      speed= 0.5,
      $reel= $('#image').reel({
        speed: speed
      })

    $reel
      .bind('openingDone.test', function(){
        setTimeout(function(){
          $reel.trigger('play');
        }, 50);
        setTimeout(function(){
          equal( $reel.data('playing'), true, 'Instance played with non-zero `speed` parameter starts to play');
          equal( $reel.data('speed'), speed, 'Stored internal speed value');
          start();
        }, 100);
      });
  });

  asyncTest( '`"play"` event has no effect, when no `speed` option was specified or is zero', function(){
    expect(2);
    var
      $reel= $('#image').reel()

    $reel
      .bind('openingDone.test', function(){
        setTimeout(function(){
          $reel.trigger('play');
        }, 50);
        setTimeout(function(){
          equal( $reel.data('playing'), false, 'Instance played with non-zero `speed` parameter starts to play');
          equal( $reel.data('speed'), 0, 'Stored internal speed value');
          start();
        }, 100);
      });
  });

  asyncTest( '`"play"` event accepts optional `speed` parameter, which overrides the one specified in options', function(){
    expect(4);
    var
      initial_speed= 0,
      new_speed= 1.23,
      $reel= $('#image').reel({
        speed: initial_speed // which is also the default value
      })

    $reel
      .bind('openingDone.test', function(){
        setTimeout(function(){
          equal( $reel.data('playing'), false, 'Instance initiated with `speed: 0` is not playing');
          equal( $reel.data('speed'), initial_speed, 'Stored internal speed value');
          $reel.trigger('play', [ new_speed ]);
        }, 50);
        setTimeout(function(){
          equal( $reel.data('playing'), true, 'Instance played with non-zero `speed` parameter starts to play');
          equal( $reel.data('speed'), new_speed, 'Stored internal speed value');
          start();
        }, 100);
      });
  });

  asyncTest( '`"wheel"` event cancels eventual running `"pan" event', function(){
    expect(2);
    var
      $reel= $('#image').reel()

    $(document).bind('up.test', function(){
      ok( true, '`"wheel"` event caused the `"up"` event to trigger and cancel `"pan"`');
      ok( !$('html').hasClass('reel-panning'), 'HTML is not flagged as "panning in progress"')
      start();
    })

    $reel
      .trigger('down')
      .trigger('wheel', [1])
      // Because of IE the non-zero distance parameter to the event is
      // required to be present
  });

  asyncTest( 'Improper mouse wheel event triggers (with no reasonable delta) don\'t make it to the Reel\'s `"wheel"` event', function(){
    expect(1);
    var
      $reel= $('#image').reel(),
      waiter= setTimeout(function(){
        ok( true, '`didn\'tmake it to the `"wheel"` event');
        start();
      }, 100);

    $(document).bind('wheel.test', function(){
      ok( false, '`"wheel"` event should not be fired, but was');
      clearTimeout(waiter);
      start();
    })
    $reel.trigger('mousewheel');
  });

  test( 'As a result of `jQuery.cleanData()` wrapper, `clean` event is triggered on the removed node', function(){
    expect(3);
    var
      $container= $('#non_image'),
      $outer= $('<div>', { 'class': 'outer' }).appendTo($container),
      $inner= $('<div>', { 'class': 'inner' }).appendTo($outer),
      $innermost= $('<div>', { 'class': 'innermost' }).appendTo($inner)

    $container.bind('clean', function(){
      ok( false, 'The `clean` event doesn\'t bubble up the DOM ever');
    });
    $outer.bind('clean', function(){
      ok( true, '`clean` handler triggered on the outer node after emptying container (indirect removal)' );
    });
    $inner.bind('clean', function(){
      ok( true, '`clean` handler triggered on the inner node after emptying container (indirect removal)' );
    });
    $innermost.bind('clean', function(){
      ok( true, '`clean` handler triggered on the innermost node after its direct removal' );
    });

    $innermost.remove();
    $container.empty();
  });

})(jQuery);
