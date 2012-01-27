(function($){

  module('Data', reel_test_module_routine);

  test( 'Read access to all instance\'s states and values (data) is provided with `.reel( name )`', function(){

    var
      $reel= $('#image').reel({
        annotations: {}
      }),
      count= 0;

    $.each($reel.data(), function(key){
      // We exclude all jQuery internal keys
      if (key.match(/^(_[a-z]+|jQuery\d+|events|handle)$/)) return;
      count++
    });
    expect(count);

    ok( is('Object', $reel.reel('annotations')), '`annotations` Object');
    ok( is('Object', $reel.reel('area')), '`area` Object (jQuery)');
    ok( is('Object', $reel.reel('backup')), '`backup` Object');
    ok( is('Boolean', $reel.reel('backwards')), '`backwards` Boolean');
    ok( is('Number', $reel.reel('bit')), '`bit` Number');
    ok( is('Number', $reel.reel('brake')), '`brake` Number');
    ok( is('Array', $reel.reel('cached')), '`cached` Array');
    ok( is('Boolean', $reel.reel('center')), '`center` Boolean');
    ok( is('Boolean', $reel.reel('clicked')), '`clicked` Boolean');
    ok( is('Object', $reel.reel('clicked_location')), '`clicked_location` Object');
    ok( is('Number', $reel.reel('clicked_on')), '`clicked_on` Number');
    ok( is('Number', $reel.reel('clicked_row')), '`clicked_row` Number');
    ok( is('Number', $reel.reel('cwish')), '`cwish` Number');
    ok( is('Object', $reel.reel('dimensions')), '`dimensions` Object');
    ok( is('Number', $reel.reel('fraction')), '`fraction` Number');
    ok( is('Number', $reel.reel('frame')), '`frame` Number');
    ok( is('Number', $reel.reel('frames')), '`frames` Number');
    ok( is('Number', $reel.reel('hi')), '`hi` Number');
    ok( is('String', $reel.reel('id')), '`id` String');
    ok( is('String', $reel.reel('image')), '`image` String');
    ok( is('Array', $reel.reel('images')), '`images` Object');
    ok( is('Number', $reel.reel('lo')), '`lo` Number');
    ok( is('Number', $reel.reel('opening_ticks')), '`opening_ticks` Number');
    ok( is('Object', $reel.reel('options')), '`options` Object');
    ok( is('Boolean', $reel.reel('playing')), '`playing` Boolean');
    ok( is('Number', $reel.reel('preloaded')), '`preloaded` Number');
    ok( is('Boolean', $reel.reel('reeling')), '`reeling` Boolean');
    ok( is('Number', $reel.reel('revolution')), '`revolution` Number');
    ok( is('Number', $reel.reel('row')), '`row` Number');
    ok( is('Number', $reel.reel('rows')), '`rows` Number');
    ok( is('String', $reel.reel('sequence')), '`sequence` String');
    ok( is('Number', $reel.reel('spacing')), '`spacing` Number');
    ok( is('Number', $reel.reel('speed')), '`speed` Number');
    ok( is('String', $reel.reel('stage')), '`stage` String');
    ok( is('Number', $reel.reel('steps')), '`steps` Number');
    ok( is('Number', $reel.reel('stitched')), '`stitched` Number');
    ok( is('Number', $reel.reel('stitched_travel')), '`stitched_travel` Number');
    ok( is('Boolean', $reel.reel('stopped')), '`stopped` Boolean');
    ok( is('Object', $reel.reel('style')), '`style` Object/jQuery');
    ok( is('Number', $reel.reel('tempo')), '`tempo` Number');
    ok( is('Number', $reel.reel('velocity')), '`velocity` Number');
    ok( is('Boolean', $reel.reel('vertical')), '`vertical` Boolean');
    ok( is('Number', $reel.reel('wheel_step')), '`wheel_step` Number');
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

  test( 'Changing an already set data key value triggers respective change event', function(){

    expect(4);
    var
      value= 5,
      $reel= $('#image').reel()

    $reel.bind('somethingChange', function(evnt, nothing, something){
      ok(true, 'Change event has been triggered once');
      ok( is('Object', evnt), 'The event handler is passed the event as first argument as usual,');
      ok( is('Undefined', nothing), 'always `undefined` as the second argument,');
      equal( something, value, 'and finally the actual value as the third/last argument');
    })
    // First set doesn't trigger change event
    $reel.reel('something', 10);
    // So we need to change the value set in order to get the change event triggered
    $reel.reel('something', value);

  });

  test( 'Setting a value for the first time does not trigger change event', function(){

    expect(1);
    var
      value= 5,
      $reel= $('#image').reel()


    $reel.bind('somethingChange', function(){
      ok(false, 'Change event should not be triggered');
    })
    $reel.reel('something', value);
    ok(true);

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
    ok( is('Undefined', $image.data('frame')), 'Instance data are gone (`"frame"`)');
    ok( is('Undefined', $image.data('dimensions')), 'Instance data are gone (`"dimensions"`)');
    ok( is('Undefined', $image.data('images')), 'Instance data are gone (`"images"`)');

  });


})(jQuery);
