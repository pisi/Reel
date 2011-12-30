
jQuery Reel 1.2 Alpha
=====================

**Reel** is an established jQuery plugin for 360° object movies, vistas and panoramas. It is a full-featured enhancement of `img` HTML tag used on 100+ websites around the globe including leading brands like Nikon, BMW, Adidas or Blackberry, government agencies, non-profits, businesses and individuals to embrace their visitors and enrich their user experience. The global community warmly welcomes Reel as an alternative to widely used Flash and Java techniques.

<http://plugins.jquery.com/project/reel>

* Modes covering beyond usual 360° span.
* Animated rotation and inertial motion.
* **NEW** In-scene annotations in sync with frames.
* Intuitive operation. Supports mouse wheel and many touch devices.
* Apple and Blackberry mobile devices supported.
* **NEW** Now with Android support!
* **NEW** Fully customizable with 50+ options to choose from.
* Browser and operating system agnostic. It's your choice.
* No browser extensions needed. No Flash, nothing. It's just an image...
* Plays fair with your existing CSS.
* Transparent, eventful & well-tested tiny code base.
* Tools for Drupal, **NEW** Joomla, Dreamweaver, Poser or Python by the community!

Demo
----
View a [demonstration][demo] on plugin home page.

Syntax
------
The syntax is pretty straightforward. The plugin exposes just two opposing jQuery methods:

    .reel( [options] )
    .unreel()

and a set of default values for all the options:

    $.reel.def

For list of options head to plugin [on-line reference][options] page.

Requirements
------------
* **[jQuery 1.4.3 or higher][jquery]**
* Optionaly you can also include these handy jQuery plugins (recommended)
    * [jQuery.mouseWheel][mousewheel] will enable mouse wheel interaction
    * or [jQuery.event.special.wheel][wheel] is a nice alternative
    * [jQuery.disableTextSelect][disabletextselect] will retain mouse dragging interaction when saving the image is enabled

License
-------
* Available for use in all personal or commercial projects under both [MIT][license-mit] and [GPL][license-gpl] licenses.

Download version 1.2 Alpha
--------------------------
* **[Open source][source] (~ 43,7 kB)**
* or [minified version][min] (~ 15,1 kB)

Use [Reel's cloud CDN][cdn] (1.1.3)
-----------------------------------
* **[Bundled with plugins & minified][cdn-bundle] (~ 5,9 kB; gzipped)**
* or [just minified][cdn-min] (~ 5,2 kB; gzipped)
* or [open source for development][cdn-devel] (~ 9,9 kB; gzipped)

[CHANGELOG][changelog]

[demo]: http://jquery.vostrel.cz/reel#demo
[options]: http://jquery.vostrel.cz/reel#options
[changelog]: http://github.com/pisi/Reel/blob/v1.2alpha/CHANGELOG.markdown
[license-mit]: http://github.com/pisi/Reel/blob/v1.2alpha/MIT-LICENSE.txt
[license-gpl]: http://github.com/pisi/Reel/blob/v1.2alpha/GPL-LICENSE.txt
[jquery]: http://www.jquery.com/
[disabletextselect]: http://www.jdempster.com/category/jquery/disabletextselect/
[mousewheel]: http://github.com/brandonaaron/jquery-mousewheel
[wheel]: http://blog.threedubmedia.com/2008/08/eventspecialwheel.html
[source]: http://github.com/pisi/Reel/raw/v1.2alpha/jquery.reel.js
[min]: http://github.com/pisi/Reel/raw/v1.2alpha/jquery.reel-min.js
[iphone-test]: http://www.youtube.com/watch?v=R0hiYmVre6s
[cdn]: http://wiki.github.com/pisi/Reel/cdn
[cdn-min]: http://code.vostrel.cz/jquery.reel.js
[cdn-bundle]: http://code.vostrel.cz/jquery.reel-bundle.js
[cdn-devel]: http://code.vostrel.cz/jquery.reel-devel.js
