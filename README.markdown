
jQuery Reel 1.1 RC
==================

**Reel** is a jQuery plugin which turns an image tag into an interactive
object movie or panorama. Its aim is to provide 360° view of something or someplace.
Great alternative to widely used Flash techniques.

<http://plugins.jquery.com/project/reel>

* Intuitive operation. Supports mouse wheel and touch.
* No need for a stitched image but we do support them too.
* **NEW** Animation!
* **NEW** Multi-row setup can go far beyond 360° span.
* Plays fair with your existing CSS.
* Browser and operating system agnostic. It's your choice. Even [iPhone][iphone-test] or iPad!
* No browser extensions needed. No Flash, nothing. It's just an image...
* Evolving tiny code base.

Demo
----
View a [demonstration][demo] on plugin home page.

Syntax
------
The syntax is pretty straightforward. The plugin exposes just one method:

    .reel([options])

and one set of default values for all the options:

    $.reel

For list of options head to plugin [on-line reference][options] page.

Requirements
------------
* **[jQuery 1.4.x or higher][jquery]**
* Optionaly you can also include these handy jQuery plugins (recommended)
    * [jQuery.mouseWheel][mousewheel] will enable mouse wheel interaction
    * or [jQuery.event.special.wheel][wheel] is a nice alternative
    * [jQuery.disableTextSelect][disabletextselect] will retain mouse dragging 
interaction when saving the image is enabled

License
-------
* Available for use in all personal or commercial projects under both 
[MIT][license-mit] and [GPL][license-gpl] licenses.

Download version 1.1 RC
-----------------------
* **[Open source][source] (~ 28,5 kB)**
* or [minified version][min] (~ 9,6 kB)

Use [Reel's cloud CDN][cdn] (1.0.4)
-----------------------------------
* **[Bundled with plugins & minified][cdn-bundle] (~ 2,7 kB; gzipped)**
* or [just minified][cdn-min] (~ 2,1 kB; gzipped)
* or [open source for development][cdn-devel] (~ 3,5 kB; gzipped)

[CHANGELOG][changelog]

[demo]: http://jquery.vostrel.cz/reel#demo
[options]: http://jquery.vostrel.cz/reel#options
[changelog]: http://github.com/pisi/Reel/blob/development/CHANGELOG.markdown
[license-mit]: http://github.com/pisi/Reel/blob/development/MIT-LICENSE.txt
[license-gpl]: http://github.com/pisi/Reel/blob/development/GPL-LICENSE.txt
[jquery]: http://www.jquery.com/
[disabletextselect]: http://www.jdempster.com/category/jquery/disabletextselect/
[mousewheel]: http://github.com/brandonaaron/jquery-mousewheel
[wheel]: http://blog.threedubmedia.com/2008/08/eventspecialwheel.html
[source]: http://github.com/pisi/Reel/raw/development/jquery.reel.js
[min]: http://github.com/pisi/Reel/raw/development/jquery.reel-min.js
[iphone-test]: http://www.youtube.com/watch?v=R0hiYmVre6s
[cdn]: http://wiki.github.com/pisi/Reel/cdn
[cdn-min]: http://code.vostrel.cz/jquery.reel.js
[cdn-bundle]: http://code.vostrel.cz/jquery.reel-bundle.js
[cdn-devel]: http://code.vostrel.cz/jquery.reel-devel.js
