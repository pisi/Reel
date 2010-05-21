/*
 * .reel - Image Turntable Plugin
 *
 * Transforms an image tag to act as a projector
 *
 */
/*! Copyright (c) 2009-2010 Petr Vostrel (http://www.pisi.cz/)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://www.vostrel.cz/jquery/reel/
 * Version: "Dancer" (will be 1.1 on release)
 * Updated: 2010-05-21
 *
 * Requires jQuery 1.4.x or higher
 */
/*
 * Optional nice-to-haves:
 * - jQuery.disableTextSelect (James Dempster, http://www.jdempster.com/category/jquery/disabletextselect/)
 * - jQuery.mouseWheel (Brandon Aaron, http://plugins.jquery.com/project/mousewheel)
 * - or jQuery.event.special.wheel (Three Dub Media, http://blog.threedubmedia.com/2008/08/eventspecialwheel.html)
 */

(function($){
  var
    defaults= {
      // Options as of version 1.0
      // [deprecated] options will disappear in future versions
      footage:            6, // number of frames per line/column
      frame:              1, // initial frame
      frames:            36, // total number of frames; every 10° for full rotation
      hint:              '', // hotspot hint tooltip
      horizontal:      true, // roll flow; defaults to horizontal
      hotspot:    undefined, // custom jQuery as a hotspot
      indicator:          0, // size of a visual indicator of reeling (in pixels)
      klass:             '', // plugin instance class name
      loops:           true, // is it a loop?
      reversed:       false, // true for "counter-clockwise sprite"
                             // (defaults to double the viewport size or half the `stitched` option)
      saves:          false, // [deprecated] whether allow user to save the image thumbnail
      sensitivity:       20, // interaction sensitivity
      spacing:            0, // space between frames on reel
      stitched:   undefined, // pixel width (length) of a stitched (rectilinear) panoramic reel
      suffix:       '-reel', // sprite filename suffix (A.jpg's sprite is A-reel.jpg by default)
      tooltip:           '', // [deprecated] use `hint` instead

      // Additional options as of 1.1
      delay:              1, // delay before autoplay in seconds (use -1 to disable)
      frequency:       0.25, // animated rotation speed in revolutions per second (Hz)
      friction:         0.8, // friction of the inertial rotation (will loose 80% of speed per second)
      inertial:        true, // drag & throw will give the rotation a momentum when true
      monitor:    undefined, // stored value name to monitor in the upper left corner of the viewport
      revolution: undefined, // distance mouse must be dragged for full revolution
      step:       undefined, // initial step (overrides `frame`)
      steps:      undefined, // number of steps a revolution is divided in (by default equal to `frames`)
      tempo:             25, // shared ticker tempo in ticks per second
      timeout:            2  // idle timeout in seconds
    }

  $.fn.reel= function(options){
    var
      applicable= (function(tags){
        // Only IMG tags with non-empty SRC and non-zero WIDTH and HEIGHT will pass
        var
          pass= []
        tags.filter('img').each(function(ix){
          var
            $this= $(this),
            src= $this.attr('src'),
            width= number($this.css('width')),
            height= number($this.css('height'))
          if (!src || src=='' || !width || !height) return;
          pass.push($this);
        });
        tags.filter('div.' + klass).each(function(ix){
          pass.push($(this));
        });
        return $(pass);
      })(this),
      set= $.extend({}, defaults, options),
      instances= []

    ticker= ticker || (function run_ticker(){
      return setInterval(function tick(){
        pool.trigger(tick_event);
      }, 1000 / set.tempo);
    })();

    applicable.each(function(){
      var
        t= $(this),

        // Data storage
        store= function(name, value){
          t.data(name, value);
          t.trigger('store');
          return value;
        },
        recall= function(name){
          t.trigger('recall')
          return t.data(name);
        },

        // Events & handlers
        on= {
          setup: function(){
            if (t.hasClass(klass)) return;
            var
              src= t.attr('src'),
              id= t.attr('id'),
              classes= t.attr('class'),
              styles= t.attr('style'),
              image= src.replace(/^(.*)\.(jpg|jpeg|png|gif)$/, '$1' + set.suffix + '.$2'),
              size= { x: number(t.css('width')), y: number(t.css('height')) },
              turntable= $('<div>').attr('class',classes).addClass(klass).addClass(set.klass),
              image_css= touchy || !set.saves ? { display: 'none' } : { opacity: 0 }
            instances.push((t= t.attr('id', '').wrap(turntable).css(image_css)
            .parent().attr('id', id).bind(on).css({
              display: 'block',
              width: size.x + 'px',
              height: size.y + 'px',
              backgroundImage: 'url(' + image + ')'
            }))[0]);
            store('frames', set.frames);
            store('spacing', set.spacing);
            store('offset', t.offset());
            store('dimensions', size);
            store('fraction', 0);
            store('steps', set.steps || set.frames);
            store('resolution', max(set.steps, set.frames));
            store('reversed', set.frequency < 0);
            store('backup', {
              id: id,
              'class': classes || '',
              style: styles || ''
            });
            ticker && pool.bind(tick_event, on.tick);
            t.trigger('start');
          },
          teardown: function(e){
            t= t.unbind(on)
            .find('.indicator, .monitor').remove().end()
            .find('img')
            .attr(t.data('backup')).unwrap()
            .bind('setup', function resetup(e){
              t.unbind('setup');
              on.setup();
            });
            ticker && pool.unbind(tick_event, on.tick);
          },
          start: function(e){
            t.css({ position: 'relative' });
            var
              hotspot= set.hotspot ? set.hotspot : t,
              space= recall('dimensions'),
              frames= recall('frames'),
              resolution= max(frames, recall('steps')),
              fraction= store('fraction', 1 / resolution * ((set.step || set.frame) - 1)),
              frame= store('frame', fraction * frames + 1)
            hotspot
              .css({ cursor: 'ew-resize' })
              .mouseenter(function(e){ t.trigger('enter') })
              .mouseleave(function(e){ t.trigger('leave') })
              .mousemove(function(e){ t.trigger('over', [e.clientX, e.clientY]) })
              .mousewheel(function(e, delta){ t.trigger('wheel', [delta]); return false })
              .dblclick(function(e){ t.trigger('animate') })
              .mousedown(function(e){ t.trigger('down', [e.clientX, e.clientY]) })
              .disableTextSelect()
              .each(function touch_support(){
                touchy && bind(this, {
                  touchstart: start,
                  touchmove: move,
                  touchend: end,
                  touchcancel: end,
                  click: prevent,
                  gesturestart: prevent,
                  gesturechange: prevent,
                  gestureend: prevent
                });
                function bind(element, events){
                  $.each(events, function bind_handler(event){
                    element.addEventListener(event, this, false);
                  });
                }
                function prevent(event){
                  event.cancelable && event.preventDefault();
                  return false;
                }
                function start(event){
                  var
                    touch= event.touches[0],
                    clicked= store('clicked', true),
                    location= store('clicked_location', touch.clientX),
                    frame= store('last_frame', store('clicked_on_frame', recall('frame')));
                  return prevent(event);
                }
                function move(event){
                  var
                    touch= event.touches[0];
                  t.trigger('drag', [touch.clientX, touch.clientY]);
                  return prevent(event);
                }
                function end(event){
                  var
                    clicked= store('clicked',false);
                  return prevent(event);
                }
              });
            (set.hint || set.tooltip) && hotspot.attr('title', set.hint || set.tooltip);
            set.monitor && t.append($('<div/>', {
              className: 'monitor',
              css: { position: 'absolute', left: 0, top: 0 }
            }));
            set.indicator && t.append($('<div/>')
              .addClass('indicator')
              .css({
                width: set.indicator + 'px',
                height: set.indicator + 'px',
                top: (space.y - set.indicator) + 'px',
                position: 'absolute',
                backgroundColor: '#000'
              }));
            t.trigger('frameChange');
          },
          animate: function(e){
            // Stub for future compatibility
            // log(e.type);
          },
          tick: function(e){
            var
              frequency= set.frequency,
              friction= set.friction / set.tempo,
              velocity= recall('velocity'),
              negative= velocity < 0,
              velocity= velocity - velocity * friction,
              velocity= last_velocity= velocity == last_velocity ? 0 : velocity
              velocity= (negative? min:max)(0, round_to(3, velocity)) || 0,
              velocity= store('velocity', velocity),
              step= (frequency + velocity) / set.tempo
            $('.monitor', t).text(recall(set.monitor));
            to_bias(0);
            idle && idle++;
            if (idle && !velocity) return;
            if (recall('clicked')) return unidle();
            var
              fraction= store('fraction', recall('fraction') + step)
            t.trigger('fractionChange');
          },
          down: function(e, x, y){
            unidle();
            var
              clicked= store('clicked', true),
              location= store('clicked_location', x),
              velocity= store('velocity', 0),
              frame= store('last_fraction', store('clicked_on', recall('fraction')))
            pool
            .mousemove(function(e){ t.trigger('drag', [e.clientX, e.clientY]) })
            .mouseup(function(e){ t.trigger('up') });
          },
          up: function(e){
            var
              clicked= store('clicked', false),
              pitch= bias[1] + bias[2] != 0,
              momentum= (bias[0] + bias[1] + bias[2]) / bias.length / 20,
              velocity= store('velocity', set.inertial && pitch ? (set.stitched ? -momentum : momentum) : 0)
            no_bias();
            idle= 0;
            pool.unbind('mousemove mouseup');
          },
          drag: function(e, x, y){
            unidle();
            var
              origin= recall('clicked_location'),
              fraction= recall('clicked_on'),
              stitched= set.stitched,
              space= recall('dimensions'),
              revolution= set.revolution || stitched / 2 || space.x,
              // sensitivity= touchy? set.sensitivity * 0.6 : set.sensitivity,
              distance= (x - origin), // / sensitivity,
              reverse= (set.reversed ? -1 : 1) * (stitched ? -1 : 1),
              shift= fraction + reverse / revolution * distance,
              fraction= store('fraction', shift)
            to_bias(x - last_x);
            last_x= x;
            t.trigger('fractionChange');
          },
          wheel: function(e, distance){
            unidle();
            var
              velocity= store('velocity', 0),
              fraction= recall('fraction'),
              resolution= max(recall('frames'), recall('steps')),
              step= 1 / resolution,
              delta= ceil(sqrt(abs(distance)) / 2),
              delta= distance < 0 ? -delta : delta,
              fraction= store('fraction', fraction + delta * step)
            t.trigger('fractionChange');
            return false;
          },
          fractionChange: function(e, fraction){
            var
              fraction= !fraction ? recall('fraction') : store('fraction', fraction),
              last_fraction= recall('last_fraction'),
              delta= fraction - last_fraction,
              frequency= set.frequency= sign_like(delta, set.frequency),
              // Looping
              fraction= set.loops ? fraction - (fraction<0? ceil:floor)(fraction) : min_max(0, 1, fraction),
              // Turn negative into positive
              fraction= !set.loops ? fraction : (fraction >= 0 ? fraction : 1 + fraction),
              fraction= store('last_fraction', store('fraction', round_to(6, fraction))),
              frame= store('frame', fraction * (recall('frames') - 1) + 1)
            t.trigger('frameChange');
          },
          frameChange: function(e, frame){
            var
              frames= recall('frames'),
              fraction= !frame ? recall('fraction') : store('fraction', round_to(6, (frame-1) / (frames-1))),
              frame= !frame ? recall('frame') : store('frame', frame),
              frame= store('frame', round(frame)),
              space= recall('dimensions'),
              steps= recall('steps'),
              spacing= recall('spacing'),
              reversed= recall('reversed')
            if (!set.stitched){
              var
                major= floor(frame / set.footage),
                minor= frame - major * set.footage - 1,
                major= minor == -1 ? major + minor : major,
                minor= minor == -1 ? set.footage + minor : minor,
                // Count new positions
                major_size= set.horizontal ? space.y : space.x,
                minor_size= set.horizontal ? space.x : space.y,
                x= - major * (spacing + major_size),
                y= - minor * (spacing + minor_size),
                rows= ceil(frames / set.footage),
                // Count additional shift when rolling reverse direction
                reverse_shift= rows * major_size + (rows - 1) * spacing,
                x= reversed && set.horizontal ? x - reverse_shift : x,
                y= reversed && !set.horizontal ? y - reverse_shift : y,
                shift= set.horizontal ? y + 'px ' + x + 'px' : x + 'px ' + y + 'px'
            }else{
              var
                travel= set.loops ? set.stitched : set.stitched - space.x,
                x= round(fraction * travel),
                y= 0,
                shift= -x + 'px ' + y + 'px'
            }
            var
              travel= space.x - set.indicator,
              indicator= min_max(0, travel, round(fraction * (travel+2)) - 1)
            t.css({ backgroundPosition: shift })
              .find('.indicator').css({ left: indicator + 'px' });
          }
        },

        // User idle control
        idle= set.delay > 0 ? -round(set.delay * set.tempo) : 0,
        unidle= function(){ return idle= -set.timeout * set.tempo },

        // Inertial rotation control
        last_x= 0,
        last_velocity= 0,
        to_bias= function(value){ bias.push(value) && bias.shift() },
        no_bias= function(){ return bias= [0,0,0] },
        bias= no_bias()

      t.ready(on.setup);
    });
    return $(instances);
  }

  // Double plugin functions in case plugin is missing
  double_for('mousewheel disableTextSelect'.split(/ /));

  // PRIVATE
  var
    klass= 'jquery-reel',
    ns= '.reel',
    tick_event= 'tick'+ns,
    pool= $(document),
    // Flag touch-enabled devices
    touchy= (/iphone|ipod|ipad|android/i).test(navigator.userAgent),
    ticker,
    number= parseInt,
    round= Math.round,
    floor= Math.floor,
    ceil= Math.ceil,
    min= Math.min,
    max= Math.max,
    sqrt= Math.sqrt,
    abs= Math.abs

  function round_to(decimals, number){ return +number.toFixed(decimals) }
  function min_max(minimum, maximum, number){ return max(minimum, min(maximum, number)) }
  function sign_like(specimen, value){ return (specimen * value > 0) ? value : -value }
  function double_for(methods){
    $.each(methods, function(){
      if (!$.fn[this]) $.fn[this]= function(){ return this };
    });
  }
})(jQuery);
