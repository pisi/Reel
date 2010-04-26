/**
 * .reel Unit Tests
 */
(function($){

  module('Rendering', { teardown: function teardown(){
    $('.jquery-reel').trigger('teardown');
  }});

  asyncTest( 'Indicator: is sticked to the bottom edge of the projector', function(){
    expect(4);
    try_different_sizes([10, 20, 50, 100]);
    start();

    function try_different_sizes(sizes){
      $(sizes).each(function try_size(ix, size){
        $('#image').trigger('teardown')
        var
          $reel= $('#image').reel({ indicator: size }),
          $indicator= $('.indicator', $reel),
          height= parseInt($reel.css('height')),
          indicator_offset_top= parseInt($indicator.css('top'));
        equal( indicator_offset_top, height - size );
      });
    }
  });

  asyncTest( 'Indicator: `indicator` option value is the size of the indicator', function(){
    expect(6);
    try_different_sizes([5, 10, 30]);
    start();

    function try_different_sizes(sizes){
      $(sizes).each(function try_size(ix, size){
        $('#image').trigger('teardown')
        var
          $reel= $('#image').reel({ indicator: size }),
          $indicator= $('.indicator', $reel),
          indicator_width= parseInt($indicator.css('width')),
          indicator_height= parseInt($indicator.css('height'));

        equal( indicator_width, size );
        equal( indicator_height, size );
      });
    }
  });

  asyncTest( 'Indicator: is sticked to the bottom left corner when on min frame (1)', function(){
    var
      size= 10,
      $reel= $('#image').reel({ indicator: size, frames: 36, frame: 1 }),
      $indicator= $('.indicator', $reel);

    equal( $indicator.css('left'), '0px' );
    start();
  });

  asyncTest( 'Indicator: is sticked to the bottom right corner when on max frame (36)', function(){
    var
      size= 10,
      $reel= $('#image').reel({ indicator: size, frames: 36, frame: 36 }),
      width= parseInt($reel.css('width')),
      $indicator= $('.indicator', $reel);

    equal( $indicator.css('left'), (width - size) + 'px' );
    start();
  });

  asyncTest( 'Indicator: reacts on frame change', function(){
    var
      $reel= $('#image').reel({ indicator: 20, frame: 1 }),
      before= $('.indicator', $reel).css('left');

    $reel.trigger('frameChange', 2);
    var
      after= $('.indicator', $reel).css('left');

    ok( before != after, 'Position change after frame change' );
    start();
  });

  asyncTest( 'Indicator: Custom style may be applied to indicator via `.indicator`', function(){
    var
      $reel= $('#image').reel({ indicator: 10 }),
      $indicator= $('.indicator', $reel);

    $indicator.css({         // This may as well be done in external CSS
      background: '#fff',
      opacity: 0.5
    })
    equal( $indicator.css('backgroundColor'), 'rgb(255, 255, 255)', 'Custom background' )
    equal( $indicator.css('opacity'), '0.5', 'Custom opacity' )
    start();
  });

  asyncTest( 'Indicator:  is disabled (not rendered) when `indicator` option evaluates false', function(){
    expect(3);
    try_different_values([false, undefined, 0]);
    start();

    function try_different_values(values){
      $(values).each(function try_value(ix, value){
        $('#image').trigger('teardown')
        var
          $reel= $('#image').reel({ indicator: value }),
          $indicator= $('.indicator', $reel);

        equal( $indicator.length, 0, 'When ' + value );
      });
    }
  });

})(jQuery);