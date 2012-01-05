/**
 * .reel Unit Tests
 */
(function($){

  module('Computation', reel_test_module_routine);

  asyncTest( '`fractionChange` accepts and normalizes any real fraction passed', function(){
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
    $reel.one('loaded', function(){
      $.each(entries, function(ix,it){
        $reel.trigger('fractionChange', Number(ix));
        equal( $reel.data('fraction').toFixed(4), it, 'Passed '+ix);
      });
      start();
    });
  });

  asyncTest( '`rowChange` accepts and normalizes any real row fraction passed', function(){
    expect(7);
    var
      selector= '#image',
      $reel= $(selector).reel({ rows: 3 }),
      entries= {
        '4': 1,
        '-2.1': 0,
        '1.8': 0.4,
        '0.4': 0,
        '-0.3': 0,
        '1.23456': 0.1173,
        '-1.23456': 0
      }
    $reel.one('loaded', function(){
      $.each(entries, function(ix,it){
        $reel.trigger('rowChange', Number(ix));
        equal( $reel.data('row').toFixed(4), it, 'Fraction '+ix);
      });
      start();
    });
  });

  asyncTest( '`frameChange` accepts and normalizes any frame passed across all rows or orbits', function(){
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
    $reel.one('loaded', function(){
      $.each(entries, function(ix,it){
        $reel.trigger('frameChange', Number(ix));
        equal( $reel.data('frame'), it, 'Frame '+ix);
      });
      start();
    });
  });

  asyncTest( 'Positive direction/spped is not detected as reversed', function(){
    expect(1);
    var
      selector= '#image',
      $reel= $(selector).reel({ speed: 1 })

    equal( $reel.data('backwards'), false, 'Not reversed at positive speed');
    start();
  });

  asyncTest( 'Negative direction/spped is detected as reversed', function(){
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
    expect(13 * 2 + 1);
    var
      probes= {
        10: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10],
            frames: 10,
            frame: 1
          },
          ordered: '1,4,6,9, 2,5,7,10, 3,8'.split(/, ?/)
        },
        12: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12],
            frames: 12,
            frame: 1
          },
          ordered: '1,4,7,10, 3,6,9,12, 2,5,8,11'.split(/, ?/)
        },
        15: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            frames: 15,
            frame: 1
          },
          ordered: '1,5,9,12, 3,7,11,14, 2,6,10,13,4,8,15'.split(/, ?/)
        },
        18: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
            frames: 18,
            frame: 1
          },
          ordered: '1,6,10,15, 3,8,12,17, 2,7,11,16,4,9,13,18, 5,14'.split(/, ?/)
        },
        24: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            frames: 24,
            frame: 1
          },
          ordered: '1,7,13,19, 4,10,16,22, 3,9,15,21,6,12,18,24, 2,8,14,20,5,11,17,23'.split(/, ?/)
        },
        36: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],
            frames: 36,
            frame: 1
          },
          ordered: '1,10,19,28, 6,15,24,33, 3,12,21,30,8,17,26,35, 2,11,20,29,7,16,25,34,4,13,22,31,9,18,27,36, 5,14,23,32'.split(/, ?/)
        },
        48: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],
            frames: 48,
            frame: 1
          },
          ordered: '1,13,25,37, 7,19,31,43, 4,16,28,40,10,22,34,46, 3,15,27,39,9,21,33,45,6,18,30,42,12,24,36,48, 2,14,26,38,8,20,32,44,5,17,29,41,11,23,35,47'.split(/, ?/)
        },

        // Atypicals with different starting points
        17: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
            frames: 17,
            frame: 7
          },
          ordered: '7,11,16,3, 9,13,1,5, 8,12,17,4,10,14,2,6, 15'.split(/, ?/)
        },
        23: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
            frames: 23,
            frame: 11
          },
          ordered: '11,17,23,5, 14,20,3,8, 12,18,1,6,15,21,4,9, 13,19,2,7,16,22,10'.split(/, ?/)
        },
        27: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],
            frames: 27,
            frame: 27
          },
          ordered: '27,7,14,20, 3,10,17,23, 2,9,16,22,5,12,19,25, 1,8,15,21,4,11,18,24,6,13,26'.split(/, ?/)
        },

        // Multi-rows
        '2x10': {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
            frames: 10,
            frame: 1,
            rows: 2
          },
          ordered: '1,4,6,9, 2,5,7,10, 3,8, 11,14,16,19, 12,15,17,20, 13,18'.split(/, ?/)
        },
        '4x10': {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40],
            frames: 10,
            frame: 1,
            rows: 4,
            row: 2
          },
          ordered: '11,14,16,19, 12,15,17,20, 13,18, 1,4,6,9,21,24,26,29,31,34,36,39, 2,5,7,10,22,25,27,30,32,35,37,40, 3,8,23,28,33,38'.split(/, ?/)
        },
        'orbital': {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
            footage: 9,
            frame: 1,
            orbital: 3
          },
          ordered: '1,3,6,8, 2,4,7,9, 5, 10,12,15,17, 11,13,16,18, 14'.split(/, ?/)
        }
      }

    ok( typeof $.reel.preload.fidelity == 'function', '`$.reel.preload.fidelity` available');

    $.each(probes, function(ix, def){
      var
        $reel= $('#image').reel(def.options)

      deepEqual( $reel.data('cached'), def.ordered, ix+' frames starting at frame '+def.options.frame);
      equal( $.unique($reel.data('cached')).length, def.ordered.length, 'equal length');
    });

  });

})(jQuery);
