$(function(){
	//evento que se produce al hacer clic en el boton cerrar de la ventana
	$('.clsVentanaCerrar').live('click',function(eEvento){
		//prevenimos el comportamiento normal del enlace
		eEvento.preventDefault();
		//buscamos la ventana padre (del boton "cerrar")
		var $objVentana=$($(this).parents().get(1));
		
		//cerramos la ventana suavemente
		$objVentana.fadeOut(300,function(){
			//eliminamos la ventana del DOM
			$(this).remove();
			//ocultamos el overlay suavemente
			$('#divOverlay').fadeOut(500,function(){
				//eliminamos el overlay del DOM
				$(this).remove();
			});
		});
	});
	
	$('.clsVentanaIFrame').on('click',function(eEvento){
		//prevenir el comportamiento normal del enlace
		eEvento.preventDefault();
		
		//obtenemos la pagina que queremos cargar en la ventana y el titulo
		var strPagina=$(this).attr('href'), strTitulo=$(this).attr('rel');
		
		//creamos la nueva ventana para mostrar el contenido y la capa para el titulo
		var $objVentana=$('<div class="clsVentana">'), $objVentanaTitulo=$('<div class="clsVentanaTitulo">');
		
		//agregamos el titulo establecido y el boton cerrar
		$objVentanaTitulo.append('<strong>'+strTitulo+'</strong>');
		$objVentanaTitulo.append('<a href="" class="clsVentanaCerrar">Cerrar</a>');
		
		//agregamos la capa de titulo a la ventana
		$objVentana.append($objVentanaTitulo);
		
		//creamos la capa que va a mostrar el contenido
		var $objVentanaContenido=$('<div class="clsVentanaContenido">');
		
		//agregamos un iframe y en el source colocamos la pagina que queremos cargar ;)
		$objVentanaContenido.append('<iframe src="'+strPagina+'">')
		
		//agregamos la capa de contenido a la ventana
		$objVentana.append($objVentanaContenido);
		
		//creamos el overlay con sus propiedades css y lo agregamos al body
		var $objOverlay=$('<div id="divOverlay">').css({
			opacity: .5,
			display: 'none'
		});
		$('body').append($objOverlay);
		
		//animamos el overlay y cuando su animacion termina seguimos con la ventana
		$objOverlay.fadeIn(function(){
			//agregamos la nueva ventana al body
			$('body').append($objVentana);
			//mostramos la ventana suavemente ;)
			$objVentana.fadeIn();
		})
	});
});