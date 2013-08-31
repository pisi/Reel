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

  asyncTest( 'Image loading error events encountered by the preloader (`error` and `abort`) are forwarded and bubble up the DOM', function(){
    expect(1);
    var
      $reel= $('#image').reel({
        image: 'some/non-existing/image.png'
      })

    $(document).bind('error.test', function(){
      ok( true, '`"error"` event bubbled up from the instance (`"abort"` would have too)');
      start();
    })
  });

  $.each([
    { before: 1, after: 23 },
    { before: 15, after: 14 },
    { before: 23, after: 22 }
  ],
  function(name, probe){
    asyncTest( 'Stepping event `"stepRight"` acts as if mouse panned to the right decreased the frame by one (test at '+probe.before+')', function(){
      expect(2);
      var
        $reel= $('#image').reel({
          frames: 23,
          frame: probe.before
        })

      equal( $reel.reel('frame'), probe.before, 'Initial frame out of 23');

      $reel
        .one('frameChange.test', function(){
          equal( $reel.reel('frame'), probe.after, 'Target frame');
          start();
        })
        .trigger('stepRight')

    });
  });

  $.each([
    { before: 1, after: 2 },
    { before: 15, after: 16 },
    { before: 23, after: 1 }
  ],
  function(name, probe){
    asyncTest( 'Stepping event `"stepLeft"` acts as if mouse panned to the left increased the frame by one (test at '+probe.before+')', function(){
      expect(2);
      var
        $reel= $('#image').reel({
          frames: 23,
          frame: probe.before
        })

      equal( $reel.reel('frame'), probe.before, 'Initial frame out of 23');

      $reel
        .one('frameChange.test', function(){
          equal( $reel.reel('frame'), probe.after, 'Target frame');
          start();
        })
        .trigger('stepLeft')

    });
  });

  $.each([
    { before: 1, after: 1 },
    { before: 2, after: 1 },
    { before: 3, after: 2 }
  ],
  function(name, probe){
    asyncTest( 'Stepping event `"stepUp"` acts as if mouse panned upwards decreased the row by one (test at '+probe.before+')', function(){
      expect(2);
      var
        $reel= $('#image').reel({
          rows: 3,
          row: probe.before
        })

      equal( $reel.reel('row'), probe.before, 'Initial row out of 3');

      $reel
        .one('rowChange.test', function(){
          equal( $reel.reel('row'), probe.after, 'Target row');
          start();
        })
        .trigger('stepUp')

      if (probe.after == probe.before){
        setTimeout(function(){
          equal( $reel.reel('row'), probe.after, 'Target row');
          start();
        }, 100);
      }

    });
  });

  $.each([
    { before: 1, after: 2 },
    { before: 2, after: 3 },
    { before: 3, after: 3 }
  ],
  function(name, probe){
    asyncTest( 'Stepping event `"stepDown"` acts as if mouse panned downwards increased the row by one (test at '+probe.before+')', function(){
      expect(2);
      var
        $reel= $('#image').reel({
          rows: 3,
          row: probe.before
        })

      equal( $reel.reel('row'), probe.before, 'Initial row out of 3');

      $reel
        .one('rowChange.test', function(){
          equal( $reel.reel('row'), probe.after, 'Target row');
          start();
        })
        .trigger('stepDown')

      if (probe.after == probe.before){
        setTimeout(function(){
          equal( $reel.reel('row'), probe.after, 'Target row');
          start();
        }, 100);
      }

    });
  });

  $.each({
    'upwards':                    { start: 2, reach: 28, expect: { row: 3 }},
    'upwards from the floor':     { start: 1, reach: 35, expect: { row: 4 }},
    'downwards':                  { start: 3, reach:  5, expect: { row: 1 }},
    'downwards from the ceiling': { start: 5, reach: 18, expect: { row: 2 }}
  },
  function(name, def){
    asyncTest( 'Playback event `"reach"` sets the appropriate row before it starts to animate - '+name, function()
    {
      expect(1);
      var
        $reel= $('#image').reel({
          frame: 2,
          frames: 10,
          row: def.start,
          rows: 5,
          speed: 1
        })

      $reel.trigger('reach', def.reach);

      equal( $reel.reel('row'), def.expect.row, 'On the right row first');
      start();
    });
  });

})(jQuery);
