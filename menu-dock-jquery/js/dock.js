$(function(){
	//cuando carga el documento bajamos la opacidad de las descripciones a 0 (invisible)
	$('#divMenuInferior a em').css('opacity',0);
	
	//evento que se produce al colocar el puntero del raton sobre los iconos
	$('#divMenuInferior a').hover(function(){
		//obtenemos el icono que vamos a animar, y la descripcion
		var $objImagen=$(this).find('img'), $objTexto=$(this).find('em');
		
		//aumentamos el tamano de la imagen progresivamente
		$objImagen.stop(true,true).animate({
			height: 180,
			width: 180
		});
		//cambiamos la fuente y la opacidad de la descripcion (para mostrarla)
		$objTexto.stop(true,true).animate({
			fontSize: 13,
			opacity: .9
		});
	}, //este evento se produce al retirar el puntero del raton de los iconos
	function(){
		//obtenemos el icono y la descripcion
		var $objImagen=$(this).find('img'), $objTexto=$(this).find('em');
		
		//disminuimos el tamano de la imagen a sus dimensiones normales
		$objImagen.animate({
			height: 110,
			width: 110
		});
		//bajamos la fuente y opacidad de la descripcion (para ocultarla)
		$objTexto.stop(true,true).animate({
			fontSize: 11,
			opacity: 0
		});
	});
});
