/**
 * .reel Unit Tests
 */
(function($){

  module('Computation', { teardown: function teardown(){
    $('.jquery-reel').trigger('teardown');
  }});

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

  test( 'Default `$.reel.math.spread`', function(){
    expect(11);
    var
      probes= {
        10: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10],
            frames: 10,
            frame: 1
          },
          ordered: [1,6,4,9,2,7,5,10,3,8]
        },
        12: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12],
            frames: 12,
            frame: 1
          },
          ordered: [1,7,4,10,3,9,6,12,2,8,5,11]
        },
        15: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
            frames: 15,
            frame: 1
          },
          ordered: [1,9,5,13,3,11,7,15,2,10,6,14,4,12,8]
        },
        18: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18],
            frames: 18,
            frame: 1
          },
          ordered: [1,10,6,15,3,12,8,17,2,11,7,16,4,13,9,18,5,14]
        },
        24: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
            frames: 24,
            frame: 1
          },
          ordered: [1,13, 7,19, 4,16,10,22, 3,15,9,21,6,18,12,24, 2,14,8,20,5,17,11,23]
        },
        36: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36],
            frames: 36,
            frame: 1
          },
          ordered: [1,19, 10,28, 6,24,15,33, 3,21,12,30,8,26,17,35, 2,20,11,29,7,25,16,34,4,22,13,31,9,27,18,36, 5,23,14,32]
        },
        48: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48],
            frames: 48,
            frame: 1
          },
          ordered: [1,25, 13,37, 7,31,19,43, 4,28,16,40,10,34,22,46, 3,27,15,39,9,33,21,45,6,30,18,42,12,36,24,48, 2,26,14,38,8,32,20,44,5,29,17,41,11,35,23,47]
        },

        // Atypicals with different starting points
        17: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
            frames: 17,
            frame: 7
          },
          ordered: [7,16, 11,3, 9,1,13,5, 8,17,12,4,10,2,14,6, 15]
        },
        23: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
            frames: 23,
            frame: 11
          },
          ordered: [11,23, 17,6, 14,3,20,9, 12,1,18,7,15,4,21,10, 13,2,19,8,16,5,22]
        },
        27: {
          options: {
            images: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],
            frames: 27,
            frame: 27
          },
          ordered: [27,14, 7,21, 3,17,10,24, 2,16,9,23,5,19,12,26, 1,15,8,22,4,18,11,25,6,20,13]
        }
      }

    ok( typeof $.reel.math.spread == 'function', '`$.reel.math.spread` available');

    $.each(probes, function(frames, def){
      var
        $reel= $('#image').reel(def.options),
        opt= $.extend({}, $.reel.def, def.options),
        get= function(name){ return $reel.data(name) }
      deepEqual( $.reel.math.spread(def.options.images, opt, get), def.ordered, frames+' frames starting at frame '+def.start);
    });

  });

})(jQuery);
