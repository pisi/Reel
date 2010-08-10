Changelog
=========

"Dancer" (will be 1.1)
----------------------
* Using standard jQuery's `.val()` facility one can set or get value representation of the fraction in the range defined by new `minimum` and `maximum` options (0 to 100 by default). Default initial value can be adjusted by using new `value` option.
* Support for multi-row object movies added by possibility to control Y axis too.
    * `rows` option sets the vertical rows count.
    * `row` the initial row on which to start.
* New `draggable`, `wheelable` and `throwable` options added to allow interaction style control.
* Default options are now made available for manipulation as `$.reel` object.
* The old wrapper DIV is gone. Image stays and CSS is applied to it.
* The problematic `saves` option does no longer make sense (as there is no other option) and had been removed all together.
* The `sensitivity` option has become obsolete and had been removed.
* Suggestive open/closed palm cursor used for mouse pointer.
* Image(s) loading status is now indicated by a horizontal progress bar at the bottom of the image. Height of the loader indicator can be adjusted by using new `preloader` option.
* Added the `image` option which can be used to supply custom image sprite to use.
* Array of individual `images` can now be supplied instead of using a collective sprite.
* Downsizing of JPEG sprites due to dimensions limit on iPhone may now be surpassed by using the `images` option to load individual images.
* Prevented an accidental selection of the projector on iPhone.
* Decimal fraction is now used as a base for internal computations instead of using frames.
    * `steps` option divides Reel into different amount of steps other than defined by `frames`.
    * `step` option can be used to override initial `frame` option.
    * `revolution` option is a pixel distance mouse drag has to travel for full revolution.
* Having one shared ticker for animation purposes. `tempo` option sets the speed in ticks per second.
* The projector can now self-animate. The animation is controlled with bunch of options.
    * `delay` option for autoplay delay (use -1 to prevent it).
    * `speed` option sets the speed of animation (in Hz).
    * `rebound` options is how long in seconds will a non-looping reel stay on edge before re-bounce.
    * `timeout` option is a period of user inactivity after which animation is resumed again.
* Also to control the animation from outside the reel, new events `"play"`, `"pause"` ańd `"stop"`.
* The inertial momentum gradually wears off by fraction defined as `friction` option.
* Added `monitor` option accepting a string key of any value stored within. It is then displayed in the upper left corner of the viewport.
* Extended the Test Sampler (test/sampler.html).
* Teardown sequence now wipes out everything.
* Reel's own cloud CDN has been started and recommended for use instead of download.
* For convenience, a "bundle" is available on the CDN and it contains Reel along side with jQuery.mouseWheel and jQuery.disableTextSelect optional plugins.

Version 1.0.4
-------------
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

Initial version 1.0 RC
----------------------