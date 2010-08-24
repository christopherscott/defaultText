/*
copyright (c) 2010 Christopher Scott Hernandez
Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php

defTextFancy v0.1.3
a jQuery plugin to populate fields with default text

http://christopher-scott.com
	
*/

// create a no-conflict scope
(function($) {
	$.fn.defTextFancy = function(options) {
		options = $.extend({
			wrap : true,
			color : "#888",
			innerTag : "span",
			outerTag : "div",
			inSpeed : 150,
			outSpeed : 150,
		}, options);
			
		return this.each(function() {
			
			var $this = $(this),
				deftext = options.defaultText || this.defaultValue || $this.attr("alt") || $this.attr("title"),
				offsetTop = parseInt($this.css("paddingTop"), 10) + parseInt($this.css("borderTopWidth"), 10),
				offsetLeft = parseInt($this.css("paddingLeft"), 10) + parseInt($this.css("borderLeftWidth"), 10),
				wrapper = $("<" + options.outerTag + " />", {
					"css" : {"position" : "relative"}
				}),
				overlay = $("<" + options.innerTag + " />", {
					"text" : deftext,
					"css" : {
						"position" : "absolute",
						"top" :  offsetTop + "px",
						"left" : offsetLeft + "px",
						"font-family" : $this.css("font-family"),
						"font-size" : $this.css("font-size"),
						"color" : options.color
						}
				});

			$this.wrap(wrapper).after(overlay);
					
			if (this.value == this.defaultValue) {
				$this.val('');
			}
		
			if ($this.val()) { 
				overlay.css({ "opacity" : "0" });
			}

			$this.focus(function() {
				if ( $this.val() == '' ) {
					overlay.animate({ "opacity" : ".4" }, options.outSpeed);
				}
			}).blur(function() {
				if ( $this.val() == ''  ) {
					overlay.animate({ "opacity" : "1" }, options.inSpeed);
				}
			}).keypress(function() {
				overlay.animate({ "opacity" : "0"}, options.outSpeed);
			});

		});

	};

})(jQuery);