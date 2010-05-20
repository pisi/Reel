/**
 * .reel Unit Tests
 */
(function($, document){

  module('Animation', { teardown: function teardown(){
    $('.jquery-reel').trigger('teardown');
  }});

	asyncTest( 'Speed of ticker can not be changed by any consequent Reel', function(){
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
				ok( timeout < should_be+1 && timeout > should_be-1,
					'Measured delay between two ticks matches given 6fps tempo despite setting it to 25fps' );
				$pool.unbind('tick.reel', tick);
				start();
			}
		}
	});

})(jQuery, this);