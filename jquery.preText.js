/*
copyright (c) 2010 Christopher Scott Hernandez
http://christopher-scott.com

preText - a jQuery plugin to populate fields with default text

version 0.1.2

Uses either value (defaultValue), alt text, or "defaultText" passed in options object.

Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php 	
	
*/

	jQuery.fn.preText = function(options) {
	 	
	 		var settings = $.extend({
	 			wrap : true,
	 			color : "#888",
	 			defaultText : "default text",
	 			innerTag : "span",
	 			outerTag : "div",
	 			inSpeed : 150,
	 			outSpeed : 150
	 		},
	 		
	 		options);
	 	
	 		return this.each(function() {
	 		
	 			var $this = $(this),
	 				pretext = this.defaultValue || $this.attr("alt") || settings.defaultText,
	 				overlay = $("<" + settings.innerTag + "></" + settings.innerTag + ">").text(pretext)
	 					.css({
	 						"position" : "absolute",
	 						"top" : parseInt($this.css("borderTopWidth")) + parseInt($this.css("paddingTop")) + "px" ,
	 						"left" : parseInt($this.css("borderLeftWidth")) + parseInt($this.css("paddingLeft")) + "px",
	 						"font-family" : $this.css("font-family"),
	 						"font-size" : $this.css("font-size"),
	 						"color" : settings.color
	 					}),
	 				wrapper = $("<" + settings.outerTag + "></" + settings.outerTag + ">")
	 					.css({"position" : "relative"});
	 			
	 			$this.wrap(wrapper).after(overlay);
				
				// in case of refresh, and values are still there
				if ($this.val()) { 
					overlay.css({ "opacity" : "0" });
				}
	 				 			
	 			$this.focus(function() {
	 					if ( $this.val() == '' || $this.val() == this.defaultValue ) {
	 						overlay.animate({ "opacity" : ".4" }, settings.outSpeed)
	 					};
	 				})
	 				.blur(function() {
	 					
	 					if ( $this.val() == ''  ) {
	 						overlay.animate({ "opacity" : "1" }, settings.inSpeed)
	 					};
	 				})
	 				.keypress(function() {
	 						overlay.animate({ "opacity" : "0"}, settings.outSpeed)
	 					});
	 					 			
	 		});
	 		
	};