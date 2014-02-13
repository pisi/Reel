(function($){

  module('Data', reel_test_module_routine);

  asyncTest( 'Read access to all instance\'s states and values (data) is provided with `.reel( name )`', function(){

    var
      $reel= $('#image').reel({
        annotations: {}
      }),
      probes= {
        annotations: 'Object',
        area: 'Object',
        backup: 'Object',
        backwards: 'Boolean',
        bit: 'Number',
        brake: 'Number',
        cache: 'Object', // (jQuery)
        cached: 'Array',
        center: 'Boolean',
        clicked: 'Boolean',
        clicked_location: 'Object',
        clicked_on: 'Number',
        clicked_tier: 'Number',
        cwish: 'Number',
        footage: 'Number',
        departure: 'Number',
        destination: 'Number',
        distance: 'Number',
        fraction: 'Number',
        frame: 'Number',
        framelock: 'Boolean',
        frames: 'Number',
        height: 'Number',
        hi: 'Number',
        id: 'String',
        image: 'String',
        images: 'Array',
        lo: 'Number',
        loading: 'Boolean',
        monitor: 'String',
        opening: 'Boolean',
        opening_ticks: 'Number',
        options: 'Object',
        playing: 'Boolean',
        preloaded: 'Number',
        ratio: 'Number',
        reeled: 'Boolean',
        reeling: 'Boolean',
        responsive: 'Boolean',
        revolution: 'Number',
        revolution_y: 'Number',
        row: 'Number',
        rowlock: 'Boolean',
        rows: 'Number',
        shy: 'Boolean',
        spacing: 'Number',
        speed: 'Number',
        stage: 'String',
        stitched: 'Number',
        stitched_travel: 'Number',
        stitched_shift: 'Number',
        stopped: 'Boolean',
        style: 'Object', // (jQuery)
        tempo: 'Number',
        ticks: 'Number',
        tier: 'Number',
        truescale: 'Object',
        velocity: 'Number',
        vertical: 'Boolean',
        width: 'Number'
      }
      count= 0;

    $(document).bind('loaded.test', function(){
      $.each($reel.data(), function(key){
        // We exclude all jQuery internal keys
        if (key.match(/^(_[a-z]+|jQuery\d+|events|handle)$/)) return;
        count++
      });
      expect(count * 2);

      $.each(probes, function(key, type){
        ok( is(type, $reel.data(key)), '`'+key+'` '+type+' with `.data("'+key+'")`'); // 1.1 way
        ok( is(type, $reel.reel(key)), '`'+key+'` '+type+' with `.reel("'+key+'")`'); // 1.2+ way
      });
      start();
    })
  });

  asyncTest( 'Contents of attributes backup `.reel("backup")`', function(){

    expect(6);
    var
      $reel= $('#image').reel()

    $(document).bind('loaded.test', function(){
      ok( is('Object', $reel.reel('backup')), '`.reel("backup")` Object');
      ok( is('Object', $reel.reel('backup').attr), '`attr` String');
      ok( is('String', $reel.reel('backup').attr.src), '`attr.src` String');
      ok( is('String', $reel.reel('backup').attr.width), '`attr.width` String');
      ok( is('String', $reel.reel('backup').attr.height), '`attr.height` String');
      ok( is('Object', $reel.reel('backup').data), '`data` String');
      start();
    });

  });

  asyncTest( 'Stage dimensions inside `.reel("width")` and `.reel("height")', function(){

    expect(2);
    var
      $reel= $('#image').reel()

    $(document).bind('loaded.test', function(){
      ok( is('Number', $reel.reel('width')), '`width` Number');
      ok( is('Number', $reel.reel('height')), '`height` Number');
      start();
    });

  });

  asyncTest( 'Write access is provided by `.reel( name, value )`', function(){

    expect(1);
    var
      $reel= $('#image').reel(),
      value= 5

    $(document).bind('loaded.test', function(){
      $reel.reel('something', value);
      equal( $reel.reel('something'), value, '`"something"` value set' )
      start();
    });

  });

  asyncTest( 'Changing a data key value triggers respective change event', function(){

    expect(4);
    var
      value= 5,
      $reel= $('#image').reel()

    $(document).bind('loaded.test', function(){
      $(document).bind('somethingChange.test', function(evnt, nothing, something){
        ok(true, 'Change event has been triggered once');
        ok( is('Object', evnt), 'The event handler is passed the event as first argument as usual,');
        ok( typeof nothing === 'undefined', 'always `undefined` as the second argument,');
        equal( something, value, 'and finally the actual value as the third/last argument');
      })
      $reel.reel('something', null); // Change from undefined to anything else is no longer considered as change
                                     // so in order to test this, we need a non-undefined initial value
      $reel.reel('something', value);

      start();
    });

  });

  asyncTest( 'Instance data get cleared on teardown and original data are recovered from the backup', function(){

    expect(12);
    var
      value= 5,
      key= 'test_probe',
      value= 'test_value',
      $image= $('#image').data(key, value),
      $reel= $image.reel()

    $(document).bind('loaded.test', function(){
      ok( $image.data(key), 'Test probe key exists in the data prior to `.reel()` call');
      equal( $image.data(key), value, 'And it indeed is our verified probe');

      $image.reel();
      ok( $image.data(key), 'Test probe exists even in the running instance after the `.reel() call');
      equal( $image.data(key), value, 'And it still is the same probe');
      ok( is('Number', $image.data('frame')), 'Instance data are accessible (`"frame"`)');
      ok( is('Number', $image.data('width')), 'Instance data are accessible (`"width"`)');
      ok( is('Array', $image.data('images')), 'Instance data are accessible (`"images"`)');

      $image.unreel();
      ok( $image.data(key), 'Test probe is still present even after `.unreel() call');
      equal( $image.data(key), value, 'And it is our probe');
      ok( typeof $image.data('frame') === 'undefined', 'Instance data are gone (`"frame"`)');
      ok( typeof $image.data('height') === 'undefined', 'Instance data are gone (`"height"`)');
      ok( typeof $image.data('images') === 'undefined', 'Instance data are gone (`"images"`)');
      start();
    });

  });

  asyncTest( 'Options used in `.reel(options)` call are stored in `"options"` data key', function(){

    expect(2);
    var
      path= 'test_path',
      $reel= $('#image').reel({ path: path })

    $(document).bind('loaded.test', function(){
      equal( $reel.data('options').path, path, '`path` key exists and equals');
      equal( $reel.data('options').frames, 36, 'along with defaults for all other options');
      start();
    });

  });

  $.each({
    'frame2fraction': {
      change: 'frame', verify: 'fraction',
      samples: [ 10, 36, 18, 19, 9, 3, 1 ],
      options: {
        frame: 3
      }
    },
    'frame2tier': {
      change: 'frame', verify: 'tier',
      samples: [ 40, 36, 70, 10, 108, 3, 91 ],
      options: {
        rows: 3,
        frame: 3
      }
    },
    'row2tier': {
      change: 'row', verify: 'tier',
      samples: [ 5, 1, 3, 6, 2 ],
      options: {
        rows: 6,
        frames: 12
      }
    },
    'fraction2frame': {
      change: 'fraction', verify: 'frame',
      samples: [ 0.1, 0.5, 0.03, .6, 0.99 ],
      options: {
      }
    },
    'tier2row': {
      change: 'tier', verify: 'row',
      samples: [ 0.99, 0.5, 0.03, .6, 0.1 ],
      options: {
        rows: 3
      }
    },
    'tier2frame': {
      change: 'tier', verify: 'frame',
      samples: [ 0.99, 0.5, 0.03, .6, 0.1 ],
      options: {
        rows: 3
      }
    }
  }, function(name, def){

    asyncTest( 'Change events: Changing `"'+def.change+'"` results in a `"'+def.verify+'"` change', function(){

      var
        i= 0,
        $reel= $('#image').reel(def.options),
        before

      expect(def.samples.length * 2);

      $(document).bind('loaded.test', function(){
        try_sample();
      });

      function try_sample(){
        var
          verified= 0,
          sample= def.samples[ i++ ]
        
        if ( !sample ) return start();

        $(document).one(def.change+'Change.test', function(evnt, depr, probe){
          equal( probe, sample, 'Change had been reported with the `"'+def.change+'Change"` event');
          verify();
        });

        $(document).one(def.verify+'Change.test', function(evnt, depr, probe){
          ok( probe != before, 'Change had been reported with the `"'+def.verify+'Change"` event');
          verify();
        });

        before= $reel.reel(def.verify);
        $reel.reel(def.change, sample);

        function verify(){
          if ( verified++ ) try_sample();
        }
      }

    });

  });

  // Data normalization is already tested indirectly in the Computations module when assigning `frame`s `fraction`s and `row`s
  // and testing the looping or non-looping nature of the result. Here's a very similar testing only direct and aimed
  // on the normalization of edge cases and extremes
  $.each({
    'looping': {
      options: {
        loops: true
      },
      probes: {
        '3': 0,
        '1.8': 0.8,
        '0.6': 0.6,
        '-0.3': 0.7,
        '-1.2': 0.8
      }
    },
    'non-looping': {
      options: {
        loops: false
      },
      probes: {
        '3': 1,
        '1.8': 1,
        '0.4': 0.4,
        '-0.3': 0,
        '-1.2': 0
      }
    },
    'non-looping-multirow': {
      options: {
        rows: 3,
        row: 2,
        loops: false
      },
      probes: {
        '3': 1,
        '1.8': 1,
        '0.4': 0.4,
        '-0.3': 0,
        '-1.2': 0
      }
    }
  }, function(testcase, def){
    test( 'Normalization of '+testcase+' `"fraction"`', function(){
      expect(5);
      var
        data= {
          options: def.options
        }

      $.each(def.probes, function(ix, it){
        equal( $.reel.normal.fraction(Number(ix), data).toFixed(4), it, 'Fraction '+ix+' became '+it);
      });

    });
  });

  $.each({
    'looping': {
      data: {
        frames: 18,
        options: {
          orbital: 0,
          loops: true
        }
      },
      probes: {
        '53': 17,
        '23': 5,
        '13': 13,
        '-3': 15,
        '-32': 4
      }
    },
    'looping-orbital': {
      data: {
        frames: 18,
        options: {
          loops: true,
          orbital: 2
        }
      },
      probes: {
        '53': 17,
        '23': 23,
        '13': 13,
        '-3': 33,
        '-32': 4
      }
    },
    'looping-multirow': {
      data: {
        frames: 18,
        options: {
          loops: true,
          rows: 3
        }
      },
      probes: {
        '83': 29,
        '43': 43,
        '13': 13,
        '-13': 41,
        '-62': 46
      }
    },
    'non-looping': {
      data: {
        frames: 18,
        options: {
          orbital: 0,
          loops: false
        }
      },
      probes: {
        '53': 18,
        '23': 18,
        '13': 13,
        '-3': 1,
        '-32': 1
      }
    },
    'non-looping-orbital': {
      data: {
        frames: 18,
        options: {
          loops: false,
          orbital: 2
        }
      },
      probes: {
        '53': 36,
        '23': 23,
        '13': 13,
        '-3': 1,
        '-32': 1
      }
    },
    'non-looping-multirow': {
      data: {
        frames: 18,
        options: {
          loops: false,
          rows: 3
        }
      },
      probes: {
        '83': 54,
        '43': 43,
        '13': 13,
        '-13': 1,
        '-62': 1
      }
    }
  }, function(testcase, def){
    test( 'Normalization of '+testcase+' `"frame"`', function(){
      expect(5);
      var
        data= def.data

      $.each(def.probes, function(ix, it){
        equal( $.reel.normal.frame(Number(ix), data), it, 'Frame '+ix+' became '+it);
      });

    });
  });

  test( 'Normalization of `"tier"`', function(){
    expect(5);
    var
      probes= {
        '3': 1,
        '1.8': 1,
        '0.4': 0.4,
        '-0.3': 0,
        '-1.2': 0
      },
      data= {}

    $.each(probes, function(ix, it){
      equal( $.reel.normal.tier(Number(ix), data).toFixed(4), it, 'Tier '+ix+' became '+it);
    });
  });

  test( 'Normalization of `"row"`', function(){
    expect(5);
    var
      probes= {
        '9': 4,
        '6': 4,
        '2': 2,
        '-1': 1,
        '-5': 1
      },
      data= {
        options: {
          rows: 4
        }
      }

    $.each(probes, function(ix, it){
      equal( $.reel.normal.row(Number(ix), data), it, 'Row '+ix+' became '+it);
    });
  });

  asyncTest( 'New `image` value will load the new image while maintaining current geometry and status', function(){

    expect(5);

    var
      old_image = 'http://somewhere/something.jpg',
      new_image = 'http://somewhere/something/else.jpg',
      frame = 5,
      pass = 0,
      $reel = $('#image').reel({
        image: old_image,
        frame: frame
      })

    $(document).bind('loaded.test', function(){

      switch (++pass){

        case 1:
          equiv( $reel.css('backgroundImage'), 'url('+old_image+')', 'Old image at first' );
          $reel.reel('image', new_image);
          break;

        case 2:
          equiv( $reel.css('backgroundImage'), 'url('+new_image+')', 'Image changed on the fly' );
          equal( $reel.reel('frame'), frame, 'Reel frame hasn\'t changed' );
          equal( $reel.reel('cache').children().length, 1, 'Still just one image in the cache' );

          // Wait a sec for preloader transition to finish
          setTimeout(function(){
            equal( !$reel.siblings('.reel-preloader').css('width'), 0, 'Preloader gets properly reset' );
            start();
          }, 1000);
          break;

      }
    });
  });

  asyncTest( 'New `images` value will load new images while maintaining current geometry and status', function(){

    expect(6);

    var
      old_images = [
        'http://somewhere/something.jpg',
        'http://somewhere/something2.jpg',
        'http://somewhere/something3.jpg'
      ],
      new_images = [
        'http://somewhere/something/else.jpg',
        'http://somewhere/something/else2.jpg',
        'http://somewhere/something/else3.jpg'
      ],
      frame = 2,
      pass = 0,
      $reel = $('#image').reel({
        images: old_images,
        frame: frame
      })

    $(document).bind('opening.test', function(){

      switch (++pass){

        case 1:
          equal( $reel.attr('src'), old_images[frame - 1], 'Old image at first' );
          $reel.reel('images', new_images);
          break;

        case 2:
          deepEqual( $reel.reel('images'), new_images, 'New images in' );
          equal( $reel.attr('src'), new_images[frame - 1], 'Image changed on the fly' );
          equal( $reel.reel('frame'), frame, 'Reel frame hasn\'t changed' );
          equal( $reel.reel('cache').children().length, new_images.length, 'Cache population in check' );

          // Wait a sec for preloader transition to finish
          setTimeout(function(){
            equal( !$reel.siblings('.reel-preloader').css('width'), 0, 'Preloader gets properly reset' );
            start();
          }, 1000);
          break;

      }
    });

  });

  $.each({
    'width in folder':          { width: 357, height: 211, url: 'images/@W/image.jpg',           target: 'images/357/image.jpg' },
    'height in folder':         { width: 357, height: 211, url: 'images/@H/image.jpg',           target: 'images/211/image.jpg' },
    'both in folder':           { width: 357, height: 211, url: 'images/@W/@H/image.jpg',        target: 'images/357/211/image.jpg' },
    'width in file':            { width:  78, height: 875, url: 'images/big/image-@W-wide.jpg',  target: 'images/big/image-78-wide.jpg' },
    'height in file':           { width:  78, height: 875, url: 'images/big/image-@H-high.jpg',  target: 'images/big/image-875-high.jpg' },
    'both in file':             { width:  78, height: 875, url: 'images/big/image-@Wx@H.jpg',    target: 'images/big/image-78x875.jpg' },
    'width in query params':    { width: 124, height: 641, url: 'image.php?width=@W',            target: 'image.php?width=124' },
    'height in query params':   { width: 124, height: 641, url: 'image.php?height=@H',           target: 'image.php?height=641' },
    'both in query params':     { width: 124, height: 641, url: 'image.php?w=@W&h=@H',           target: 'image.php?w=124&h=641' },
    'folder query combination': { width: 200, height: 150, url: 'files/@W/pic?@H',               target: 'files/200/pic?150' },
    'folder file combination':  { width: 200, height: 150, url: 'files/@W/@H.png',               target: 'files/200/150.png' },
    'file query combination':   { width: 200, height: 150, url: 'file/@W-wide?@H-high',          target: 'file/200-wide?150-high' },
    'folder file query combo':  { width: 200, height: 150, url: 'files/@W-wide/@H-high?s=@Wx@H', target: 'files/200-wide/150-high?s=200x150' }
  },
  function(designation, def){

    asyncTest( '`$.reel.substitute()` substitutes data values in image resource URLs - '+designation+' (`'+def.url+'`)', function(){

      expect(3);

      var
        $reel= $('#image').reel({
          attr: {
            width:  def.width,
            height: def.height
          }
        }),
        // Minimal data interface expected by `$.reel.substitute()`
        get= function(name){ return $reel.data(name) },
        substitute= $.reel.substitute(def.url, get)

      $(document).bind('loaded.test', function(){
        equal( $reel.reel('width'), def.width, 'Correct target width');
        equal( $reel.reel('height'), def.height, 'Correct target height');

        equal( substitute, def.target, 'URL with substituted value(s): `'+substitute+'`');

        start();
      });

    });
  });

  $.each({
    'timestamp in folder':       { url: 'images/@T/image.jpg', target: /images\/\d{13,}\/image\.jpg/ },
    'timestamp in file':         { url: 'images/@T.jpg',       target: /images\/\d{13,}\.jpg/ },
    'timestamp in query params': { url: 'images/image.rb?@T',  target: /images\/image\.rb\?\d{13,}/ }
  },
  function(designation, def){

    asyncTest( '`$.reel.substitute()` substitutes data values in image resource URLs - '+designation+' (`'+def.url+'`)', function(){

      expect(2);

      ok( typeof $.reel.substitutes == 'object', 'Namespace ready');
      var
        $reel= $('#image').reel(),
        // Minimal data interface expected by `$.reel.substitute()`
        get= function(name){ return $reel.data(name) },
        substitute= $.reel.substitute(def.url, get)

      $(document).bind('loaded.test', function(){
        ok( substitute.match(def.target), 'URL with substituted value(s): `'+substitute+'`');
        start();
      });

    });
  });

  asyncTest( '`$.reel.substitutes` object for custom substitution definitions', function(){

    expect(3);

    ok( typeof $.reel.substitutes == 'object', 'Publicly accessible namespace for URL data substitutions');
    ok( typeof $.reel.substitutes.T == 'function', 'Already contains the timestamp substitution `@T`');

    var
      url= 'url/with/non-existing/@Y',
      $reel= $('#image').reel(),
      // Minimal data interface expected by `$.reel.substitute()`
      get= function(name){ return $reel.data(name) },
      substitute= $.reel.substitute(url, get)

    $(document).bind('loaded.test', function(){
      equal( substitute, url, 'Unrecognized mark will pass through unchanged: `'+substitute+'`');
      start();
    });

  });

  $.each({
    'in folder':       { url: 'imgs/@X/23.png',       target: 'imgs/hi/23.png' },
    'in file':         { url: 'imgs/@X.jpg?23',       target: 'imgs/hi.jpg?23' },
    'in query params': { url: 'imgs/pic.rb?23&@X',    target: 'imgs/pic.rb?23&hi' }
  },
  function(designation, def){

    asyncTest( '`$.reel.substitute()` with custom substitution function - '+designation+' (`'+def.url+'`)', function(){

      expect(2);

      ok( typeof $.reel.substitutes == 'object', 'Namespace ready');

      // This custom substitution tests general functionality
      $.reel.substitutes.X= function(){ return 'hi' }

      var
        $reel= $('#image').reel(),
        // Minimal data interface expected by `$.reel.substitute()`
        get= function(name){ return $reel.data(name) },
        substitute= $.reel.substitute(def.url, get)

      $(document).bind('loaded.test', function(){
        equal( substitute, def.target, 'URL with substituted value(s): `'+substitute+'`');
        start();
      });

    });
  });

  $.each({
    'in folder':       { frame: 5, url: 'imgs/@X/high.png',  target: 'imgs/5/high.png' },
    'in file':         { frame: 5, url: 'imgs/@X.jpg',       target: 'imgs/5.jpg' },
    'in query params': { frame: 5, url: 'imgs/img?index=@X', target: 'imgs/img?index=5' }
  },
  function(designation, def){

    asyncTest( '`$.reel.substitute()` with custom substitution function - '+designation+' (`'+def.url+'`)', function(){

      expect(2);

      ok( typeof $.reel.substitutes == 'object', 'Namespace ready');

      // This custom substitution tests working access into the live data store
      $.reel.substitutes.X= function(get){ return get('frame') }

      var
        $reel= $('#image').reel({
          frame: def.frame
        }),
        // Minimal data interface expected by `$.reel.substitute()`
        get= function(name){ return $reel.data(name) }

      $( document ).bind('openingDone.test', function(){
        var
          substitute= $.reel.substitute(def.url, get)

        equal( substitute, def.target, 'URL with substituted value(s): `'+substitute+'`');
        start();
      });

    });
  });

  asyncTest( 'Data-configured `&lt;img&gt;` tags are turned into Reel instances upon scan', function(){

    expect(7);

    var
      options= {
        image: 'image2.jpg',
        frames: 15,
        frame: 5
      },
      $img= $('<img>').attr({
        src: 'image.jpg',
        width: 300,
        height: 200,
        id: 'my_data_configured_image',
        'class': 'reel',
        'data-image': options.image,
        'data-frames': options.frames,
        'data-frame': options.frame
      }).appendTo('#Body');

    $.reel.scan();

    $(document).bind('loaded.test', function(){
      ok( $img.parent().is('.reel-overlay'), 'Image is nested inside the Reel overlay (`.reel-overlay`)' );
      $.each(options, function(option, value){
        equal( $img.reel('options')[option], value, 'Tested `'+option+'` value picked up.');
        equal( $img.reel(option), value, 'Tested `'+option+'` actually used.');
      });

      start();
    });

  });

  asyncTest( 'Data-configured annotation are used into Reel instances', function(){

    expect(4);

    var
      options= {
        x: 100,
        y: 50
      },
      $img= $('<img>').attr({
        src: 'image.jpg',
        width: 300,
        height: 200,
        id: 'my_data_configured_image',
        'class': 'reel'
      }).appendTo('#Body'),
      $annotation= $('<div>', {
        text: 'Some annotation text'
      }).attr({
        id: 'my_own_annotation',
        'class': 'reel-annotation',
        'data-for': 'my_data_configured_image',
        'data-x': options.x,
        'data-y': options.y
      }).appendTo('#Body')

    ok( $annotation.parent().is('#Body'), 'Annotation node was originally nested inside `#Body`' );

    $.reel.scan();

    $(document).bind('loaded.test', function(){
      ok( $annotation.parent().is('.reel-overlay'), 'After scan, it nests within the Reel instance');
      
      setTimeout(function(){
        equiv( $annotation.css('left'), options.x, 'Correct horizontal position');
        equiv( $annotation.css('top'), options.y, 'Correct vertical position');
        start();
      }, 0);
    });

  });

  asyncTest( 'Image cache stored in the data', function(){

    expect(4);

    var
      frames= 3,
      $reel= $('#image').reel({
        images: 'abc#.jpg',
        frames: frames
      })

    ok( !!$reel.reel('cache').children().length, 'Initially empty cache is filled right away');

    $(document).bind('loaded.test', function(){
      ok( $reel.reel('cache').is('div'), 'Cache is a `<div>` element');
      equal( $reel.reel('cache').children().length, frames, 'Containing one children per frame');
      equal( $reel.reel('cache').children('img').length, frames, 'These children are all `<img>` elements');
      start();
    });

  });

  asyncTest( 'Preloading state of the instance can be read from `loading` data key', function(){

    expect(2);

    var
      frames= 3,
      $reel= $('#image').reel({
        images: 'abc#.jpg',
        frames: frames
      })

    equal( $reel.reel('loading'), true, 'Boolean `true` when loading is in progress');

    $(document).bind('loaded.test', function(){
      equal( $reel.reel('loading'), false, 'Boolean `true` when loading is over');
      start();
    });

  });

  asyncTest( 'Footage will equal `frames` if total number of frames is less than default footage', function(){

    expect(2);

    var
      frames= 3,
      $reel= $('#image').reel({
        frames: frames
      })

    $(document).bind('loaded.test', function(){
      ok( $reel.reel('footage') != $.reel.def.footage, 'Other than default');
      equal( $reel.reel('footage'), frames, 'Footage equals frames');
      start();
    });

  });

  asyncTest( 'Shy data status gets cleared at setup', function(){

    expect(2);

    var
      $reel= $('#image').reel({
        shy: true
      })

    equal( $reel.reel('shy'), true, '`shy` data value before setup' );

    $reel.trigger('setup');

    equal( $reel.reel('shy'), false, '`shy` data value after setup' );
    start();
  });

})(jQuery);
