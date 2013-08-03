$(function(){	
	//creamos un objeto para almacenar las teclas que
	//vamos a utilizar para mover el balon en el campo
	const TECLAS={
		IZQUIERDA: 37,
		DERECHA: 39,
		DISPARO: 38
	};
	
	//objeto para almacenar los contadores y el estado del juego
	var JUEGO={
		GOLES: 0,			//goles anotados
		ATAJADAS: 0,		//atajadas
		FUERAS: 0,			//balon fuera
		TIROENPROCESO: false
		//tiro en proceso: esta variable se pondra en true cuando el balon
		//se este moviendo, es por asi decirlo, una forma de bloquear la
		//entrada del usuario mientras se realiza el tiro y obtenemos el
		//resultado (gol, fuera o atajada)
	};
	
	//array para almacenar todas las teclas presionadas por el usuario
	var TECLAS_PRESIONADAS=[];
	
	//evento que se produce al soltar las teclas
	$(document).on('keyup',function(e){
		//colocamos la tecla soltada en false
		TECLAS_PRESIONADAS[e.which]=false;
	});
	
	//evento que se produce al presionar cualquier tecla en el documento
	$(document).on('keydown',function(e){
		//colocamos la tecla presionada en true
		TECLAS_PRESIONADAS[e.which]=true;
	});
	
	//por medio de este temporizador detectamos las teclas presionadas
	//por decirlo asi, aca se maneja la logica del juego (este codigo se ejecuta cada 100ms) 
	var objJuego=setInterval(function(){
		//verificamos si el juego esta bloqueado o no
		//el juego se bloquea cuando el tiro esta en proceso
		if(!JUEGO.TIROENPROCESO){
			//obtenemos la posicion del balon
			var iIzquierda=parseInt($('#divBalon').css('left'));
			//estas variables son para saber si el tiro fue atajado o el usuario anoto
			//si al final del tiro las dos son false, entonces el balon esta fuera
			var blnAtajado=false, blnGol=false;
			
			//verificar si la tecla izquierda esta presionada (para mover el balon)
			if(TECLAS_PRESIONADAS[TECLAS.IZQUIERDA]) $('#divBalon').css('left',iIzquierda-20);
			
			//verifica si la tecla derecha esta presionada (para mover el balon)
			if(TECLAS_PRESIONADAS[TECLAS.DERECHA]) $('#divBalon').css('left',iIzquierda+20);
			
			//la tecla de disparo fue presionada?
			if(TECLAS_PRESIONADAS[TECLAS.DISPARO]){
				JUEGO.TIROENPROCESO=true;
				$('#divBalon').stop(true,true).animate({
						bottom: 435
				},{
					duration: 300,
					step:function(){
						//deteccion de las colisiones de objetos
						
						//almacenamos en una variable las colisiones del portero y el area de gol
						var iColisionPortero=$(this).collision('#divPortero');
						var iColisionMalla=$(this).collision('#divAreaDeGol');
						
						//el balon colisiono con el portero? (atajada)
						if(iColisionPortero.length>0){
							blnAtajado=true;
						}else if(iColisionMalla.length>0){
							//el balon colisiono con el area de gol? (es un golazooooo!)
							blnGol=true;
						}
						//si el balo no colisiona con el area de gol ni con el portero
						//entonces se asume como un fuera
					},complete:function(){
						//verificamos si el portero paro el balon
						if(blnAtajado){
							//aumentamos el contador de atajadas
							$('#txtAtajadas').val(++JUEGO.ATAJADAS);
							
							//sacamos un poco el portero de la cancha para simular el rechazo
							//del balon
							$('#divPortero').animate({
								bottom: -20 
							},function(){
								//volvemos a colocar el portero en su posicion original
								$(this).animate({
									bottom: 0
								});
							});
							//rebotamos el balon para un nuevo tiro
							$('#divBalon').stop(true,true).animate({
								bottom: 55
							},600,function(){
								//desbloqueamos el juego para que el usuario pueda tirar otra vez
								JUEGO.TIROENPROCESO=false;
							});
						}else{
							//verificamos si ha sido gol
							if(blnGol){
								//aumentamos el contador de goles
								$('#txtGoles').val(++JUEGO.GOLES);
							}else{
								//no fue gol, tampoco la atajo el portero
								//entonces ha sido fuera (aumentamos el contador)
								$('#txtFueras').val(++JUEGO.FUERAS);
							}
							//ocultamos el balon
							$('#divBalon').stop(true,true).fadeOut('fast',function(){
								//colocamos el balon para un nuevo tiro
								$(this).css('bottom',55);
								//mostramos el balon
								$(this).stop(true,true).fadeIn('fast',function(){
									//desbloqueamos para que el usuario siga tirando
									JUEGO.TIROENPROCESO=false;
								});
							});
						}
					}
				});
			}
		}
	},100);
	
	//funcion para mover el portero de un lado hacia otro
	//hubiesemos podido utilizar un timer tambien
	$.fntMoverPortero=function(){
		//obtenemos la posicion izquierda del portero y el nivel seleccionado (para
		//establecer la velocidad de la animacion)
		var iIzquierda=parseInt($('#divPortero').css('left'));
		var iVelocidad=parseInt($('#selNivel').val());
		
		//movemos el portero 100px a la izquierda
		$('#divPortero').stop(true,true).animate({
			left: 100
		},iVelocidad,function(){
			//movemos el portero 35px a la izquierda (esto seria el centro del marco)
			$(this).stop(true,true).animate({
				left: 35
			},iVelocidad,function(){
				//movemos el portero 100px a la izquierda
				$(this).stop(true,true).animate({
					left: 100
				},iVelocidad,function(){
					//mover el portero 170px a la izquierda
					$(this).stop(true,true).animate({
						left: 170
					},iVelocidad,function(){
						//cuando termina el ultimo movimiento volvemos a
						//llamar a la misma funcion para continuar con el movimiento
						$.fntMoverPortero();
					});
				});
			});
		});
	};
	
	//cuando el documento cargue ponemos el portero en movimiento
	$.fntMoverPortero();
});