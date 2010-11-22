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

  test( 'Default option values exposed publicly as jQuery.reel.default', function()
  {
		expect(2);
    ok( typeof $.reel == 'object' );
    ok( typeof $.reel.default == 'object' );
  });

  test( 'Options in jQuery.reel hash and their default values', function()
  {
		expect(43);
    // Version 1.0 options
    equal( $.reel.default.footage,                    6, 'number of frames per line/column' );
    equal( $.reel.default.frame,                      1, 'initial frame' );
    equal( $.reel.default.frames,                    36, 'total number of frames; every 10° for full rotation' );
    equal( $.reel.default.hint,                      '', 'mouse-sensitive area hint tooltip' );
    equal( $.reel.default.horizontal,              true, 'roll flow; defaults to horizontal' );
    equal( $.reel.default.hotspot,            undefined, '[deprecated] use `area` instead' );
    equal( $.reel.default.indicator,                  0, 'size of a visual indicator of reeling (in pixels)' );
    equal( $.reel.default.klass,                     '', 'plugin instance class name' );
    equal( $.reel.default.loops,                   true, 'is it a loop?' );
    equal( $.reel.default.reversed,           undefined, '[deprecated] use `cw` instead' );
    ok( $.reel.default.saves === undefined,              '[removed] allow save as?' );
    ok( $.reel.default.sensitivity === undefined,        '[removed] interaction sensitivity' );
    equal( $.reel.default.spacing,                    0, 'space between frames on reel' );
    equal( $.reel.default.stitched,           undefined, 'pixel width (length) of a stitched (rectilinear) panoramic reel' );
    equal( $.reel.default.suffix,               '-reel', 'sprite filename suffix (A.jpg\'s sprite is A-reel.jpg by default)' );
    equal( $.reel.default.tooltip,                   '', '[deprecated] use `hint` instead' );

    // Version 1.1 options
    equal( $.reel.default.area,               undefined, 'custom mouse-sensitive area jQuery collection' );
    equal( $.reel.default.brake,                    0.5, 'brake force of the inertial rotation' );
    equal( $.reel.default.clickfree,              false, 'binds to mouse leave/enter events instead of down/up' );
    equal( $.reel.default.cw,                     false, 'true for clockwise organization of sprite' );
    equal( $.reel.default.delay,                     -1, 'delay before autoplay in seconds (no autoplay by default)' );
    equal( $.reel.default.draggable,               true, 'mouse or finger drag interaction (allowed by default)' );
    equal( $.reel.default.entry,              undefined, 'speed of the opening animation (Hz, defaults to value of `speed`)' );
    equal( $.reel.default.graph,              undefined, 'custom graph function' );
    equal( $.reel.default.image,              undefined, 'image sprite to be used' );
    ok( typeof $.reel.default.images === 'object',       'sequence array of individual images to be used instead of sprite' );
    ok( $.reel.default.images.length === 0,              'the sequence is empty by default' );
    equal( $.reel.default.monitor,            undefined, 'stored value name to monitor in the upper left corner of the viewport' );
    equal( $.reel.default.opening,                    0, 'duration of opening animation (in seconds)' );
    equal( $.reel.default.path,                      '', 'URL path to be prepended to `image` or `images` filenames' );
    equal( $.reel.default.preloader,                  4, 'size (height) of a image loading indicator (in pixels)' );
    equal( $.reel.default.rebound,                  0.5, 'time spent on the edge (in seconds) of a non-looping panorama before it bounces back' );
    equal( $.reel.default.revolution,         undefined, 'distance mouse must be dragged for full revolution' );
    equal( $.reel.default.row,                        1, 'initial row' );
    equal( $.reel.default.rows,                       0, 'number of rows for a multi-row setup (zero from one-row setup)' );
    equal( $.reel.default.speed,                      0, 'animated rotation speed in revolutions per second (Hz)' );
    equal( $.reel.default.step,               undefined, 'initial step (overrides `frame`)' );
    equal( $.reel.default.steps,              undefined, 'number of steps a revolution is divided in (by default equal to `frames`)' );
    equal( $.reel.default.tempo,                     18, 'shared ticker tempo in ticks per second' );
    equal( $.reel.default.timeout,                    2, 'idle timeout in seconds' );
    equal( $.reel.default.throwable,               true, 'drag & throw interaction (allowed by default)' );
    equal( $.reel.default.wheelable,               true, 'mouse wheel interaction (allowed by default)' );

  });

})(jQuery);