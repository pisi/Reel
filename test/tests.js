/**
 * .reel Unit Test
 */
(function($){

// All tests reside inside `unit/` folder

	module('Animation', { teardown: function teardown(){
	  $('.jquery-reel').trigger('teardown');
	} });

	asyncTest( 'Very first initiated Reel sets `tempo` of ticker shared by all others', function(){
		expect(1);
		var
			fps= 36,
			lazy= (/iphone|ipod|android/i).test(navigator.userAgent),
			$reel= $('#image').reel({ tempo: fps }),
			should_be= 1000 / fps * (lazy? $.reel.def.laziness:1),
			ticks= [],
			samples= 72,
			sum= 0,
			duration,
			$pool= $(document).bind('tick.reel', tick);
		function tick(){
			if (ticks.length <= samples){
				// Collect time signatures until `samples` target reached
				ticks.push(new Date());
			}else if (ticks.length > samples){
				while (ticks.length > 1){
					// Cut off last signature and substract the preceding one to get the time difference
					sum+= ticks.pop() - ticks[ticks.length - 1]
				}
				// Calculate average tick duration
				duration= sum / samples;
				ok( duration > should_be - 0.1*should_be && duration < should_be + 0.1*should_be,
					'Measured delay between two ticks matches tempo given in options (± 10 %)' );
				$pool.unbind('tick.reel', tick);
				start();
			}
		}
	});

})(jQuery);