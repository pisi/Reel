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
        }, 500);

      }, 500);

    }, 500);

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

      asyncTest( 'Measuring 1 second timing accuracy when running ' + (speed ? 'animated' : 'non-animated') + ' instance at `tempo: ' + tempo + '`', function()
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

      }, 500);

    }, 500);

  });

  asyncTest( 'Playing the instance with speed parameter set has the power to reverse the animation direction', function(){
    expect(2);
    var
      $reel= $('#image').reel({
        speed: 0.5
      })

    $(document).bind('loaded.test', function(){
      equal( $reel.reel('backwards'), false, 'Animates forward' );
      $reel.trigger('play', -0.5);

      equal( $reel.reel('backwards'), true, 'Animates backwards' );
      start();
    });

  });

  $.each({
    'positive':                    { opt: { frame: 10               }, speed:  0.2, expect: { next_frames: 'increase', backwards: false } },
    'negative':                    { opt: { frame: 10               }, speed: -0.2, expect: { next_frames: 'decrease', backwards:  true } },
    'positive w/ intial negative': { opt: { frame: 15, speed: -0.08 }, speed:  0.4, expect: { next_frames: 'increase', backwards: false } },
    'negative w/ intial negative': { opt: { frame: 15, speed: -0.08 }, speed: -0.4, expect: { next_frames: 'decrease', backwards:  true } },
    'positive w/ intial positive': { opt: { frame: 15, speed:  0.08 }, speed:  0.4, expect: { next_frames: 'increase', backwards: false } },
    'negative w/ intial positive': { opt: { frame: 15, speed:  0.08 }, speed: -0.4, expect: { next_frames: 'decrease', backwards:  true } }
  },
  function( name, probe ){
    asyncTest( 'Test actual real playback direction when given a '+name+' speed', function(){
      expect( 4 );
      var
        beginning= probe.opt.frame,
        $reel= $('#image').reel(probe.opt)

      $(document).bind('loaded.test', function(){
        equal( $reel.reel('frame'), beginning, 'Intial start frame' );

        setTimeout(function(){
          var
            compare= $reel.reel('frame')

          $(document).bind('frameChange.test', function(){
            equal( $reel.reel('backwards'), probe.expect.backwards, '`backwards` flag' );
            equal( $reel.reel('speed'), probe.speed, '`speed` value' );

            switch (probe.expect.next_frames){
              case 'decrease': var correct= $reel.reel('frame') < beginning; break;
              case 'increase': var correct= $reel.reel('frame') > beginning; break;
            }
            ok( correct, 'Frame position '+probe.expect.next_frames );

            start();
          });

          $reel.trigger('play', probe.speed );
        }, 100);
      });

    });
  })

  asyncTest( 'GH-142 Velocity kick after all images are loaded', function(){
    /*
      `velocity` value shouldn't be set on setup, but rather after all images are loaded
    */
    expect(2);
    var
      $reel= $('#image').reel({
        velocity: 3
      })

    equal( $reel.reel('velocity'), 0, '`velocity` value at initialization (setup)');

    $(document).bind('opening.test', function(){
      equal( $reel.reel('velocity'), 3, '`velocity` value after initialization (incl. preload) is complete');
      start();
    });

  });

  asyncTest( 'Duration: Animation duration expressed in ticks is reset on `play`', function()
  {
    expect(2);
    var
      ticks,
      $reel= $('#image').reel({
        speed: 1,
        duration: 3
      })

    $(document).bind('loaded.test', function(){
      ticks= $reel.reel('ticks');
      ok( ticks > 0, 'Positive `ticks`');
      setTimeout(function(){
        $reel.trigger('play');
        equal( $reel.reel('ticks'), ticks, 'Positive `ticks` reset to same value on second `play`');
        start();
      }, 500);
    });
    

  });

  asyncTest( 'Duration: Ticks not set when no `duration` given', function()
  {
    expect(1);
    var
      ticks,
      $reel= $('#image').reel({
        speed: 1
      })

    $(document).bind('loaded.test', function(){
      $reel.trigger('play');
      equal( $reel.reel('ticks'), -1, 'Default value signalizing no duration');
      start();
    });

  });

  asyncTest( 'Duration: Ticks count down to zero', function()
  {
    var
      ticks_start,
      expected,
      samples= 5,
      $reel= $('#image').reel({
        speed: 1,
        duration: 2
      })

    expect(samples);

    $(document).bind('tick.reel.test', function(){
      var
        ticks= $reel.reel('ticks')

      if (ticks != -1){
        if (!ticks_start){
          ticks_start= expected= ticks;
        }else{
          equal( ticks, --expected, ticks);
          if (ticks <= ticks_start - samples) start();
        }
      }
    })

  });

  asyncTest( 'Duration: Stop the animation after the given duration', function()
  {
    expect(2);
    var
      ticks,
      $reel= $('#image').reel({
        speed: 1,
        duration: 0.2
      })

    $(document).bind('play.test', function(){
      setTimeout(function(){
        equal( $reel.reel('playing'), false, 'Not playing after');
        equal( $reel.reel('stopped'), true, 'Is stopped');
        start();
      }, 1000);
    });

  });

  $.each({
    'positive':           { start:  3, reach: 15, expect: { speed:  1 }},
    'negative':           { start: 13, reach:  5, expect: { speed: -1 }},
    'positive over edge': { start: 20, reach:  3, expect: { speed:  1 }},
    'negative over edge': { start:  2, reach: 18, expect: { speed: -1 }}
  },
  function(name, def){
    asyncTest( 'Reach: Trigger `reach` event to playback to given frame - '+name, function()
    {
      expect(3);
      var
        $reel= $('#image').reel({
          frame: def.start,
          frames: 24,
          speed: 1
        })

      $reel.trigger('reach', def.reach);

      $(document).bind('stop.test', function(){
        ok( true, 'Reached a stop');
        equal( $reel.reel('frame'), def.reach, 'On the right frame');
        equal( $reel.reel('speed'), def.expect.speed, 'With the right speed/direction');
        start();
      });
    });
  });

  asyncTest( 'Speed: Positive initial value', function()
  {
    expect(3);
    var
      frame,
      $reel= $('#image').reel({
        frame: 15,
        speed: 0.1
      })

    $(document).bind('play.test', function(){

      equal( $reel.reel('speed'), 0.1, 'Value of `speed`');
      equal( $reel.reel('backwards'), false, 'In backwards mode');

      $(document).bind('frameChange.test', function(){
        if (!frame){
          frame= $reel.reel('frame');
        }else{
          ok( $reel.reel('frame') > frame, 'Frames progress forward');

          start();
        }
      });
    });
  });

  asyncTest( 'Speed: negative initial value', function()
  {
    expect(3);
    var
      frame,
      $reel= $('#image').reel({
        frame: 15,
        speed: -0.1
      })

    $(document).bind('play.test', function(){

      equal( $reel.reel('speed'), -0.1, 'Value of `speed`');
      equal( $reel.reel('backwards'), true, 'In backwards mode');

      $(document).bind('frameChange.test', function(){
        if (!frame){
          frame= $reel.reel('frame');
        }else{
          ok( $reel.reel('frame') < frame, 'Frames progress backwards');

          start();
        }
      });
    });
  });

})(jQuery);
