$(function(){
	//evento al colocar el puntero del raton sobre el elemento de la lista
	$('ul.clsDiscos li').hover(function(){
		//obtenemos la instancia del elemento
		var $objItem=$(this);
		//buscamosla imagen y la rotamos 360 grados
		$objItem.find('img').stop(true,true).rotate({
			animateTo: 360
		});
		//buscamos la etiqueta ol y la deslizamos hacia abajo
		$objItem.find('ol').stop(true,true).slideDown();
	}, //evento al retirar el raton del elemento
	function(){
		//obtenemos la instancia del elemento sobre el que esta el raton
		var $objItem=$(this);
		//buscamos la lista (ol) y la deslizamos hacia arriba
		$objItem.find('ol').stop(true,true).slideUp('fast');
		//rotamos la imagen a 0 (cero) grados
		$objItem.find('img').stop(true,true).rotate({
			animateTo: 0
		});
	});
});