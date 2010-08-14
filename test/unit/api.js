/**
 * .reel Unit Tests
 */
(function($){

  module('API');

  test( 'Method exposed publicly as jQuery.fn.reel()', function()
  {
		expect(2);
    ok( $.fn.reel !== undefined );
    ok( typeof $.fn.reel == 'function' );
  });

  test( 'Default option values exposed publicly as jQuery.reel', function()
  {
		expect(2);
    ok( $.reel !== undefined );
    ok( typeof $.reel == 'object' );
  });

  test( 'Options in jQuery.reel hash and their default values', function()
  {
		expect(43);
    // Version 1.0 options
    equal( $.reel.footage,                    6, 'number of frames per line/column' );
    equal( $.reel.frame,                      1, 'initial frame' );
    equal( $.reel.frames,                    36, 'total number of frames; every 10° for full rotation' );
    equal( $.reel.hint,                      '', 'hotspot hint tooltip' );
    equal( $.reel.horizontal,              true, 'roll flow; defaults to horizontal' );
    equal( $.reel.hotspot,            undefined, 'custom jQuery as a hotspot' );
    equal( $.reel.indicator,                  0, 'size of a visual indicator of reeling (in pixels)' );
    equal( $.reel.klass,                     '', 'plugin instance class name' );
    equal( $.reel.loops,                   true, 'is it a loop?' );
    equal( $.reel.reversed,           undefined, '[deprecated] use `cw` instead' );
    ok( $.reel.saves === undefined,              '[removed] allow save as?' );
    ok( $.reel.sensitivity === undefined,        '[removed] interaction sensitivity' );
    equal( $.reel.spacing,                    0, 'space between frames on reel' );
    equal( $.reel.stitched,           undefined, 'pixel width (length) of a stitched (rectilinear) panoramic reel' );
    equal( $.reel.suffix,               '-reel', 'sprite filename suffix (A.jpg\'s sprite is A-reel.jpg by default)' );
    equal( $.reel.tooltip,                   '', '[deprecated] use `hint` instead' );

    // Version 1.1 options
    equal( $.reel.brake,                    0.5, 'brake force of the inertial rotation' );
    equal( $.reel.clickfree,              false, 'binds to mouse leave/enter events instead of down/up' );
    equal( $.reel.couple,             undefined, 'harness other Reel instance(s) to share interaction events' );
    equal( $.reel.cw,                     false, 'true for clockwise organization of sprite' );
    equal( $.reel.delay,                     -1, 'delay before autoplay in seconds (no autoplay by default)' );
    equal( $.reel.dragable,                true, 'mouse or finger drag interaction (allowed by default)' );
    equal( $.reel.graph,              undefined, 'custom graph function' );
    equal( $.reel.image,              undefined, 'image sprite to be used' );
    ok( typeof $.reel.images === 'object',       'sequence array of individual images to be used instead of sprite' );
    ok( $.reel.images.length === 0,              'the sequence is empty by default' );
    equal( $.reel.maximum,                  100 );
    equal( $.reel.minimum,                    0 );
    equal( $.reel.monitor,            undefined, 'stored value name to monitor in the upper left corner of the viewport' );
    equal( $.reel.path,                      '', 'URL path to be prepended to `image` or `images` filenames' );
    equal( $.reel.preloader,                  4, 'size (height) of a image loading indicator (in pixels)' );
    equal( $.reel.rebound,                  0.5, 'time spent on the edge (in seconds) of a non-looping panorama before it bounces back' );
    equal( $.reel.revolution,         undefined, 'distance mouse must be dragged for full revolution' );
    equal( $.reel.row,                        1, 'initial row' );
    equal( $.reel.rows,                       0, 'number of rows for a multi-row setup (zero from one-row setup)' );
    equal( $.reel.speed,                      0, 'animated rotation speed in revolutions per second (Hz)' );
    equal( $.reel.step,               undefined, 'initial step (overrides `frame`)' );
    equal( $.reel.steps,              undefined, 'number of steps a revolution is divided in (by default equal to `frames`)' );
    equal( $.reel.tempo,                     25, 'shared ticker tempo in ticks per second' );
    equal( $.reel.timeout,                    2, 'idle timeout in seconds' );
    equal( $.reel.throwable,               true, 'drag & throw interaction (allowed by default)' );
    equal( $.reel.value,              undefined, 'initial value' );
    equal( $.reel.wheelable,               true, 'mouse wheel interaction (allowed by default)' );

  });

})(jQuery);