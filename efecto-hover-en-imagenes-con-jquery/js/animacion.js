$(document).ready(function(){
	//establecer la opacidad de todas las descripciones en 80%
	$('.clsDescripcion').css('opacity',0.8);
	
	/*evento que se dispara al posicionar el raton sobre el recuadro
	que contiene la imagen con la descripcion*/
	$('.clsRecuadro').hover(function(){
		//mostrar la descripcion de la imagen
		$(this).find('.clsDescripcion').stop(true,true).slideDown();
	},function(){
		/*evento que se dispara cuando el raton sale del recuadro
		se oculta la descripcion de la imagen*/
		$(this).find('.clsDescripcion').stop(true,true).slideUp();
	});
	
	//evento que se dispara al colocar el raton sobre la descripcion
	$('.clsDescripcion').hover(function(){
		//colocar la opacidad de la imagen en 90%
		$(this).animate({opacity:0.9},300);
	},function(){
		/*se dispara cuando se quita el raton de la descripcion de la imagen
		se cambia la opacidad a 80%*/
		$(this).stop(true,true).animate({opacity:0.8},300);
	});
});