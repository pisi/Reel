/**
 * .reel Unit Tests
 */
(function($){

  module('Annotations', reel_test_module_routine);

  asyncTest( 'One annotation DOM container (node) is rendered per each `annotations` object key/value pair', function(){
    expect(2);
    var
      selector= '#image',
      $reel= $(selector).reel({
        annotations: {
          "my_annotation_name": {}
        }
      })

    $(document).bind('loaded.test', function(){
      equal( !!$reel.siblings('.reel-annotation[id]').length, 1, 'One annotation node with `id` attribute');
      ok( !!$('#my_annotation_name').length, 'Reachable by an `id` selector equal to annotation key');
      start();
    });
  });

  asyncTest( '`node` holds a collection of HTML attributes used for the handler\'s `div` tag', function(){
    expect(7);
    var
      selector= '#image',
      $reel= $(selector).reel({
        annotations: {
          "my_annotation": {
            node: {
              text: 'Some text',
              'class': 'some_class_name',
              title: 'Some hint',
              // Any attribute would do as it would for jQuery's `.attr()`
              'any-attribute': 'any-value'
            }
          },
          "still_node": {}
        }
      })

    $(document).bind('loaded.test', function(){
      ok( !!$('div#my_annotation').length, 'Node present');
      //ok( $('#my_annotation').is(':visible'), 'Node visible');
      ok( $('#my_annotation').is(':contains(Some text)'), 'Node text content');
      equal( $('#my_annotation').text(), 'Some text', 'Node text content');
      ok( !!$('#my_annotation.some_class_name').length, 'Class name applied');
      equal( $('#my_annotation[title]').attr('title'), 'Some hint', '`title` attribute applied');
      equal( $('#my_annotation[any-attribute]').attr('any-attribute'), 'any-value', 'Any attribute would do');

      ok( !!$('div#still_node').length, 'Node is always present, even when not defined');
      start();
    });
  });

  asyncTest( '`image` holds a collection of HTML attributes used for an `img` tag inside the node', function(){
    expect(5);
    var
      selector= '#image',
      $reel= $(selector).reel({
        annotations: {
          "my_annotation": {
            x: 0,
            y: 0,
            image: {
              src: 'resources/badge-1.gif',
              width: 120,
              height: 30
            }
          }
        }
      })

    $(document).bind('loaded.test', function(){
      ok( !!$('div#my_annotation').length, 'Node node present');
      ok( !!$('div#my_annotation img').length, 'Wrapping an image node');
      equal( $('#my_annotation img').attr('src'), 'resources/badge-1.gif', 'Image `src`');
      equiv( parseInt($('#my_annotation img').attr('width')) || $('#my_annotation img').css('width'), 120, 'CSS width');
      equiv( parseInt($('#my_annotation img').attr('height')) || $('#my_annotation img').css('height'), 30, 'CSS height');
      start();
    });
  });

  asyncTest( '`link` holds a collection of HTML attributes used for an `a` tag inside the node', function(){
    expect(8);
    var
      selector= '#image',
      $reel= $(selector).reel({
        annotations: {
          "text_link": {
            link: {
              href: 'http://some/location',
              text: 'Click to navigate away'
            }
          },
          "image_link": {
            image: {
              src: 'some/my/image.jpg'
            },
            link: {
              href: 'http://some/location'
            }
          }
        }
      })

    $(document).bind('loaded.test', function(){
      ok( !!$('div#text_link').length, 'Node node present');
      ok( !!$('div#text_link a').length, 'Wrapping a link node');
      equal( $('#text_link a').attr('href'), 'http://some/location', 'Link `href`');
      equal( $('#text_link a').text(), 'Click to navigate away', '`title`');

      ok( !!$('div#image_link').length, 'Node node present');
      ok( !!$('div#image_link > a > img').length, 'Wrapping a link node wrapping an image node');
      equal( $('#image_link a').attr('href'), 'http://some/location', 'Link `href`');
      equal( $('#image_link img').attr('src'), 'some/my/image.jpg', 'Image `src`');
      start();
    })
  });

  asyncTest( 'Frame-based visibility annotation control properties `start` and `end`', function(){
    expect(36);
    var
      selector= '#image',
      frames= 36, // Default value
      should_be= '----+++++++++-----------------------'.split(''),
      $reel= $(selector).reel({
        annotations: {
          "my_annotation": {
            node: {
              text: "aaa"
            },
            x: 1, y: 1,
            start: 5,
            end: 13
          }
        },
        speed: 0.5
      }),
      checked= [],
      $annotation= $('#my_annotation')

    $(document).bind('loaded.test', function(){
      $(document).bind('frameChange.test', function(){
        var
          frame= $reel.data('frame'),
          should= should_be[frame - 1] == '+'

        equal( $annotation.is(':visible') , should, (should ? 'On' : 'Off')+' @ frame '+frame );

        checked.push(frame);
        if (checked.length == frames){
          start();
        }
      });
    });
  });

  asyncTest( 'GH-69 The annotations wrapper DOM element is tagged with `frame-X` class name', function(){
    expect( 2 );
    var
      $reel= $('#image').reel({ annotations: {}, speed: 1 });

    $(document).bind('loaded.test', function(){
    setTimeout(function(){
      var
        frame= $reel.data('frame')
      ok( frame, 'Instance stopped at frame '+frame);
      ok( $('#image-reel')[0].className.match(/frame-[0-9]+/), 'The instance wrapper carries frame-'+frame+' class name');
      start();
    }, 123);
    })
  });

  asyncTest( 'Horizontal position of annotation is defined by `x` property relative to left top corner', function(){
    expect( 3 );
    var
      x= '120px',
      y= 30,
      $reel= $('#image').reel({ speed: 1, annotations: {
        'positioned-annotation': {
          x: x,
          y: y
        }
      }})

    $(document).bind('frameChange.test', function(){
      equal( $('#positioned-annotation').css('left'), x, '120px');
      equal( $('#positioned-annotation').css('top'), y + 'px', '30px');
      equiv( $('#positioned-annotation').css('top'), y, 'It indeed is 30px');
      start();
    });
  });

  asyncTest( 'Both `x` and `y` properties can accept an Array of positions coordinates', function(){
    expect( 12 );
    var
      frames= 6,
      xs= [ 10, 20, 30, 20, 10, 0 ],
      ys= [ 20, 10, 0 , 40, 50, 30 ],
      y= 30,
      from= 1,
      count= 0,
      $reel= $('#image').reel({ frames: frames, speed: 1, annotations: {
        'xy-positioned-annotation': {
          x: xs,
          y: ys
        }
      }})

    $(document).bind('loaded.test', function(){
      $(document).bind('frameChange.test', function(){
        var
          frame= $reel.data('frame'),
          index= frame - from

        equiv( $('#xy-positioned-annotation').css('left'), xs[index], 'x @ frame '+frame);
        equiv( $('#xy-positioned-annotation').css('top'), ys[index], 'y @ frame '+frame);
        if (count++ >= xs.length-1) start();
      });
    });
  });

  asyncTest( 'Both `x` and `y` properties can accept an Array of positions coordinates when `start` and `end` are set', function(){
    expect( 8 );
    var
      frames= 6,
      xs= [ 10, 20, 30, 20 ],
      ys= [ 20, 10, 0 , 40 ],
      y= 30,
      from= 2,
      $reel= $('#image').reel({ frames: frames, frame: from, speed: 1, annotations: {
        'xy-positioned-annotation': {
          start: from,
          end: 5,
          x: xs,
          y: ys
        }
      }})

    $(document).bind('frameChange.test', function(){
      var
        frame= $reel.data('frame'),
        index= frame - from

      equiv( $('#xy-positioned-annotation').css('left'), xs[index], 'x @ frame '+frame);
      equiv( $('#xy-positioned-annotation').css('top'), ys[index], 'y @ frame '+frame);
      if (index >= xs.length-1) start();
    });
  });

  asyncTest( 'Visibility via position skipping', function(){
    expect( 6 );
    var
      frames= 6,
      xs= [ 10, 20, undefined, 30, , 20 ],
      ys= [ 20, undefined, 10, 0 , 40,  ],
      $reel= $('#image').reel({ frames: frames, speed: 1, annotations: {
        'xy-positioned-annotation': {
          x: xs,
          y: ys
        }
      }})

    $(document).bind('frameChange.test', function(){
      var
        frame= $reel.data('frame'),
        index= frame - 1

      equiv( $('#xy-positioned-annotation').css('display'), xs[index] === undefined || ys[index] === undefined ? 'none':'block', 'visibility @ frame '+frame);
      if (index >= xs.length-1) start();
    });
  });

  asyncTest( 'Visibility via position skipping with one fixed axis (works for the other too)', function(){
    expect( 8 );
    var
      frames= 6,
      xs= [ 10, 20, 30, 20 ],
      y= 30,
      $reel= $('#image').reel({ frames: frames, speed: 1, annotations: {
        'xy-positioned-annotation': {
          x: xs,
          y: y
        }
      }})

    $(document).bind('frameChange.test', function(){
      var
        frame= $reel.data('frame'),
        index= frame - 1

      equiv( $('#xy-positioned-annotation').css('left'), xs[index], 'x @ frame '+frame);
      equiv( $('#xy-positioned-annotation').css('top'), y, 'y @ frame '+frame);
      if (index >= xs.length-1) start();
    });
  });

  asyncTest( 'Visibility switching with `at`', function(){
    expect( 6 );
    var
      frames= 6,
      at= '-+-++-',
      x= 20,
      y= 30,
      count= 0,
      $reel= $('#image').reel({ frames: frames, frame: 1, speed: 1, annotations: {
        'at-controlled-annotation': {
          at: at,
          x: x,
          y: y
        }
      }})

    $(document).bind('frameChange.test', function(){
      var
        frame= $reel.data('frame')

      equiv( $('#at-controlled-annotation').css('display'), at[frame - 1] == '+' ? 'block':'none', 'visibility @ frame '+frame);
      if (count++ >= at.length - 1) start();
    });
  });

  test( 'GH-79 `click` event on annotation is not propagated up, where it would cause Reel to advance left/right', function(){
    expect( 1 );
    ok( true, "Test became obsolete. Since GH-122 in order to support touch devices too,"
            +" we no longer depend upon `click` events and don't care anymore about it being propagated up the DOM,"
            +" because it can no longer interfere with the stepping feature.");
  });

  asyncTest( 'Rendering of early annotation on late frame in looped panoramas', function(){
    expect( 1 );
    var
      $reel= $('#image').reel({ frames: 20, frame: 20, stitched: 2000, annotations: {
        'test-annotation': {
          x: 20,
          y: 0
        }
      }})

    $(document).bind('frameChange.test', function(){
      equiv( $('#test-annotation').css('left'), 125, 'position of the annotation');
      start();
    });
  });

  asyncTest( 'Rendering of late over-the-edge annotation on early frame in looped panoramas', function(){
    expect( 1 );
    var
      $reel= $('#image').reel({ frames: 20, frame: 1, stitched: 2000, annotations: {
        'test-annotation': {
          x: 1990,
          y: 0
        }
      }})

    $(document).bind('frameChange.test', function(){
      equiv( $('#test-annotation').css('left'), -10, 'position of the annotation');
      start();
    });
  });

})(jQuery);
