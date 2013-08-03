//tarjeta de navidad animada con jQuery
//autor: cali rojas
//blog: www.lewebmonster.com

$(function(){
//funcion que contiene la animacion
	$.animacionNavidad=function(){
		//variables para almacenar los mensajes que se muestran
		//y para saber cuantos mensajes en total se deben mostrar..
		//ademas, una variable para saber cual mensaje se esta mostrando
		var strMensajes=[
			'www.lewebmonster.com<br>y<br>Cali Rojas',
			'le desean a todos sus lectores',
			'FELIZ NAVIDAD!! :)<br>con esta animación en jQuery'
		], iMensajeActual=0, iTotalMensajes=strMensajes.length;
		
		//funcion para abrir el escenario (o iniciar la animacion)
		$.abrirEscenario=function(){
			//ocultamos la capa que abre la tarjeta
			$('#divAbrir').stop(true,true).animate({
				height: 0
			});
			//cerramos la cortina izquierda y le agregamos un borde redondeado
			$('#divCortinaIzquierda').stop(true,true).animate({
				borderBottomRightRadius: '100%',
				width: 80
			},1000);
			//cerramos la cortina derecha y le agregamos un borde redondeado
			$('#divCortinaDerecha').stop(true,true).animate({
				borderBottomLeftRadius: '100%',
				width: 80
			},1000);
			//iniciamos la caida de nieve
			$('#divEscenario').snowfall({
				'flakeCount' : 50,	//cantidad de bolas de nieve
				'round' : true,	//deben ser redondas
				maxSize: 10	//como maximo van a medir 10px
			});
		};
		
		//funcion para cerrar el escenario (terminan la animacion)
		$.cerrarEscenario=function(){
			//cerramos la cortina izquierda y le quitamos el borde
			$('#divCortinaIzquierda').stop(true,true).animate({
				borderBottomRightRadius: 0,
				width: 250
			},1000);
			//cerramos la cortina derecha y le quitamos el borde
			$('#divCortinaDerecha').stop(true,true).animate({
				borderBottomLeftRadius: 0,
				width: 250
			},1000,function(){	//cuando se cierra la cortina derecha
				//detenemos la caida de nieve
				$('#divEscenario').snowfall('clear');
				//y mostramos la capa con el logo de lewebmonster
				$('#divAbrir').stop(true,true).animate({
					height: 200
				});
			});
			//devolvemos a santa a su posicion original (oculto)
			$('#divSanta').stop(true,true).css({
				top: 150,
				left: -200
			});
		};
		
		//funcion para mostrar a santa con su trineo
		$.mostrarSanta=function(){
			//cambiamos la posicion de la capa para dar la sensacion
			//de que el trineo vuela... esto en 12 segundos
			$('#divSanta').stop(true,true).animate({
				left: 500,
				top: -100
			},12000);
		};
		
		//funcion para mostrar los mensajes de texto
		$.mostrarMensajes=function(){
			//utilizamos un temporizador
			setTimeout(function(){
				//si el mensaje actual es menor a la cantidad total de mensajes
				//mostramos el texto
				if(iMensajeActual<iTotalMensajes){
					//cambiamos la opacidad de la capa y el tamano de la fuente
					$('#divTexto').css({
						opacity : 0,
						fontSize: 0
					}).html(	//agregamos a la capa el siguiente mensaje
						strMensajes[iMensajeActual]
					).stop(true,true).animate({	//animamos el tamano de fuente y opacidad
						fontSize: '20px',
						opacity: 1
					},800).delay(1500).animate({	//esperamos 2s y ocultamos el mensaje
						fontSize: 0,
						opacity: 0
					},1000,function(){	//cuando se oculta el mensaje volvemos a llamar al temporizador
						iMensajeActual++;
						$.mostrarMensajes();
					});
					
					//mostramos a santa cuando estemos en el mensaje numero 2
					if(iMensajeActual==1) $.mostrarSanta();
				//si hemos llegado al ultimo mensaje
				}else{
					//cerramos el escenario
					$.cerrarEscenario();
				}
			},1000);
		};
		
		//abrimos el escenario y comenzamos a mostrar mensajes
		$.abrirEscenario();	$.mostrarMensajes();
	};
	
	//evento clic del logo... inicia la animacion
	$('#divAbrir').on('click',function(){
		$.animacionNavidad();
	});
});