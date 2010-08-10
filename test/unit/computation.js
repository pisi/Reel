/**
 * .reel Unit Tests
 */
(function($){

  module('Computation', { teardown: function teardown(){
    $('.jquery-reel').trigger('teardown');
  }});

  asyncTest( '`fractionChange` accepts and normalizes any real fraction passed', function(){
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
    $.each(entries, function(ix,it){
      $reel.trigger('fractionChange', Number(ix));
      equal( $reel.data('fraction'), it, 'Passed '+ix);
    });
    start();
  });

  asyncTest( '`rowChange` accepts and normalizes any real row fraction passed', function(){
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
    $.each(entries, function(ix,it){
      $reel.trigger('rowChange', Number(ix));
      equal( $reel.data('row'), it, 'Fraction '+ix);
    });
    start();
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

  asyncTest( 'jQuery\'s .val() returns numeric value in the range of 0 to 100 by default', function(){
    var
      selector= '#image',
      $reel= $(selector).reel({ loops: false }),
      entries= {
        '-1': 0,
        '0': 0,
        '0.2': 20,
        '0.5': 50,
        '0.75': 75,
        '1': 100,
        '1.5': 100
      }
    $.each(entries, function(ix,it){
      $reel.trigger('fractionChange', Number(ix));
      equal( $reel.data('value'), it, 'Passed '+ix);
    });
    start();
  });

  asyncTest( 'jQuery\'s .val() returns numeric value in the range of `minimum` and `maximum` options', function(){
    var
      selector= '#image',
      $reel= $(selector).reel({ minimum: 1000, maximum: 2000, loops: false }),
      entries= {
        '-1': 1000,
        '0': 1000,
        '0.2': 1200,
        '0.5': 1500,
        '0.75': 1750,
        '1': 2000,
        '1.5': 2000
      }
    $.each(entries, function(ix,it){
      $reel.trigger('fractionChange', Number(ix));
      equal( $reel.data('value'), it, 'Passed '+ix);
    });
    start();
  });

  asyncTest( 'Initial value can be preset by `value` option', function(){
    var
      selector= '#image',
      $reel= $(selector).reel({ value: 50, loops: false })

    equal( $reel.data('value'), 50, 'Initial state');
    equal( $reel.data('fraction'), 0.5, 'Updated fraction');
    start();
  });

  asyncTest( 'Value can be set from outside using `valueChange` event', function(){
    var
      selector= '#image',
      $reel= $(selector).reel({ loops: false })

    equal( $reel.data('value'), 0, 'Initial state');

    $reel.trigger('valueChange', 50);
    equal( $reel.data('value'), 50, 'Changed value');
    equal( $reel.data('fraction'), 0.5, 'Updated fraction');
    start();
  });

  asyncTest( 'Value can be set from outside using jQuery\'s .val() facility', function(){
    var
      selector= '#image',
      $reel= $(selector).reel({ loops: false })

    equal( $reel.data('value'), 0, 'Initial state');

    $reel.val(20);
    $reel.bind('valueChange', function(){
      equal( $reel.data('value'), 20, 'Changed value');
      equal( $reel.data('fraction'), 0.2, 'Updated fraction');
      start();
    });
  });

  asyncTest( 'Value can be set from outside directly by setting .value=', function(){
    var
      selector= '#image',
      $reel= $(selector).reel({ loops: false })

    equal( $reel.data('value'), 0, 'Initial state');

    $reel[0].value= 60;
    $reel.bind('valueChange', function(){
      equal( $reel.data('value'), 60, 'Changed value');
      equal( $reel.data('fraction'), 0.6, 'Updated fraction');
      start();
    });
  });

})(jQuery);