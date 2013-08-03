$(document).ready(function(){
	//evento que se produce al mover el raton sobre el documento
	$(document).on('mousemove',function(e){
		//obtener las coordenadas X e Y del raton
		var iX=e.pageX, iY=e.pageY;
		//imprimir en la capa las coordenadas
		$('#divCoordenadas').html('<strong>X: </strong>'+iX+', <strong>Y: </strong>'+iY);
	});
	
	//manejador de evento para el clic derecho (contextmenu)
	$(document).on('contextmenu',function(e){
		//evitamos que aparezca el menu predeterminado del navegador (si, asi se "bloquea")
		e.preventDefault();
		
		//volvemos a obtener las coordenadas del raton en el documento
		var iX=e.pageX, iY=e.pageY;
		
		//mostramos nuestro menu contextual en la ubicacion X e Y del puntero del raton
		$('#divMenu').css({
			display:	'block',
			left:		iX,
			top:		iY
		});
		
		//actualizamos el estado y decimos que "detectamos un clic"
		$('#divEstado').html('<strong>Clic derecho</strong> detectado');
	});
	
	//manejador del evento clic sobre el documento
	$(document).on('click',function(){
		//cuando se hace clic ocultamos el menu contextual
		$('#divMenu').css('display','none');
		//actualizamos el estado indicando que detectamos un clic
		$('#divEstado').html('<strong>Clic</strong> detectado');
	});
	
	//evento que se produce al hacer scroll sobre la capa divScroll
	$('#divScroll').on('scroll',function(){
		//actualizamos el estado para indicar que hemos detectado el scroll
		$('#divEstado').html('<strong>Scroll</strong> detectado');
		
		//este scroll se detecta tanto para la rueda del raton (mousewheel) como
		//para las teclas direccionales (arriba/abajo)
	});
	
	//evento cuando hacemos clic en un elemento (li) de la lista (ul)
	$('#divMenu ul li').on('click',function(){
		//mostramos una alerta
		alert('Se hizo clic sobre un elemento de la lista.')
	});
	
});