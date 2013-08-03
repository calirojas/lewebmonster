$(function(){
	//ejecutamos el efecto al posicionar el mouse sobre el contenedor
	$('.clsImagen').hover(function(){
		//obtenemos la instancia del contenedor (this), y el alto/ancho del mismo
		var $objContenedor=$(this);
		var iAnchoContenedor=$objContenedor.width(), iAltoContenedor=$objContenedor.height();
		
		//agregamos cuatro capas con sus respectivas clases
		var $objArribaIzquierda=$('<div class="clsCuadro clsArribaIzquierda">');
		var $objArribaDerecha=$('<div class="clsCuadro clsArribaDerecha">');
		var $objAbajoIzquierda=$('<div class="clsCuadro clsAbajoIzquierda">');
		var $objAbajoDerecha=$('<div class="clsCuadro clsAbajoDerecha">');
		
		//animamos los cuatro recuadros
		//el tamano de cada recuadro es la mitad del contenedor
		$objArribaIzquierda.animate({width: iAnchoContenedor/2,height: iAltoContenedor/2});
		$objArribaDerecha.animate({width: iAnchoContenedor/2,height: iAltoContenedor/2});
		$objAbajoIzquierda.animate({width: iAnchoContenedor/2,height: iAltoContenedor/2});
		$objAbajoDerecha.animate({width: iAnchoContenedor/2,height: iAltoContenedor/2});
		
		//agregamos los elementos a la capa contenedora
		$objContenedor.append($objArribaIzquierda);
		$objContenedor.append($objArribaDerecha);
		$objContenedor.append($objAbajoIzquierda);
		$objContenedor.append($objAbajoDerecha);
	},function(){
		//desaparecemos los recuadros con un fade
		$(this).find('.clsCuadro').stop(true,true).fadeOut(300,function(){
			//eliminamos todos los recuadros
			$(this).remove();
		});
	});
});