/**
 * .reel Unit Tests
 */
(function($){

  module('Events', { teardown: function teardown(){
    $('.jquery-reel').unbind('loaded store recall openingDone play').trigger('teardown');
  }});

  asyncTest( 'Internal data setting triggers "store" event and passes name and value to the handler', function(){
    expect(3);
    var
      $reel= $('#image').reel({ frame: 1, speed: 1 }),
      compare= false

    $reel
      .bind('loaded', function(){
        setTimeout(function(){
          compare= true;
        }, 500);
      })
      .bind('store', function(e, name, value){
        if (compare && name == 'frame'){
          ok(name, '`name` is passed as first param');
          ok(value, '`value` is passed as second param');
          ok(value != 1, 'Frame passed in "store" binding differs from original frame 1');
          compare= false;
          start();
        }
      })
  });

  asyncTest( 'Internal data getting triggers "recall" event and passes name of the value in question', function(){
    expect(3);
    var
      $reel= $('#image').reel(),
      compare= false

    $reel
      .bind('loaded', function(){
        setTimeout(function(){
          compare= true;
        }, 500);
      })
      .bind('recall', function(e, name, value){
        if (compare){
          ok(true, '"recall" event is being triggered');
          ok(name, '`name` is passed as first param');
          ok(typeof value != 'undefined', '`value` is passed as second param');
          compare= false;
          start();
        }
      })
  });

  asyncTest( '`"openingDone"` event is triggered at the end of opening animation', function(){
    expect(2);
    var
      $reel= $('#image').reel({
        opening: 1
      })

    $reel
      .bind('openingDone', function(){
        ok( true, '`"openingDone"` has been triggered');
      })
      .bind('play', function(){
        ok( true, '`"play" event has fired closely following the `"openingDone"`');
        start();
      })
  });

  asyncTest( 'Default handling of `"openingDone"` event is cancelable by returning false from the handler', function(){
    expect(2);
    var
      $reel= $('#image').reel({
        opening: 1
      })

    $reel
      .bind('openingDone', function(){
        ok( true, '`"openingDone"` has been triggered and set to prevent event bubbling');
        setTimeout(function(){
          ok( true, 'The cancelled `"play"` correctly didn\'t fire (waited for it half a second)');
          start();
        }, 500);
        return false
      })
      .bind('play', function(){
        start();
      })
  });

})(jQuery);
