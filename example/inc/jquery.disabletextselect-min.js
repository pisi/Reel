/**
 * .disableTextSelect - Disable Text Select Plugin
 *
 * Version: 1.1
 * Updated: 2007-11-28
 *
 * Used to stop users from selecting text
 *
 * Copyright (c) 2007 James Dempster (letssurf@gmail.com, http://www.jdempster.com/category/jquery/disabletextselect/)
 *
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 **/
(function(a){if(a.browser.mozilla){a.fn.disableTextSelect=function(){return this.each(function(){a(this).css({MozUserSelect:"none"})})};a.fn.enableTextSelect=function(){return this.each(function(){a(this).css({MozUserSelect:""})})}}else if(a.browser.msie){a.fn.disableTextSelect=function(){return this.each(function(){a(this).bind("selectstart.disableTextSelect",function(){return false})})};a.fn.enableTextSelect=function(){return this.each(function(){a(this).unbind("selectstart.disableTextSelect")})}}else{a.fn.disableTextSelect=
function(){return this.each(function(){a(this).bind("mousedown.disableTextSelect",function(){return false})})};a.fn.enableTextSelect=function(){return this.each(function(){a(this).unbind("mousedown.disableTextSelect")})}}})(jQuery);
