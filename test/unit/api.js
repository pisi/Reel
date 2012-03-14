/**
 * .reel Unit Tests
 */
(function($){

  module('API', reel_test_module_routine);

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
    expect(count + 7);

    equal( count, 49, 'Total number of options');

    // Version 1.0 options
    equal( $.reel.def.footage,                    6, 'number of frames per line/column' );
    equal( $.reel.def.frame,                      1, 'initial frame' );
    equal( $.reel.def.frames,                    36, 'total number of frames; every 10° for full rotation' );
    equal( $.reel.def.hint,                      '', 'mouse-sensitive area hint tooltip' );
    equal( $.reel.def.horizontal,              true, 'roll flow; defaults to horizontal' );
    ok( $.reel.def.hotspot === undefined,            '[removed] use `area` instead' );
    equal( $.reel.def.indicator,                  0, 'size of a visual indicator of reeling (in pixels)' );
    equal( $.reel.def.klass,                     '', 'plugin instance class name' );
    equal( $.reel.def.loops,                   true, 'is it a loop?' );
    ok( $.reel.def.reversed === undefined,           '[removed] use `cw` instead' );
    ok( $.reel.def.saves === undefined,              '[removed] allow save as?' );
    ok( $.reel.def.sensitivity === undefined,        '[removed] interaction sensitivity' );
    equal( $.reel.def.spacing,                    0, 'space between frames on reel' );
    equal( $.reel.def.stitched,                   0, 'pixel width (length) of a stitched (rectilinear) panoramic reel' );
    equal( $.reel.def.suffix,               '-reel', 'sprite filename suffix (A.jpg\'s sprite is A-reel.jpg by default)' );
    ok( $.reel.def.tooltip === undefined,            '[removed] use `hint` instead' );

    // Version 1.1 options
    equal( $.reel.def.area,               undefined, 'custom mouse-sensitive area jQuery collection' );
    equal( $.reel.def.brake,                   0.23, 'brake force of the inertial rotation' );
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
    equal( $.reel.def.preloader,                  2, 'size (height) of a image loading indicator (in pixels)' );
    equal( $.reel.def.rebound,                  0.5, 'time spent on the edge (in seconds) of a non-looping panorama before it bounces back' );
    equal( $.reel.def.revolution,         undefined, 'distance mouse must be dragged for full revolution' );
    equal( $.reel.def.row,                        1, 'initial row' );
    equal( $.reel.def.rows,                       0, 'number of rows for a multi-row setup (zero from one-row setup)' );
    equal( $.reel.def.speed,                      0, 'animated rotation speed in revolutions per second (Hz)' );
    equal( $.reel.def.step,               undefined, '[deprecated] use `frame` instead' );
    equal( $.reel.def.steps,              undefined, '[deprecated] use `frames` instead' );
    equal( $.reel.def.tempo,                     36, 'shared ticker tempo in ticks per second' );
    equal( $.reel.def.timeout,                    2, 'idle timeout in seconds' );
    equal( $.reel.def.throwable,               true, 'drag & throw interaction (allowed by default)' );
    equal( $.reel.def.vertical,               false, 'switches orbital object movie to vertical mode' );
    equal( $.reel.def.wheelable,               true, 'mouse wheel interaction (allowed by default)' );

    // Version 1.2 options
    equal( $.reel.def.annotations,        undefined, 'annotations definition object' );
    ok( typeof $.reel.def.attr === 'object',         'initial attribute-value pairs map for the IMG tag' );
    equal( $.reel.def.cursor,             undefined, 'mouse cursor overriding the default one' );
    equal( $.reel.def.preload,           'fidelity', 'preloading order - either "linear" or "fidelity" (default)' );
    equal( $.reel.def.scrollable,              true, 'allow page scroll (allowed by default; applies only to touch devices)' );
    equal( $.reel.def.sequence,                  '', 'URL of sequence images containing the hash placeholder' );
    equal( $.reel.def.steppable,               true, 'allows to step the view (horizontally) by clicking on image' );
    equal( $.reel.def.velocity,                   0, 'initial velocity of user interaction; washes off quickly with `brake`' );
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
    $('#image').unreel();
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
    $('#image').unreel();
    equal( $.reel.instances.length, 2, '... and gets correctly cleaned from `$.reel.instances`');

    // And then, teardown the rest
    $('.reel').unreel();
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

  test( 'Path to CDN used for fetching cursor graphics', function(){
    expect(2);

    equal( typeof $.reel.cdn, 'string', 'exposed as `$.reel.cdn`');
    equal( $.reel.cdn, 'http://code.vostrel.cz/', 'URL');
  });

  test( 'Key algorithms, handlers and defaults are defined within `$.reel` object namespace (types)', function(){
    expect(29);

    ok( typeof $.reel == 'object',                        '`$.reel` - root namespace' );
    ok( typeof $.reel.version == 'string',                '`$.reel.version`' );
    ok( typeof $.reel.def == 'object',                    '`$.reel.def` - default values tested rigorously on their own few tests back in this module' );
    ok( $.reel.instances instanceof jQuery,               '`$.reel.instances` - jQuery collection of all Reel instances in the document' );
    ok( typeof $.reel.cost == 'number',                   '`$.reel.cost` - running costs of Reel (collectively)' );
    ok( typeof $.reel.leader == 'function',               '`$.reel.leader()` - returns the leader instance to which ticker syncs' );

    ok( typeof $.reel.fn == 'object',                     '`$.reel.fn` - `jQuery.fn` extensions' );
    ok( typeof $.reel.fn.reel == 'function',              '`$.reel.fn.reel()`' );
    ok( typeof $.reel.fn.unreel == 'function',            '`$.reel.fn.unreel()`' );

    ok( typeof $.reel.re == 'object',                     '`$.reel.re` - regular expressions used by the plugin' );
    ok( $.reel.re.image instanceof RegExp,                '`$.reel.re.image`' );
    ok( $.reel.re.touchy_agent instanceof RegExp,         '`$.reel.re.touchy_agent`' );
    ok( $.reel.re.lazy_agent instanceof RegExp,           '`$.reel.re.lazy_agent`' );
    ok( $.reel.re.frame_klass instanceof RegExp,          '`$.reel.re.frame_klass`' );
    ok( $.reel.re.sequence instanceof RegExp,             '`$.reel.re.sequence`' );
    // Functionally tested further except `sequence`, which is being throughfully tested in Computations module

    ok( typeof $.reel.cdn == 'string',                    '`$.reel.cdn` - URL to the CDN server used to provide resources' );
    // Functionally tested further

    ok( typeof $.reel.math == 'object',                   '`$.reel.math` - mathematics core' );
    ok( typeof $.reel.math.envelope == 'function',        '`$.reel.math.envelope()`' );
    ok( typeof $.reel.math.hatch == 'function',           '`$.reel.math.hatch()`' );
    ok( typeof $.reel.math.interpolate == 'function',     '`$.reel.math.interpolate()`' );
    // Functionally of individual `$.reel.math` methods is tested in the Computations module

    ok( typeof $.reel.preload == 'object',                '`$.reel.preload` - preload ordering options' );
    ok( typeof $.reel.preload.linear == 'function',       '`$.reel.preload.linear()`' );
    ok( typeof $.reel.preload.fidelity == 'function',     '`$.reel.preload.fidelity()`' );
    // Functionally of individual `$.reel.preload` methods is tested in the Computations module

    ok( typeof $.reel.normal == 'object',                '`$.reel.normal` - normalization of selected data values' );
    ok( typeof $.reel.normal.fraction == 'function',     '`$.reel.normal.fraction()`' );
    ok( typeof $.reel.normal.tier == 'function',         '`$.reel.normal.tier()`' );
    ok( typeof $.reel.normal.row == 'function',          '`$.reel.normal.row()`' );
    ok( typeof $.reel.normal.frame == 'function',        '`$.reel.normal.frame()`' );
    // Functionally of individual `$.reel.normal` methods is tested in the Data module

    ok( typeof $.reel.sequence == 'function',            '`$.reel.sequence()` - builds the images array from given `sequence` option' );
    // Functionally of `$.reel.sequence()` is tested in the Computations module
  });

  test( 'CDN address configuration in `$.reel.cdn`', function(){
    expect(2);

    ok( $.reel.cdn.match(/^https?\:\/\/...+\...+\//), 'proper HTTP(S) URL' );
    equal( $.reel.cdn, 'http://code.vostrel.cz/', 'default value' );
    // Bunch of other [[Rendering]] tests also challenge the integrity of `$.reel.cdn` value
  });

  $.each({
    'some_image.jpg': true,
    'image.jpeg':     true,
    'img.gif':        true,
    '_image.png':     true,
    '_.png?':         true,
    '1.jpg?nocache':  true,
    'image.php':      false,
    'image':          false,
  },
  function(filename, pass){
    test( '`$.reel.re.image` Image `src` "'+filename+'" '+(pass? 'qualifies':'does NOT qualify')+' as an image', function(){
      expect(1);

      ok( $.reel.re.image.test(filename) == pass );
    });
  });

  var
    user_agent= {
      'iPhone': [
        'Mozilla/5.0 (iPhone; U; CPU like Mac OS X; en) AppleWebKit/420+ (KHTML, like Gecko) Version/3.0 Mobile/1A543a Safari/419.3',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3',
      ],
      'iPod': [
        'Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A101a Safari/419.3'
      ],
      'iPad': [
        'Mozilla/5.0 (iPad; U; CPU OS 4_2_1 like Mac OS X; cs-cz) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5',
        'Mozilla/5.0 (iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10',
        'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3',
        'Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) version/4.0.4 Mobile/7B367 Safari/531.21.10'
      ],
      // Any Android Webkit browser will match here, we'll test only the supported versions 2.3+
      'Generic Android': [
        'Mozilla/5.0 (Linux; U; Android 2.3; en-us) AppleWebKit/999+ (KHTML, like Gecko) Safari/999.9',
      ],
      'LG': [
        'Mozilla/5.0 (Linux; U; Android 2.3.3; ko-kr; LG-LU3000 Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
      ],
      'HTC': [
        'Mozilla/5.0 (Linux; U; Android 2.3.3; en-us; HTC_DesireS_S510e Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
        'Mozilla/5.0 (Linux; U; Android 2.3.3; en-us; HTC_DesireS_S510e Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile',
        'Mozilla/5.0 (Linux; U; Android 2.3.3; de-ch; HTC Desire Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
        'Mozilla/5.0 (Linux; U; Android 2.3.4; fr-fr; HTC Desire Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
        'Mozilla/5.0 (Linux; U; Android 2.3.3; zh-tw; HTC_Pyramid Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
        'Mozilla/5.0 (Linux; U; Android 2.3.5; en-us; HTC Vision Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
      ],
      'T-Mobile': [
        'Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; T-Mobile myTouch 3G Slide Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
      ],
      'Desktop browser': [
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.52.7 (KHTML, like Gecko) Version/5.1.2 Safari/534.52.7'
      ]
    }

  $.each({
    pass: [
      'iPhone',
      'iPod',
      'iPad',
      'Generic Android',
      'LG',
      'HTC',
      'T-Mobile'
    ],
    fail: [
      'Desktop browser'
    ]
  },
  function(result, agent_ids){
    $.each(agent_ids, function(ix, group){
      test( '`$.reel.re.touchy_agent` '+group+' '+(result? 'qualifies' : 'does NOT qualify')+' as "touchy" device', function(){
        var
          agent_strings= user_agent[group]

        expect(agent_strings.length);

        $.each(agent_strings, function(){
          ok( $.reel.re.touchy_agent.test(this) == (result == 'pass'), this );
        })
      });
    });
  });

  $.each({
    pass: [
      'iPhone',
      'iPod',
      'Generic Android',
      'LG',
      'HTC',
      'T-Mobile'
    ],
    fail: [
      'iPad',
      'Desktop browser'
    ]
  },
  function(result, agent_ids){
    $.each(agent_ids, function(ix, group){
      test( '`$.reel.re.lazy_agent` '+group+' '+(result? 'qualifies' : 'does NOT qualify')+' as "lazy" device', function(){
        var
          agent_strings= user_agent[group]

        expect(agent_strings.length);

        $.each(agent_strings, function(){
          ok( $.reel.re.lazy_agent.test(this) == (result == 'pass'), this );
        })
      });
    });
  });

  $.each({
    // Valid
    'frame-1':   true,
    'frame-35':  true,
    'frame-106': true,
    'frame-0':   true,
    // Invalid
    'frame-':    false,
    'frame':     false,
    'frame--2':  false,
    'frame2':    false,
    'fr02':      false
  },
  function(klass, pass){
    test( '`$.reel.re.frame_klass` Class name "'+klass+'" '+(pass? 'qualifies':'does NOT qualify')+' as "frame class"', function(){
      expect(1);

      ok( $.reel.re.frame_klass.test(klass) == pass );
    });
  });

  test( 'Current Reel code version is stored as a string in `$.reel.version`', function(){
    expect(5);

    ok( $.reel.version.length >= 3,                                   'Minimal length' );
    ok( $.reel.version.match(/^([^.]+.[^.]+|[^.]+.[^.]+.[^.])$/),     'Is formatted major.minor.patch, where patch segment is optional' );
    ok( $.reel.version.split('.').length > 1,                         'Is splittable by dot `.` into `[ major, minor, patch ]`' );
    ok( $.reel.version.split('.')[0].match(/^[0-9]+$/),               'Major is strictly a number' );
    ok( $.reel.version.split('.')[1].match(/^[0-9]+(|-[a-z0-9]+)$/),  'Minor may contain additional lowercase letters after hyphen (like 1.2-beta)' );
  });

})(jQuery);
