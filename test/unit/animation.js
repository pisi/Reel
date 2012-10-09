/**
 * .reel Unit Tests
 */
(function($){

  module('Animation', reel_test_module_routine);

  asyncTest( 'When at least one instance of Reel is present in the DOM a shared ticker is started', function()
  {
    expect(1);
    var
      ticks = 0;

    $(document).bind('tick.reel.test', function tick(){
      ok( false, 'Ticker should not be running');
      ticks++
    });

    setTimeout(function(){
      equal( ticks, 0, 'Ticker isn\'t running when no Reel is on');
      start();
    }, 100);
  });

  asyncTest( 'Ticker is driven by `leader`\'s data from `$.reel.leader()`', function()
  {
    expect(9);

    $(document).bind('tick.reel.test', tick);

    var
      ticks = 0,
      $faster = $('#image').reel({ tempo: 20 }),
      $slower = $('#image2').reel({ tempo: 10 });

    setTimeout(function(){
      deepEqual( $.reel.leader(), $faster.data(), 'Leader\'s data are the first (oldest living) instance\'s data')
      equals( $.reel.leader('tempo'), $faster.data('tempo'), 'Timer keeps faster tempo dictated by the leader');

      ok( $faster.unreel(), 'The older faster instance destroyed (the latter slower instance remains)');

      setTimeout(function(){
        deepEqual( $.reel.leader(), $slower.data(), 'Leader\'s data are the second (now the only) instance\'s data')
        equals( $.reel.leader('tempo'), $slower.data('tempo'), 'Ticker slowed down');

        ok( $slower.unreel(), 'Slower instance removed too (no instance remains)')
        var
          ticks_copy= ticks;

        setTimeout(function(){
          equals( $.reel.leader(), undefined, 'Without a leader there\'s no data');
          equals( $.reel.leader('tempo'), undefined, 'and no leader\'s tempo');
          equals( ticks_copy, ticks, 'Ticker is stopped.');

          start();
        }, 100);

      }, 100);

    }, 100);

    function tick(){
      ticks++
    }
  });

  // We generate tests for several different tempos ranging from 6 to 48
  $.each([6, 8, 10, 12, 18, 24, 36], function(ix, tempo){

    var
      one_second= 1000,
      lazy_tempo= tempo / ($.reel.lazy? $.reel.def.laziness : 1)

    // We also try both animated and non-animated
    $.each([0, 1], function(ixx, speed){

      asyncTest( 'Measuring 1 second timing accuracy when running ' + (speed ? 'animated' : 'non-animated') + ' instance at `tempo: ' + lazy_tempo + '`', function()
      {
        expect(1);

        var
          ticks= 0,
          sum= 0,
          bang= +new Date(),
          $reel= $('#image').reel({ tempo: tempo, speed: speed })

        $(document).bind('tick.reel.test', function tick(){
          ticks++;
        });

        setTimeout(function(duration){
          var
            duration= +new Date() - bang,
            excess= duration % one_second / 10
          // With the automated collection of results, the main purpose
          // of this test is to measure and report the performance,
          // not fail on excess, which may well be caused by anything
          // unrelated. Ergo this test always passes.
          ok( true, 'Yielded ' + ticks + ' ticks with ' + excess + ' % of measured overdue');
          start();
        }, one_second);
      });
    });
  });

  asyncTest( 'Running instances have their overall running cost (in ms) exposed as `$.reel.cost`', function()
  {
    expect(3);

    $('#image').reel({ speed: 1 });

    setTimeout(function(){
      var
        cost_of_one

      ok( is('Number', cost_of_one= $.reel.cost), 'Number `$.reel.cost`')
      ok( cost_of_one >= 0, 'Non-zero cost of one instance (' + cost_of_one + ' ms)' )

      $('#image2').reel({ speed: 2 });
      $('#stitched_looping').reel({ speed: 2 });

      setTimeout(function(){
        var
          cost_of_three= $.reel.cost

        ok( cost_of_three > 0, 'Non-zero cost of two more instances (' + cost_of_three + ' ms)' )
        start();

      }, 100);

    }, 100);

  });

  $.each({
    'no opening': { /* No `opening` equals `opening: 0` */ },
    'zero opening': { opening: 0 },
    'valid opening': { opening: 1.23 }
  },
  function(ix, setup){
    asyncTest( 'Removal of redundant `rowChange` and untimately the `frameChange` event from `loaded.fu` handler left the functionality untouched when ' + ix + ' is set', function()
    {
      expect(1);
      var
        ticked,
        $reel= $('#image').reel(setup)

      $(document).bind('loaded.test', function(){
        $(document).bind('frameChange.test', function(){
          ok( !ticked, '`openingDone` induced `frameChange` triggered before the first tick');
          start();
        })
        $(document).bind('tick.reel.test', function(){
          ticked= true;
        });
      });

    });
  });

  asyncTest( 'Playing the instance with speed parameter set has the power to reverse the animation direction', function(){
    expect(2);
    var
      $reel= $('#image').reel({
        speed: 0.5
      })

    $(document).bind('openingDone.test', function(){
      equal( $reel.reel('backwards'), false, 'Animates forward' );
      $reel.trigger('play', -0.5);

      equal( $reel.reel('backwards'), true, 'Animates backwards' );
      start();
    });

  });

  asyncTest( 'GH-142 Velocity kick after all images are loaded', function(){
    /*
      `velocity` value shouldn't be set on setup, but rather after all images are loaded
    */
    expect(3);
    var
      $reel= $('#image').reel({
        velocity: 3
      })

    equal( $reel.reel('velocity'), 0, '`velocity` value at initialization (setup)');

    $reel.bind('loaded.test', function(){
      equal( $reel.reel('velocity'), 0, '`velocity` value right after loading is complete');
    });

    $(document).bind('opening.test', function(){
      equal( $reel.reel('velocity'), 3, '`velocity` value after initialization (incl. preload) is complete');
      start();
    });

  });

})(jQuery);
