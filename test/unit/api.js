/**
 * .reel Unit Tests
 */
(function($){

  module('API');

  test( 'Method exposed publicly as jQuery.fn.reel()', function()
  {
    ok( $.fn.reel !== undefined );
    ok( typeof $.fn.reel == 'function' );
  });

  test( 'Default option values exposed publicly as jQuery.reel', function()
  {
    ok( $.reel !== undefined );
    ok( typeof $.reel == 'object' );
  });

  test( 'Options in jQuery.reel hash and their default values', function()
  {
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
    equal( $.reel.reversed,               false, 'true for "counter-clockwise sprite"' );
    ok( $.reel.saves === undefined,              '[removed] allow save as?' );
    equal( $.reel.sensitivity,               20, '[deprecated] interaction sensitivity' );
    equal( $.reel.spacing,                    0, 'space between frames on reel' );
    equal( $.reel.stitched,           undefined, 'pixel width (length) of a stitched (rectilinear) panoramic reel' );
    equal( $.reel.suffix,               '-reel', 'sprite filename suffix (A.jpg\'s sprite is A-reel.jpg by default)' );
    equal( $.reel.tooltip,                   '', '[deprecated] use `hint` instead' );

    // Version 1.1 options
    equal( $.reel.delay,                     -1, 'delay before autoplay in seconds (no autoplay by default)' );
    equal( $.reel.friction,                 0.9, 'friction of the rotation inertia (will loose 90% of speed per second)' );
    equal( $.reel.image,              undefined, 'image sprite to be used' );
    ok( typeof $.reel.images === 'object',       'sequence array of individual images to be used instead of sprite' );
    ok( $.reel.images.length === 0,              'the sequence is empty by default' );
    equal( $.reel.inertia,                 true, 'drag & throw will give the rotation a momentum when true' );
    equal( $.reel.monitor,            undefined, 'stored value name to monitor in the upper left corner of the viewport' );
    equal( $.reel.path,                      '', 'URL path to be prepended to `image` or `images` filenames' );
    equal( $.reel.rebound,                  0.5, 'time spent on the edge (in seconds) of a non-looping panorama before it bounces back' );
    equal( $.reel.revolution, undefined, 'distance mouse must be dragged for full revolution' );
    equal( $.reel.speed,                      0, 'animated rotation speed in revolutions per second (Hz)' );
    equal( $.reel.step,               undefined, 'initial step (overrides `frame`)' );
    equal( $.reel.steps,              undefined, 'number of steps a revolution is divided in (by default equal to `frames`)' );
    equal( $.reel.tempo,                     25, 'shared ticker tempo in ticks per second' );
    equal( $.reel.timeout,                    2, 'idle timeout in seconds' );

  });

})(jQuery);