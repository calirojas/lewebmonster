/* webmonsterTooltip v0.1
 * copyright (c) 2012 cali rojas
 * mit license
 * web: www.lewebmonster.com
 * release date: september 11, 2012
 */

(function($){
	jQuery.fn.webmonsterTooltip=function(objCustomSettings){
		var objGlobalSettings=$.extend({
			fadeDuration: 600,
			zIndex: 4000,
			minWidth: '200px',
			maxWidth: '400px',
			cursorDistance: 10,
			opacity: 1,
			title: undefined,
			titleClass: ''
		},objCustomSettings);
		
		this.each(function(){
			var $this=$(this);
			
			$(this).bind({
				mouseenter: function(e){
					var objElementSettings={
						content: $this.attr('data-content'),
						title: $this.attr('data-title'),
						maxWidth: $this.attr('data-maxwidth'),
						titleClass: $this.attr('data-titleclass')
					}
					
					var strTitle=undefined;
					if(objElementSettings.title==undefined){
						if(objGlobalSettings.title!=undefined) strTitle=objGlobalSettings.title;
					}else{
						strTitle=objElementSettings.title;
					}
					
					var $objWMTooltip=$('<div>',{
						class: 'clswebmonsterTooltip',
						css: {
							opacity: 0,
							display: 'block',
							'z-index': objGlobalSettings.zIndex,
							'min-width': objGlobalSettings.minWidth,
							'max-width': (objElementSettings.maxWidth==undefined)?objGlobalSettings.maxWidth:objElementSettings.maxWidth,
							left: e.pageX,
							top: e.pageY
						}
					}).append(
						(strTitle!=undefined)?$('<div>',{
							class: 'clswebmonsterTooltipTitle '+((objElementSettings.titleClass==undefined)?objGlobalSettings.titleClass:objElementSettings.titleClass),
							html: '<h5>'+strTitle+'</h5>'
						}):''
					).append(
						(objElementSettings.content!=undefined)?$('<div>',{
							class: 'clswebmonsterTooltipContent',
							html: objElementSettings.content
						}):''
					).stop(true,true).animate({
						opacity: objGlobalSettings.opacity
					},objGlobalSettings.fadeDuration).appendTo('body');
					
					if(objElementSettings.content==undefined && objElementSettings.title==undefined){
						$('body').find('.clswebmonsterTooltip').remove();
					}
				},
				mouseleave: function(e){
					$('body').find('.clswebmonsterTooltip').stop(true,true).fadeOut(objGlobalSettings.fadeDuration,function(){
						$(this).remove();
					});
				},
				mousemove: function(e){
					var $objTooltip=$($('body').find('.clswebmonsterTooltip')); 
					
					if($objTooltip.length>0){
						$objTooltip.css({
							left: e.pageX+objGlobalSettings.cursorDistance,
							top: e.pageY+objGlobalSettings.cursorDistance
						});
					}
				}
			});
		});
	};
})(jQuery);