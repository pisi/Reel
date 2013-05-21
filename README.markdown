
jQuery Reel 1.2
===============

**Reel** is an established jQuery plugin for 360° object movies, vistas and panoramas. It is a full-featured enhancement of `<img>` HTML tag used on hundreds of websites around the globe including leading brands like Nikon, BMW, Adidas or Blackberry, government agencies, non-profits, businesses and individuals to embrace their visitors and enrich their user experience. The global community warmly welcomes Reel as an alternative to widely used Flash and Java techniques.

<http://plugins.jquery.com/project/reel>

* Modes covering beyond usual 360° span.
* Animated rotation and inertial motion.
* **NEW** In-scene annotations in sync with frames.
* Intuitive operation. Supports mouse wheel and touch.
* Apple, Blackberry and now **NEW** Android mobile devices supported.
* **NEW** Fully customizable with 50+ options to choose from.
* Browser and operating system agnostic. It's your choice.
* No browser extensions needed. No Flash, nothing. It's just an image...
* **NEW** Javascript-free initialization!
* Plays fair with your existing CSS.
* Transparent, eventful & well-tested tiny code base.
* Tools for Drupal, **NEW** Joomla, Dreamweaver, Poser or Python by the community!

Demo
----
View a [demonstration][demo] on plugin home page or our [many examples][examples].

How To?
-------

As easy as adding few _special_ attributes to your HTML image tag:

```html
    <img src="my_server/image.jpg" width="200" height="100" id="my_image"
      class="reel"
      data-images="my_server/image-##.jpg">
```

The above will be turned into default interactive Reel with 36 frames loaded from `my_server/image-01.jpg` through `image-36.jpg` Use [options][options] to customize.

License
-------
* Available for all personal or commercial projects under both [MIT][license-mit] and [GPL][license-gpl] licenses. 
* Use for free and enjoy! Appreciations are warmly welcome:

<a href='http://www.pledgie.com/campaigns/9596'><img alt='Click here to lend your support to: Reel and make a donation at www.pledgie.com !' src='http://www.pledgie.com/campaigns/9596.png?skin_name=chrome' border='0' /></a>

Requirements
------------
* **[jQuery 1.5 or higher][jquery]**
* Optionaly you can also include one of these two handy jQuery plugins (recommended):
    * [jQuery.mouseWheel][mousewheel] will enable mouse wheel interaction
    * or [jQuery.event.special.wheel][wheel] is also a nice alternative

Download
--------
* **[Annotated open source][source] (~ 100,2 kB)**
* or [minified version][min] (~ 16,8 kB)
* or [entire package][zip] (~ 3 MB)

Link the [CDN][cdn]
* **[http://code.vostrel.cz/jquery.reel-bundle.js][cdn-bundle] (~ 8,5 kB; gzipped)**
-------------------

Documentation
-------------
For options head to plugin [options on-line reference][options] or view the [entire open-source code explained][docs], where all available methods, events and data keys are explained in detail. The documentation is embedded into the source code and you also find a copy in the [`docs/`][docs-copy] folder.

[CHANGELOG][changelog]

[demo]: http://jquery.vostrel.cz/reel#demo
[docs]: http://test.vostrel.cz/jquery.reel/docs/jquery.reel.html
[docs-copy]: http://github.com/pisi/Reel/tree/master/docs
[examples]: http://test.vostrel.cz/jquery.reel/example
[options]: http://jquery.vostrel.cz/reel#options
[changelog]: http://github.com/pisi/Reel/blob/master/CHANGELOG.markdown
[license-mit]: http://github.com/pisi/Reel/blob/master/MIT-LICENSE.txt
[license-gpl]: http://github.com/pisi/Reel/blob/master/GPL-LICENSE.txt
[jquery]: http://www.jquery.com/
[mousewheel]: http://github.com/brandonaaron/jquery-mousewheel
[wheel]: http://blog.threedubmedia.com/2008/08/eventspecialwheel.html
[source]: http://github.com/pisi/Reel/raw/v1.2/jquery.reel.js
[min]: http://github.com/pisi/Reel/raw/v1.2/jquery.reel-min.js
[zip]: http://github.com/pisi/Reel/zipball/v1.2
[iphone-test]: http://www.youtube.com/watch?v=R0hiYmVre6s
[cdn]: http://wiki.github.com/pisi/Reel/cdn
[cdn-bundle]: http://code.vostrel.cz/jquery.reel-bundle.js
