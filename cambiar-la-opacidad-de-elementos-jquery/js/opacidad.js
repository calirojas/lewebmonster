$(function(){
	//la opacidad inicial de todos los elementos va a ser 80%
	$('ul li').animate({opacity: .8});
	
	//evento al colocar el puntero del raton sobre un item de la lista
	$('ul li').hover(function(){
		//almacenamos la instancia del elemento sobre el que esta el raton (optimizacion)
		var $objItem=$(this);
		//buscamos el parrafo y lo mostramos
		$objItem.find('p').stop(true,true).slideDown('fast',function(){
			//cuando la animacion del parrafo termina le devolvemos el 100%
			//de opacidad al item de la lista
			$objItem.stop(true,true).animate({
				opacity: 1
			});
		});
	}, //evento al retirar el puntero del raton de un item de la lista (mouseout)
	function(){
		//cambiamos la opacidad del elemento a 50%
		$(this).stop(true,true).animate({
			opacity: .5
		},function(){
			//cuando la animacion de la opacidad finaliza
			//buscamos el parrafo y lo ocultamos
			$(this).find('p').stop(true,true).slideUp('fast');
		});
	});
});
