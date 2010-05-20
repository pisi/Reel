/**
 * .reel Unit Test
 */
(function($, document){

// All tests reside inside `unit/` folder

	module('Animation', { teardown: function teardown(){
	  $('.jquery-reel').trigger('teardown');
	} });

	asyncTest( 'Very first initiated Reel sets `tempo` of ticker shared by all others', function(){
		var
			fps= 6,
			$reel= $('#image').reel({ tempo: fps }),
			should_be= 1000 / fps, // 6 fps ~ 166.67ms tick
			ticks= [],
			timeout,
			$pool= $(document).bind('tick.reel', tick);
		function tick(){
			if (ticks.length < 2){
				ticks.push(new Date());
			}else if (ticks.length == 2){
				timeout= ticks[1] - ticks[0];
				ok( timeout > should_be-1 && timeout < should_be+1,
					'Measured delay between two ticks matches tempo given in options' );
				$pool.unbind('tick.reel', tick);
				start();
			}
		}
	});

})(jQuery, this);