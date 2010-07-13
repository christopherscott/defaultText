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
	}, options);
	
	
	
	return this.each(function() {
	 		
		var $this = $(this),
	 		pretext = this.defaultValue || $this.attr("alt") || settings.defaultText,
	 		offsetTop = parseInt($this.css("paddingTop")) + parseInt($this.css("borderTopWidth")),
	 		offsetLeft = parseInt($this.css("paddingLeft")) + parseInt($this.css("borderLeftWidth")),
	 		wrapper = $("<" + settings.outerTag + "></" + settings.outerTag + ">")
	 			.css({"position" : "relative"}),
	 		overlay = $("<" + settings.innerTag + "></" + settings.innerTag + ">")
	 			.text(pretext)
	 			.css({	
	 				"position" : "absolute",
	 				"top" :  offsetTop + "px" ,
	 				"left" : offsetLeft + "px",
	 				"font-family" : $this.css("font-family"),
	 				"font-size" : $this.css("font-size"),
	 				"color" : settings.color
	 				});
	 		
		 			
	 			$this.wrap(wrapper).after(overlay);
				
				// if defaultValue is used, go ahead and remove it
				if ($this.val() == this.defaultValue) {
	 				$this.val('');
	 			}
				
				// in case of refresh, and values are still there
				if ($this.val()) { 
					overlay.css({ "opacity" : "0" });
				}	 				 		
	 				 		
	 			$this.focus(function() {
	 					if ( $this.val() == '' ) {
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