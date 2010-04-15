Reel 1.0.4 "Touchy"
===================
Is a jQuery plugin which takes an image tag and makes it 
a live "projection" of pre-built animation frames sequence. 
Its aim is to provide a 360° view of something or someplace. 
Great alternative to widely used Flash techniques.

<http://plugins.jquery.com/project/reel>

* **NEW** [iPhone support][iphone-test]!
* Intuitive operation. Supports mouse wheel.
* No need for a stitched image but we do support them too.
* Plays fair with your existing CSS.
* Browser and operating system agnostic. It's your choice.
* No browser extensions needed. No Flash, nothing. It's just an image...
* Tiny code base.

Demo
----
View a [demonstration][demo] on plugin home page.

Syntax
------
The syntax is pretty straightforward. The plugin exposes just one method:

    .reel([options])

For optional options head to plugin [on-line reference][options] page.

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

Download version 1.0.4
----------------------
* **[Open source][source] (~ 11,5 kB)**
* or [the gzipped version][min] (~ 4,6 kB)

[CHANGELOG][changelog]

[demo]: http://jquery.vostrel.cz/reel#demo
[options]: http://jquery.vostrel.cz/reel#options
[changelog]: http://github.com/pisi/Reel/blob/iphone-support/CHANGELOG.markdown
[license-mit]: http://github.com/pisi/Reel/blob/iphone-support/MIT-LICENSE.txt
[license-gpl]: http://github.com/pisi/Reel/blob/iphone-support/GPL-LICENSE.txt
[jquery]: http://www.jquery.com/
[disabletextselect]: http://www.jdempster.com/category/jquery/disabletextselect/
[mousewheel]: http://github.com/brandonaaron/jquery-mousewheel
[wheel]: http://blog.threedubmedia.com/2008/08/eventspecialwheel.html
[source]: http://github.com/pisi/Reel/raw/iphone-support/jquery.reel.js
[min]: http://github.com/pisi/Reel/raw/iphone-support/jquery.reel-min.js
[iphone-test]: http://www.youtube.com/watch?v=R0hiYmVre6s
