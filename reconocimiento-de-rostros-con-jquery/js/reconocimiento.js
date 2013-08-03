$(function(){
	//funcion para generar colores html aleatorios
	$.fntColorAleatorio=function(){
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.round(Math.random() * 15)];
	    }
	    return color;
	};
	
	//funcion para reconocer las caras en la imagen
	$.fntReconocerCaras=function(){
		//almacenamos en la variable todas las caras que detecte el plugin
		var objCoordenadas=$('#imgImagen').faceDetection();
		
		//recorremos el array que contiene los datos de cada uno de los rostros detectados
		for(var iCaras=0; iCaras<objCoordenadas.length; iCaras++){
			//creamos un div para cada uno de los rostros detectados
			//y le asignamos las propiedades de posicionamiento obtenidas
			$('<div>',{
				css:{
					height: 		objCoordenadas[iCaras].height,		//alto
					width: 			objCoordenadas[iCaras].width,		//ancho
					top: 			objCoordenadas[iCaras].positionY,	//arriba
					left: 			objCoordenadas[iCaras].positionX,	//izquierda
					position: 		'absolute',							//posicionamos de forma absoluta
					background:		$.fntColorAleatorio(),				//fondo de color aleatorio
					opacity:		.7									//opacidad a 70%
				},
				class: 'clsRecuadro'				//le agregamos la clase clsRecuadro
			}).appendTo('#divImagen');				//agregamos la nueva capa al contenedor de la imagen
		}
	};
	
	//ejecutamos la funcion que reconoce las caras
	$.fntReconocerCaras();
});