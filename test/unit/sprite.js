/**
 * .reel Unit Tests
 */
(function($){

  var
    browser = (function( ua ) {
      // Adapted from jQuery Migrate
      // https://github.com/jquery/jquery-migrate/blob/master/src/core.js
      var
        match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
                /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
                /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
                /(msie) ([\w.]+)/.exec( ua ) ||
                ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
                [],
        browser = {
          browser: match[ 1 ] || "",
          version: match[ 2 ] || "0"
        }

      if (browser.browser){
        browser[browser.browser] = true;
      }
      return browser;

    })(navigator.userAgent.toLowerCase())

  module('Sprite', reel_test_module_routine);

  test( 'Multi-row: Frame shifting (4 rows)', function(){

    var
      iesaurus = browser.msie && +browser.version < 9, // Flag for IE 8- quirks
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
             //     tier        frame              X             Y
        '1': [         0,           2,      '-276px',        '0px' ],
        '2': [    0.3333,           8,      '-276px',     '-252px' ],
        '3': [    0.6667,          14,      '-276px',     '-504px' ],
        '4': [         1,          20,      '-276px',     '-756px' ]
      }

    expect(iesaurus ? 21 : 17);

    equal( $reel.reel('frame'), 2, 'Initial frame');

    $.each(entries, function(ix, it){
      $reel.trigger('rowChange', Number(ix));
      equal( $reel.data('row'), ix, 'Row '+ix+': Interpolated row');
      equal( $reel.data('tier').toFixed(4), it[0], 'Row '+ix+': Tier');
      equal( $reel.data('frame'), it[1], 'Row '+ix+': Shifted frame');
      if (iesaurus){
        equiv( $reel.css('backgroundPositionX'), it[2], 'Row '+ix+': Sprite CSS background X position');
        equiv( $reel.css('backgroundPositionY'), it[3], 'Row '+ix+': Sprite CSS background Y position');
      }else{
        equiv( $reel.css('backgroundPosition'), it[2]+' '+it[3], 'Row '+ix+': Sprite CSS background position');
      }
    });
  });

  test( 'Multi-row: Uneven rows frame shifting (3 rows)', function(){
    var
      iesaurus = browser.msie && +browser.version < 9, // Flag for IE 8- quirks
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
             //     tier        frame              X             Y
        '3': [         1,          17,         '0px',     '-504px' ],
        '2': [       0.5,          11,      '-552px',     '-252px' ],
        '1': [         0,           5,         '0px',     '-126px' ]
      }

    expect(iesaurus ? 15 : 12);

    $.each(entries, function(ix,it){
      $reel.trigger('rowChange', Number(ix));
      equal( $reel.data('row'), ix, 'Row '+ix+': Interpolated row');
      equal( $reel.data('tier'), it[0], 'Row '+ix+': Interpolated row');
      equal( $reel.data('frame'), it[1], 'Row '+ix+': Shifted frame');
      if (iesaurus){
        equiv( $reel.css('backgroundPositionX'), it[2], 'Row '+ix+': Sprite CSS background X position');
        equiv( $reel.css('backgroundPositionY'), it[3], 'Row '+ix+': Sprite CSS background Y position');
      }else{
        equiv( $reel.css('backgroundPosition'), it[2]+' '+it[3], 'Row '+ix+': Sprite CSS background position');
      }
    });
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

    $(document).bind('loaded.test', function(){
      equal( $reel.data('row'), 3);
      equal( $reel.data('frame'), 17);
      equal( $reel.data('backwards'), false);

      $reel.data('backwards', true);
      equal( $reel.data('row'), 3);
      equal( $reel.data('frame'), 17);
      equal( $reel.data('backwards'), true);
      start();
    });
  });

  asyncTest( 'Multi-row: Stitched should always receive transparent image even for multiple images', function(){
    expect(1);
    var
      selector= '#image',
      $reel= $(selector).reel({
        stitched: 600,
        images: 'stitched-row-##.png',
        rows: 5
      })

    $(document).bind('loaded.test', function(){
      ok( $reel.attr('src').search(/CAAIAIAAAAAAAAA|blank\.gif/) >= 0 );
      start();
    });
  });

  test( 'Multi-row: Non-looping stitched panorama shifting (3 rows)', function(){
    var
      iesaurus = browser.msie && +browser.version < 9, // Flag for IE 8- quirks
      selector= '#image',
      $reel= $(selector).reel({
        stitched: 500 + 276, // 276px is width of the stage
        frame:    2,
        frames:   5,
        rows:     3,
        row:      2,
        loops:    false
      }),
      /*
      Sprite layout:

      A1                    1  2  3  4  5
      B1  in real frames »  6  7  8  9 10
      C1                   11 12 13 14 15

      (letter ~ row; number ~ frame)
      */
      entries= {
             //     tier        frame              X             Y
        '3': [         1,          12,      '-125px',     '0'      ],
        '2': [       0.5,           7,      '-125px',     '-126px' ],
        '1': [         0,           2,      '-125px',     '-252px' ]
      }

    expect(iesaurus ? 15 : 12);

    $.each(entries, function(ix,it){
      $reel.trigger('rowChange', Number(ix));
      equal( $reel.data('row'), ix, 'Row '+ix+': Interpolated row');
      equal( $reel.data('tier'), it[0], 'Row '+ix+': Interpolated row');
      equal( $reel.data('frame'), it[1], 'Row '+ix+': Shifted frame');
      if (iesaurus){
        equiv( $reel.css('backgroundPositionX'), it[2], 'Row '+ix+': Sprite CSS background X position');
        equiv( $reel.css('backgroundPositionY'), it[3], 'Row '+ix+': Sprite CSS background Y position');
      }else{
        equiv( $reel.css('backgroundPosition'), it[2]+' '+it[3], 'Row '+ix+': Sprite CSS background position');
      }
    });
  });

  test( 'Multi-row: Looping stitched panorama shifting (3 rows)', function(){
    var
      iesaurus = browser.msie && +browser.version < 9, // Flag for IE 8- quirks
      selector= '#image',
      $reel= $(selector).reel({
        stitched: 500 + 276, // 276px is width of the stage
        frame:    4,
        frames:   5,
        rows:     3,
        row:      2
      }),
      /*
      Sprite layout:

      A1                    1  2  3  4  5
      B1  in real frames »  6  7  8  9 10
      C1                   11 12 13 14 15

      (letter ~ row; number ~ frame)
      */
      entries= {
             //     tier        frame              X             Y
        '3': [         1,          14,      '-582px',     '0'      ],
        '2': [       0.5,           9,      '-582px',     '-126px' ],
        '1': [         0,           4,      '-582px',     '-252px' ]
      }

    expect(iesaurus ? 15 : 12);

    $.each(entries, function(ix,it){
      $reel.trigger('rowChange', Number(ix));
      equal( $reel.data('row'), ix, 'Row '+ix+': Interpolated row');
      equal( $reel.data('tier'), it[0], 'Row '+ix+': Interpolated row');
      equal( $reel.data('frame'), it[1], 'Row '+ix+': Shifted frame');
      if (iesaurus){
        equiv( $reel.css('backgroundPositionX'), it[2], 'Row '+ix+': Sprite CSS background X position');
        equiv( $reel.css('backgroundPositionY'), it[3], 'Row '+ix+': Sprite CSS background Y position');
      }else{
        equiv( $reel.css('backgroundPosition'), it[2]+' '+it[3], 'Row '+ix+': Sprite CSS background position');
      }
    });
  });

  test( 'Multi-row: `$.reel.sequence()` ignores number of stitched frames and loads one file per row', function()
  {
    expect(1);
    var
      selector= '#image',
      $reel= $(selector).reel({
        stitched: 300,
        images: 'stitched-row-##.png',
        rows: 3
      })

    deepEqual( $reel.reel('cached'), [
      'stitched-row-01.png',
      'stitched-row-02.png',
      'stitched-row-03.png'
    ]);
  });

  test( 'Multi-row: Stitched panorama shifting of individual images (5 rows)', function()
  {
    expect(12);
    var
      iesaurus = browser.msie && +browser.version < 9, // Flag for IE 8- quirks
      selector= '#image',
      $reel= $(selector).reel({
        stitched: 300,
        frame:    3,
        frames:   5,
        rows:     5,
        row:      3,
        images:   'stitched-row-##.png'
      }),
      entries= {
             //     tier        frame                       file
        '5': [         1,          23,      'stitched-row-05.png' ],
        '3': [       0.5,          13,      'stitched-row-03.png' ],
        '1': [         0,           3,      'stitched-row-01.png' ]
      }

    $.each(entries, function(ix,it){
      $reel.trigger('rowChange', Number(ix));
      equal( $reel.data('row'), ix, 'Row '+ix+': Interpolated row');
      equal( $reel.data('tier'), it[0], 'Row '+ix+': Interpolated row');
      equal( $reel.data('frame'), it[1], 'Row '+ix+': Shifted frame');
      ok( $reel.css('backgroundImage').search(it[2]) >= 0, 'Row '+ix+': CSS background image file');
    });
  });

})(jQuery);
