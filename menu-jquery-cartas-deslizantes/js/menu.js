$(document).ready(function(){
	fntMenu();			
});
		
function fntMenu(){
	var iDuracion=400;	//duracion inicial de la animacion
			
	$.each($('.clsRecuadro'),function(){ 
		//animamos la propiedad height
		$(this).stop(true,true).animate({height:'260px'},iDuracion+=100);
	});
			
	iDuracion=6000; //la duracion del fadein para las imagenes
	$.each($('.clsImagen'),function(){ 
		$(this).stop(true,true).fadeIn(iDuracion+=50);
	});
			
	$('.clsImagen').hover(function(){
		//mostramos la segunda parte del fondo
		$(this).stop(true,true).animate({backgroundPosition: '144px 0px'});
	},function(){
		//dejamos el fondo como estaba
		$(this).stop(true,true).animate({backgroundPosition: '0px 0px'});
	});
}