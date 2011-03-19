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
			fps= 3,
			lazy= (/iphone|ipod|android/i).test(navigator.userAgent),
			$reel= $('#image').reel({ tempo: fps }),
			should_be= 1000 / fps * (lazy? $.reel.laziness:1),
			ticks= [],
			timeout,
			$pool= $(document).bind('tick.reel', tick);
		function tick(){
			if (ticks.length < 2){
				ticks.push(new Date());
			}else if (ticks.length == 2){
				timeout= ticks[1] - ticks[0];
				ok( timeout > should_be - 0.2*should_be && timeout < should_be + 0.2*should_be,
					'Measured delay between two ticks matches tempo given in options (± 20 %)' );
				$pool.unbind('tick.reel', tick);
				start();
			}
		}
	});

})(jQuery);