/**
 * .reel Unit Tests
 */
(function($){

  module('API', { teardown: function teardown(){
    $('.jquery-reel').trigger('teardown');
  }});

  test( 'Method exposed publicly as jQuery.fn.reel()', function()
  {
    expect(2);
    ok( $.fn.reel !== undefined );
    ok( typeof $.fn.reel == 'function' );
  });

  test( 'Default option values exposed publicly as jQuery.reel.def', function()
  {
    expect(2);
    ok( typeof $.reel == 'object' );
    ok( typeof $.reel.def == 'object' );
  });

  test( 'Options in jQuery.reel hash and their default values', function()
  {
    var
      count= 0

    $.each($.reel.def, function(){ count++ });
    expect(count + 4);

    equal( count, 44, 'Total number of options');

    // Version 1.0 options
    equal( $.reel.def.footage,                    6, 'number of frames per line/column' );
    equal( $.reel.def.frame,                      1, 'initial frame' );
    equal( $.reel.def.frames,                    36, 'total number of frames; every 10° for full rotation' );
    equal( $.reel.def.hint,                      '', 'mouse-sensitive area hint tooltip' );
    equal( $.reel.def.horizontal,              true, 'roll flow; defaults to horizontal' );
    equal( $.reel.def.hotspot,            undefined, '[deprecated] use `area` instead' );
    equal( $.reel.def.indicator,                  0, 'size of a visual indicator of reeling (in pixels)' );
    equal( $.reel.def.klass,                     '', 'plugin instance class name' );
    equal( $.reel.def.loops,                   true, 'is it a loop?' );
    equal( $.reel.def.reversed,           undefined, '[deprecated] use `cw` instead' );
    ok( $.reel.def.saves === undefined,              '[removed] allow save as?' );
    ok( $.reel.def.sensitivity === undefined,        '[removed] interaction sensitivity' );
    equal( $.reel.def.spacing,                    0, 'space between frames on reel' );
    equal( $.reel.def.stitched,                   0, 'pixel width (length) of a stitched (rectilinear) panoramic reel' );
    equal( $.reel.def.suffix,               '-reel', 'sprite filename suffix (A.jpg\'s sprite is A-reel.jpg by default)' );
    equal( $.reel.def.tooltip,                   '', '[deprecated] use `hint` instead' );

    // Version 1.1 options
    equal( $.reel.def.area,               undefined, 'custom mouse-sensitive area jQuery collection' );
    equal( $.reel.def.brake,                    0.5, 'brake force of the inertial rotation' );
    equal( $.reel.def.clickfree,              false, 'binds to mouse leave/enter events instead of down/up' );
    equal( $.reel.def.cw,                     false, 'true for clockwise organization of sprite' );
    equal( $.reel.def.delay,                     -1, 'delay before autoplay in seconds (no autoplay by default)' );
    equal( $.reel.def.directional,            false, 'two sets of frames (for forward and backward motion) are used when true' );
    equal( $.reel.def.draggable,               true, 'mouse or finger drag interaction (allowed by default)' );
    equal( $.reel.def.entry,              undefined, 'speed of the opening animation (Hz, defaults to value of `speed`)' );
    equal( $.reel.def.graph,              undefined, 'custom graph function' );
    equal( $.reel.def.image,              undefined, 'image sprite to be used' );
    ok( typeof $.reel.def.images === 'object',       'sequence array of individual images to be used instead of sprite' );
    ok( $.reel.def.images.length === 0,              'the sequence is empty by default' );
    equal( $.reel.def.inversed,               false, 'flags inversed organization of frames in orbital object movie' );
    equal( $.reel.def.laziness,                   6, 'on "lazy" devices tempo is divided by this divisor for better performace' );
    equal( $.reel.def.monitor,            undefined, 'stored value name to monitor in the upper left corner of the viewport' );
    equal( $.reel.def.opening,                    0, 'duration of opening animation (in seconds)' );
    equal( $.reel.def.orbital,                    0, 'view centering tolerance in frames for dual-orbit object movies' );
    equal( $.reel.def.path,                      '', 'URL path to be prepended to `image` or `images` filenames' );
    equal( $.reel.def.preloader,                  4, 'size (height) of a image loading indicator (in pixels)' );
    equal( $.reel.def.rebound,                  0.5, 'time spent on the edge (in seconds) of a non-looping panorama before it bounces back' );
    equal( $.reel.def.revolution,         undefined, 'distance mouse must be dragged for full revolution' );
    equal( $.reel.def.row,                        1, 'initial row' );
    equal( $.reel.def.rows,                       0, 'number of rows for a multi-row setup (zero from one-row setup)' );
    equal( $.reel.def.speed,                      0, 'animated rotation speed in revolutions per second (Hz)' );
    equal( $.reel.def.step,               undefined, 'initial step (overrides `frame`)' );
    equal( $.reel.def.steps,              undefined, 'number of steps a revolution is divided in (by default equal to `frames`)' );
    equal( $.reel.def.tempo,                     36, 'shared ticker tempo in ticks per second' );
    equal( $.reel.def.timeout,                    2, 'idle timeout in seconds' );
    equal( $.reel.def.throwable,               true, 'drag & throw interaction (allowed by default)' );
    equal( $.reel.def.vertical,               false, 'switches orbital object movie to vertical mode' );
    equal( $.reel.def.wheelable,               true, 'mouse wheel interaction (allowed by default)' );

  });

  test( 'jQuery of currently living instances is referenced as `$.reel.instances`', function()
  {
    expect(17);

    equal( $.reel.instances.length, 0, '`$.reel.instances` is initially empty');
    equal( typeof $.reel.instances, 'object', 'And it is a jQuery object');

    // Try one instance
    equal( $('#image').reel().length, 1, 'One instance initiated');
    equal( $.reel.instances.length, 1, '... correct length of `$.reel.instances` jQuery');
    equal( typeof $.reel.instances.eq(0), 'object', '... it is an object (jQuery)');
    equal( typeof $.reel.instances[0], 'object', '... it is an object (jQuery)');
    equal( $.reel.instances.attr('id'), 'image', '... it is our image (ID comparison)');

    // And tear it down
    $('#image').trigger('teardown');
    equal( $.reel.instances.length, 0, '... and gets correctly cleaned from `$.reel.instances`');

    // Try two instances setup+teardown
    equal( $('#image, #image2').reel().length, 2, 'Two instances initiated');
    equal( $.reel.instances.length, 2, '... correct length of `$.reel.instances` jQuery');
    equal( $.reel.instances.eq(0).attr('id'), 'image', '... and it is our image (ID comparison)');
    equal( $.reel.instances.eq(1).attr('id'), 'image2', '... and it is our image (ID comparison)');

    // One more added
    equal( $('.no_id:first').reel().length, 1, 'One more instance initiated');
    equal( $.reel.instances.length, 3, '... correct length of `$.reel.instances` jQuery');
    ok( $.reel.instances.eq(2).parent().hasClass('no_id'), '... it is our image (class name comparison)');

    // First, teardown just one from the first two
    $('#image').trigger('teardown');
    equal( $.reel.instances.length, 2, '... and gets correctly cleaned from `$.reel.instances`');

    // And then, teardown the rest
    $('.jquery-reel').trigger('teardown');
    equal( $.reel.instances.length, 0, '... and gets correctly cleaned from `$.reel.instances`');

  });

  test( 'Pseudo-testing for the "leader" - the oldest living instance on page', function()
  {

    $('#image2, #image').reel();
    $('#image_width_only, .no_id').reel();

    equal( $.reel.instances.length, 4, 'We\'ve just setup 4 instances (2 + 2)');
    equal( $.reel.instances.first().attr('id'), 'image', '`.first()` returns the oldest (by ID)');
    equal( $.reel.instances[0].id, 'image', '`[0] too`');

  });

})(jQuery);