(function($){

  module('Data', reel_test_module_routine);

  test( 'Read access to all instance\'s states and values (data) is provided with `.reel( name )`', function(){

    var
      $reel= $('#image').reel({
        annotations: {}
      }),
      probes= {
        annotations: 'Object',
        area: 'Object',
        backup: 'Object',
        backwards: 'Boolean',
        bit: 'Number',
        brake: 'Number',
        cached: 'Array',
        center: 'Boolean',
        clicked: 'Boolean',
        clicked_location: 'Object',
        clicked_on: 'Number',
        clicked_tier: 'Number',
        cwish: 'Number',
        dimensions: 'Object',
        fraction: 'Number',
        frame: 'Number',
        frames: 'Number',
        hi: 'Number',
        id: 'String',
        image: 'String',
        images: 'Array',
        lo: 'Number',
        opening: 'Boolean',
        opening_ticks: 'Number',
        options: 'Object',
        playing: 'Boolean',
        preloaded: 'Number',
        reeled: 'Boolean',
        reeling: 'Boolean',
        revolution: 'Number',
        revolution_y: 'Number',
        row: 'Number',
        rows: 'Number',
        spacing: 'Number',
        speed: 'Number',
        stage: 'String',
        stitched_travel: 'Number',
        stitched_shift: 'Number',
        stopped: 'Boolean',
        style: 'Object', // (jQuery)
        tempo: 'Number',
        tier: 'Number',
        velocity: 'Number',
        vertical: 'Boolean'
      }
      count= 0;

    $.each($reel.data(), function(key){
      // We exclude all jQuery internal keys
      if (key.match(/^(_[a-z]+|jQuery\d+|events|handle)$/)) return;
      count++
    });
    expect(count * 2);

    $.each(probes, function(key, type){
      ok( is(type, $reel.data(key)), '`'+key+'` '+type+' with `.data("'+key+'")`'); // 1.1 way
      ok( is(type, $reel.reel(key)), '`'+key+'` '+type+' with `.reel("'+key+'")`'); // 1.2 way
    });
  });

  test( 'Contents of attributes backup `.reel("backup")`', function(){

    expect(4);
    var
      $reel= $('#image').reel()

    ok( is('Object', $reel.reel('backup')), '`.reel("backup")` Object');
    ok( is('String', $reel.reel('backup').src), '`src` String');
    ok( is('String', $reel.reel('backup').style), '`style` String');
    ok( is('Object', $reel.reel('backup').data), '`data` String');

  });

  test( 'Stage dimensions inside `.reel("dimensions")`', function(){

    expect(3);
    var
      $reel= $('#image').reel()

    ok( is('Object', $reel.reel('dimensions')), '`.reel("dimensions")` Object');
    ok( is('Number', $reel.reel('dimensions').x), '`x` Number');
    ok( is('Number', $reel.reel('dimensions').y), '`y` Number');

  });

  test( 'Write access is provided by `.reel( name, value )`', function(){

    expect(1);
    var
      $reel= $('#image').reel(),
      value= 5

    $reel.reel('something', value);
    equal( $reel.reel('something'), value, '`"something"` value set' )

  });

  test( 'Changing a data key value triggers respective change event', function(){

    expect(4);
    var
      value= 5,
      $reel= $('#image').reel()

    $(document).bind('somethingChange.test', function(evnt, nothing, something){
      ok(true, 'Change event has been triggered once');
      ok( is('Object', evnt), 'The event handler is passed the event as first argument as usual,');
      ok( typeof nothing === 'undefined', 'always `undefined` as the second argument,');
      equal( something, value, 'and finally the actual value as the third/last argument');
    })
    $reel.reel('something', value);

  });

  test( 'Instance data get cleared on teardown and original data are recovered from the backup', function(){

    expect(12);
    var
      value= 5,
      key= 'test_probe',
      value= 'test_value',
      $image= $('#image').data(key, value),
      $reel= $image.reel()

    ok( $image.data(key), 'Test probe key exists in the data prior to `.reel()` call');
    equal( $image.data(key), value, 'And it indeed is our verified probe');

    $image.reel();
    ok( $image.data(key), 'Test probe exists even in the running instance after the `.reel() call');
    equal( $image.data(key), value, 'And it still is the same probe');
    ok( is('Number', $image.data('frame')), 'Instance data are accessible (`"frame"`)');
    ok( is('Object', $image.data('dimensions')), 'Instance data are gone (`"dimensions"`)');
    ok( is('Array', $image.data('images')), 'Instance data are accessible (`"images"`)');

    $image.unreel();
    ok( $image.data(key), 'Test probe is still present even after `.unreel() call');
    equal( $image.data(key), value, 'And it is our probe');
    ok( typeof $image.data('frame') === 'undefined', 'Instance data are gone (`"frame"`)');
    ok( typeof $image.data('dimensions') === 'undefined', 'Instance data are gone (`"dimensions"`)');
    ok( typeof $image.data('images') === 'undefined', 'Instance data are gone (`"images"`)');

  });

  test( 'Options used in `.reel(options)` call are stored in `"options"` data key', function(){

    expect(2);
    var
      path= 'test_path',
      $reel= $('#image').reel({ path: path })

    equal( $reel.data('options').path, path, '`path` key exists and equals');
    equal( $reel.data('options').frames, 36, 'along with defaults for all other options');

  });

  $.each({
    'frame2fraction': {
      change: 'frame', verify: 'fraction',
      samples: [ 10, 36, 18, 19, 9, 3, 1 ],
      options: {
        frame: 3
      }
    },
    'frame2tier': {
      change: 'frame', verify: 'tier',
      samples: [ 40, 36, 70, 60, 108, 3, 91 ],
      options: {
        rows: 3,
        frame: 3
      }
    },
    'row2tier': {
      change: 'row', verify: 'tier',
      samples: [ 5, 1, 3, 6, 2 ],
      options: {
        rows: 6,
        frames: 12
      }
    },
    'fraction2frame': {
      change: 'fraction', verify: 'frame',
      samples: [ 0.1, 0.5, 0.03, .6, 0.99 ],
      options: {
      }
    },
    'tier2row': {
      change: 'tier', verify: 'row',
      samples: [ 0.99, 0.5, 0.03, .6, 0.1 ],
      options: {
        rows: 3
      }
    },
    'tier2frame': {
      change: 'tier', verify: 'frame',
      samples: [ 0.99, 0.5, 0.03, .6, 0.1 ],
      options: {
        rows: 3
      }
    }
  }, function(name, def){

    asyncTest( 'Change events: Changing `"'+def.change+'"` results in a `"'+def.verify+'"` change', function(){

      var
        $reel= $('#image').reel(def.options),
        before

      expect(def.samples.length * 2);

      $(document).bind('loaded.test', function(){
        $.each(def.samples, function(ix, sample){

          $reel.one(def.change+'Change.test', function(evnt, depr, probe){
            equal( probe, sample, 'Change had been reported with the `"'+def.change+'Change"` event');
          });

          $reel.one(def.verify+'Change.test', function(evnt, depr, probe){
            ok( probe != before, 'Change had been reported with the `"'+def.verify+'Change"` event');
          });

          before= $reel.reel(def.verify);
          $reel.reel(def.change, sample);
        });
        start();
      });

    });

  });

  // Data normalization is already tested indirectly in the Computations module when assigning `frame`s `fraction`s and `row`s
  // and testing the looping or non-looping nature of the result. Here's a very similar testing only direct and aimed
  // on the normalization of edge cases and extremes
  $.each({
    'looping': {
      options: {
        loops: true
      },
      probes: {
        '3': 0,
        '1.8': 0.8,
        '0.6': 0.6,
        '-0.3': 0.7,
        '-1.2': 0.8
      }
    },
    'non-looping': {
      options: {
        loops: false
      },
      probes: {
        '3': 1,
        '1.8': 1,
        '0.4': 0.4,
        '-0.3': 0,
        '-1.2': 0
      }
    }
  }, function(testcase, def){
    test( 'Normalization of '+testcase+' `"fraction"`', function(){
      expect(5);
      var
        data= {
          options: def.options
        }

      $.each(def.probes, function(ix, it){
        equal( $.reel.normal.fraction(Number(ix), data).toFixed(4), it, 'Fraction '+ix+' became '+it);
      });

    });
  });

  $.each({
    'looping': {
      data: {
        frames: 18,
        options: {
          orbital: 0,
          loops: true
        }
      },
      probes: {
        '53': 17,
        '23': 5,
        '13': 13,
        '-3': 15,
        '-32': 4
      }
    },
    'looping-orbital': {
      data: {
        frames: 18,
        options: {
          loops: true,
          orbital: 2
        }
      },
      probes: {
        '53': 17,
        '23': 23,
        '13': 13,
        '-3': 33,
        '-32': 4
      }
    },
    'looping-multirow': {
      data: {
        frames: 18,
        options: {
          loops: true,
          rows: 3
        }
      },
      probes: {
        '83': 29,
        '43': 43,
        '13': 13,
        '-13': 41,
        '-62': 46
      }
    },
    'non-looping': {
      data: {
        frames: 18,
        options: {
          orbital: 0,
          loops: false
        }
      },
      probes: {
        '53': 18,
        '23': 18,
        '13': 13,
        '-3': 1,
        '-32': 1
      }
    },
    'non-looping-orbital': {
      data: {
        frames: 18,
        options: {
          loops: false,
          orbital: 2
        }
      },
      probes: {
        '53': 36,
        '23': 23,
        '13': 13,
        '-3': 1,
        '-32': 1
      }
    },
    'non-looping-multirow': {
      data: {
        frames: 18,
        options: {
          loops: false,
          rows: 3
        }
      },
      probes: {
        '83': 54,
        '43': 43,
        '13': 13,
        '-13': 1,
        '-62': 1
      }
    }
  }, function(testcase, def){
    test( 'Normalization of '+testcase+' `"frame"`', function(){
      expect(5);
      var
        data= def.data

      $.each(def.probes, function(ix, it){
        equal( $.reel.normal.frame(Number(ix), data), it, 'Frame '+ix+' became '+it);
      });

    });
  });

  test( 'Normalization of `"tier"`', function(){
    expect(5);
    var
      probes= {
        '3': 1,
        '1.8': 1,
        '0.4': 0.4,
        '-0.3': 0,
        '-1.2': 0
      },
      data= {}

    $.each(probes, function(ix, it){
      equal( $.reel.normal.tier(Number(ix), data).toFixed(4), it, 'Tier '+ix+' became '+it);
    });
  });

  test( 'Normalization of `"row"`', function(){
    expect(5);
    var
      probes= {
        '9': 4,
        '6': 4,
        '2': 2,
        '-1': 1,
        '-5': 1
      },
      data= {
        options: {
          rows: 4
        }
      }

    $.each(probes, function(ix, it){
      equal( $.reel.normal.row(Number(ix), data), it, 'Row '+ix+' became '+it);
    });
  });

})(jQuery);
