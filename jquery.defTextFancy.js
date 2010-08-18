/*
copyright (c) 2010 Christopher Scott Hernandez
http://christopher-scott.com

defTextFancy - a jQuery plugin to populate fields with default text

version 0.1.3

Accepts a options object like this:

$("#myinput").defFancyText({
	wrap : true						// whether or not to wrap with block level element	default: true
 	color : "#888",					// color of default text ()
 	defaultText : "default text",	// text to use, overrides alt, title, value, and placeholder attrs
 	innerTag : "span",				// tag used to hold text
 	outerTag : "div",				// tag used as a wrapper
 	inSpeed : 150,					// duration (in ms) of "in" animation
 	outSpeed : 150					// duration (in ms) of "out" animation
});

Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php 	
	
*/

// no conflict
(function($) {

	$.fn.defTextFancy = function(options) {
		 	
		options = $.extend({
			wrap : true,
		 	color : "#888",
		 	innerTag : "span",
		 	outerTag : "div",
		 	inSpeed : 150,
		 	outSpeed : 150
		}, options);
			
		return this.each(function() {
		 		
			var $this = $(this),
		 		deftext = options.defaultText || this.defaultValue || $this.attr("alt") || $this.attr("title"),
		 		offsetTop = parseInt($this.css("paddingTop")) + parseInt($this.css("borderTopWidth")),
		 		offsetLeft = parseInt($this.css("paddingLeft")) + parseInt($this.css("borderLeftWidth")),
		 		wrapper = $("<" + options.outerTag + " />", {
					"css" : {"position" : "relative"}
				}),
		 		overlay = $("<" + options.innerTag + " />", {
					"text" : deftext,
					"css" : {
						"position" : "absolute",
		 				"top" :  offsetTop + "px" ,
		 				"left" : offsetLeft + "px",
		 				"font-family" : $this.css("font-family"),
		 				"font-size" : $this.css("font-size"),
		 				"color" : options.color
					}
				});		
			 			
		 	$this.wrap(wrapper).after(overlay);
					
			// if defaultValue is used, go ahead and remove it
			if (this.value == this.defaultValue) {
				$this.val('');
		 	}
					
			// in case of refresh, and values are still there
			if ($this.val()) { 
				overlay.css({ "opacity" : "0" });
			}	 				 		
			
			// add main events
		 	$this.focus(function() {
		 		if ( $this.val() == '' ) {
		 			overlay.animate({ "opacity" : ".4" }, options.outSpeed);
		 		}
		 	}).blur(function() {
		 		if ( $this.val() == ''  ) {
					overlay.animate({ "opacity" : "1" }, options.inSpeed);
		 		}
		 	}).keypress(function() {
		 		overlay.animate({ "opacity" : "0"}, options.outSpeed)
		 	});
		 			
		});
		 		
	};

})(jQuery);