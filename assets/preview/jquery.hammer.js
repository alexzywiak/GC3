/*
 * Hammer.JS jQuery plugin
 * version 0.1
 * author: Eight Media
 * https://github.com/EightMedia/hammer.js
 */
jQuery.fn.hammer=function(a){return this.each(function(){var b=jQuery(this),c=new Hammer(this,a),d=["hold","tap","doubletap","transformstart","transform","transformend","dragstart","drag","dragend"];for(var e=0;e<d.length;e++)c["on"+d[e]]=function(a,b){return function(c){a.trigger(jQuery.Event(b,c))}}(b,d[e])})}
