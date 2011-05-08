/**
 * .reel Unit Tests
 */
(function($){

  module('Sprite', { teardown: function teardown(){
    $('.jquery-reel').unbind('loaded').trigger('teardown');
  }});

  asyncTest( 'Multi-row: Frame shifting (4 rows)', function(){
    expect($.browser.msie ? 16 : 12);
    var
      selector= '#image',
      $reel= $(selector).reel({
        frames: 6,
        frame: 2,
        footage: 3,
        rows: 4,
        row: 1
      }),
      /*
      Sprite layout:

      A1 A2 A3                     1  2  3
      A4 A5 A6                     4  5  6
      B1 B2 B3                     7  8  9
      B4 B5 B6  in real frames »  10 11 12
      C1 C2 C3                    13 14 15
      C4 C5 C6                    16 17 18
      D1 D2 D3                    19 20 21
      D4 D5 D6                    22 23 24

      (letter ~ row; number ~ frame)
      */
      entries= {
        '1': [         0,           2,      '-276px',        '0px' ],
        '2': [    0.3333,           8,      '-276px',     '-252px' ],
        '3': [    0.6667,          14,      '-276px',     '-504px' ],
        '4': [         1,          20,      '-276px',     '-756px' ]
      }
    $.each(entries, function(ix,it){
      $reel.trigger('rowChange', Number(ix));
      equal( $reel.data('row'), it[0], 'Row '+ix+': Interpolated row');
      equal( $reel.data('frame'), it[1], 'Row '+ix+': Shifted frame');
      if ($.browser.msie){
        // MSIE returns undefined backgroundPosition, so we need to check individual ones
        equiv( $reel.css('backgroundPositionX'), it[2], 'Row '+ix+': Sprite CSS background X position');
        equiv( $reel.css('backgroundPositionY'), it[3], 'Row '+ix+': Sprite CSS background Y position');
      }else{
        equiv( $reel.css('backgroundPosition'), it[2]+' '+it[3], 'Row '+ix+': Sprite CSS background position');
      }
    });
    start();
  });

  asyncTest( 'Multi-row: Uneven rows frame shifting (3 rows)', function(){
    expect($.browser.msie ? 12 : 9);
    var
      selector= '#image',
      $reel= $(selector).reel({
        frames: 6,
        footage: 4,
        frame: 5,
        rows: 3,
        row: 3
      }),
      /*
      Sprite layout:

      A1 A2 A3 A4                    1  2  3  4
      A5 A6 B1 B2                    5  6  7  8
      B3 B4 B5 B6  in real frames »  9 10 11 12
      C1 C2 C3 C4                   13 14 15 16
      C5 C6                         17 18

      (letter ~ row; number ~ frame)
      */
      entries= {
        '3': [         1,          17,         '0px',     '-504px' ],
        '2': [       0.5,          11,      '-552px',     '-252px' ],
        '1': [         0,           5,         '0px',     '-126px' ]
      }
    $.each(entries, function(ix,it){
      $reel.trigger('rowChange', Number(ix));
      equal( $reel.data('row'), it[0], 'Row '+ix+': Interpolated row');
      equal( $reel.data('frame'), it[1], 'Row '+ix+': Shifted frame');
      if ($.browser.msie){
        // MSIE returns undefined backgroundPosition, so we need to check individual ones
        equiv( $reel.css('backgroundPositionX'), it[2], 'Row '+ix+': Sprite CSS background X position');
        equiv( $reel.css('backgroundPositionY'), it[3], 'Row '+ix+': Sprite CSS background Y position');
      }else{
        equiv( $reel.css('backgroundPosition'), it[2]+' '+it[3], 'Row '+ix+': Sprite CSS background position');
      }
    });
    start();
  });

  asyncTest( 'Multi-row: Immune to `backwards` value', function(){
    expect(6);
    var
      selector= '#image',
      $reel= $(selector).reel({
        frames: 6,
        footage: 4,
        frame: 5,
        rows: 3,
        row: 3
      })

    $reel.bind('loaded', function(){
      equal( $reel.data('row'), 1);
      equal( $reel.data('frame'), 17);
      equal( $reel.data('backwards'), false);

      $reel.data('backwards', true);
      equal( $reel.data('row'), 1);
      equal( $reel.data('frame'), 17);
      equal( $reel.data('backwards'), true);
      start();
    });
  });

})(jQuery);