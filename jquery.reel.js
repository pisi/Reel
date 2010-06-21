/**
          @@@@@@@@@@@@@@
      @@@@@@@@@@@@@@@@@@@@@@
    @@@@@@@@          @@@@@@@@
  @@@@@@@                @@@@@@@
 @@@@@@@                  @@@@@@@
 @@@@@@@                  @@@@@@@
 @@@@@@@@     @          @@@@@@@@
  @@@@@@@@@  @@@       @@@@@@@@@
   @@@@@@@@@@@@@@   @@@@@@@@@@@
     @@@@@@@@@@@@@    @@@@@@@
       @@@@@@@@@@@@     @@@
          @@@@@@
         @@@@
        @@
 *
 * jQuery Reel
 * ===========
 * 360° projection plugin for jQuery
 *
 * @license Copyright (c) 2009-2010 Petr Vostrel (http://petr.vostrel.cz/)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://jquery.vostrel.cz/reel
 * Version: "Dancer" (will be 1.1 on release)
 * Updated: 2010-06-21
 *
 * Requires jQuery 1.4.x
 */
/*
 * Have it served by a cloud CDN:
 * - http://code.vostrel.cz/jquery.reel-bundle.js (recommended)
 * - http://code.vostrel.cz/jquery.reel.js
 * - http://code.vostrel.cz/jquery.reel-debug.js
 *
 * Optional nice-to-have plugins:
 * - jQuery.disableTextSelect [B] (James Dempster, http://www.jdempster.com/category/jquery/disabletextselect/)
 * - jQuery.mouseWheel [B] (Brandon Aaron, http://plugins.jquery.com/project/mousewheel)
 * - or jQuery.event.special.wheel (Three Dub Media, http://blog.threedubmedia.com/2008/08/eventspecialwheel.html)
 *
 * [B] Marked plugins are contained (with permissions) in the "bundle" version
 */

(function($, window, document, undefined){
  var
    defaults= $.reel= {
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
      sensitivity:       20, // [deprecated] interaction sensitivity
      spacing:            0, // space between frames on reel
      stitched:   undefined, // pixel width (length) of a stitched (rectilinear) panoramic reel
      suffix:       '-reel', // sprite filename suffix (A.jpg's sprite is A-reel.jpg by default)
      tooltip:           '', // [deprecated] use `hint` instead

      // [NEW] in version 1.1
      delay:             -1, // delay before autoplay in seconds (no autoplay by default)
      friction:         0.9, // friction of the rotation inertia (will loose 90% of speed per second)
      image:      undefined, // image sprite to be used
      images:            [], // sequence array of individual images to be used instead of sprite
      inertia:         true, // drag & throw will give the rotation a momentum when true
      monitor:    undefined, // stored value name to monitor in the upper left corner of the viewport
      path:              '', // URL path to be prepended to `image` or `images` filenames
      rebound:          0.5, // time spent on the edge (in seconds) of a non-looping panorama before it bounces back
      revolution: undefined, // distance mouse must be dragged for full revolution
                             // (defaults to double the viewport size or half the `stitched` option)
      speed:              0, // animated rotation speed in revolutions per second (Hz)
      step:       undefined, // initial step (overrides `frame`)
      steps:      undefined, // number of steps a revolution is divided in (by default equal to `frames`)
      tempo:             25, // shared ticker tempo in ticks per second
      timeout:            2  // idle timeout in seconds
    }
    // [deprecated] options may be gone anytime soon

  $.fn.reel= function(options){
    var
      set= $.extend({}, defaults, options),
      applicable= (function(tags){
        // Only IMG tags with non-empty SRC and non-zero WIDTH and HEIGHT will pass
        var
          pass= []
        tags.filter(_img_).each(function(ix){
          var
            $this= $(this),
            src= set.images.length && set.images || set.image || $this.attr(_src_),
            width= number($this.css(_width_)),
            height= number($this.css(_height_))
          if (!src || src == __ || !width || !height) return;
          pass.push($this);
        });
        tags.filter(_div_ + dot(klass)).each(function(ix){
          pass.push($(this));
        });
        return $(pass);
      })(this),
      instances= [],
      ticker_timeout= 1000 / set.tempo

    ticker= ticker || (function tick(){
      pool.trigger(tick_event);
      return setTimeout(tick, 1000 / set.tempo);
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
              src= t.attr(_src_),
              id= t.attr(_id_),
              classes= t.attr(_class_),
              styles= t.attr('style'),
              images= set.images,
              size= { x: number(t.css(_width_)), y: number(t.css(_height_)) },
              image_src= set.images ? transparent : src,
              style= {
                display: 'block',
                width: size.x + _px_,
                height: size.y + _px_
              },
              $instance= t.attr({ src: image_src }).bind(on).addClass(klass).css(style),
              $instance= $instance.bind(unidle_events, unidle)
              instances_count= instances.push($instance[0])
            store(_image_, images.length && images.length || set.image || src.replace(/^(.*)\.(jpg|jpeg|png|gif)$/, '$1' + set.suffix + '.$2'));
            store(_frame_, set.frame);
            store(_frames_, images.length || set.frames);
            store(_spacing_, set.spacing);
            store(_dimensions_, size);
            store(_fraction_, 0);
            store(_steps_, set.steps || set.frames);
            store(_stage_, '#'+id+set.suffix);
            store(_reversed_, set.speed < 0);
            store(_backup_, {
              src: src,
              style: styles || __
            });
            ticker && pool.bind(tick_event, on.tick);
            t.trigger('start');
          },
          teardown: function(e){
            $(recall(_stage_)).remove();
            t.removeClass(klass)
            .unbind(ns).unbind(on)
            .unbind(unidle_events, unidle)
            .attr(t.data(_backup_))
            .enableTextSelect()
            .removeData();
            no_bias();
            pool
            .unbind(_mouseup_).unbind(_mousemove_)
            .unbind(tick_event, on.tick);
          },
          start: function(e){
            var
              space= recall(_dimensions_),
              frames= recall(_frames_),
              resolution= max(frames, recall(_steps_)),
              fraction= store(_fraction_, 1 / resolution * ((set.step || set.frame) - 1)),
              frame= store(_frame_, fraction * frames + 1),
              image= recall(_image_),
              images= set.images,
              loaded= 0,
              preload= !images.length ? [image] : new Array().concat(images),
              $preloader,
              id= t.attr('id'),
              img_tag= t[0],
              img_frames= img_tag.frames= preload.length,
              img_preloads= img_tag.preloads= img_tag.preloads || [],
              img_preloaded= img_tag.preloaded= img_tag.preloaded || 0,
              preload_images= preload.length != img_tag.preloads.length,
              overlay_id= recall(_stage_).substr(1),
              overlay_css= { position: 'relative', width: space.x },
              $overlay= $(_div_tag_, { className: overlay_klass, id: overlay_id, css: overlay_css }).insertAfter(t),
              $hi= $(_div_tag_, { className: hi_klass,
                css: { position: _absolute_, left: 0, top: -space.y, width: space.x, height: space.y }
              }).appendTo($overlay),
              hotspot= store(_hotspot_, $(set.hotspot || $hi ))
            if (!touchy) hotspot
              .css({ cursor: 'url('+drag_cursor+'), '+failsafe_cursor })
              .bind(_mouseenter_, function(e){ t.trigger('enter') })
              .bind(_mouseleave_, function(e){ t.trigger('leave') })
              .bind(_mousemove_, function(e){ t.trigger('over', [e.pageX, e.pageY]) })
              .bind(_mousewheel_, function(e, delta){ t.trigger('wheel', [delta]); return false })
              .bind(_dblclick_, function(e){ t.trigger('animate') })
              .bind(_mousedown_, function(e){ t.trigger('down', [e.clientX, e.clientY]); return false })
              .disableTextSelect()
            else hotspot
              .css({ WebkitUserSelect: 'none' })
              .each(function touch_support(){
                bind(this, {
                  touchstart: start,
                  touchmove: move,
                  touchend: end,
                  touchcancel: end
                });
                function bind(element, events){
                  $.each(events, function bind_handler(event){
                    element.addEventListener(event, this, false);
                  });
                }
                function prevent(event){
                  return event.cancelable && event.preventDefault() || false;
                }
                function start(event){
                  var
                    touch= event.touches[0]
                  t.trigger('down', [touch.clientX, touch.clientY, true])
                  return prevent(event);
                }
                function move(event){
                  var
                    touch= event.touches[0]
                  t.trigger('drag', [touch.clientX, touch.clientY, true]);
                  return prevent(event);
                }
                function end(event){
                  t.trigger('up', [true]);
                  return prevent(event);
                }
              });
            (set.hint || set.tooltip) && hotspot.attr(_title_, set.hint || set.tooltip);
            set.monitor && $overlay.append($(_div_tag_, {
              className: monitor_klass,
              css: { position: _absolute_, left: 0, top: -space.y }
            }));
            set.indicator && $overlay.append($(_div_tag_, {
              className: indicator_klass,
              css: {
                width: set.indicator + _px_,
                height: set.indicator + _px_,
                top: (-set.indicator) + _px_,
                position: _absolute_,
                backgroundColor: _hex_black_
              }
             }));
            // Preloading of image(s)
            preload_images && $overlay.append($preloader= $(_div_tag_, {
              className: preloader_klass,
              css: {
                position: _absolute_,
                left: 0,
                top: -0.5*set.indicator,
                height: 0.5*set.indicator,
                backgroundColor: _hex_black_
              }
            }));
            if (preload_images) while(preload.length){
              var
                img= new Image(),
                url= set.path+preload.shift()
              $(img).load(function(){
                img_tag.preloaded++
                $preloader.css({ width: 1 / img_tag.frames * img_tag.preloaded * space.x })
                if (img_tag.frames == img_tag.preloaded) $preloader.remove()
              })
              img.src= url;
              img_tag.preloads.push(img)
            }
            t.trigger('frameChange');
          },
          animate: function(e){
            // Stub for future compatibility
            // log(e.type);
          },
          tick: function(e){
            var
              speed= set.speed,
              friction= set.friction / set.tempo,
              velocity= recall(_velocity_),
              negative= velocity < 0,
              velocity= velocity - velocity * friction,
              velocity= last_velocity= velocity == last_velocity ? 0 : velocity
              velocity= (negative? min:max)(0, round_to(3, velocity)) || 0,
              velocity= store(_velocity_, velocity),
              step= (speed + velocity) / set.tempo
            $(dot(monitor_klass), recall(_stage_)).text(recall(set.monitor));
            to_bias(0);
            operated && operated++;
            if (operated && !velocity) return;
            if (recall(_clicked_)) return unidle();
            var
              fraction= store(_fraction_, recall(_fraction_) + step)
            t.trigger('fractionChange');
          },
          down: function(e, x, y, touched){
            var
              hotspot= recall(_hotspot_),
              clicked= store(_clicked_, true),
              location= store(_clicked_location_, x),
              velocity= store(_velocity_, 0),
              frame= store(_last_fraction_, store(_clicked_on_, recall(_fraction_)))
            !touched && pool
            .bind(_mousemove_, function(e){ t.trigger('drag', [e.clientX, e.clientY]) })
            .bind(_mouseup_, function(e){ t.trigger('up') }) && hotspot
            .css({ cursor: url(drag_cursor_down)+', '+failsafe_cursor });
          },
          up: function(e, touched){
            var
              hotspot= recall(_hotspot_),
              clicked= store(_clicked_, false),
              damper= touched ? 15 : 20,
              momentum= (bias[0] + bias[1] + bias[2]) / bias.length / damper,
              reverse= (set.reversed ? -1 : 1) * (set.stitched ? -1 : 1),
              velocity= store(_velocity_, set.inertia ? momentum * reverse : 0)
            no_bias();
            !touched && pool
            .unbind(_mouseup_).unbind(_mousemove_) && hotspot
            .css({ cursor: url(drag_cursor)+', '+failsafe_cursor });
          },
          drag: function(e, x, y, touched){
            var
              origin= recall(_clicked_location_),
              fraction= recall(_clicked_on_),
              stitched= set.stitched,
              space= recall(_dimensions_),
              revolution= set.revolution || stitched / 2 || space.x,
              // sensitivity= touchy? set.sensitivity * 0.6 : set.sensitivity,
              distance= (x - origin), // / sensitivity,
              reverse= (set.reversed ? -1 : 1) * (stitched ? -1 : 1),
              shift= fraction + reverse / revolution * distance,
              fraction= store(_fraction_, shift)
            to_bias(x - last_x);
            last_x= x;
            t.trigger('fractionChange');
          },
          wheel: function(e, distance){
            var
              velocity= store(_velocity_, 0),
              fraction= recall(_fraction_),
              resolution= max(recall(_frames_), recall(_steps_)),
              step= 1 / resolution,
              delta= ceil(sqrt(abs(distance)) / 2),
              delta= distance < 0 ? -delta : delta,
              fraction= store(_fraction_, fraction + delta * step)
            t.trigger('fractionChange');
            return false;
          },
          fractionChange: function(e, fraction){
            var
              fraction= !fraction ? recall(_fraction_) : store(_fraction_, fraction),
              last_fraction= recall(_last_fraction_),
              delta= fraction - last_fraction,
              speed= set.speed= sign_like(delta, set.speed),
              // Looping
              fraction= set.loops ? fraction - (fraction<0? ceil:floor)(fraction) : min_max(0, 1, fraction),
              // Rebounce
              bounce= !set.loops && set.rebound && on_edge == set.rebound * 1000 / set.tempo,
              speed= set.speed= bounce ? -speed : speed,
              // Turn negative into positive
              fraction= !set.loops ? fraction : (fraction >= 0 ? fraction : 1 + fraction),
              fraction= store(_last_fraction_, store(_fraction_, round_to(6, fraction))),
              frame= store(_frame_, fraction * (recall(_frames_) - 1) + 1)
            !operated && (on_edge= fraction == 0 || fraction == 1 ? on_edge + 1 : 0);
            t.trigger('frameChange');
          },
          frameChange: function(e, frame){
            var
              frames= recall(_frames_),
              fraction= !frame ? recall(_fraction_) : store(_fraction_, round_to(6, (frame-1) / (frames-1))),
              frame= !frame ? recall(_frame_) : store(_frame_, frame),
              frame= store(_frame_, round(frame)),
              image= recall(_image_),
              images= set.images,
              space= recall(_dimensions_),
              steps= recall(_steps_),
              spacing= recall(_spacing_),
              reversed= recall(_reversed_)
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
                shift= images.length ? [0, 0] : set.horizontal ? [y + _px_, x + _px_] : [x + _px_, y + _px_]
            }else{
              var
                travel= set.loops ? set.stitched : set.stitched - space.x,
                x= round(fraction * travel),
                y= 0,
                shift= [-x + _px_, y + _px_]
            }
            var
              sprite= images[frame - 1] || image,
              travel= space.x - set.indicator,
              indicator= min_max(0, travel, round(fraction * (travel+2)) - 1),
              css= { background: url(set.path+sprite)+___+shift.join(___) }
            set.images.length ? t.attr({ src: set.path+sprite }) : t.css(css);
            $(dot(indicator_klass), recall(_stage_)).css({ left: indicator + _px_ });
          }
        },

        // User idle control
        operated= set.delay > 0 ? -round(set.delay * set.tempo) : 0,
        unidle= function(){ return operated= -set.timeout * set.tempo },

        // Inertia rotation control
        on_edge= 0,
        last_x= 0,
        last_velocity= 0,
        to_bias= function(value){ bias.push(value) && bias.shift() },
        no_bias= function(){ return bias= [0,0,0] },
        bias= no_bias()

      on.setup();
    });
    return $(instances);
  }

  // Double plugin functions in case plugin is missing
  double_for('mousewheel disableTextSelect enableTextSelect'.split(/ /));

  // PRIVATE
  var
    ns= '.reel',
    klass= 'jquery-reel',
    overlay_klass= klass + '-overlay',
    indicator_klass= 'indicator',
    preloader_klass= 'preloader',
    monitor_klass= 'monitor',
    hi_klass= 'interface',
    tick_event= 'tick'+ns,
    unidle_events= 'down drag up wheel',
    pool= $(document),
    touchy= (/iphone|ipod|ipad|android/i).test(navigator.userAgent),
    failsafe_cursor= 'w-resize',
    ticker,

    // Embedded images
    transparent= 'data:image/gif;base64,R0lGODlhCAAIAIAAAAAAAAAAACH5BAEAAAAALAAAAAAIAAgAAAIHhI+py+1dAAA7',
    drag_cursor= 'data:image/gif;base64,R0lGODlhEAAQAJECAAAAAP///////wAAACH5BAEAAAIALAAAAAAQABAAQAI3lC8AeBDvgosQxQtne7yvLWGStVBelXBKqDJpNzLKq3xWBlU2nUs4C/O8cCvU0EfZGUwt19FYAAA7',
    drag_cursor_down= 'data:image/gif;base64,R0lGODlhEAAQAJECAAAAAP///////wAAACH5BAEAAAIALAAAAAAQABAAQAIslI95EB3MHECxNjBVdE/5b2zcRV1QBabqhwltq41St4hj5konmVioZ6OtEgUAOw==',

    // Shortcuts
    round= Math.round, floor= Math.floor, ceil= Math.ceil,
    min= Math.min, max= Math.max, abs= Math.abs, sqrt= Math.sqrt,
    number= parseInt,

    // Storage keys
    _backup_= 'backup', _clicked_= 'clicked', _clicked_location_= 'clicked_location',
    _clicked_on_= 'clicked_on', _dimensions_= 'dimensions', _fraction_= 'fraction', _frame_= 'frame',
    _frames_= 'frames', _hotspot_= 'hotspot', _image_= 'image', _last_fraction_= 'last_fraction',
    _reversed_= 'reversed', _spacing_= 'spacing', _stage_= 'stage', _steps_= 'steps',
    _velocity_= 'velocity',

    // Client events
    _dblclick_= 'dblclick'+ns, _mousedown_= 'mousedown'+ns, _mouseenter_= 'mouseenter'+ns,
    _mouseleave_= 'mouseleave'+ns, _mousemove_= 'mousemove'+ns, _mouseup_= 'mouseup'+ns,
    _mousewheel_= 'mousewheel'+ns,

    // Various string primitives
    __= '', ___= ' ', _absolute_= 'absolute', _class_= 'class', _div_= 'div', _div_tag_= tag(_div_),
    _height_= 'height', _hex_black_= '#000', _id_= 'id', _img_= 'img', _px_= 'px', _src_= 'src',
    _title_= 'title', _width_= 'width'

  function tag(string){ return '<' + string + '/>' }
  function dot(string){ return '.' + string }
  function url(location){ return 'url(' + location + ')' }
  function round_to(decimals, number){ return +number.toFixed(decimals) }
  function min_max(minimum, maximum, number){ return max(minimum, min(maximum, number)) }
  function sign_like(specimen, value){ return (specimen * value > 0) ? value : -value }
  function double_for(methods){ $.each(methods, pretend);
    function pretend(){ if (!$.fn[this]) $.fn[this]= function(){ return this }}
  }
})(jQuery, window, document);
