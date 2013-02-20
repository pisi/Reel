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

    equal( count, 48, 'Total number of options');

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
    equal( $.reel.def.delay,                      0, 'delay before autoplay in seconds (no autoplay by default)' );
    equal( $.reel.def.directional,            false, 'two sets of frames (for forward and backward motion) are used when true' );
    equal( $.reel.def.draggable,               true, 'mouse or finger drag interaction (allowed by default)' );
    equal( $.reel.def.entry,              undefined, 'speed of the opening animation (Hz, defaults to value of `speed`)' );
    equal( $.reel.def.graph,              undefined, 'custom graph function' );
    equal( $.reel.def.image,              undefined, 'image sprite to be used' );
    equal( $.reel.def.images,                    '', 'sequence of individual images to be used instead of sprite' );
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
    // Functionality of the leader gets tested in the Animation module

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
    'image':          false
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
        'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'
      ],
      'iPod': [
        'Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) Version/3.0 Mobile/3A101a Safari/419.3',
        'Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; cs-cz) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5'
      ],
      'iPad': [
        'Mozilla/5.0 (iPad; U; CPU OS 4_2_1 like Mac OS X; cs-cz) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5',
        'Mozilla/5.0 (iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10',
        'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3',
        'Mozilla/5.0 (iPad; U; CPU OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) version/4.0.4 Mobile/7B367 Safari/531.21.10',
        'Mozilla/5.0 (iPad; U; CPU OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5',
        'Mozilla/5.0 (iPad; CPU OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9A405',
        'Mozilla/5.0 (iPad; CPU OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A405 Safari/7534.48.3',
        'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3'
      ],
      'RIM': [
        'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.0.0; en-US) AppleWebKit/535.8+ (KHTML, like Gecko) Version/7.2.0.0 Safari/535.8+'
      ],
      'Blackberry': [
        'Mozilla/5.0 (BlackBerry; U; BlackBerry 9850; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0.115 Mobile Safari/534.11+',
        'Mozilla/5.0 (BlackBerry; U; BlackBerry 9800; en-US) AppleWebKit/534.1+ (KHTML, like Gecko)'
      ],
      // Any Android Webkit browser will match here, we'll test only the supported versions 2.3+
      'Generic Android': [
        'Mozilla/5.0 (Linux; U; Android 2.3; en-us) AppleWebKit/999+ (KHTML, like Gecko) Safari/999.9'
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
      'ZTE': [
        'Mozilla/5.0 (Linux; U; Android 2.3.5; cs-cz; ZTE-SKATE Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
      ],
      'Samsung': [
        'Mozilla/5.0 (Linux; U; Android 2.3.3; cs-cz; GT-I9100 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
      ],
      'T-Mobile': [
        'Mozilla/5.0 (Linux; U; Android 2.3.4; en-us; T-Mobile myTouch 3G Slide Build/GRI40) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1'
      ],
      'PCs': [
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.52.7 (KHTML, like Gecko) Version/5.1.2 Safari/534.52.7',
        'Mozilla/5.0 (Windows NT 5.1; rv:11.0) Gecko/20100101 Firefox/11.0',
        'Mozilla/5.0 (Windows NT 6.0; rv:7.0.1) Gecko/20100101 Firefox/7.0.1',
        'Mozilla/5.0 (Windows; U; Windows NT 5.1) AppleWebKit/533.4 Chrome/5.0.375.125 Safari/533.4',
        'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5) AppleWebKit/534.16 Chrome/10.0.648.205 Safari/534.16',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:8.0.1) Gecko/20100101 Firefox/8.0.1',
        'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16',
        'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; SLCC2; Media Center PC 6.0)',
        'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; Media Center PC 6.0)',
        'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)',
        'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.6+ (KHTML, like Gecko) Version/5.1 Safari/534.50',
        'Opera/9.80 (Macintosh; Intel Mac OS X; U; en) Presto/2.2.15 Version/10.10',
        'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.0.19) Gecko/2010111021 Camino/2.0.6'
      ],
      // Third-party browsers
      'Fennec': [
        'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; en-US; rv:1.9.2a1pre) Gecko/20090317 Fennec/1.0b1'
      ]
    }

  $.each({
    pass: [
      'iPhone',
      'iPod',
      'iPad',
      'RIM',
      'Generic Android',
      'LG',
      'HTC',
      'ZTE',
      'Samsung',
      'T-Mobile',
      'Fennec'
    ],
    fail: [
      'PCs'
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
      'Blackberry',
      'Generic Android',
      'LG',
      'HTC',
      'ZTE',
      'Samsung',
      'T-Mobile',
      'Fennec'
    ],
    fail: [
      'iPad',
      'PCs'
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

    ok( $.reel.version.length >= 3,                                         'Minimal length' );
    ok( $.reel.version.match(/^.\...?\.?.?.?-?.*$/),                        'Is formatted major.minor.patch, where patch segment is optional' );
    ok( $.reel.version.split('.').length > 1,                               'Is splittable by dot `.` into `[ major, minor, patch ]`' );
    ok( $.reel.version.split('.')[0].match(/^[0-9]+$/),                     'Major is strictly a number' );
    ok( $.reel.version.split('.')[1].match(/^[0-9]+(|-?[a-z][a-z0-9]+)$/),  'Minor may contain additional lowercase letters after an optional dash (like 1.2rc or 1.2-devel)' );
  });

  $.each({
    Safari: [
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.6+ (KHTML, like Gecko) Version/5.1 Safari/534.50',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50',
      'Mozilla/5.0 (PlayBook; U; RIM Tablet OS 2.0.0; en-US) AppleWebKit/535.8+ (KHTML, like Gecko) Version/7.2.0.0 Safari/535.8+',
      'Mozilla/5.0 (Linux; U; Android 2.2; cs-cz; LG-P500 Build/FRF91) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1 MMS/LG-Android-MMS-V1.0/1.2',
      'Mozilla/5.0 (Linux; U; Android 2.3.5; cs-cz; ZTE-SKATE Build/GRJ22) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
      'Mozilla/5.0 (Linux; U; Android 2.3.3; cs-cz; GT-I9100 Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/536.26.14 (KHTML, like Gecko) Version/6.0.1 Safari/536.26.14',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_5_8) AppleWebKit/534.50.2 (KHTML, like Gecko) Version/5.0.6 Safari/533.22.3',
      'Mozilla/5.0 (iPad; U; CPU OS 4_2_1 like Mac OS X; cs-cz) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.52.7 (KHTML, like Gecko) Version/5.1.2 Safari/534.52.7',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/534.53.11 (KHTML, like Gecko) Version/5.1.3 Safari/534.53.10',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.15+ (KHTML, like Gecko) Version/5.1.2 Safari/534.52.7',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/534.52.7 (KHTML, like Gecko) Version/5.1.2 Safari/534.52.7',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.14 (KHTML, like Gecko) Version/6.0.1 Safari/536.26.14',
      'Mozilla/5.0 (iPad; CPU OS 6_0_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A523 Safari/8536.25',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.17 (KHTML, like Gecko) Version/6.0.2 Safari/536.26.17',
      'Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/534.55.3 (KHTML, like Gecko) Version/5.1.5 Safari/534.55.3',
      'Mozilla/5.0 (X11; U; Linux; en-US) AppleWebKit/532.4 (KHTML, like Gecko) Qt/4.6.3 Safari/532.4',
      'Mozilla/5.0(Linux;U;Android 3.0.1;en-au;LG-V900 Build/HRI66) AppleWebkit/534.13(KHTML, like Gecko) Version/4.0 Safari/534.13',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_5) AppleWebKit/535.1+ (KHTML, like Gecko) Version/5.0.2 Safari/533.18.5',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2',
      'Mozilla/5.0 (iPad; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/536.25 (KHTML, like Gecko) Version/6.0 Safari/536.25',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/534.57.7 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.7',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/536.26.17 (KHTML, like Gecko) Version/6.0.2 Safari/536.26.17',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8) AppleWebKit/536.22 (KHTML, like Gecko) Version/6.0 Safari/536.22',
      'Mozilla/5.0 (iPad; CPU OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A405 Safari/7534.48.3',
      'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      'Mozilla/5.0 (Linux; U; Android 3.0; xx-xx; LG-V900 Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.51.22 (KHTML, like Gecko) Version/5.1.1 Safari/534.51.22',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/534.56.5 (KHTML, like Gecko) Version/5.1.6 Safari/534.56.5',
      'Mozilla/5.0 (iPod; U; CPU iPhone OS 4_3_3 like Mac OS X; cs-cz) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/534.52.7 (KHTML, like Gecko) Version/5.1.2 Safari/534.52.7',
      'Mozilla/5.0 (iPad; CPU OS 5_1_1 like Mac OS X; cs-cz) AppleWebKit/534.46.0 (KHTML, like Gecko) CriOS/21.0.1180.80 Mobile/9B206 Safari/7534.48.3 (7C93343F-D2D9-4941-92A7-9F7B96C8F32C)',
      'Mozilla/5.0 (iPad; U; CPU OS 4_3_3 like Mac OS X; es-es) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.51.22 (KHTML, like Gecko) Version/5.1.1 Safari/534.51.22',
      'Mozilla/5.0 (Linux; U; Android 3.0.1; en-au; LG-V900 Build/HRI66) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13',
      'Mozilla/5.0 (iPad; U; CPU OS 4_3_3 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8J2 Safari/6533.18.5',
      'Mozilla/5.0 (Linux; U; Android 2.2.1; en-us; SGH-T839 Build/FROYO) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.6 Safari/534.56.5',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_1) AppleWebKit/536.25 (KHTML, like Gecko) Version/6.0 Safari/536.25',
      'Mozilla/5.0 (Windows; U; Windows NT 5.1; es-ES) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5',
      'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_5; cs-cz) AppleWebKit/533.18.1 (KHTML, like Gecko) Version/5.0.2 Safari/533.18.5',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/534.51.22 (KHTML, like Gecko) Version/5.1.1 Safari/534.51.22',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.55.3 (KHTML, like Gecko) Version/5.1.5 Safari/534.55.3',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.55.3 (KHTML, like Gecko) Version/5.1.5 Safari/534.55.3',
      'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; en-us) AppleWebKit/531.21.11 (KHTML, like Gecko) Version/4.0.4 Safari/531.21.10',
      'Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B176 Safari/7534.48.3',
      'Mozilla/5.0 (Linux; U; Android 4.0.4; en-us; Nexus S 4G Build/IMM76D) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_1) AppleWebKit/534.48.3 (KHTML, like Gecko) Version/5.1 Safari/534.48.3',
      'Mozilla/5.0 (Linux; U; Android 2.3.6; en-us; MB860 Build/4.5.141) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1',
      'Mozilla/5.0 (Linux; U; Android 3.0;en-aus; LG-V900 Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8) AppleWebKit/536.25 (KHTML, like Gecko) Version/6.0 Safari/536.25'
    ],
    Chrome: [
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.57 Safari/537.17',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.79 Safari/537.4',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_5) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.106 Safari/535.2',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.52 Safari/536.5',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.46 Safari/536.5',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.83 Safari/537.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.168 Safari/535.19',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.101 Safari/537.11',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.162 Safari/535.19',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.122 Safari/534.30',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.63 Safari/535.7',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.101 Safari/537.11',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.92 Safari/537.4',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.77 Safari/537.1',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.63 Safari/535.7',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.101 Safari/537.11',
      'Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.11 (KHTML, like Gecko) Ubuntu/10.04 Chromium/17.0.963.79 Chrome/17.0.963.79 Safari/535.11',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.53 Safari/536.5',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.46 Safari/536.5',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11',
      'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.120 Safari/535.2',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.41 Safari/537.1',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.77 Safari/535.7',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.77 Safari/535.7',
      'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.152 Safari/535.19',
      'Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.1 (KHTML, like Gecko) Ubuntu/11.04 Chromium/14.0.835.202 Chrome/14.0.835.202 Safari/535.1',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.60 Safari/537.1',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.91 Safari/537.11',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.107 Safari/535.1',
      'Mozilla/5.0 (Windows NT 5.2) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.60 Safari/537.1',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.63 Safari/535.7',
      'Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.83 Safari/535.11',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.151 Safari/535.19',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_5_8) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.79 Safari/537.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.151 Safari/535.19',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.8 Safari/537.4',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.3 (KHTML, like Gecko) Maxthon/3.3.3.1000 Chrome/16.0.883.0 Safari/535.3',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.17 Safari/536.11',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.121 Safari/535.2',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_6) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.121 Safari/535.2',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11',
      'Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.142 Safari/535.19',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_5_8) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.52 Safari/536.5',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.106 Safari/535.2',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.56 Safari/537.17',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.79 Safari/537.1',
      'Mozilla/5.0 (X11; Linux i686) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.52 Safari/536.5',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.5 Safari/537.17',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.79 Safari/537.1',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1',
      'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.57 Safari/537.17',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.79 Safari/535.11',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.57 Safari/537.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.57 Safari/537.17',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.5 (KHTML, like Gecko) Chrome/16.0.891.0 Safari/535.5',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.66 Safari/535.11',
      'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/22.0.1195.0 Safari/537.1',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.91 Safari/537.11',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.186 Safari/535.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.168 Safari/535.19',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.8 (KHTML, like Gecko) Chrome/17.0.938.0 Safari/535.8',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.52 Safari/536.5',
      '<font><font>顶端Mozilla/5.0（Windows NT 5.1中）AppleWebKit/536.11（KHTML，像壁虎）Chrome/20.0.1132.57 Safari/536.11</font></font>',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.56 Safari/537.17',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.77 Safari/535.7',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.142 Safari/535.19',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.79 Safari/537.4',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Iron/16.0.950.0 Chrome/16.0.950.0 Safari/535.7',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.46 Safari/535.11',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.152 Safari/535.19',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.79 Safari/537.4',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.83 Safari/537.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.57 Safari/537.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.52 Safari/537.17',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_5_8) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.46 Safari/535.11',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.57 Safari/537.1',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.22+ (KHTML, like Gecko) Chromium/17.0.963.56 Chrome/17.0.963.56 Safari/535.22+ Epiphany/3.4.3',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.52 Safari/536.5',
      'Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.106 Safari/535.2',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.53 Safari/536.5',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.52 Safari/537.17',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.165 Safari/535.19',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.19 (KHTML, like Gecko) Iron/18.0.1050.0 Chrome/18.0.1050.0 Safari/535.19',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.12 Safari/534.30',
      'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.83 Safari/537.1',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.56 Safari/537.17',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.162 Safari/535.19',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.82 Safari/537.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.186 Safari/535.1',
      'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_0) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.82 Safari/537.1',
      'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.56 Safari/537.17',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.52 Safari/537.17',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.56 Safari/537.17',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.96 Safari/537.4',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.65 Safari/535.11',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.57 Safari/537.1',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1',
      'Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.1 (KHTML, like Gecko) Ubuntu/11.10 Chromium/14.0.835.202 Chrome/14.0.835.202 Safari/535.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.52 Safari/537.17',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.84 Safari/535.11 SE 2.X MetaSr 1.0',
      'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_5_8) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.14 (KHTML, like Gecko) Chrome/24.0.1291.1 Safari/537.14',
      'Mozilla/5.0 (Windows NT 6.2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.14 Safari/537.17',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.56 Safari/535.11',
      'Mozilla/5.0 (X11; U; Linux i686; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.472.63 Safari/534.3',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.79 Safari/537.4',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/536.11 (KHTML, like Gecko) Ubuntu/12.04 Chromium/20.0.1132.47 Chrome/20.0.1132.47 Safari/536.11',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.63 Safari/535.7',
      'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.162 Safari/535.19',
      'Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7',
      'Mozilla/5.0 (Windows NT 5.2; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.60 Safari/537.1 CoolNovo/2.0.4.16',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.106 Safari/535.2',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.56 Safari/537.17',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.47 Safari/536.11',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_7) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.65 Safari/535.11',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.25 Safari/537.17',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.10 (KHTML, like Gecko) Chrome/23.0.1262.0 Safari/537.10',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.14 Safari/537.17',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.75 Safari/535.7',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.46 Safari/535.11',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.5 (KHTML, like Gecko) Iron/19.0.1100.0 Chrome/19.0.1100.0 Safari/536.5',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.186 Safari/535.1',
      '<font><font>Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.120 Safari/535.2</font></font>',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.21 (KHTML, like Gecko) Chrome/19.0.1041.0 Safari/535.21',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.163 Safari/535.19',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.79 Safari/535.11',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1017.2 Safari/535.19',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.14 Safari/537.4',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/535.24 (KHTML, like Gecko) Chrome/19.0.1055.1 Safari/535.24',
      'Mozilla/5.0 (Windows NT 5.2; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.121 Safari/535.2',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.106 Safari/535.2',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.57 Safari/537.17',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
      'Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.7 (KHTML, like Gecko) Ubuntu/11.10 Chromium/16.0.912.77 Chrome/16.0.912.77 Safari/535.7',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.8 Safari/537.4',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.13 (KHTML, like Gecko) Chrome/24.0.1290.1 Safari/537.13',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.91 Safari/537.11',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.142 Safari/535.19',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/536.5 (KHTML, like Gecko) Chrome/19.0.1084.56 Safari/536.5',
      '<font><font>Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.4 (KHTML, como Gecko) Chrome/22.0.1229.14 Safari/537.4</font></font>',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.1 (KHTML, like Gecko) Ubuntu/11.10 Chromium/14.0.835.202 Chrome/14.0.835.202 Safari/535.1',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.106 Safari/535.2',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_1) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.71 Safari/534.24',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.83 Safari/535.11',
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.107 Safari/535.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.89 Safari/537.1',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.202 Safari/535.1',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.121 Safari/535.2',
      'Mozilla/5.0 (Windows NT 6.0; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.78 Safari/535.11',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.168 Safari/535.19',
      'Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.19 (KHTML, like Gecko) Ubuntu/12.04 Chromium/18.0.1025.168 Chrome/18.0.1025.168 Safari/535.19',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.101 Safari/537.11',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.17 (KHTML, like Gecko) Chrome/24.0.1312.57 Safari/537.17',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.11 (KHTML, like Gecko) Chrome/17.0.963.79 Safari/535.11',
      'Mozilla/5.0 (X11; Linux i686) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.121 Safari/535.2',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.63 Safari/535.7',
      'Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.874.120 Safari/535.2',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11',
      'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.220 Safari/535.1',
      'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.92 Safari/537.4'
    ],
    MSIE: [
      'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; SLCC2; Media Center PC 6.0)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; Media Center PC 6.0)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)',
      // The rest of MSIE strings is not mine, but from http://www.zytrax.com/tech/web/msie-history.html
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; InfoPath.1)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; Google Wireless Transcoder;)',
      'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; Xbox)',
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Win64; x64; Trident/6.0)',
      'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0)',
      'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; WOW64; Trident/5.0)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.3; Creative AutoUpdate v1.40.02)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; WOW64; Trident/5.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; .NET4.0E; InfoPath.3; Creative AutoUpdate v1.40.02)',
      'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)',
      'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Win64; x64; Trident/5.0)',
      'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.0; Trident/5.0)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Trident/4.0; GTB6.5; Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1) ; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; InfoPath.1; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; chromeframe/13.0.782.218; chromeframe; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; GTB6.3; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; BRI/1; AskTB5.6)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; Tablet PC 2.0; .NET CLR 1.1.4322; .NET CLR 3.0.04506; eMusic DLM/4; OfficeLiveConnector.1.3; OfficeLiveConnector.1.4; OfficeLivePatch.0.0; OfficeLivePatch.1.3; SLCC1; .NET4.0C; .NET4.0E; InfoPath.3; Zune 4.7; MS-RTC LM 8; yie8)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; Tablet PC 2.0; InfoPath.2; InfoPath.3)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; chromeframe; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 1.1.4322; MS-RTC LM 8; InfoPath.2)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; GTB0.0; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; GACID=)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; MDDC)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Win64; x64; Trident/4.0; .NET CLR 2.0.50727; SLCC2; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; MDDC; Tablet PC 2.0)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; WOW64; Trident/4.0; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; InfoPath.2; .NET CLR 3.5.30729; .NET CLR 3.0.30729)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; FBSMTWB; InfoPath.2; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; MS-RTC LM 8)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0; .NET CLR 2.0.50727; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; WOW64; SLCC1; .NET CLR 2.0.50727; .NET CLR 3.0.04506; Media Center PC 5.0; .NET CLR 1.1.4322)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; Win64; x64; .NET CLR 2.0.50727; SLCC1; Media Center PC 5.0; .NET CLR 3.0.04506)',
      'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.0; SLCC1; .NET CLR 2.0.50727; .NET CLR 3.0.04506; Tablet PC 2.0; InfoPath.2)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; FunWebProducts; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506; Windows-Media-Player/10.00.00.3990)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; winfx; .NET CLR 1.1.4322; .NET CLR 2.0.50727; Zune 2.0)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; GTB6.4; .NET CLR 1.1.4322; FDM; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; InfoPath.1; MS-RTC LM 8)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Trident/4.0; GTB6.3; InfoPath.2; .NET CLR 2.0.50727; .NET CLR 1.1.4322; .NET CLR 3.0.04506.648; .NET CLR 3.5.21022; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; MSN Optimized;US)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Meridio for Excel 5.0.251; Meridio for PowerPoint 5.0.251; Meridio for Word 5.0.251; Meridio Protocol; .NET CLR 1.1.4322; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30; .NET CLR 3.0.04506.648; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; Avant Browser; .NET CLR 2.0.50727; Creative ZENcast v1.02.12; .NET CLR 3.0.04506.30)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.1.4322; InfoPath.1; .NET CLR 2.0.50727)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; SU 3.1; SLCC1; .NET CLR 2.0.50727; .NET CLR 3.0.04506; .NET CLR 1.1.4322; Tablet PC 2.0; .NET CLR 3.5.21022)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 2.0.50727; Zune 2.0)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; WOW64; SLCC1; .NET CLR 2.0.50727; .NET CLR 3.0.04506; Media Center PC 5.0; .NET CLR 1.1.4322; Windows-Media-Player/10.00.00.3990; InfoPath.2',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 2.0.50727; MEGAUPLOAD 1.0)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506; Alexa Toolbar)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0; SLCC1; .NET CLR 2.0.50727; Media Center PC 5.0; .NET CLR 3.0.04506)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.1.4322; InfoPath.1; .NET CLR 2.0.50727; .NET CLR 3.0.04506.30; Dealio Deskball 3.0)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.1.4322)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.2; WOW64; .NET CLR 2.0.50727)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.2; Win64; x64; .NET CLR 2.0.50727)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; DOF-IE; .NET CLR 1.1.4322; DOF-IE; DOF-IE)',
      'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727)',
      'Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 6.0)',
      'Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 6.0 ; .NET CLR 2.0.50215; SL Commerce Client v1.0; Tablet PC 2.0',
      'Mozilla/6.0 (compatible; MSIE 7.0a1; Windows NT 5.2; SV1)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows 98; Rogers Hi·Speed Internet; (R1 1.3))',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; Business Everywhere 7.1.2; GTB6; .NET CLR 1.0.3705; .NET CLR 1.1.4322; Media Center PC 4.0)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; NeosBrowser; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; TheFreeDictionary.com; .NET CLR 1.1.4322; .NET CLR 1.0.3705; .NET CLR 2.0.50727)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; SV1; .NET CLR 1.1.4322; .NET CLR 2.0.50727)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; WOW64; SV1; .NET CLR 2.0.50727)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; Win64; x64; SV1; .NET CLR 2.0.50727)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322; XMPP Tiscali Communicator v.10.0.2; .NET CLR 2.0.50727)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; T312461)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1) Netscape/8.0.4',
      'Mozilla/4.0 (compatible; MSIE 6.0; America Online Browser 1.1; rev1.2; Windows NT 5.1; SV1; .NET CLR 1.1.4322)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows 98; Win 9x 4.90; Creative)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; FunWebProducts; .NET CLR 1.1.4322; PeoplePal 6.2)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows XP)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; APC; .NET CLR 1.0.3705; .NET CLR 1.1.4322; .NET CLR 2.0.50215; InfoPath.1)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; Deepnet Explorer 1.5.0; .NET CLR 1.0.3705)',
      'Mozilla/4.0 (compatible- MSIE 6.0- Windows NT 5.1- SV1- .NET CLR 1.1.4322',
      'Mozilla/4.0 (compatible; MSIE 6.0; WINDOWS; .NET CLR 1.1.4322)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; Media Center PC 3.0; .NET CLR 1.0.3705; MediaCenter 5.1.2600.2180)',
      'Mozilla/4.0 (compatible; MSIE 5.01; Windows 95; MSIECrawler)',
      'Mozilla/4.0 (compatible; MSIE 6.0; AOL 9.0; Windows NT 5.1)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322; Alexa Toolbar; (R1 1.5))',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; Maxthon; .NET CLR 1.1.4322)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322) ,gzip(gfe) (via translate.google.com)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; Win64; AMD64)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.2; Win64; AMD64)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; Crazy Browser 2.0.0 Beta 1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Update a; AOL 6.0; Windows 98)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; YPC 3.0.2; .NET CLR 1.1.4322; yplus 4.4.02b)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322; .NET CLR 2.0.40607)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322) Babya Discoverer 8.0:',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; Crazy Browser 1.0.5)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT) ::ELNSB50::000061100320025802a00111000000000507000900000000',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; MyIE2; Deepnet Explorer)',
      'Mozilla/4.0 (compatible; MSIE 5.23; Macintosh; PPC) Escape 5.1.3',
      'Mozilla/4.0 (compatible; MSIE 5.23; Mac_PowerPC)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0; .NET CLR 1.0.3705; .NET CLR 1.1.4322)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; FREE; .NET CLR 1.1.4322)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.1.4322)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; Q312461)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; .NET CLR 1.0.3705)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.0)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows 98; Win 9x 4.90)',
      'Mozilla/4.0 (compatible; MSIE 5.5; Windows 98)',
      'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.0; .NET CLR 1.1.4322)',
      'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.0; T312461)',
      'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 4.0)',
      'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 4.0; .NET CLR 1.0.2914)',
      'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.0)',
      'Mozilla/4.0 (compatible; MSIE 5.5; Windows 95)',
      'Mozilla/4.0 (compatible; MSIE 5.13; Mac_PowerPC)',
      'Mozilla/4.0 (compatible; MSIE 5.5; Windows 95; BCD2000)',
      'Mozilla/4.0 (compatible; MSIE 5.5; Windows NT 5.1; .NET CLR 1.1.4322; .NET CLR 2.0.50727; InfoPath.2)',
      'Mozilla/4.0 (compatible; MSIE 5.0; SunOS 5.10 sun4u; X11)',
      'Mozilla/4.0 (compatible; MSIE 5.22; Mac_PowerPC)',
      'Mozilla/4.0 (compatible; MSIE 5.0; Windows 3.1)',
      'Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)',
      'Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0; .NET CLR 1.1.4322; .NET CLR 2.0.50727; InfoPath.2)',
      'Mozilla/4.0 (compatible; MSIE 5.0; Mac_PowerPC; e504460WanadooNL)',
      'Mozilla/4.0 (compatible; MSIE 5.0; Windows 3.1)',
      'Mozilla/4.0 (compatible; MSIE 4.01; Windows NT 5.0)',
      'Mozilla/4.0 (compatible; MSIE 4.01; Digital AlphaServer 1000A 4/233; Windows NT; Powered By 64-Bit Alpha Processor)',
      'Mozilla/2.0 (compatible; MSIE 3.02; Windows CE; 240x320)',
      'Mozilla/2.0 (compatible; MSIE 3.0; Windows 3.1)',
      'Mozilla/1.22 (compatible; MSIE 2.0; Windows 95)',
      'Mozilla/1.22 (compatible; MSIE 2.0d; Windows NT)',
      'Mozilla/4.0 (compatible; MSIE 6.0; Windows CE; IEMobile 7.11)'
    ],
    Firefox: [
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:16.0) Gecko/20100101 Firefox/16.0',
      'Mozilla/5.0 (Windows NT 6.0; rv:15.0) Gecko/20100101 Firefox/15.0.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:12.0) Gecko/20100101 Firefox/12.0',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:16.0) Gecko/20100101 Firefox/16.0',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:13.0) Gecko/20100101 Firefox/13.0.1',
      'Mozilla/5.0 (Windows NT 5.2; rv:14.0) Gecko/20100101 Firefox/14.0.1',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:15.0) Gecko/20100101 Firefox/15.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:5.0.1) Gecko/20100101 Firefox/5.0.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:15.0) Gecko/20100101 Firefox/15.0.1',
      'Mozilla/5.0 (Windows NT 6.1; rv:16.0) Gecko/20100101 Firefox/16.0',
      'Mozilla/5.0 (Windows NT 6.0; rv:14.0) Gecko/20100101 Firefox/14.0.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:12.0) Gecko/20100101 Firefox/12.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:13.0) Gecko/20100101 Firefox/13.0',
      'Mozilla/5.0 (Windows NT 6.1; rv:12.0) Gecko/20100101 Firefox/12.0',
      'Mozilla/5.0 (Windows NT 6.1; rv:17.0) Gecko/17.0 Firefox/17.0',
      'Mozilla/5.0 (Windows NT 6.1; rv:8.0) Gecko/20100101 Firefox/8.0',
      'Mozilla/5.0 (Windows NT 6.1; rv:14.0) Gecko/20100101 Firefox/14.0.1',
      'Mozilla/5.0 (Windows NT 5.1; rv:12.0) Gecko/20100101 Firefox/12.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:17.0) Gecko/20100101 Firefox/17.0',
      'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:10.0.2) Gecko/20100101 Firefox/10.0.2',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:6.0.2) Gecko/20100101 Firefox/6.0.2',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:7.0.1) Gecko/20100101 Firefox/7.0.1',
      'Mozilla/5.0 (Windows NT 5.1; rv:14.0) Gecko/20100101 Firefox/14.0.1',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:10.0) Gecko/20100101 Firefox/10.0',
      'Mozilla/5.0 (Windows NT 6.1; rv:2.0) Gecko/20100101 Firefox/4.0',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:14.0) Gecko/20100101 Firefox/14.0.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:10.0.2) Gecko/20100101 Firefox/10.0.2',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:12.0) Gecko/20100101 Firefox/12.0',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:9.0) Gecko/20100101 Firefox/9.0',
      'Mozilla/5.0 (Windows NT 5.1; rv:17.0) Gecko/20100101 Firefox/17.0',
      'Mozilla/5.0 (Windows NT 5.1; rv:8.0) Gecko/20100101 Firefox/8.0',
      'Mozilla/5.0 (X11; Linux x86_64; rv:9.0) Gecko/20100101 Firefox/9.0',
      'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:16.0) Gecko/20100101 Firefox/16.0',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:11.0) Gecko/20100101 Firefox/11.0',
      'Mozilla/5.0 (Windows NT 5.1; rv:16.0) Gecko/20100101 Firefox/16.0',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:18.0) Gecko/20100101 Firefox/18.0',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:8.0) Gecko/20100101 Firefox/8.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:9.0.1) Gecko/20100101 Firefox/9.0.1',
      'Mozilla/5.0 (Windows NT 5.1; rv:10.0) Gecko/20100101 Firefox/10.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:7.0.1) Gecko/20100101 Firefox/7.0.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:8.0.1) Gecko/20100101 Firefox/8.0.1',
      'Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:16.0) Gecko/20100101 Firefox/16.0',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:10.0.2) Gecko/20100101 Firefox/10.0.2',
      'Mozilla/5.0 (Windows NT 6.0; rv:12.0) Gecko/20100101 Firefox/12.0',
      'Mozilla/5.0 (Windows NT 6.2; WOW64; rv:18.0) Gecko/20100101 Firefox/18.0',
      'Mozilla/5.0 (Windows NT 5.1; rv:13.0) Gecko/20100101 Firefox/13.0.1',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:17.0) Gecko/17.0 Firefox/17.0',
      'Mozilla/5.0 (X11; Ubuntu; Linux i686; rv:14.0) Gecko/20100101 Firefox/14.0.1',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:15.0) Gecko/20100101 Firefox/15.0.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:16.0) Gecko/20100101 Firefox/16.0',
      'Mozilla/5.0 (Windows NT 5.1; rv:18.0) Gecko/20100101 Firefox/18.0',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:17.0) Gecko/20100101 Firefox/17.0',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:8.0.1) Gecko/20100101 Firefox/8.0.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:10.0.2) Gecko/20100101 Firefox/10.0.2',
      'Mozilla/5.0 (Windows NT 5.1; rv:7.0.1) Gecko/20100101 Firefox/7.0.1',
      'Mozilla/5.0 (Windows NT 6.0; rv:7.0.1) Gecko/20100101 Firefox/7.0.1',
      'Mozilla/5.0 (Windows NT 5.1; rv:15.0) Gecko/20100101 Firefox/15.0.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:8.0.1) Gecko/20100101 Firefox/8.0.1',
      'Mozilla/5.0 (Windows NT 5.1; rv:11.0) Gecko/20100101 Firefox/11.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:14.0) Gecko/20100101 Firefox/14.0.1',
      'Mozilla/5.0 (Windows NT 6.1; rv:10.0.2) Gecko/20100101 Firefox/10.0.2',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:13.0) Gecko/20100101 Firefox/13.0.1',
      'Mozilla/5.0 (Windows NT 6.1; rv:18.0) Gecko/20100101 Firefox/18.0',
      'Mozilla/5.0 (Windows NT 6.1; rv:17.0) Gecko/20100101 Firefox/17.0',
      'Mozilla/5.0 (Windows NT 6.1; rv:21.0) Gecko/20130211 Firefox/21.0',
      'Mozilla/5.0 (Windows NT 6.1; rv:6.0) Gecko/20100101 Firefox/6.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:17.0) Gecko/20100101 Firefox/17.0',
      'Mozilla/5.0 (Windows NT 6.1; rv:13.0) Gecko/20100101 Firefox/13.0.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:14.0) Gecko/20100101 Firefox/14.0',
      'Mozilla/5.0 (Windows NT 6.1; rv:15.0) Gecko/20100101 Firefox/15.0.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:17.0) Gecko/17.0 Firefox/17.0',
      'Mozilla/5.0 (Windows NT 6.1; rv:11.0) Gecko/20100101 Firefox/11.0',
      'Mozilla/5.0 (Windows NT 5.2; WOW64; rv:17.0) Gecko/20100101 Firefox/17.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:11.0) Gecko/20100101 Firefox/11.0',
      'Mozilla/5.0 (Windows NT 5.1; rv:15.0) Gecko/20100101 Firefox/15.0',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:13.0) Gecko/20100101 Firefox/13.0',
      'Mozilla/5.0 (Windows NT 5.1; rv:10.0.2) Gecko/20100101 Firefox/10.0.2',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:14.0) Gecko/20100101 Firefox/14.0.1',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:9.0.1) Gecko/20111222 Firefox/9.0.1',
      'Mozilla/5.0 (Windows NT 6.1; rv:7.0.1) Gecko/20100101 Firefox/7.0.1',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:6.0.2) Gecko/20100101 Firefox/6.0.2',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:16.0) Gecko/20100101 Firefox/16.0',
      'Mozilla/5.0 (Windows NT 6.0; rv:16.0) Gecko/20100101 Firefox/16.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:18.0) Gecko/20100101 Firefox/18.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.5; rv:9.0) Gecko/20100101 Firefox/9.0',
      'Mozilla/5.0 (Windows NT 6.1; rv:9.0.1) Gecko/20100101 Firefox/9.0.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:9.0.1) Gecko/20100101 Firefox/9.0.1',
      'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:15.4) Gecko/20130122 Firefox/15.4.1 PaleMoon/15.4.1',
      'Mozilla/5.0 (Windows NT 6.0; WOW64; rv:16.0) Gecko/20100101 Firefox/16.0',
      'Mozilla/5.0 (Ubuntu; X11; Linux x86_64; rv:9.0.1) Gecko/20100101 Firefox/9.0.1',
      'Mozilla/5.0 (Windows NT 6.1; rv:13.0) Gecko/20100101 Firefox/13.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:15.0) Gecko/20100101 Firefox/15.0.1',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.5; rv:2.0.1) Gecko/20100101 Firefox/4.0.1',
      'Mozilla/5.0 (Windows NT 6.1; rv:10.0.1) Gecko/20100101 Firefox/10.0.1',
      'Mozilla/5.0 (Windows NT 6.0; rv:18.0) Gecko/20100101 Firefox/18.0',
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.6; rv:18.0) Gecko/20100101 Firefox/18.0',
      'Mozilla/5.0 (Windows; U; Windows NT 6.1; en-US; rv:1.9.2.10) Gecko/20100914 Firefox/3.6.10 ( .NET CLR 3.5.30729)'
    ],
    Opera: [
      'Opera/9.80 (Windows NT 6.1; WOW64) Presto/2.12.388 Version/12.12',
      'Opera/9.80 (Windows NT 6.1; Win64; x64) Presto/2.12.388 Version/12.11',
      'Opera/9.80 (Windows NT 5.1) Presto/2.12.388 Version/12.11',
      'Opera/9.80 (Windows NT 6.1; U; ru) Presto/2.10.289 Version/12.01',
      'Opera/9.80 (Windows NT 5.1; U; ru) Presto/2.10.289 Version/12.02',
      'Opera/9.80 (Windows NT 6.2) Presto/2.12.388 Version/12.10',
      'Opera/9.80 (Windows NT 6.1; WOW64; U; Edition Campaign 21; fr) Presto/2.10.289 Version/12.02',
      'Opera/9.80 (Windows NT 6.1; U; en) Presto/2.10.289 Version/12.01',
      'Opera/9.80 (Windows NT 6.1; WOW64; U; en) Presto/2.10.289 Version/12.00',
      'Opera/9.80 (Windows NT 6.1; WOW64; U; nb) Presto/2.10.289 Version/12.01'
    ],
    WebKit: [
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/536.26.14 (KHTML, like Gecko) (Coda, like Safari)',
      'Mozilla/5.0 (PLAYSTATION 3 4.30) AppleWebKit/531.22.8 (KHTML, like Gecko)',
      'Mozilla/5.0 (iPad; CPU OS 5_0_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Mobile/9A405'
    ]
  }, function(classification, agent_strings){
    test( 'Sensing of '+classification+' browser from user agent string', function(){
      expect(agent_strings.length);
      $.each(agent_strings, function(ix, agent_string){
        var
          client = agent_string,
          match = $.reel.re.ua[0].exec(client) ||
                  $.reel.re.ua[1].exec(client) ||
                  $.reel.re.ua[2].exec(client)

        if (match){
          ok( match[1] == classification, agent_string);
        }else{
          ok( false, 'FAILED COMPLETELY on '+agent_string);
        }
      });
    });
  });

})(jQuery);
