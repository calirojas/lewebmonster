$(function(){
	//cantidad de cuadros que vamos a dibujar
	//y creamos una lista (ul) para agregarlos a ella (como items [li])
	var iTotalCuadros=120, strCuadritos='', $objListaCuadros=$('<ul>');
	
	//creamos la lista de items (mas optimizado de esta forma)
	for(var iCont=1; iCont<=iTotalCuadros; iCont++){
		strCuadritos+='<li/>';
	}
	
	//agregamos los items a la lista
	$objListaCuadros.append(strCuadritos)
	//agregamos la lista al contenedor principal
	$('#divContenedorCuadros').append($objListaCuadros);
	
	//evento que se produce al colocar el puntero del raton sobre un item de la lista
	$('#divContenedorCuadros ul li').hover(function(){
		//establecemos la nueva opacidad del elemento
		var iOpacidad=($(this).css('opacity')==1)?.5:0;
		//cambiamos la opacidad 
		$(this).stop(true,true).animate({opacity: iOpacidad});
	});
});