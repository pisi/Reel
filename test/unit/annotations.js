/**
 * .reel Unit Tests
 */
(function($){

  module('Annotations', { teardown: function teardown(){
    $('.jquery-reel').trigger('teardown');
    // The teardown is automatic since 1.2
  }});

  test( 'No (or undefined) `annotations` option doesn\'t result in any sebsequent DOM changes', function(){
    expect(1);
    var
      selector= '#image',
      $reel= $(selector).reel() // `undefined` is default

    ok( !$reel.parent().find('.jquery-reel-annotations').length, 'The `.jquery-reel-annotations` child not present anywhere in the instance');
  });


  test( 'Defining an annotations object results in rendering of respective DOM node container', function(){
    expect(1);
    var
      selector= '#image',
      $reel= $(selector).reel({
        annotations: {}
      })

    ok( !!$('~ .jquery-reel-annotations', $reel).length, 'The `.jquery-reel-annotations` child node of `jquery-reel-interface` node present');
  });


  test( 'One annotation DOM container (holder) is rendered per each `annotations` object key/value pair', function(){
    expect(2);
    var
      selector= '#image',
      $reel= $(selector).reel({
        annotations: {
          "my_annotation_name": {}
        }
      }),
      $annotations= $('~ .jquery-reel-annotations', $reel)

    equal( !!$('div[id]', $annotations).length, 1, 'One annotation node with `id` attribute');
    ok( !!$('#my_annotation_name').length, 'Reachable by an `id` selector equal to annotation key');
  });

  asyncTest( '`holder` holds a collection of HTML attributes used for the handler\'s `div` tag', function(){
    expect(7);
    var
      selector= '#image',
      $reel= $(selector).reel({
        annotations: {
          "my_annotation": {
            holder: {
              text: 'Some text',
              'class': 'some_class_name',
              title: 'Some hint',
              // Any attribute would do as it would for jQuery's `.attr()`
              'any-attribute': 'any-value'
            },
          },
          "still_holder": {}
        }
      }),
      $annotations= $('~ .jquery-reel-annotations', $reel)

    // Positioning of annotations happens at `frameChange`
    $reel.one('frameChange', function(){
      ok( !!$('div#my_annotation').length, 'Node present');
      //ok( $('#my_annotation').is(':visible'), 'Node visible');
      ok( $('#my_annotation').is(':contains(Some text)'), 'Node text content');
      equal( $('#my_annotation').text(), 'Some text', 'Node text content');
      ok( !!$('#my_annotation.some_class_name').length, 'Class name applied');
      equal( $('#my_annotation[title]').attr('title'), 'Some hint', '`title` attribute applied');
      equal( $('#my_annotation[any-attribute]').attr('any-attribute'), 'any-value', 'Any attribute would do');

      ok( !!$('div#still_holder').length, 'Holder is always present, even when not defined');
      start();
    });
  });

  asyncTest( '`image` holds a collection of HTML attributes used for an `img` tag inside the holder', function(){
    expect(5);
    var
      selector= '#image',
      $reel= $(selector).reel({
        annotations: {
          "my_annotation": {
            image: {
              src: 'some/my/image.jpg',
              width: 100,
              height: 50
            }
          }
        }
      }),
      $annotations= $('~ .jquery-reel-annotations', $reel)

    // Positioning of annotations happens at `frameChange`
    $reel.one('frameChange', function(){
      ok( !!$('div#my_annotation').length, 'Holder node present');
      ok( !!$('div#my_annotation img').length, 'Wrapping an image node');
      equal( $('#my_annotation img').attr('src'), 'some/my/image.jpg', 'Image `src`');
      equiv( $('#my_annotation img').css('width'), 100, 'CSS width');
      equiv( $('#my_annotation img').css('height'), 50, 'CSS height');
      //equiv( $('#my_annotation img').attr('width'), 100, '`width`');
      //equiv( $('#my_annotation img').attr('height'), 50, '`height`');
      start();
    });
  });

  asyncTest( '`link` holds a collection of HTML attributes used for an `a` tag inside the holder', function(){
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
      $annotations= $('~ .jquery-reel-annotations', $reel)

    // Positioning of annotations happens at `frameChange`
    $reel.one('frameChange', function(){
      ok( !!$('div#text_link').length, 'Holder node present');
      ok( !!$('div#text_link a').length, 'Wrapping a link node');
      equal( $('#text_link a').attr('href'), 'http://some/location', 'Link `href`');
      equal( $('#text_link a').text(), 'Click to navigate away', '`title`');

      ok( !!$('div#image_link').length, 'Holder node present');
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
            holder: {
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
      $annotations= $('~ .jquery-reel-annotations', $reel),
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


  // TODO Add positioning tests



})(jQuery);
