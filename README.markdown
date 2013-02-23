
jQuery Reel 1.2.1
=================

**Reel** is an established jQuery plugin for 360° object movies, vistas and panoramas. It is a full-featured enhancement of `img` HTML tag used on 100+ websites around the globe including leading brands like Nikon, BMW, Adidas or Blackberry, government agencies, non-profits, businesses and individuals to embrace their visitors and enrich their user experience. The global community warmly welcomes Reel as an alternative to widely used Flash and Java techniques.

<http://plugins.jquery.com/project/reel>

* Modes covering beyond usual 360° span.
* Animated rotation and inertial motion.
* **NEW** In-scene annotations in sync with frames.
* Intuitive operation. Supports mouse wheel and touch.
* Apple, Blackberry and now **NEW** Android mobile devices supported.
* **NEW** Fully customizable with 50+ options to choose from.
* Browser and operating system agnostic. It's your choice.
* No browser extensions needed. No Flash, nothing. It's just an image...
* Plays fair with your existing CSS.
* Transparent, eventful & well-tested tiny code base.
* Tools for Drupal, **NEW** Joomla, Dreamweaver, Poser or Python by the community!

Demo
----
View a [demonstration][demo] on plugin home page or our [many examples][examples].

Syntax
------
It is actually pretty straightforward:

    .reel( [options] )

For the many `options` head to plugin [on-line reference][options] page or view the [entire open-source code explained][docs], where also the other method `.unreel()` along with events and data keys are explained in detail. The annotations are embedded into the source code and you also find a copy in the `docs/` folder.

Example
-------

Say you have an image in your page:

```html
    <img src="my_server/image.jpg" width="200" height="100" id="my_image">
```

and calling:

```js
    $('#my_image').reel()
```

will turn your image into Reel with 36 frames in sprite by default. Use [options][options] to customize.

License
-------
* Available for free to use in all personal or commercial projects under both [MIT][license-mit] and [GPL][license-gpl] licenses.

<a href='http://www.pledgie.com/campaigns/9596'><img alt='Click here to lend your support to: Reel and make a donation at www.pledgie.com !' src='http://www.pledgie.com/campaigns/9596.png?skin_name=chrome' border='0' /></a>

Requirements
------------
* **[jQuery 1.5 or higher][jquery]**
* Optionaly you can also include these handy jQuery plugins (recommended)
    * [jQuery.mouseWheel][mousewheel] will enable mouse wheel interaction
    * or [jQuery.event.special.wheel][wheel] is a nice alternative
the image is enabled

Download version 1.2.1
----------------------
* **[Open source][source] (~ 102,1 kB annotated)**
* or [minified version][min] (~ 16,8 kB)
* or [entire package][zip] (~ 7,8 MB)

Link the [CDN][cdn]
----------------------------
* **[http://code.vostrel.cz/jquery.reel-bundle.js][cdn-bundle] (~ 8,4 kB; gzipped)**

[CHANGELOG][changelog]

[demo]: http://jquery.vostrel.cz/reel#demo
[docs]: http://test.vostrel.cz/jquery.reel/docs/jquery.reel.html
[examples]: http://test.vostrel.cz/jquery.reel/example
[options]: http://jquery.vostrel.cz/reel#options
[changelog]: http://github.com/pisi/Reel/blob/master/CHANGELOG.markdown
[license-mit]: http://github.com/pisi/Reel/blob/master/MIT-LICENSE.txt
[license-gpl]: http://github.com/pisi/Reel/blob/master/GPL-LICENSE.txt
[jquery]: http://www.jquery.com/
[mousewheel]: http://github.com/brandonaaron/jquery-mousewheel
[wheel]: http://blog.threedubmedia.com/2008/08/eventspecialwheel.html
[source]: http://github.com/pisi/Reel/raw/v1.2.1/jquery.reel.js
[min]: http://github.com/pisi/Reel/raw/v1.2.1/jquery.reel-min.js
[zip]: http://github.com/pisi/Reel/zipball/v1.2.1
[iphone-test]: http://www.youtube.com/watch?v=R0hiYmVre6s
[cdn]: http://wiki.github.com/pisi/Reel/cdn
[cdn-bundle]: http://code.vostrel.cz/jquery.reel-bundle.js
