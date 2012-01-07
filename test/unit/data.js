(function($){

  module('Data', reel_test_module_routine);

  test( 'All internal states and values are accessible by jQuery\'s own `.data()`', function(){

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

    ok( is('Object', $reel.data('annotations')), '`annotations` Object');
    ok( is('Object', $reel.data('area')), '`area` Object (jQuery)');
    ok( is('Object', $reel.data('backup')), '`backup` Object');
    ok( is('Boolean', $reel.data('backwards')), '`backwards` Boolean');
    ok( is('Number', $reel.data('bit')), '`bit` Number');
    ok( is('Number', $reel.data('brake')), '`brake` Number');
    //ok( is('Object', $reel.data('cached')), '`cached` Object');
    ok( is('Boolean', $reel.data('center')), '`center` Boolean');
    ok( is('Boolean', $reel.data('clicked')), '`clicked` Boolean');
    ok( is('Object', $reel.data('clicked_location')), '`clicked_location` Object');
    ok( is('Number', $reel.data('clicked_on')), '`clicked_on` Number');
    ok( is('Number', $reel.data('clicked_row')), '`clicked_row` Number');
    ok( is('Number', $reel.data('cwish')), '`cwish` Number');
    ok( is('Object', $reel.data('dimensions')), '`dimensions` Object');
    ok( is('Number', $reel.data('fraction')), '`fraction` Number');
    ok( is('Number', $reel.data('_frame')), '`_frame` Number');
    ok( is('Number', $reel.data('frame')), '`frame` Number');
    ok( is('Number', $reel.data('frames')), '`frames` Number');
    ok( is('Number', $reel.data('hi')), '`hi` Number');
    ok( is('String', $reel.data('id')), '`id` String');
    ok( is('String', $reel.data('image')), '`image` String');
    ok( is('Array', $reel.data('images')), '`images` Object');
    ok( is('Number', $reel.data('lo')), '`lo` Number');
    ok( is('Number', $reel.data('opening_ticks')), '`opening_ticks` Number');
    ok( is('Object', $reel.data('options')), '`options` Object');
    ok( is('Boolean', $reel.data('playing')), '`playing` Boolean');
    ok( is('Number', $reel.data('preloaded')), '`preloaded` Number');
    ok( is('Boolean', $reel.data('reeling')), '`reeling` Boolean');
    ok( is('Number', $reel.data('revolution')), '`revolution` Number');
    ok( is('Number', $reel.data('row')), '`row` Number');
    ok( is('Number', $reel.data('rows')), '`rows` Number');
    ok( is('String', $reel.data('sequence')), '`sequence` String');
    ok( is('Number', $reel.data('spacing')), '`spacing` Number');
    ok( is('Number', $reel.data('speed')), '`speed` Number');
    ok( is('String', $reel.data('stage')), '`stage` String');
    ok( is('Number', $reel.data('steps')), '`steps` Number');
    ok( is('Number', $reel.data('stitched')), '`stitched` Number');
    ok( is('Number', $reel.data('stitched_travel')), '`stitched_travel` Number');
    ok( is('Boolean', $reel.data('stopped')), '`stopped` Boolean');
    ok( is('Object', $reel.data('style')), '`style` Object/jQuery');
    ok( is('Number', $reel.data('tempo')), '`tempo` Number');
    ok( is('Number', $reel.data('velocity')), '`velocity` Number');
    ok( is('Boolean', $reel.data('vertical')), '`vertical` Boolean');
    ok( is('Number', $reel.data('wheel_step')), '`wheel_step` Number');
  });

  test( 'Contents of attributes backup `.data("backup")`', function(){

    var
      $reel= $('#image').reel()

    ok( is('Object', $reel.data('backup')), '`.data("backup")` Object');
    ok( is('String', $reel.data('backup').src), '`src` String');
    ok( is('String', $reel.data('backup').style), '`style` String');

  });

  test( 'Stage dimensions inside `.data("dimensions")`', function(){

    var
      $reel= $('#image').reel()

    ok( is('Object', $reel.data('dimensions')), '`.data("dimensions")` Object');
    ok( is('Number', $reel.data('dimensions').x), '`x` Number');
    ok( is('Number', $reel.data('dimensions').y), '`y` Number');

  });

})(jQuery);
