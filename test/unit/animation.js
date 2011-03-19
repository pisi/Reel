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
			fps= 3,
			lazy= (/iphone|ipod|android/i).test(navigator.userAgent),
			$reel= $('#image').reel({ tempo: 25 }),
			should_be= 1000 / fps * (lazy? $.reel.laziness:1),
			ticks= [],
			start= new Date(),
			timeout= 0,
			$pool= $(document).bind('tick.reel', tick);
		function tick(){
			if (ticks.length < $.reel.def.tempo){
				ticks.push(new Date());
			}else if (ticks.length == $.reel.def.tempo){
				ticks.push(new Date());
        timeout= ticks[ticks.length - 1] - ticks[0];
				ok( timeout < should_be + 0.2*should_be && timeout > should_be - 0.2*should_be,
					'Measured delay between two ticks matches given 6fps tempo despite setting it to 25fps (± 20 %)' );
				$pool.unbind('tick.reel', tick);
				start();
			}
		}
	});

})(jQuery);