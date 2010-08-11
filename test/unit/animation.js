/**
 * .reel Unit Tests
 */
(function($){

  module('Animation', { teardown: function teardown(){
    $('.jquery-reel').trigger('teardown');
  }});

	asyncTest( 'Speed of ticker can not be changed by any consequent Reel', function(){
		expect(1);
		var
			fps= 6,
			$reel= $('#image').reel({ tempo: 25 }),
			should_be= 1000 / fps, // 6 fps ~ 166.67ms tick
			ticks= [],
			timeout,
			$pool= $(document).bind('tick.reel', tick);
		function tick(){
			if (ticks.length < 2){
				ticks.push(new Date());
			}else if (ticks.length == 2){
				timeout= ticks[1] - ticks[0];
				ok( timeout < should_be + 0.1*should_be && timeout > should_be - 0.1*should_be,
					'Measured delay between two ticks matches given 6fps tempo despite setting it to 25fps (± 10 %)' );
				$pool.unbind('tick.reel', tick);
				start();
			}
		}
	});

})(jQuery);