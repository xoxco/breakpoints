# Breakpoints.js

Define breakpoints for your responsive design, and Breakpoints.js will fire custom events when the browser enters and/or exits that breakpoint.

[Get it from Github](https://github.com/xoxco/breakpoints)

[View Demo](http://xoxco.com/projects/code/breakpoints/)

Created by [XOXCO](http://xoxco.com)

## Instructions

	$(window).setBreakpoints({
	// use only largest available vs use all available
		distinct: true, 
	// array of widths in pixels where breakpoints
	// should be triggered
		breakpoints: [
			320,
			480,
			768,
			1024
		] 
	});		
	
	$(window).on('enterBreakpoint320',function() {
		...
	});
	
	$(window).on('exitBreakpoint320',function() {
		...
	});
	
	$(window).on('enterBreakpoint768',function() {
		...
	});
	
	$(window).on('exitBreakpoint768',function() {
		...
	});
	
	$(window).on('enterBreakpoint1024',function() {
		...
	});
	
	$(window).on('exitBreakpoint1024',function() {
		...
	});

