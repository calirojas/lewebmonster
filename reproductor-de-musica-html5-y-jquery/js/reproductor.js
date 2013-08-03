/* reproductor de musica con html5 y jquery
 * autor: cali rojas
 * sitio web: www.lewebmonster.com
 */

$(function(){
	//creamos un objeto Audio de HTML5 para reproducir archivos
	var objReproductor=new Audio();
	//variable para almacenar la cancion que se esta reproduciendo
	var iCancionActual=0;
	//obtenemos la cantidad total de canciones en la lista (mas abajo la necesitaremos)
	var iTotalCanciones=$('#olCanciones li').length;
	
	//le asignamos al reproductor la primera cancion de la lista
	objReproductor.src=$('#olCanciones').children().eq(0).attr('rel');
	
	//clic en el boton play
	$('#btnReproducir').on('click',function(){
		//llamamos a la funcion que reproduce los archivos
		$.fntReproducir();
	});
	
	//reproducir el siguiente archivo de la lista
	$('#btnSiguiente').on('click',function(){
		//verificamos si siguen mas canciones en la lista
		if(iCancionActual<iTotalCanciones-1){
			//pasamos a la siguiente cancion
			iCancionActual++;
		}else{
			//volvemos a la primera cancion de la lista
			iCancionActual=0;
		}
		//reproducimos el archivo que sigue
		$.fntReproducir();
	});
	
	//clic en el boton silencio
	$('#btnSilencio').on('click',function(){
		//colocamos el estado mute a su contrario, es decir... si esta mudo
		//volvemos a activar el sonido; si el sonido esta activado lo desactivamos
		objReproductor.muted=!objReproductor.muted;
		//quitamos o agregamos la clase que indica si el sonido esta activado o no
		$(this).toggleClass('clsSeleccionado');
	});
	
	//funcion que reproduce los archivos de audio
	$.fntReproducir=function(){
		//obtenemos una instancia del elemento que contiene la info. de cancion a reproducir
		var $objContenedorCancion=$('#olCanciones').children().eq(iCancionActual);
		//obtenemos la ruta del archivo que se va a reproducir y se lo asignamos
		//al source del audio player de HTML5
		objReproductor.src=$objContenedorCancion.attr('rel');
		
		//desmarcamos cualquier cancion en la lista (si es que estuviese marcada alguna)
		$('#olCanciones li').removeClass('clsSeleccionado');
		//marcamos en la lista la cancion que vamos a reproducir
		$objContenedorCancion.addClass('clsSeleccionado');
		
		//reproducir la cancion con el metodo play
		objReproductor.play();
		
		//ocultamos suavemente los datos de la cancion anterior 
		$('#divInfoCancion').find('label').stop(true.true).animate({
			opacity: 0
		},function(){
			//obtenemos una instancia del elemento que contiene los datos de la cancion
			var $objContenedorCancion=$('#olCanciones').children().eq(iCancionActual);
			
			//actualizamos la informacion de la cancion que se esta reproduciendo
			//duracion total
			$('#lblDuracion').find('span').text('00:00');
			//nombre de la cancion
			$('#lblCancion').find('span').text($objContenedorCancion.find('strong').text());
			//artista
			$('#lblArtista').find('span').text($objContenedorCancion.find('em').text());
			//tiempo transcurrido
			$('#lblEstado').find('span').text('00:00');
			
			//mostramos suavemente la info. de la nueva cancion
			$(this).stop(true,true).animate({
				opacity: 1
			});
		});
	};
	
	//subir el volumen del reproductor
	$('#btnSubirVolumen').on('click',function(){
		//si el volumen es diferente que uno (100%) entonces lo aumentamos en 0.1
		//por cada clic que se haga en el boton
		if(objReproductor.volume!=1) objReproductor.volume+=0.1;
	});
	
	//bajar el volumen de la reproduccion
	$('#btnBajarVolumen').on('click',function(){
		//si el volumen es diferente que cero entonces lo bajamos 0.1
		//por cada clic que se haga en el boton
		if(objReproductor.volume!=0) objReproductor.volume-=0.1;
	});
	
	//evento a hacer clic en el boton anterior
	$('#btnAnterior').on('click',function(){
		//verificamos si estamos posicionados en la primera cancion o no
		if(iCancionActual>=1){
			//retrocedemos una cancion
			iCancionActual--;
		}else{
			//pasamos a la ultima cancion de la lista
			iCancionActual=$('#olCanciones li').length-1;
		}
		//reproducimos la cancion
		$.fntReproducir();
	});
	
	//evento al hacer clic en cualquiera de las canciones
	$('#olCanciones li').on('click',function(){
		//establecemos el numero de cancion (usando el indice del li clickeado)
		iCancionActual=$(this).index();
		//llamamos a la funcion que reproduce los archivos de audio
		$.fntReproducir();
	});
	
	//errores del reproductor
	$(objReproductor).on('error',function(){
		alert('Se produjo un error en la reproducción!');
	});
	
	//pausar o continuar la reproduccion
	$('#btnPausar').on('click',function(){
		//verificamos si la reproduccion esta pausada
		if(objReproductor.paused){
			//verificamos que el archivo se haya reproducido aunque sea un segundo
			if(objReproductor.currentTime>0){
				//reanudamos la reproduccion (estaba pausada)
				objReproductor.play();
				//eliminamos la clase al boton
				$(this).removeClass('clsSeleccionado');
			}
		}else{
			//agregamos la clase al boton (solo para estilizar, no es nada funcional)
			$(this).addClass('clsSeleccionado');
			//pausamos la reproduccion actual
			objReproductor.pause();
		}
	});
	
	//boton para establecer la reproduccion continua de la lista
	$('#btnRepetir').on('click',function(){
		//simplemente es jugar con una clase (agregarla o quitarla)
		//en el evento ended se va a verificar la clase para continuar o no la reproduccion
		$(this).toggleClass('clsSeleccionado');
	});
	
	//evento que se dispara al finalizar la reproduccion
	$(objReproductor).on('ended',function(){
		//verificamos si es la ultima cancion de la lista
		if(iCancionActual==iTotalCanciones-1){
			//si es la ultima entonces verificamos si la opcion de repetir
			//esta marcada
			if($('#btnRepetir').hasClass('clsSeleccionado')){
				//reproducimos la siguiente cancion (en este caso seria la numero 1)
				$('#btnSiguiente').trigger('click');	
			}
		}else{
			//reproducimos la siguiente cancion de la lista
			$('#btnSiguiente').trigger('click');
		}
	});
	
	//actualizar el tiempo transcurrido y la barra de progreso
	$(objReproductor).on('timeupdate',function(){
		//tiempo transcurrido de la reproduccion
		var iTiempoTranscurrido=objReproductor.currentTime;
		//duracion total de la cancion
		var iTiempoTotal=objReproductor.duration;
		//porcentaje aproximado de la reproduccion
		var iPorcentajeProgreso=(iTiempoTranscurrido*100)/iTiempoTotal;
		//formateamos el tiempo
		var objTiempo=$.fntTransformarSegundos(iTiempoTranscurrido);
		
		//obtenemos la duracion de la cancion
		var objDuracion=$.fntTransformarSegundos(iTiempoTotal);
		$('#lblDuracion').find('span').text(objDuracion[0]+':'+objDuracion[1]);
		
		//el ancho de la barra sera el porcentaje que obtuvimos... recuerde que la capa #divBarra
		//tiene un ancho predeterminado de 100% (se ajusta al contenedor padre), es por eso que
		//le estoy dando el tamano con porcentajes... veamoslo como una especie de truco
		$('#divBarra').css('width',iPorcentajeProgreso+'%');
		//actualizar el tiempo transcurrido
		$('#lblEstado').find('span').text(objTiempo[0]+':'+objTiempo[1]);
	});
	
	//funcion para formatear los segundos en minutos y segundos (retorna un Array)
	$.fntTransformarSegundos=function(iTiempoTranscurrido){
		//obtener los minutos
		var iMinutos=Math.floor(iTiempoTranscurrido/60);
		//se obtienen los segundos
		var iSegundos=Math.floor(iTiempoTranscurrido-iMinutos*60);
		
		//le agregamos un cero a los minutos y segundos, solo por estetica
		if(iSegundos<10) iSegundos='0'+iSegundos;
		if(iMinutos<10) iMinutos='0'+iMinutos;
		
		//devolvemos un array con el tiempo formateado
		return Array(iMinutos,iSegundos);
	};
	
	//cambiar la opacidad de los botones al colocar el puntero del raton sobre ellos
	$('input[type="button"]').hover(function(){
		//cambiamos la opacidad a 50%
		$(this).stop(true.true).animate({
			opacity: .5
		});
	},function(){
		//le devolvemos al boton la opacidad de 100%
		$(this).stop(true,true).animate({
			opacity: 1
		});
	});
	
});