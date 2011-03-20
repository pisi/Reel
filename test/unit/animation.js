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
		}
	});

})(jQuery);