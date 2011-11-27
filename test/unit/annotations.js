/**
 * .reel Unit Tests
 */
(function($){

  module('Annotations', reel_test_module_routine);

  test( 'No (or undefined) `annotations` option doesn\'t result in any sebsequent DOM changes', function(){
    expect(1);
    var
      selector= '#image',
      $reel= $(selector).reel({ annotations: undefined }) // `undefined` is also the default value

    ok( !$reel.next('.jquery-reel-annotations').length, 'The `.jquery-reel-annotations` child not present anywhere in the instance');
  });


  test( 'Defining an annotations object results in rendering of respective DOM node container', function(){
    expect(1);
    var
      selector= '#image',
      $reel= $(selector).reel({
        annotations: {}
      })

    ok( !!$reel.next('.jquery-reel-annotations').length, 'The `.jquery-reel-annotations` child node of `jquery-reel-interface` node present');
  });


  test( 'One annotation DOM container (node) is rendered per each `annotations` object key/value pair', function(){
    expect(2);
    var
      selector= '#image',
      $reel= $(selector).reel({
        annotations: {
          "my_annotation_name": {}
        }
      }),
      $annotations= $reel.next('.jquery-reel-annotations')

    equal( !!$('div[id]', $annotations).length, 1, 'One annotation node with `id` attribute');
    ok( !!$('#my_annotation_name').length, 'Reachable by an `id` selector equal to annotation key');
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
            },
          },
          "still_node": {}
        }
      }),
      $annotations= $reel.next('.jquery-reel-annotations')

    // Positioning of annotations happens at `frameChange`
    $reel.one('frameChange.test', function(){
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
            image: {
              src: 'samples/badge-1.gif',
              width: 120,
              height: 30
            }
          }
        }
      }),
      $annotations= $reel.next('.jquery-reel-annotations')

    // Positioning of annotations happens at `frameChange`
    $reel.one('frameChange.test', function(){
      ok( !!$('div#my_annotation').length, 'Node node present');
      ok( !!$('div#my_annotation img').length, 'Wrapping an image node');
      equal( $('#my_annotation img').attr('src'), 'samples/badge-1.gif', 'Image `src`');
      equiv( $('#my_annotation img').attr('width') || $('#my_annotation img').css('width'), 120, 'CSS width');
      equiv( $('#my_annotation img').attr('height') || $('#my_annotation img').css('height'), 30, 'CSS height');
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
      }),
      $annotations= $reel.next('.jquery-reel-annotations')

    // Positioning of annotations happens at `frameChange`
    $reel.one('frameChange.test', function(){
      ok( !!$('div#text_link').length, 'Node node present');
      ok( !!$('div#text_link a').length, 'Wrapping a link node');
      equal( $('#text_link a').attr('href'), 'http://some/location', 'Link `href`');
      equal( $('#text_link a').text(), 'Click to navigate away', '`title`');

      ok( !!$('div#image_link').length, 'Node node present');
      ok( !!$('div#image_link > a > img').length, 'Wrapping a link node wrapping an image node');
      equal( $('#image_link a').attr('href'), 'http://some/location', 'Link `href`');
      equal( $('#image_link img').attr('src'), 'some/my/image.jpg', 'Image `src`');

      start();
    });
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
        // And this will autoscroll thorugh all frames once
        entry: 1,
        opening: 1
      }),
      checked= [],
      $annotations= $reel.next('.jquery-reel-annotations'),
      $annotation= $('#my_annotation')

    // Positioning of annotations happens at `frameChange`
    // and we test it bubbled up to instance's parent
    $reel.parent().bind('frameChange.test', function(){
      var
        frame= $reel.data('frame'),
        should= should_be[frame - 1] == '+'

      equal( $annotation.is(':visible') , should, (should ? 'On' : 'Off')+' @ frame '+frame );

      checked.push(frame);
      if (checked.length == frames){
        $reel.parent().unbind('.test');
        start();
      }
    });
  });

  asyncTest( 'GH-69 The annotations wrapper DOM element is tagged with `frame-X` class name', function(){
    expect( 2 );
    var
      $reel= $('#image').reel({ annotations: {}, speed: 1 });

    setTimeout(function(){
      var
        frame= $reel.data('frame')
      ok( frame, 'Instance stopped at frame '+frame);
      ok( $('#image-reel .jquery-reel-annotations').attr('class').match(/frame-[0-9]+/), 'The annotations wrapper carries frame-'+frame+' class name');
      start();
    }, 123);
  });

  asyncTest( 'Horizontal position of annotation is defined by `x` property relative to left top corner', function(){
    expect( 1 );
    var
      x= '50%',
      $reel= $('#image').reel({ annotations: {
        'x-positioned-annotation': {
          x: x
        }
      }})

    $reel.bind('loaded.test', function(){
      equal( $('#x-positioned-annotation').css('left'), x, '50%');
      start();
    });
  });

  asyncTest( 'Vertical position of annotation is defined by `y` property', function(){
    expect( 2 );
    var
      y= 30,
      $reel= $('#image').reel({ annotations: {
        'y-positioned-annotation': {
          y: y
        }
      }})

    $reel.bind('loaded.test', function(){
      equal( $('#y-positioned-annotation').css('top'), y + 'px', '30px');
      equiv( $('#y-positioned-annotation').css('top'), y, 'It indeed is 30px');
      start();
    });
  });

  asyncTest( 'Both `x` and `y` properties can accept an Array of positions coordinates', function(){
    expect( 12 );
    var
      frames= 6,
      checked= 0,
      xs= [ 10, 20, 30, 20, 10, 0 ],
      ys= [ 20, 10, 0 , 40, 50, 30 ],
      y= 30,
      $reel= $('#image').reel({ frames: frames, speed: 1, annotations: {
        'xy-positioned-annotation': {
          x: xs,
          y: ys
        }
      }})

    $reel.parent().bind('frameChange.test', function(){
      var
        frame= $reel.data('frame')

      if (frame == checked) return;

      equiv( $('#xy-positioned-annotation').css('left'), xs[checked], 'x @ frame '+frame);
      equiv( $('#xy-positioned-annotation').css('top'), ys[checked], 'y @ frame '+frame);
      checked++;
      if (checked >= frames) start();
    });
  });


})(jQuery);
