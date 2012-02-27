
jQuery Reel 1.1.4
=================

**Reel** is a jQuery plugin which takes an image tag and makes it a live "projection" of pre-built animation frames sequence. Its aim is to provide a 360° view of something or someplace. Great alternative to widely used Flash and Java techniques.

<http://plugins.jquery.com/project/reel>

* Intuitive operation. Supports mouse wheel and touch (iPads and such).
* **NEW** Animated rotation and inertial motion.
* **NEW** Modes covering beyond usual 360° span.
* **NEW** Very iPhoneOS-friendly. Excellent on iPad!
* Plays fair with your existing CSS.
* Browser and operating system agnostic. It's your choice.
* No browser extensions needed. No Flash, nothing. It's just an image...
* **NEW** Even more transparent, eventful & well-tested tiny code base.
* Emerging tools for Drupal, Dreamweaver, Poser or Python by the community!

Demo
----
View a [demonstration][demo] on plugin home page.

Syntax
------
The syntax is pretty straightforward. The plugin exposes just one method:

    .reel([options])

and one set of default values for all the options:

    $.reel.def

For list of options head to plugin [on-line reference][options] page.

Requirements
------------
* **[jQuery 1.4.2 or higher][jquery]**
* Optionaly you can also include these handy jQuery plugins (recommended)
    * [jQuery.mouseWheel][mousewheel] will enable mouse wheel interaction
    * or [jQuery.event.special.wheel][wheel] is a nice alternative
    * [jQuery.disableTextSelect][disabletextselect] will retain mouse dragging 
interaction when saving the image is enabled

License
-------
* Available for use in all personal or commercial projects under both 
[MIT][license-mit] and [GPL][license-gpl] licenses.

Download version 1.1.4
----------------------
* **[Open source][source] (~ 34,7 kB)**
* or [minified version][min] (~ 11,7 kB)

Use [Reel's cloud CDN][cdn] (1.1.4)
-----------------------------------
* **[Bundled with plugins & minified][cdn-bundle] (~ 5,9 kB; gzipped)**
* or [just minified][cdn-min] (~ 5,2 kB; gzipped)
* or [open source for development][cdn-devel] (~ 9,9 kB; gzipped)

[CHANGELOG][changelog]

[demo]: http://jquery.vostrel.cz/reel#demo
[options]: http://jquery.vostrel.cz/reel#options
[changelog]: http://github.com/pisi/Reel/blob/v1.1.4/CHANGELOG.markdown
[license-mit]: http://github.com/pisi/Reel/blob/v1.1.4/MIT-LICENSE.txt
[license-gpl]: http://github.com/pisi/Reel/blob/v1.1.4/GPL-LICENSE.txt
[jquery]: http://www.jquery.com/
[disabletextselect]: http://www.jdempster.com/category/jquery/disabletextselect/
[mousewheel]: http://github.com/brandonaaron/jquery-mousewheel
[wheel]: http://blog.threedubmedia.com/2008/08/eventspecialwheel.html
[source]: http://github.com/pisi/Reel/raw/v1.1.4/jquery.reel.js
[min]: http://github.com/pisi/Reel/raw/v1.1.4/jquery.reel-min.js
[iphone-test]: http://www.youtube.com/watch?v=R0hiYmVre6s
[cdn]: http://wiki.github.com/pisi/Reel/cdn
[cdn-min]: http://code.vostrel.cz/jquery.reel.js
[cdn-bundle]: http://code.vostrel.cz/jquery.reel-bundle.js
[cdn-devel]: http://code.vostrel.cz/jquery.reel-devel.js
