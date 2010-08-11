/**
 * .reel Unit Tests
 */
(function($){

  module('Interaction', { teardown: function teardown(){
    $('.jquery-reel').trigger('teardown');
  }});

  asyncTest( 'Coupling: Two coupled instances have equal states after mouse-wheeling one or the other', function(){
		expect(8);
    var
      master= '#image',
      slave= '#image2',
      $master= $(master).reel({ couple: $(slave) }),
      $slave= $(slave).reel({ couple: $(master) })

    equal( $master.data('frame'), $slave.data('frame'));
    equal( $master.data('fraction'), $slave.data('fraction'));

    $master.data('hotspot').trigger('mousewheel', -10);
    equal( $master.data('frame'), $slave.data('frame'));
    equal( $master.data('fraction'), $slave.data('fraction'));
    equal( $master.data('backwards'), $slave.data('backwards'));

    $slave.data('hotspot').trigger('mousewheel', 5);
    equal( $master.data('frame'), $slave.data('frame'));
    equal( $master.data('fraction'), $slave.data('fraction'));
    equal( $master.data('backwards'), $slave.data('backwards'));

    start();
  });

})(jQuery);