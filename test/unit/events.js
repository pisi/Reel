/**
 * .reel Unit Tests
 */
(function($){

  module('Events', reel_test_module_routine);

  asyncTest( 'Internal data setting no longer triggers "store" event and passes name and value to the handler (deprecated & removed)', function(){
    expect(0);
    var
      $reel= $('#image').reel({ frame: 1, speed: 1 })

    $(document)
      .bind('loaded.test', function(){
        setTimeout(function(){
          start();
        }, 500);
      })
      .bind('store.test', function(e, name, value){
        ok( false, '"store" event should not have been triggered');
      })
  });

  asyncTest( 'Internal data getting no longer triggers "recall" event and passes name of the value in question (deprecated & removed)', function(){
    expect(0);
    var
      $reel= $('#image').reel()

    $(document)
      .bind('loaded.test', function(){
        setTimeout(function(){
          start();
        }, 500);
      })
      .bind('recall.test', function(e, name, value){
        ok( false, '"recall" event should not have been triggered');
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

    $(document)
      .bind('loaded.test', function(){
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

    $(document)
      .bind('loaded.test', function(){
        setTimeout(function(){
          $reel.trigger('play');
        }, 200);
        setTimeout(function(){
          equal( $reel.data('playing'), true, 'Instance played with non-zero `speed` parameter starts to play');
          equal( $reel.data('speed'), speed, 'Stored internal speed value');
          start();
        }, 400);
      })
  });

  asyncTest( '`"play"` event has no effect, when no `speed` option was specified or is zero', function(){
    expect(2);
    var
      $reel= $('#image').reel()

    $(document)
      .bind('loaded.test', function(){

        setTimeout(function(){
          $reel.trigger('play');
        }, 200);

        setTimeout(function(){
          equal( $reel.data('playing'), false, 'Instance played with non-zero `speed` parameter starts to play');
          equal( $reel.data('speed'), 0, 'Stored internal speed value');

          start();
        }, 400);

      })
  });

  asyncTest( '`"play"` event accepts optional `speed` parameter, which overrides the one specified in options', function(){
    expect(4);
    var
      initial_speed= 0,
      new_speed= 1.23,
      $reel= $('#image').reel({
        speed: initial_speed // which is also the default value
      })

    $(document)
      .bind('loaded.test', function(){
        setTimeout(function(){
          equal( $reel.data('playing'), false, 'Instance initiated with `speed: 0` is not playing');
          equal( $reel.data('speed'), initial_speed, 'Stored internal speed value');
          $reel.trigger('play', [ new_speed ]);
        }, 200);
        setTimeout(function(){
          equal( $reel.data('playing'), true, 'Instance played with non-zero `speed` parameter starts to play');
          equal( $reel.data('speed'), new_speed, 'Stored internal speed value');
          start();
        }, 400);
      });
  });

  asyncTest( '`"wheel"` event cancels eventual running `"pan" event', function(){
    expect(2);
    var
      $reel= $('#image').reel()

    $(document).bind('loaded.test', function(){
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
  });

  asyncTest( 'Improper mouse wheel event triggers (with no reasonable delta) don\'t make it to the Reel\'s `"wheel"` event', function(){
    expect(1);
    var
      $reel= $('#image').reel(),
      waiter= setTimeout(function(){
        ok( true, '`didn\'t make it to the `"wheel"` event');
        start();
      }, 1000);

    $(document).bind('loaded.test', function(){
      $(document).bind('wheel.test', function(){
        ok( false, '`"wheel"` event should have not been fired');
        clearTimeout(waiter);
  
        start();
      })
  
      $reel.trigger('mousewheel');
    });
  });

  asyncTest( 'As a result of `jQuery.cleanData()` wrapper, `clean` event is triggered on the removed node', function(){
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
    start();
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

  asyncTest( 'Playback Shy activation triggers `"prepare"` event and waits for explicit setup being triggered', function(){
    expect(1);

    $(document).bind('prepare.test', function(e){
      equal( e.type, 'prepare', 'Event triggered');
      start();
    });

    var
      $reel= $('#image').reel({
        shy: true
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

      $(document).bind('loaded.test', function(){
        equal( $reel.reel('frame'), probe.before, 'Initial frame out of 23');

        $(document)
          .one('frameChange.test', function(){
            equal( $reel.reel('frame'), probe.after, 'Target frame');

            start();
          })

        $reel.trigger('stepRight')
      });

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

      $(document).bind('loaded.test', function(){
        equal( $reel.reel('frame'), probe.before, 'Initial frame out of 23');

      $(document)
          .one('frameChange.test', function(){
            equal( $reel.reel('frame'), probe.after, 'Target frame');

            start();
          })
  
        $reel.trigger('stepLeft')
      });

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

      $(document).bind('loaded.test', function(){
        equal( $reel.reel('row'), probe.before, 'Initial row out of 3');

      $(document)
          .one('rowChange.test', function(){
            equal( $reel.reel('row'), probe.after, 'Target row');
  
            start();
          })
  
        $reel
          .trigger('stepUp')

        if (probe.after == probe.before){
          setTimeout(function(){
            equal( $reel.reel('row'), probe.after, 'Target row');
  
            start();
          }, 100);
        }
      });

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

      $(document).bind('loaded.test', function(){
        equal( $reel.reel('row'), probe.before, 'Initial row out of 3');

      $(document)
          .one('rowChange.test', function(){
            equal( $reel.reel('row'), probe.after, 'Target row');
  
            start();
          })
  
        $reel
          .trigger('stepDown')

        if (probe.after == probe.before){
          setTimeout(function(){
            equal( $reel.reel('row'), probe.after, 'Target row');
  
            start();
          }, 100);
        }
      });

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

      $(document).bind('loaded.test', function(){
        $reel.trigger('reach', def.reach);

        equal( $reel.reel('row'), def.expect.row, 'On the right row first');

        start();
      });
    });
  });

})(jQuery);
