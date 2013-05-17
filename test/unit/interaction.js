/**
 * .reel Unit Tests
 */
(function($){

  module('Interaction', reel_test_module_routine);

  asyncTest( 'Multirow row lock', function(){
    expect(4);
    var
      frame= 2,
      row= 2,
      $reel= $('#image').reel({
        frames: 3,
        frame: 2,
        rows: 3,
        rowlock: true,
        row: row
      })

    $(document).bind('loaded.test', function(){
      equal( $reel.reel('rowlock'), true, 'Rowlock engaged');
      equal( $reel.reel('row'), row, 'Locked on row');

      $reel.trigger('down', [0, 0]);
      $reel.trigger('pan', [200, 200]);
      $reel.trigger('up', [200, 200]);

      equal( $reel.reel('row'), row, 'Holding the locked row after diagonal drag');
      ok( $reel.reel('frame') != frame, 'Frame has changed');
      start();
    });
  });

})(jQuery);
