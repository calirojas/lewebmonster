/*
 * mover el fondo con el mouse
 * autor: cali rojas
 * web: www.lewebmonster.com
 */

$(function(){
	//encapsulamos las variables que vamos a usar
	var objMOVER={
		blnIzquierda: false,	//debemos mover hacia la izquierda?
		blnDerecha: false,		//debemos mover hacia la derecha?
		iVelocidad: 30			//velocidad del movimiento
	};
	
	//evento al colocar el raton sobre la capa izquierda
	$('#divIzquierda').hover(function(){
		//colocamos la variable en true para que el timer aplique el movimiento
		objMOVER.blnIzquierda=true;
	}, //al retirar el raton de la capa izquierda
	function(){
		//colocamos la variable en false para detener el movimiento
		objMOVER.blnIzquierda=false;
	});
	
	//evento al colocar el puntero del raton sobre la capa derecha
	$('#divDerecha').hover(function(){
		//le indicamos al timer que mueva el contenido hacia la derecha
		objMOVER.blnDerecha=true;
	}, //evento al retirar el raton de la capa derecha
	function(){
		//le decimos al timer que deje de mover el contenido
		objMOVER.blnDerecha=false;
	});
	
	//timer para crear el efecto de fondo en movimiento
	setInterval(function(){
		//obtenemos una instancia de la capa divContenido
		var $objContenido=$('#divContenido');
		
		//realizar el movimiento hacia la izquierda?
		if(objMOVER.blnIzquierda){
			//podemos mover hacia la izquierda (basados en la posicion)?
			if(parseInt($objContenido.css('left'))<-objMOVER.iVelocidad){
				//desplazamos el contenido hacia la izquierda
				$objContenido.stop(true,true).animate({
					left: '+='+objMOVER.iVelocidad
				},400,'swing');
			}
		}
		//mover hacia la derecha?
		if(objMOVER.blnDerecha){
			//obtenemos la posicion limite hasta la que debemos mover el contenido
			var iPosicionLimite=window.innerWidth-($objContenido.offset().left+$objContenido.outerWidth());
			
			//la posicion esta dentro del rango?
			if(iPosicionLimite+(objMOVER.iVelocidad*2)<0){
				//movemos el contenido hacia la derecha
				$objContenido.stop(true,true).animate({
					left: '-='+objMOVER.iVelocidad
				},400,'swing');
			}
		}
	},10);
	
});