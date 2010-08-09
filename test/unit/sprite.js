/**
 * .reel Unit Tests
 */
(function($){

  module('Sprite', { teardown: function teardown(){
    $('.jquery-reel').trigger('teardown');
  }});

  asyncTest( 'Multi-row: Frame shifting', function(){
  /*
  A1 A2 A3
  A4 A5 A6
  B1 B2 B3
  B4 B5 B6
  C1 C2 C3
  C4 C5 C6
  D1 D2 D3
  D4 D5 D6
  */
    var
      selector= '#image',
      $reel= $(selector).reel({
        frames: 6,
        frame: 2,
        footage: 3,
        rows: 4,
        row: 1
      })
    equal( $reel.data('row'), 0);
    equal( $reel.data('frame'), 2);
    equal( $reel.css('backgroundPosition'), '-276px 0px');

    $reel.trigger('rowChange', 2);
    equal( $reel.data('row'), 0.3333);
    equal( $reel.data('frame'), 8);
    equal( $reel.css('backgroundPosition'), '-276px -252px');

    $reel.trigger('rowChange', 3);
    equal( $reel.data('row'), 0.6667);
    equal( $reel.data('frame'), 14);
    equal( $reel.css('backgroundPosition'), '-276px -504px');

    $reel.trigger('rowChange', 4);
    equal( $reel.data('row'), 1);
    equal( $reel.data('frame'), 20);
    equal( $reel.css('backgroundPosition'), '-276px -756px');
    start();
  });

  asyncTest( 'Multi-row: Uneven rows frame shifting', function(){
  /*
  A1 A2 A3 A4
  A5 A6 B1 B2
  B3 B4 B5 B6
  C1 C2 C3 C4
  C5 C6
  */
    var
      selector= '#image',
      $reel= $(selector).reel({
        frames: 6,
        footage: 4,
        frame: 5,
        rows: 3,
        row: 3
      })
    equal( $reel.data('row'), 1);
    equal( $reel.data('frame'), 17);
    equal( $reel.css('backgroundPosition'), '0px -504px');

    $reel.trigger('rowChange', 2);
    equal( $reel.data('row'), 0.5);
    equal( $reel.data('frame'), 11);
    equal( $reel.css('backgroundPosition'), '-552px -252px');

    $reel.trigger('rowChange', 1);
    equal( $reel.data('row'), 0);
    equal( $reel.data('frame'), 5);
    equal( $reel.css('backgroundPosition'), '0px -126px');
    start();
  });

  asyncTest( 'Multi-row: Immune to `backwards` value', function(){
    var
      selector= '#image',
      $reel= $(selector).reel({
        frames: 6,
        footage: 4,
        frame: 5,
        rows: 3,
        row: 3
      })
    equal( $reel.data('row'), 1);
    equal( $reel.data('frame'), 17);
    equal( $reel.data('backwards'), false);

    $reel.data('backwards', true);
    equal( $reel.data('row'), 1);
    equal( $reel.data('frame'), 17);
    equal( $reel.data('backwards'), true);
    start();
  });

})(jQuery);