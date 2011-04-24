/**
 * .reel Unit Tests
 */
(function($){

  module('Animation', { teardown: function teardown(){
    $('.jquery-reel').trigger('teardown');
  }});

	asyncTest( 'Speed of ticker can not be changed by any consequent Reel', function(){
		expect(3);
		var
			tempo= $.reel.def.tempo,
			$reel= $('#image').reel({ tempo: 25 }), // Attempt to set different tempo
			projected= 1000 / tempo * ($.reel.lazy? $.reel.def.laziness : 1),
			ticks= [],
			samples= 100,
			sum= 0,
			duration,
			$pool= $(document).bind('tick.reel', tick);
		function tick(){
			if (ticks.length <= samples){
				// Collect time signatures for 100 consecutive ticks
				ticks.push(new Date());
			}else if (ticks.length > samples){
				while (ticks.length > 1){
					// Cut off last signature and substract the preceding one to get the time difference
					// and add it to sum
					sum+= ticks.pop() - ticks[ticks.length - 1]
				}
				// Calculate average tick duration
				duration= sum / samples;
				ok( true, 'Measured average duration of one tick: ' + duration);
				ok( true, 'Projected duration: ' + projected);
				ok( Math.abs(duration - projected) < 0.1 * projected,
				'Measured delay between two ticks matches given 36fps tempo despite setting it to 25fps (± 10 %)' );
				$pool.unbind('tick.reel', tick);
				start();
			}

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

	asyncTest( 'Running instances have their overall running cost (in ms) exposed as `$.reel.cost`', function()
	{
		expect(1);

		$('#image').reel({ speed: 1 });

		setTimeout(function(){
			var
				cost_of_one

			ok( is('Number', cost_of_one= $.reel.cost), 'Number `$.reel.cost`')
			ok( cost_of_one > 0, 'Non-zero cost of one instance ' + cost_of_one + ' ms)' )

			$('#image2').reel({ speed: 2 });

			setTimeout(function(){
				var
					cost_of_two= $.reel.cost

				ok( cost_of_two > 0, 'Non-zero cost of two instances (' + cost_of_two + ' ms)' )
				ok( cost_of_two > cost_of_one, 'Higher cost of two then of one instance' )
				start();

			}, 100);

		}, 100);

	});

})(jQuery);