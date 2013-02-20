jQuery Reel Assets Folder
=========================

If you ever need to serve the additional image assets yourself, for example you need full offline operation, you have the option to customize the path to CDN entirely to your likings. This `assets/` folder contains the actual files served by the CDN so you can put it into some folder of yours and point to it like this:

```js
    $.reel.cdn = "my_own_location_of_image_assets/";
```

**Note:** The CDN URL **must** end with `/` (slash).



What's Being Fetched
--------------------

Reel requests one, two or three images from the CDN to complete its UI:

1. First a piece of blank image to replace the original one. This happens only when using sprites or in browsers unable to cope with the base64-encoded image embedded directly in Reel's source.

2. Second the mouse cursor. If you use the default one, this is the last image being requested from the server.

3. Third, if you use the `"hand"` cursor, the grabbing hand cursor is fetched.


---
&copy; 2009-2013 Petr Vostřel, part of [jQuery Reel][reel] project, under [GPL][GPL] and [MIT][MIT] licences


[reel]:http://jquery.vostrel.cz/reel
[GPL]:http://opensource.org/licenses/GPL-2.0
[MIT]:http://opensource.org/licenses/MIT
