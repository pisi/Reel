/*
 * .reel - Image Turntable Plugin
 *
 * Transforms an image tag to act as an projector
 *
 */
/*! Copyright (c) 2009 Petr Vostrel (http://www.pisi.cz/)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://www.pisi.cz/jquery/reel/
 * Version: 1.0 RC
 * Updated: 2009-08-25
 *
 * Requires jQuery 1.3.x
 */
/*
 * Optional nice-to-haves:
 * - jQuery.disableTextSelect (James Dempster, http://www.jdempster.com/category/jquery/disabletextselect/)
 * - jQuery.mouseWheel (Brandon Aaron, http://brandonaaron.net/)
 */

(function($){
  $.fn.reel= function(options){
    var defaults= {
        footage:            6, // number of frames per line/column
        frame:              1, // initial frame
        frames:            36, // total number of frames; every 10° for full rotation
        horizontal:      true, // roll flow; defaults to horizontal
        indicator:      false, // visual indicator of rotation
        loops:           true, // is it a loop?
        panorama:       false, // panoramas require much less sensitive controls
        save:           false, // wheather allow user to save the image thumbnail
        spacing:            0, // space between frames on roll/sheet
        suffix:      '-sheet'
    }
    return this.each(function(){
      var t= $(this),
          set= $.extend(defaults, options),
          pool= $(document),
          store= function(name, value){
            t.data(name, value);
            t.trigger('store');
            return value;
          },
          recall= function(name){
            var value= t.data(name);
            t.trigger('recall')
            return value;
          },
          on= {
            init: function(){
              var classes= t.attr('class'),
                  src= t.attr('src'),
                  image= src.replace(/^(.*)\.(jpg|jpeg|png|gif)$/, '$1' + set.suffix + '.$2'),
                  size= { x: number(t.css('width')), y: number(t.css('height')) },
                  turntable= $('<div>').attr('class',classes).addClass("jquery_reel"),
                  external_methods= ['mousewheel', 'disableTextSelect'],
                  image_css= set.save ? { opacity: 0 } : { display: 'none' };
              t= t.wrap(turntable).css(image_css)
              .parent().css({
                width: size.x + 'px', 
                height: size.y + 'px',
                cursor: 'ew-resize',
                backgroundImage: 'url(' + image + ')'
              });
              for (var ev in on) t.bind(ev, on[ev]);
              // Stub methods from missing plugins
              $.each(external_methods, function(ix,method){
                if (!$.fn[method]) $.fn[method]= function(){ return this; };
              });
              t.trigger('setup');
            },
            setup: function(e){
              var size= { x: number(t.css('width')), y: number(t.css('height')) };
              store('frames', set.frames);
              store('spacing', set.spacing);
              store('offset', t.offset());
              store('dimensions', size);
              store('sensitivity', set.panorama ? 70 : 20);
              t.trigger('start');
            },
            start: function(e){
              t
              .mouseenter(function(e){ t.trigger('enter'); })
              .mouseleave(function(e){ t.trigger('leave'); })
              .mousemove(function(e){ t.trigger('over', [e.clientX, e.clientY]); })
              .mousewheel(function(e, delta){ t.trigger('wheel', [delta]); return false; })
              // .dblclick(function(e){ t.trigger('animate'); })
              .mousedown(function(e){ t.trigger('down', [e.clientX, e.clientY]); })
              .disableTextSelect();
              if (set.indicator) t.append($('<div>').addClass('indicator'));
              t.trigger('frameChange', set.frame);
            },
            animate: function(e){
              // Stub
              log(e.type);
            },
            down: function(e, x, y){
              var clicked= store('clicked',true),
                  location= store('clicked_location', x),
                  frame= store('clicked_on_frame', recall('frame'));
              pool
              .mousemove(function(e){ t.trigger('drag', [e.clientX, e.clientY]); })
              .mouseup(function(e){ t.trigger('up'); });
            },
            up: function(e){
              var clicked= store('clicked',false);
              pool.unbind('mousemove mouseup');
            },
            drag: function(e, x, y){
              var origin= recall('clicked_location'),
                  sensitivity= recall('sensitivity'),
                  frame= recall('clicked_on_frame'),
                  frames= recall('frames'),
                  distance= Math.round((origin - x) / sensitivity),
                  reversed= store('reversed', distance < 0),
                  frame= store('frame', frame - distance);
              t.trigger('frameChange');
            },
            frameChange: function(e, frame){
              var frame= !frame ? recall('frame') : store('frame', frame),
                  frames= recall('frames'),
                  space= recall('dimensions'),
                  spacing= recall('spacing'),
                  reversed= recall('reversed'),
                  // Take care of the looping
                  frame= !set.loops && frame > frames ? frames : frame,
                  frame= !set.loops && frame < 1 ? 1 : frame,
                  frame= frame - Math.floor(frame / frames) * frames,
                  frame= store('frame', frame < 1 ? frames : frame),
                  // Convert frame number to coords
                  major= Math.floor(frame / set.footage),
                  minor= frame - major * set.footage - 1,
                  major= minor == -1 ? major + minor : major,
                  minor= minor == -1 ? set.footage + minor : minor,
                  // Count new positions
                  major_size= set.horizontal ? space.y : space.x,
                  minor_size= set.horizontal ? space.x : space.y,
                  x= - major * (spacing + major_size),
                  y= - minor * (spacing + minor_size),
                  rows= Math.ceil(frames / set.footage),
                  // Count additional shift when rolling reverse direction
                  reverse_shift= rows * major_size + (rows - 1) * spacing,
                  x= reversed && set.horizontal ? x - reverse_shift : x,
                  y= reversed && !set.horizontal ? y - reverse_shift : y,
                  shift= set.horizontal ? y + 'px ' + x + 'px' : x + 'px ' + y + 'px',
                  indicator= (space.x / (frames - 1) * (frame - 1)) + 'px';
              t.css('backgroundPosition', shift);
              t.find('.indicator').css('left', indicator);
            },
            wheel: function(e, delta){
              var frame= recall('frame'),
                  sensitivity= recall('sensitivity'),
                  frames= recall('frames'),
                  delta= Math.abs(delta) > 4 ? delta / sensitivity / 3 : delta, // Dampener for Chrome on Mac
                  shift= delta < 0 ? Math.floor(delta) : Math.ceil(delta),
                  reversed= store('reversed', shift < 0),
                  frame= store('frame', frame - shift);
              t.trigger('frameChange');
              return false;
            }
          };
      t.ready(on.init);
    });
  }
  // PRIVATE
  var number= function(input){
    if (typeof(input) != 'string') return input;
    return input.replace(/[^0-9]+/, '') - 0;
  }
})(jQuery);