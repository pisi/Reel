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
        reeling: 'Boolean',
        revolution: 'Number',
        row: 'Number',
        rows: 'Number',
        spacing: 'Number',
        speed: 'Number',
        stage: 'String',
        stitched: 'Number',
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

})(jQuery);
