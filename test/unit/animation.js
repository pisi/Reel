/**
 * .reel Unit Tests
 */
(function($){

  module('Animation', { teardown: function teardown(){
    $('.jquery-reel').trigger('teardown');
    $(document).unbind('tick.reel');
  }});

  asyncTest( 'When at least one instance of Reel is present in the DOM a shared ticker is started', function()
  {
    expect(1);

    $(document).bind('tick.reel', tick);

    var
      ticks = 0;

    setTimeout(function(){
      ok( ticks == 0, 'Ticker isn\'t running when no Reel is on');
      start();
    }, 1000);

    function tick(){
      ticks++
    }
  });

  asyncTest( 'Ticker is driven by `leader`\'s data from `$.reel.leader()`', function()
  {
    expect(9);

    $(document).bind('tick.reel', tick);

    var
      ticks = 0,
      $faster = $('#image').reel({ tempo: 20 }),
      $slower = $('#image2').reel({ tempo: 10 });

    setTimeout(function(){
      deepEqual( $.reel.leader(), $faster.data(), 'Leader\'s data are the first (oldest living) instance\'s data')
      equals( $.reel.leader('tempo'), $faster.data('tempo'), 'Timer keeps faster tempo dictated by the leader');

      ok( $faster.trigger('teardown'), 'The older faster instance destroyed (the latter slower instance remains)');

      setTimeout(function(){
        deepEqual( $.reel.leader(), $slower.data(), 'Leader\'s data are the second (now the only) instance\'s data')
        equals( $.reel.leader('tempo'), $slower.data('tempo'), 'Ticker slowed down');

        ok( $slower.trigger('teardown'), 'Slower instance removed too (no instance remains)')
        var
          ticks_copy= ticks;

        setTimeout(function(){
          equals( $.reel.leader(), undefined, 'Without a leader there\'s no data');
          equals( $.reel.leader('tempo'), undefined, 'and no leader\'s tempo');
          equals( ticks_copy, ticks, 'Ticker is stopped.');

          start();
        }, 1000);

      }, 1000);

    }, 1000);

    function tick(){
      ticks++
    }
  });

  // We generate tests for several different tempos ranging from 6 to 48
  $.each([6, 8, 10, 12, 18, 24, 36], function(ix, tempo){

    var
      one_second= 1000,
      lazy_tempo= tempo / ($.reel.lazy? $.reel.def.laziness : 1),
      tolerate= 10, // percents
      tolerance= {
        lo: 1 - tolerate / 100,
        hi: 1 + tolerate / 100
      }

    // We also try both animated and non-animated
    $.each([0, 1], function(ixx, speed){

      asyncTest( 'Measuring 1 second timing accuracy when running ' + (speed ? 'animated' : 'non-animated') + ' instance at `tempo: ' + lazy_tempo + '`', function()
      {
        expect(2);

        var
          ticks= 0,
          sum= 0,
          bang= +new Date(),
          $reel= $('#image').reel({ tempo: tempo, speed: speed })

        $(document).bind('tick.reel', function tick(){
          ticks++;
        });

        setTimeout(function(duration){
          var filled;
          duration= +new Date() - bang;
          ok( (filled= duration / one_second) >= tolerance.lo && filled <= tolerance.hi, duration + ' ms is within the ' + tolerate + ' % tolerance.');
          ok( true, 'Received ' + ticks + ' ticks');
          start();
        }, one_second);
      });
    });
  });

  asyncTest( 'Running instances have their overall running cost (in ms) exposed as `$.reel.cost`', function()
  {
    expect(4);

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

        ok( cost_of_three > 0, 'Non-zero cost of two instances (' + cost_of_three + ' ms)' )
        ok( cost_of_three > cost_of_one, 'Running cost of three instances is higher then of one' )
        start();

      }, 100);

    }, 100);

  });

})(jQuery);