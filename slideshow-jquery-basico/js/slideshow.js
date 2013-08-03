//Slideshow con jQuery sin plugins
//Cali Rojas
//www.lewebmonster.com

$(function(){
	//variable para el temporizador y tomamos la clase que contiene las imagenes
	var tmrTemporizador=null, $objSlideShow=$('.clsSlideShow');
	//ocultamos la ultima imagen (por defecto aparece de primera)
	$objSlideShow.find('li:gt(0)').hide();
	
	//funcion que contiene el temporizador
	$.fntSlideShow=function(){
		//le asignamos el codigo al temporizador
		tmrTemporizador=setInterval(function(){
			//variables para almacenar los elementos (actual y el que sigue en la lista)
			var $objActual, $objSiguiente;
			
			//si ningun item de la lista tiene la clase clsImagenActiva
			if($objSlideShow.has('.clsImagenActiva').length==0){
				//buscamos la primer imagen y se la asignamos
				$objSlideShow.find('li:first').addClass('clsImagenActiva');
			}
			
			//obtenemos la imagen que esta activa (visible)
			$objActual=$objSlideShow.find('.clsImagenActiva');
			
			//aun es el fin de la lista de imagenes?
			if($objActual.next().length>0){
				//bien, entonces tomamos el siguiente elemento y lo almacenamos
				$objSiguiente=$objActual.next();
			}else{
				//es el fin de la lista? la siguiente imagen sera la primera de la lista
				$objSiguiente=$objSlideShow.find('li:first-child');
			}
			
			//mostramos suavemente el siguiente elemento (por si estuviera invisible)
			//y le asignamos la clase clsImagenActiva
			$objSiguiente.addClass('clsImagenActiva').fadeIn(900);
			//a la imagen actual le eliminamos la clase clsActiva y la ocultamos
			$objActual.removeClass('clsImagenActiva').fadeOut(900);
		},3000); //cada tres segundos se volvera a ejecutar
	};
	
	//al colocar el puntero del raton sobre el slideshow este se pausa
	$('.clsSlideShow').hover(function(){
		//detenemos el temporizador
		clearInterval(tmrTemporizador);
	}, //al retirar el puntero del slideshow volvemos a activar el temporizador
	function(){
		//llamada a la funcion que contiene el temporizador
		$.fntSlideShow();
	});
	
	//iniciamos el slideshow
	$.fntSlideShow();
});