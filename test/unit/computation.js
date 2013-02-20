/**
 * .reel Unit Tests
 */
(function($){

  module('Computation', reel_test_module_routine);

  asyncTest( '(Deprecated) `fractionChange` accepts and normalizes any real fraction passed', function(){
    expect(10);
    var
      selector= '#image',
      $reel= $(selector).reel(),
      entries= {
        '3': 0,
        '-2.1': 0.9,
        '-3.7': 0.3,
        '1.8': 0.8,
        '3.4': 0.4,
        '3.5': 0.5,
        '-0.3': 0.7,
        '1.23456': 0.2346,
        '-1.23456': 0.7654,
        '-1.2': 0.8
      }
    $(document).bind('loaded.test', function(){
      $.each(entries, function(ix,it){
        $reel.trigger('fractionChange', Number(ix));
        equal( $reel.data('fraction').toFixed(4), it, 'Passed '+ix);
      });
      start();
    });
  });

  asyncTest( '(Deprecated) `rowChange` accepts and normalizes any real row fraction passed', function(){
    expect(7);
    var
      selector= '#image',
      $reel= $(selector).reel({ rows: 3 }),
      entries= {
        '4': 3,
        '-2.1': 1,
        '1.8': 2,
        '0.4': 1,
        '-0.3': 1,
        '1.23456': 1,
        '-1.23456': 1
      }
    $(document).bind('loaded.test', function(){
      $.each(entries, function(ix,it){
        $reel.trigger('rowChange', Number(ix));
        equal( $reel.data('row').toFixed(4), it, 'Fraction '+ix);
      });
      start();
    });
  });

  asyncTest( '(Deprecated) `frameChange` accepts and normalizes any frame passed across all rows or orbits', function(){
    expect(19);
    var
      selector= '#image',
      $reel= $(selector).reel({ frames: 15, rows: 2 }),
      entries= {
        '1': 1,
        '2': 2,
        '20': 20,
        '0': 30,
        '30': 30,
        '31': 1,
        '25.3': 25,
        '50': 20,
        '60': 30,
        '90': 30,
        '-1': 29,
        '-2': 28,
        '-5': 25,
        '-29': 1,
        '-30': 30,
        '-31': 29,
        '-37': 23,
        '-60': 30,
        '-90': 30
      }
    $(document).bind('loaded.test', function(){
      $.each(entries, function(ix,it){
        $reel.trigger('frameChange', Number(ix));
        equal( $reel.data('frame'), it, 'Frame '+ix);
      });
      start();
    });
  });

  asyncTest( '`.reel("tier")` accepts and normalizes any real row tier passed', function(){
    expect(7);
    var
      selector= '#image',
      $reel= $(selector).reel({ rows: 3 }),
      entries= {
        '4': 1,
        '-2.1': 0,
        '1.8': 1,
        '0.8': 0.8,
        '-0.3': 0,
        '1.23456': 1,
        '-1.23456': 0
      }
    $(document).bind('loaded.test', function(){
      $.each(entries, function(ix,it){
        $reel.reel('tier', Number(ix));
        equal( $reel.data('tier').toFixed(4), it, 'Tier '+ix);
      });
      start();
    });
  });

  asyncTest( '`.reel("row")` accepts and normalizes any real row fraction passed', function(){
    expect(7);
    var
      selector= '#image',
      $reel= $(selector).reel({ rows: 3 }),
      entries= {
        '4': 3,
        '-2.1': 1,
        '1.8': 2,
        '0.4': 1,
        '-0.3': 1,
        '1.23456': 1,
        '-1.23456': 1
      }
    $(document).bind('loaded.test', function(){
      $.each(entries, function(ix,it){
        $reel.reel('row', Number(ix));
        equal( $reel.reel('row').toFixed(4), it, 'Fraction '+ix);
      });
      start();
    });
  });

  asyncTest( '`.reel("fraction")` accepts and normalizes any real fraction passed', function(){
    expect(10);
    var
      selector= '#image',
      $reel= $(selector).reel(),
      entries= {
        '3': 0,
        '-2.1': 0.9,
        '-3.7': 0.3,
        '1.8': 0.8,
        '3.4': 0.4,
        '3.5': 0.5,
        '-0.3': 0.7,
        '1.23456': 0.2346,
        '-1.23456': 0.7654,
        '-1.2': 0.8
      }
    $(document).bind('loaded.test', function(){
      $.each(entries, function(ix,it){
        $reel.reel('fraction', Number(ix));
        equal( $reel.reel('fraction').toFixed(4), it, 'Passed '+ix);
      });
      start();
    });
  });

  asyncTest( '`.reel("frame")` accepts and normalizes any frame passed across all rows or orbits', function(){
    expect(19);
    var
      selector= '#image',
      $reel= $(selector).reel({ frames: 15, rows: 2 }),
      entries= {
        '1': 1,
        '2': 2,
        '20': 20,
        '0': 30,
        '30': 30,
        '31': 1,
        '25.3': 25,
        '50': 20,
        '60': 30,
        '90': 30,
        '-1': 29,
        '-2': 28,
        '-5': 25,
        '-29': 1,
        '-30': 30,
        '-31': 29,
        '-37': 23,
        '-60': 30,
        '-90': 30
      }
    $(document).bind('loaded.test', function(){
      $.each(entries, function(ix,it){
        $reel.reel('frame', Number(ix));
        equal( $reel.reel('frame'), it, 'Frame '+ix);
      });
      start();
    });
  });

  asyncTest( 'Positive direction/speed is not detected as reversed', function(){
    expect(1);
    var
      selector= '#image',
      $reel= $(selector).reel({ speed: 1 })

    equal( $reel.data('backwards'), false, 'Not reversed at positive speed');
    start();
  });

  asyncTest( 'Negative direction/speed is detected as reversed', function(){
    expect(1);
    var
      selector= '#image',
      $reel= $(selector).reel({ speed: -1 })

    equal( $reel.data('backwards'), true, 'Reversed at negative speeds');
    start();
  });

  test( '`$.reel.preload.linear` for linear order of preloaded images', function(){
    expect(2);
    var
      images= '1,2,3,4,5,6,7,8,9,10'.split(/,/),
      $reel= $('#image').reel({ images: new Array().concat(images), preload: 'linear' })

    ok( typeof $.reel.preload.linear == 'function', '`$.reel.preload.linear` available');
    deepEqual( $reel.data('cached'), images, 'What comes in, comes out');
  });

  test( '`$.reel.preload.fidelity` for evenly spread preloaded images', function(){
    expect(1);

    ok( typeof $.reel.preload.fidelity == 'function', '`$.reel.preload.fidelity` available');
  });

  $.each({
    10: {
      options: {
        images: [1,2,3,4,5,6,7,8,9,10],
        frames: 10,
        frame: 1
      },
      ordered: [1,4,6,9, 10,3,5,8, 2,7]
    },
    12: {
      options: {
        images: [1,2,3,4,5,6,7,8,9,10,11,12],
        frames: 12,
        frame: 1
      },
      ordered: [1,4,7,10, 11,2,5,8, 12,3,6,9]
    },
    15: {
      options: {
        images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
        frames: 15,
        frame: 1
      },
      ordered: [1,5,9,12, 14,3,7,10, 2,6,13,15,4,8,11]
    },
    18: {
      options: {
        images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        frames: 18,
        frame: 1
      },
      ordered: [1,6,10,15, 17,4,8,13, 2,7,11,16,18,5,9,14, 3,12 ]
    },
    24: {
      options: {
        images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
        frames: 24,
        frame: 1
      },
      ordered: [1,7,13,19, 22,4,10,16, 3,9,15,21,24,6,12,18, 2,8,14,20,23,5,11,17]
    },
    36: {
      options: {
        images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],
        frames: 36,
        frame: 1
      },
      ordered: [1,10,19,28, 32,5,14,23, 3,12,21,30,34,7,16,25, 36,9,18,27,31,4,13,22,2,11,20,29,33,6,15,24, 35,8,17,26]
    },
    48: {
      options: {
        images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],
        frames: 48,
        frame: 1
      },
      ordered: [1,13,25,37, // 12
                43,7,19,31, // -6
                4,16,28,40, 46,10,22,34, // +3
                47,11,23,35, 41,5,17,29, 2,14,26,38, 44,8,20,32, // -2
                48,12,24,36, 42,6,18,30, 3,15,27,39, 45,9,21,33] // +1
    },

    // Atypicals with different starting points
    17: {
      options: {
        images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
        frames: 17,
        frame: 7
      },
      ordered: [7,11,16,3, 5,9,14,1, 8,12,17,4,6,10,15,2, 13]
    },
    23: {
      options: {
        images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
        frames: 23,
        frame: 11
      },
      ordered: [11,17,23,5, 8,14,20,2, 12,18,1,6,9,15,21,3, 10,16,22,4,7,13,19]
    },
    27: {
      options: {
        images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],
        frames: 27,
        frame: 27
      },
      ordered: [27,7,14,20, 24,4,11,17, 2,9,16,22,26,6,13,19, 23,3,10,1,8,15,21,25,5,12,18]
    },

    // Multi-rows
    '2x10': {
      options: {
        images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        frames: 10,
        frame: 1,
        rows: 2
      },
      ordered: [1,4,6,9, 10,3,5,8, 2,7, 11,14,16,19, 13,15,18, 12,17, 20]
    },
    '4x10': {
      options: {
        images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
        frames: 10,
        frame: 1,
        rows: 4,
        row: 2
      },
      ordered: [11,14,16,19, 20,13,15,18, 12,17, 1,4,6,9,21,24,26,29,31,34,36,39, 40,3,5,8,23,25,28,30,33,35,38, 2,7,10,22,27,32,37]
    },
    'orbital': {
      options: {
        images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
        footage: 9,
        frame: 1,
        orbital: 3
      },
      ordered: [1,3,6,8, 9,2,5,7, 4, 10,12,15,17, 11,14,16,13, 18]
    },
    'mini': {
      options: {
        images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,
                 51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,
                 101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120],
        frames: 20,
        rows: 6,
        row: 3,
        frame: 14
      },
      ordered: [54,59,44,49, 51,56,41,46, 55,60,45,50,52,57,42,47, 53,58,43,48, // row 3
                14,19,24,29, 34,39,64,69, 74,79,84,89, 94,99,104,109, 114,119,4,9, // 5
                11,16,21,26, 31,36,61,66, 71,76,81,86, 91,96,101,106, 111,116,1,6, // -3
                15,20,25,30, 35,40,65,70, 75,80,85,90, 95,100,105,110, 115,120,5,10, 12,17,22,27,32,37,62,67,72,77,82,87,92,97,102,107,112,117,2,7, // +1
                13,18,23,28, 33,38,63,68, 73,78,83,88, 93,98,103,108, 113,118,3,8 // -1
      ]
    }
  },
  function(ix, def){
    test( 'Fidelity spreading of preloaded images in "' + ix + '" scenario', function(){
      expect(2);
      var
        $reel= $('#image').reel(def.options)

      equal( $reel.data('cached').join(', '), def.ordered.join(', '), ix+' frames starting at frame '+def.options.frame);
      equal( $.unique($reel.data('cached')).length, def.ordered.length, 'equal length');
    });
  });

  $.each([
    '####',
    'folder/####',
    'folder/subfolder/####',
    '/folder/subfolder/####',
    '//server/folder/subfolder/####',
    'http://server/folder/subfolder/####',
    'https://server/folder/subfolder/####',
    'folder/####.jpg',
    'folder/prefix_####',
    'folder/prefix_####.jpg',
    'folder/prefix_####.gif',
    'folder/prefix_####.png',
    'folder/prefix_####.svg',
    'resources/mini/###.jpg|3..43|2'
  ],
  function(ix, probe){
    test( 'Sequence: "' + probe + '" matches the `$.reel.sequence_pattern` regular expression', function(){
      ok( probe.match($.reel.re.sequence), 'Matched');
    });
  });

  $.each({
    '###': [
      '###',        // [0]
                    // Counter URL:
      '###',        // [1] entire segment
      '###'         // [2] counter
    ],
    'image_#####_small.png': [
      'image_#####_small.png',  // [0]
                                // Counter URL:
      'image_#####_small.png',  // [1] entire segment
      '#####'                   // [2] counter
    ],
    'image_#####_small.png|1..36': [
      'image_#####_small.png|1..36',  // [0]
                                      // Counter URL:
      'image_#####_small.png',        // [1] entire segment
      '#####',                        // [2] counter
                                      // Optional range:
      '|1..36',                       // [3] entire range segment
      '1',                            // [4] start
      '36'                            // [5] end
    ],
    '##_small.jpg|20..50|3': [
      '##_small.jpg|20..50|3',  // [0]
                                // Counter URL:
      '##_small.jpg',           // [1] entire segment
      '##',                     // [2] counter
                                // Optional range:
      '|20..50',                // [3] entire segment
      '20',                     // [4] start
      '50',                     // [5] end
                                // Optional counter increment:
      '|3',                     // [6] entire segment
      '3'                       // [7] increment
    ],
    'resources/mini/###.jpg|3..43|2': [
      'resources/mini/###.jpg|3..43|2',   // [0]
                                          // Counter URL:
      'resources/mini/###.jpg',           // [1] entire segment
      '###',                              // [2] counter
                                          // Optional range:
      '|3..43',                           // [3] entire segment
      '3',                                // [4] start
      '43',                               // [5] end
                                          // Optional counter increment:
      '|2',                               // [6] entire segment
      '2'                                 // [7] increment
    ]
  },
  function(image, probe){
    test( 'Sequence: `$.reel.sequence_pattern` regular expression mapping of "' + image + '"', function(){
      var
        sequence= $.reel.re.sequence.exec( image ) || []

      sequence && equal( sequence.length, 8, 'correct length');
      equal( sequence.join(''), probe.join(''), image + ' passed');
    });
  });

  $.each({
    '####': [
      '0001',
      '0002',
      '0003',
      '0004'
    ],
    'prefix###.jpg': [
      'prefix001.jpg',
      'prefix002.jpg',
      'prefix003.jpg',
      'prefix004.jpg'
    ],
    'prefix#.jpg|1..16|4': [ // Single `#` doesn't left pad the counter number with zero `0`
      'prefix1.jpg',
      'prefix5.jpg',
      'prefix9.jpg',
      'prefix13.jpg'
    ],
    'PIC#####.jpg|320..323': [
      'PIC00320.jpg',
      'PIC00321.jpg',
      'PIC00322.jpg',
      'PIC00323.jpg'
    ],
    'DSCN####.JPG|255..270|5': [
      'DSCN0255.JPG',
      'DSCN0260.JPG',
      'DSCN0265.JPG',
      'DSCN0270.JPG'
    ]
  },
  function(sample, images){
    test( 'Sequence: `$.reel.sequence()` generates "images" array from given "' + sample + '" sequence', function(){
      var
        options= {
          frames: 4
        },
        sequence= $.reel.re.sequence.exec(sample)

      equal( $.reel.sequence(sequence, options).join(', '), images.join(', '), sample + ' generates');
    });
  });

  // Purpose of `envelope` is to calculate frame based on the movement
  // and make sure it doesn't loop and stays within bounds
  $.each([
    -1,
     1
  ], function(i, cwness){
    $.each([
        0,
      0.2,
      0.5,
        1
    ], function(ii, start){
      test( '`$.reel.math.envelope( start: '+start+', cwness: '+cwness+' )`', function(){
        expect(5);
        var
          revolution= 100,
          lo= -start * revolution,
          hi= revolution - start * revolution,

          below_zero= 1.5 * revolution,
          zero= 100 * start,
          meridian= 0,
          one= 100 * start - 100,
          above_one= -1.5 * revolution

        equal( $.reel.math.envelope(  above_one * cwness, start, revolution, lo, hi, cwness),     1, 'Result after drag '+above_one+'px to reach far above 1' );
        equal( $.reel.math.envelope(        one * cwness, start, revolution, lo, hi, cwness),     1, 'Result after drag '+one+'px to reach 1' );
        equal( $.reel.math.envelope(            meridian, start, revolution, lo, hi, cwness), start, 'Result at the meridian' );
        equal( $.reel.math.envelope(       zero * cwness, start, revolution, lo, hi, cwness),     0, 'Result after drag '+zero+'px to reach 0' );
        equal( $.reel.math.envelope( below_zero * cwness, start, revolution, lo, hi, cwness),     0, 'Result after drag '+below_zero+'px to reach far below 0' );
      });
    });
  });

  // Purpose of `hatch` is similar - to calculate frame based on the movement
  // and this time make sure it loops out-of-bounds input
  $.each([
    -1,
     1
  ], function(i, cwness){
    $.each([
        0,
      0.2,
      0.5,
        1
    ], function(ii, start){
      test( '`$.reel.math.hatch( start: '+start+', cwness: '+cwness+' )`', function(){
        expect(5);
        var
          revolution= 100,
          lo= 0,
          hi= revolution,

          below_zero= 1.5 * revolution,
          zero= 100 * start,
          meridian= 0,
          one= 100 * start - 100,
          above_one= -1.5 * revolution

        equal( $.reel.math.hatch(  above_one * cwness, start, revolution, lo, hi, cwness),  (0.5 + start) % 1, 'Result after drag '+above_one+'px to reach far above 1' );
        equal( $.reel.math.hatch(        one * cwness, start, revolution, lo, hi, cwness),                  0, 'Result after drag '+one+'px to reach 1' );
        equal( $.reel.math.hatch(            meridian, start, revolution, lo, hi, cwness),          start % 1, 'Result at the meridian' );
        equal( $.reel.math.hatch(       zero * cwness, start, revolution, lo, hi, cwness),                  0, 'Result after drag '+zero+'px to reach 0' );
        equal( $.reel.math.hatch( below_zero * cwness, start, revolution, lo, hi, cwness),  (0.5 + start) % 1, 'Result after drag '+below_zero+'px to reach far below 0' );
      });
    });
  });

  // Purpose of `interpolate` is to calculate a value within a given range based on given fraction
  $.each({
    '0.2, 20, 30': 22,
    '0, 5, 13': 5,
    '0.1, 0, 100': 10,
    '0.75, 0, 200': 150,
    '0.23, 50, 100': 61.5,
    '0.0, 100, 1000': 100,
    '1, 0, 200': 200,
    '1.0, 100, 150': 150
  }, function(definition, result){
    var
      def= definition.split(/, */),
      fraction= +def[0],
      min= +def[1],
      max= +def[2]

    test( '`$.reel.math.interpolate( fraction: '+fraction+', minimum: '+min+', maximum: '+max+' )`', function(){
      expect(1);

      equal( $.reel.math.interpolate( fraction, min, max ), result );
    });
  });

})(jQuery);
