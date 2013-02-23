Changelog
=========

Version 1.2.1
-------------

* Resolved compatibility issues with jQuery 1.8 (GH-140) and 1.9 (GH-174, GH-175).
* For smooth `velocity` kick it now follows `loaded` event (instead of `setup`) (GH-142).
* Goodbye disableTextSelect dependency. You served well, but one less to worry about without you!
* Vertical page scrolling on touch devices fixed (GH-146).
* Release package now contains image assets otherwise served by CND (GH-144).
* Case in-sensitivity for image extension in `src` attribute of the `<img>`.
* Exciting new multi-row panoramas via combination of `multirow` and `stitched` options (GH-129).
* The `throwable` option can now accept maximum velocity instead of simple boolean (GH-172).
* Fixed `images` sequence starting point now allows direct use of file names from camera.


Version 1.2
-----------

### Infrastructure
* The long-missing comprehensive documentation added to the `docs/` directory.
* Improved order of preloaded images gradually increasing fidelity of the image,
  thus the name "fidelity" and this mode is now default. The former order is designated
  "linear". Preloading mode is chosen by new `preload` option accepting a mode name (GH-10).
* Completely reworked, centralized and enhanced naked examples with descriptions.
* The minimal required version of jQuery has been increased to 1.5.
* A brand new data interface with automatic change events is in place for easy
  external control of the instance.
* `$.reel.cdn` setting customization now working correctly (GH-124).

### Interaction
* Non-`wheelable` Reels now allow scrolling of the page when wheeling above the Reel instance.
* New option `scrollable` can disable page scrolling (if needed) on touch devices.
* Bare click on left/right half of the image steps the Reel one frame forward/back.
  Set `steppable` to `false` to disable (GH-20).

### DOM
* Custom text/graphics can augment the frames using the brand new `annotations` feature (GH-36).
* New option `attr` allows to set custom attributes of the IMG tag
  (useful for re-using DOM nodes).
* Instances being re-instantiated now perform automatic teardown (GH-62).
* Proper image preload events unbinding on teardown (GH-64).
* Actual frame number is manifested with a wrapper class name, e.g. `frame-8` (GH-69)

### Looks
* Mouse cursor is now customizable with the new `cursor` option.
  New failsafe cursor is now `move`.
* Default height of the preloader progress bar reduced to 2 pixels.

### Other API Changes
* Deprecated options `hotspot`, `tooltip` and `reversed` have been removed.
* New complementary `.unreel()` function to revert effects of `.reel()` on the DOM.
* The `step` and `steps` options deprecated in favor of `frame` and `frames`.
* The `revolution` option now support optional object notation with `x` and/or `y` keys.
* The `images` option now supports easy definition of sequence frames by one path string
  with a counter placeholder.

### Events
* New event `openingDone` now announces the end of opening animation (GH-65).
* Internal event `slide` renamed to `pan` (GH-51).
* Control event `play` now accepts optional `speed` parameter.
* New events `stepLeft` and `stepRight` for doing just that (GH-20).


Version 1.1.4
-------------

* Patches incompatibility issues with jQuery 1.7 in IE (GH-93).
* Patches mouse wheel issues in IE. Upgrade of mousewheel plug-in is required (GH-105).


Version 1.1.3
-------------

* Promptly resolves sudden incompatibility with new jQuery 1.6 (GH-32).
* Enhanced test for by testing for CSS value equivalency rather for string equality (GH-33).
* `leader` tests Opera bug fixed (GH-34). 


Version 1.1.2
-------------

* All known Internet Explorer bugs fixed:
    * Fixed two issues preventing Reel from animating itself in IE (Github issue GH-30).
    * Fixed iframe-related bug in IE (Github issue GH-25).
    * Fixed broken-image-overlay bug when using sprite on IE 7 and lower.
    * Fixed the overgrown indicator bug in IE 6.
* Unwanted brief image disappearance of image on start is now eliminated.
* Sprite request duplication eliminated for Firefox and others.
* Laziness factor has been adjusted for better performance on iPhones.
* Revised adaptive ticker:
    * Ticker is now driven by a "leader" - the oldest living instance on page - and `$.reel.leader` references its data. This removes the first-reel-sets-the-tempo limitation in older versions.
    * Overall `$.reel.cost` per timer tick in ms is being continuously calculated and then used to elevate timer accuracy.
    * Several performance tests included.


Version 1.1.1
-------------

* Per document `$.reel.touchy` and `$.reel.lazy` properties added to manifest key user agent qualities.
* Animation timer now automatically adapts to your viewer's device performance to stay in sync.
* Vertical page scrolling now possible in Safari on iOS (Github issue GH-7).
* Initial frame 1 now doesn't disappear after loading (Github issue GH-11).
* New `center` store key now stores if on the center point in orbital setups.
* iPad has been excluded from "lazy" devices list, because it in fact isn't lazy device at all. This means much fluent experience on iPads.


Version 1.1
-----------

### Animation
* The projector can now self-animate. The animation is controlled with bunch of options.
    * `delay` option for autoplay delay (use -1 to prevent it).
    * `speed` option sets the speed of animation (in Hz).
    * `rebound` options is how long in seconds will a non-looping reel stay on edge before bouncing back from it.
    * `timeout` option is a period of user inactivity after which animation is resumed again.
* To control the animation from outside, new events `"play"`, `"pause"` and `"stop"` have been added.
* Having one shared ticker for animation purposes. `tempo` option sets the speed in ticks per second.
* Slower devices are detected and their tempo is decreased accordingly for better performance.
* Duration of an opening animation is set using new `opening` option. Custom opening speed can be set using new `entry` option.

### Rendering
* Suggestive open/closed palm cursor used for mouse pointer over the projector.
* iPhone downsizing bug is gone, however it decreases visual quality to fit in memory.
* Image(s) loading status is now indicated by a horizontal progress bar at the bottom of the image. Height of the loader indicator can be adjusted by using new `preloader` option.
* Added `monitor` option accepting a string key of any value stored within. It is then displayed in the upper left corner of the viewport.
* Teardown sequence now wipes out everything.

### Math
* Decimal fraction is now used as a base for internal computations instead of using frames.
    * `steps` option divides Reel into different amount of steps other than defined by `frames`.
    * `step` option can be used to override initial `frame` option.
    * `revolution` option is a pixel distance mouse drag has to travel for full revolution.

### Events
* Instance now emits "loaded" event after image(s) preloading is done.
* Internal data storage now report every manipulation by "store" or "recall" events. Name and value are passed as additional params to the handler.

### Interaction
* New `draggable`, `wheelable` and `throwable` options added for interaction style control.
* New boolean `clickfree` option which causes binding to mouseenter/leave events rather than down/up for click-free interaction.
* Prevented text selection of the projector on iPhone.

### Multi-Row Object Movies
* You can no go beyond the simple 360° with support for multiple horizontal rows.
    * `rows` option sets the vertical rows count.
    * `row` the initial row on which to start.

### Dual-Axis Object Movies
* New `orbital` option allows to specify centering tolerance and the movie is switched to dual-axis mode for one horizontal plus one vertical orbit.

### Sequence of Images
* Added the `image` option which allows custom image sprite to be used.
* Array of individual `images` can now be supplied instead of using a collective sprite - this feature effectively overcomes the memory limit on iPhone imposed on large JPEG sprites exhibited by downsizing the sprite. See [FAQ][faq] for more on this.

### Other Options
* All default options are now made available for manipulation as `$.reel.def` object.
* The `sensitivity` option has become obsolete and had been removed.
* The problematic `saves` option does no longer make sense (as there is no other option) and had been removed all together.
* The `hotspot` option deprecated in favor to new `area` to stop being misleading.
* New `directional` boolean option to flag bi-directional sprites.
* New `laziness` option allows to customize the tempo divisor for lazy devices.

### Content Delivery Network
* Reel's own cloud CDN has been started and recommended for use instead of download.
* For convenience, a "bundle" is available on the [CDN][cdn] and it contains Reel along side with jQuery.mouseWheel and jQuery.disableTextSelect optional plugins.

* As of this release the minimal version of jQuery has been increased to *1.4.2*.

Version 1.0.4 "Touchy"
----------------------
* Added long awaited support for iPhone/iPad/iPod family of touch-enabled devices.
* Fixed miscalculation bugs in stitched panoramas (github issues GH-4 and GH-6).
* Added `teardown` event for effective reversal of initialization and to pair `setup`.
* As of this release the minimal version of jQuery has been increased to *1.4.x*.
* Added very preliminary test suite. Hurray!
* Added compatibility with another nice mouse wheel plugin, Three Dub Media's $.event.special.wheel.


Version 1.0.3
-------------
* User *neptune* (thanks!) found a nasty mishap where option `tooltip` was used instead of `hint` on several places. To stay backwards compatible `tooltip` will stay as an alias of new option `hint` (which is preferred).


Version 1.0.2
-------------
* Added support for counter-clockwise sprite by specifying option `reversed`
* Validation of tags on which reel is applied added. Only IMG tags with assigned all `src`, `width` and `height` pass.


Version 1.0.1
-------------
* Support for more classical stitched panoramic images added the `stitched` option accepting pixel length (width) of stitched panoramic reel image.
* Mouse wheel sensitivity handling was improved.
* Indicator now displayed without any extra CSS.
* Fixed corrupted detection of movement direction.
* Added new `sensitivity` option which enables control over sensitivity of mouse interaction.
* Polishing options.
    * Added `tooltip` option to allow custom tooltip instructions to be displayed on hotspot(s).
    * The `panorama` option has been removed.
    * Added `klass` option to allow custom CSS class on plugin instance.
    * Option `suffix` default value changed from "-sheet" to "-reel".
    * Option `save` corrected to `saves`
* Added new `hotspot` option accepting a jQuery. It allows binding mouse interaction events to custom DOM node.


Initial version 1.0
-------------------





[faq]:http://github.com/pisi/Reel/wiki/FAQ
[cdn]:http://github.com/pisi/Reel/wiki/CDN
