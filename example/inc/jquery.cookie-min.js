/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie=function(d,c,a){if(typeof c!="undefined"){a=a||{};if(c===null){c="";a.expires=-1}var b="";if(a.expires&&(typeof a.expires=="number"||a.expires.toUTCString)){if(typeof a.expires=="number"){b=new Date;b.setTime(b.getTime()+a.expires*24*60*60*1E3)}else b=a.expires;b="; expires="+b.toUTCString()}var e=a.path?"; path="+a.path:"",f=a.domain?"; domain="+a.domain:"";a=a.secure?"; secure":"";document.cookie=[d,"=",encodeURIComponent(c),b,e,f,a].join("")}else{c=null;if(document.cookie&&document.cookie!=
""){a=document.cookie.split(";");for(b=0;b<a.length;b++){e=jQuery.trim(a[b]);if(e.substring(0,d.length+1)==d+"="){c=decodeURIComponent(e.substring(d.length+1));break}}}return c}};
