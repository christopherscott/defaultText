/*
copyright (c) 2010 Christopher Scott Hernandez
Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

defTextFancy v0.1.3
a jQuery plugin to populate fields with default text

http://christopher-scott.com
	
*/

// create a no-conflict scope
(function($) {
	
	// extend the jQuery object
	$.fn.defTextFancy = function(options) {
		
		// set up some reasonable defaults
		options = $.extend({
			wrap : true,
			color : "#888",
			innerTag : "span",
			outerTag : "div",
			inSpeed : 150,
			outSpeed : 150
		}, options);
		
		// return "this" to make it chainable
		// using $.each() for implied iteration
		return this.each(function() {
			
			var $this = $(this),
				
				// make a reference to the text we wish to use
				deftext = options.defaultText || this.defaultValue || $this.attr("alt") || $this.attr("title"),
				
				// offset variables to match overlay and actual input text
				offsetTop = parseInt($this.css("paddingTop"), 10) + parseInt($this.css("borderTopWidth"), 10),
				offsetLeft = parseInt($this.css("paddingLeft"), 10) + parseInt($this.css("borderLeftWidth"), 10),
				
				// block-level wrapper element to properly position the overlay
				wrapper = $("<" + options.outerTag + " />", {
					"css" : {"position" : "relative"}
				}),
				
				// create the overlay
				overlay = $("<" + options.innerTag + " />", {
					"text" : deftext,
					"css" : {
						"position" : "absolute",
						"top" :  offsetTop + "px",
						"left" : offsetLeft + "px",
						"font-family" : $this.css("font-family"),
						"font-size" : $this.css("font-size"),
						"color" : options.color,
						"width" : $this.css("width")
						}
				});
			
			// apply the wrapper, and the overlay
			$this.wrap(wrapper).after(overlay);
			
			// clear "value" attribute if used
			// so we don't accidentally send default data to the server
			if (this.value == this.defaultValue) {
				$this.val('');
			}
		
			// compensating for values that might already be present
			// like after a refresh
			if ($this.val()) { 
				overlay.css({ "opacity" : "0" });
			}
			
			// event handlers for focus, blur, and keypress
			$this.focus(function() {
				if ( $.trim($this.val()) === '' ) {
					overlay.animate({ "opacity" : ".4" }, options.outSpeed);
				}
			}).blur(function() {
				if ( $.trim($this.val()) === ''  ) {
					overlay.animate({ "opacity" : "1" }, options.inSpeed);
				}
			}).keypress(function() {
				overlay.animate({ "opacity" : "0"}, options.outSpeed);
			});

		});

	};

})(jQuery);