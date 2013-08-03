//juego de naves spaciales (space webmonsters)
//autor: cali rojas
//web: www.lewebmonster.com

$(document).ready(function(){
	//variables utilizadas en el juego
	var SPACE_WEBMONSTERS={
		NAVE: $('#divNave'),			//capa css que contiene la nave
		VELOCIDAD_NAVE: 25,				//velocidad en la que se va a mover la nave
		TIEMPO_TOTAL: 15,				//tiempo del juego
		TIEMPO_TRANSCURRIDO: 0,			//tiempo transcurrido
		TECLAS: {						//teclas que debemos detectar
			ARRIBA: 38,
			ABAJO: 40,
			DERECHA: 39,
			IZQUIERDA: 37,
			ESPACIO: 32
		},
		TECLAS_PRESIONADAS: Array(),	//teclas que estan presionadas (aca las vamos a guardar)
		TIMER_MOVIMIENTO: null,			//temporizador para mover las naves enemigas
		TIMER_CONTADOR: null,			//temporizador para controlar el tiempo del juego
		ENEMIGOS_ELIMINADOS: 0,			//contador de enemigos eliminados
		TOTAL_ENEMIGOS: 0,				//total de enemigos eliminados
		VELOCIDAD_ENEMIGOS: 0,			//velocidad en que se mueven los enemigos
		PERMITIR_TECLAS: 0				//permitir la pulsacion de teclas (cuando el juego finaliza se pasa a 1)
	};
	
	//detectar cuando se presiona una tecla (la almacenamos en el array)
	$(document).on('keydown',function(e){SPACE_WEBMONSTERS.TECLAS_PRESIONADAS[e.which]=true;});
	//detectar cuando una tecla se libera (la colocamos en false en el array)
	$(document).on('keyup',function(e){SPACE_WEBMONSTERS.TECLAS_PRESIONADAS[e.which]=false;});
	
	//mostramos la presentacion del juego
	$('#divPresentacion').fadeIn(2000,function(){$('#divOpciones').fadeIn(2000);});
	
	//clic en el boton para iniciar el juego
	$('#btnIniciar').on('click',function(){
		if($(this).attr('disabled')!='disabled'){
			$('#divIntro').fadeOut(function(){
				//iniciamos el juego
				$.fntJuego();
				$('#btnIniciar').attr('disabled','disabled');
			});
		}
	});
	
	//funcion para controlar el tiempo
	$.fntTiempo=function(){
		SPACE_WEBMONSTERS.TIMER_CONTADOR=setTimeout(function(){
			SPACE_WEBMONSTERS.TIEMPO_TRANSCURRIDO++;
			var iTiempo_Restante=SPACE_WEBMONSTERS.TIEMPO_TOTAL-SPACE_WEBMONSTERS.TIEMPO_TRANSCURRIDO;
			
			//mostramos el tiempo transcurrido
			$('#liTiempo').text(iTiempo_Restante);
			
			//aun hay tiempo?
			if(iTiempo_Restante>0){
				//seguir contando el tiempo transcurrido
				$.fntTiempo();
			}else{
				//el tiempo termino
				//ocultamos los enemigos que quedan en pantalla
				$('.clsEnemigo').stop(false,false).animate({
					opacity: 0
				},2000,function(){
					$(this).remove();
				});
				$.fntFinalizar(0);
			}
		},1000);
	};
	
	//el juego
	$.fntJuego=function(){
		SPACE_WEBMONSTERS.TIEMPO_TRANSCURRIDO=0, SPACE_WEBMONSTERS.ENEMIGOS_ELIMINADOS=0;
		
		$('#liTiempo').text(SPACE_WEBMONSTERS.TIEMPO_TOTAL);
		$.fntTiempo();
		SPACE_WEBMONSTERS.TOTAL_ENEMIGOS=parseInt($('#selEnemigos').val());
		SPACE_WEBMONSTERS.VELOCIDAD_ENEMIGOS=parseInt($('#selVelocidad').val());
		//permitimos que el usuario mueva la nave
		SPACE_WEBMONSTERS.PERMITIR_TECLAS=1;
		
		//agregar los enemigos
		for(var iCont=1;iCont<=SPACE_WEBMONSTERS.TOTAL_ENEMIGOS;iCont++){
			var objEnemigo=$('<div/>').addClass('clsEnemigo');
			$('#divEnemigos').append(objEnemigo);
		}
		
		$.fntMover=function(){
			var iEnemigos=$('.clsEnemigo').length;
			$('.clsEnemigo').each(function(iIndice){
				var iArriba=Math.floor(Math.random()*170)-10,iIzquierda=Math.floor(Math.random()*700);
				$(this).stop(true,true).animate({
					left: iIzquierda,
					bottom: iArriba
				},SPACE_WEBMONSTERS.VELOCIDAD_ENEMIGOS);
				
				if(iIndice==(iEnemigos-1)){
					SPACE_WEBMONSTERS.TIMER_MOVIMIENTO=setTimeout(function(){
						$.fntMover();
					},SPACE_WEBMONSTERS.VELOCIDAD_ENEMIGOS);
				}
			});
		};
		
		//movemos los enemigos dentro del contenedor
		$.fntMover();
		
		//funcion para finalizar el juego (iEstado=1: gano, iEstado=0: perdio)
		$.fntFinalizar=function(iEstado){
			//limpiar los temporizadores
			clearTimeout(SPACE_WEBMONSTERS.TIMER_CONTADOR); clearTimeout(SPACE_WEBMONSTERS.TIMER_MOVIMIENTO);
			//bloqueamos las teclas
			SPACE_WEBMONSTERS.PERMITIR_TECLAS=0;
			//actualizar contador de objetivos eliminados
			$('#liEliminados').text(SPACE_WEBMONSTERS.ENEMIGOS_ELIMINADOS);
			
			//mostrar mensaje al usuario
			var $divMensaje=$('#divMensaje');
			
			if(iEstado==1){
				$divMensaje.find('h1').html('&iexcl;Usted gan&oacute;!');
				$divMensaje.find('p').html('Felicitaciones, usted gan&oacute; la partida :)');
			}else{
				$divMensaje.find('h1').html('&iexcl;Usted perdi&oacute;!');
				$divMensaje.find('p').html('Lo siento, mejor suerte la pr&oacute;xima vez :(');
			}
			
			//mostramos el mensaje al usuario
			$divMensaje.fadeIn(function(){
				//ocultamos el mensaje
				$(this).delay(3000).fadeOut(function(){
					//mostramos la primera capa con los controles para iniciar el juego
					$('#divIntro').fadeIn(300,function(){
						$('#btnIniciar').removeAttr('disabled').focus();
					});
				});
			});
		};
		
		//temporizador para detectar la pulsacion de teclas
		var objDetectarTeclas=setInterval(function(){
			//verificamos si se le permite mover la nave al usuario
			if(SPACE_WEBMONSTERS.PERMITIR_TECLAS){
				//esta presionada la tecla de arriba?
				if(SPACE_WEBMONSTERS.TECLAS_PRESIONADAS[SPACE_WEBMONSTERS.TECLAS.ARRIBA]){
					//movemos la nave hacia arriba
					SPACE_WEBMONSTERS.NAVE.css('bottom','+='+SPACE_WEBMONSTERS.VELOCIDAD_NAVE);
				}
				//esta presionada la tecla de abajo?
				if(SPACE_WEBMONSTERS.TECLAS_PRESIONADAS[SPACE_WEBMONSTERS.TECLAS.ABAJO]){
					//movemos la nave hacia abajo
					SPACE_WEBMONSTERS.NAVE.css('bottom','-='+SPACE_WEBMONSTERS.VELOCIDAD_NAVE);
				}
				//esta presionada la tecla izquierda?
				if(SPACE_WEBMONSTERS.TECLAS_PRESIONADAS[SPACE_WEBMONSTERS.TECLAS.IZQUIERDA]){
					//movemos la nave hacia la izquierda
					SPACE_WEBMONSTERS.NAVE.css('left','-='+SPACE_WEBMONSTERS.VELOCIDAD_NAVE);
				}
				//esta presionada la tecla derecha?
				if(SPACE_WEBMONSTERS.TECLAS_PRESIONADAS[SPACE_WEBMONSTERS.TECLAS.DERECHA]){
					//movemos la nave hacia la derecha
					SPACE_WEBMONSTERS.NAVE.css('left','+='+SPACE_WEBMONSTERS.VELOCIDAD_NAVE);
				}
				//esta presionada la tecla espaciadora (disparo)?
				if(SPACE_WEBMONSTERS.TECLAS_PRESIONADAS[SPACE_WEBMONSTERS.TECLAS.ESPACIO]){
					//codigo para disparar un proyectil
					
					//obtenemos la posicion de la nave
					var iIzquierda=parseInt(SPACE_WEBMONSTERS.NAVE.css('left')),
					iAbajo=parseInt(SPACE_WEBMONSTERS.NAVE.css('bottom'));
					
					//creamos un proyectil nuevo
					var objProyectil=$('<div/>').addClass('clsProyectil').css({
						left:		iIzquierda+21,
						bottom:		iAbajo+48
					});
					//agregamos al contenedor el nuevo proyectil
					$('#divContenedor').append(objProyectil);
					
					//disparamos el proyectil
					objProyectil.animate({
						bottom : 610
					},{
						duration : 1000,
						step : function() {
							//detectamos las colisiones
							var iColision = $(this).collision('.clsEnemigo');
							
							//se produjo alguna colision?
							if(iColision.length>0){
								//aumentamos el numero de enemigos eliminados
								SPACE_WEBMONSTERS.ENEMIGOS_ELIMINADOS+=iColision.length;
								$('#liEliminados').text(SPACE_WEBMONSTERS.ENEMIGOS_ELIMINADOS);
								
								//eliminamos el proyectil con el que matamos al enemigo
								objProyectil.remove();
								//eliminamos el enemigo (se guarda en el objeto de colisiones)
								$(iColision).remove();
								
								//creamos na nueva explosion
								var objExplosion=$('<div/>').css({
									left: parseInt(objProyectil.css('left'))-10,
									bottom: parseInt(objProyectil.css('bottom'))+10 
								}).addClass('clsExplosion');
								//agregamos la explosion al contenedor
								$('#divContenedor').append(objExplosion);
								
								//mostramos la explosion
								objExplosion.animate({
									opacity: 0
								},3000,function(){
									//eliminamos la explosion
									$(this).remove();
								});
								
								//verificamos si el juego debe finalizar o no
								if(SPACE_WEBMONSTERS.ENEMIGOS_ELIMINADOS==SPACE_WEBMONSTERS.TOTAL_ENEMIGOS) $.fntFinalizar(1);
							}
						}
					});
				}
			}
		},100);
	};
});