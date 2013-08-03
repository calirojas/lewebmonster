$(document).ready(function(){
	//mostrar el escritorio
	$('#divGNOME').stop(true,true).css({'opacity':0,'display':'block'}).animate({
		opacity: 1
	},1000);
	//opciones iniciales del cubo (para mas info vea el sitio web del plugin)
	$('#divCubo').imagecube({
		speed:800,
		full3D: true,
		reduction: 400,
		repeat: false,
		segments: 70,
		shading: false
	});
	
	//evento que se produce al hacer clic en las opciones de desktop switcher
	$('#divEscritorios ul li a').click(function(eEvento){
		//prevenimos el evento predeterminado del link (etiqueta "a")
		eEvento.preventDefault();
		if(!$(this).hasClass('clsActivo')){
			//ocultar el contenedor del escritorio
			$('#divContenedor').css('display','none');
			
			//obtener el numero del escritorio activo
			var iEscritorioActivo=$('#divEscritorios ul li a.clsActivo').attr('href');
			//obtener el numero de escritorio al que vamos a pasar
			var iEscritorioSeleccionado=$(this).attr('href'), strDireccionRotacion;
			
			//cambiar la direccion de rotacion dependiente del escritorio activo
			//(no es necesario, simplemente es para hacerlo mas real)
			if(iEscritorioActivo>iEscritorioSeleccionado){
				//rotar hacia la derecha
				strDireccionRotacion='right';
			}else{
				//rotar hacia la izquierda
				strDireccionRotacion='left';
			}
			
			//obtenemos una instancia del cubo para cambiar opciones
			var objCubo=$('#divCubo');
			//cambiar la direccion de la rotacion
			objCubo.imagecube('change',{direction:strDireccionRotacion});
			//rotamos el cubo al escritorio seleccionado por el usuario: (iEscritorio-1)
			//de esta forma mantenemos el mismo fondo para cada escritorio especifico
			objCubo.imagecube('rotate',(iEscritorioSeleccionado-1),function(){
				//cuando termina la rotacion mostramos suavemente el escritorio
				$('#divContenedor').fadeIn();
			});
			
			//eliminamos la clase clsActivo al escritorio que estaba seleccionado 
			$('#divEscritorios ul li a').removeClass('clsActivo');
			//marcamos como activo el escritorio seleccionado por el usuario
			$(this).addClass('clsActivo');
		}
	});
	
	//evento que se produce al hacer clic en cualquier enlace
	$('a').click(function(){
		//mostrar un mensaje cuando se hace clic en un enlace que no tiene funcionalidad
		if($(this).attr('href')=='javascript:void(0);'){
			alert('No se asignaron acciones a este elemento. Por favor, pruebe haciendo '+
			'clic sobre las ventanas minimizadas en la parte inferior o en el desktop '+
			'switcher para ver el efecto del cubo 3D.')
		} 
	});
	
	//mostrar las opciones del dropdown superior cuando se coloque el mouse sobre el
	$('#divMenu ul li').hover(function(){
		//mostramos las opciones
		$(this).find('ul').stop(true,true).fadeIn();
	},function(){
		//ocultamos las opciones
		$(this).find('ul').stop(true,true).fadeOut();
	});
	
	//evento clic para todas las ventanas que se encuentran minimizadas
	//en realidad es una sola ventana a la que se le cambia el contenido ;)
	$('#divVentanas ul li a').click(function(eEvento){
		//bloqueamos el evento clic predeterminado de los links (no queremos ir a otra pagina)
		eEvento.preventDefault();
		
		//datos para colocar en la ventana (titulo y direccion de la pagina que vamos a mostrar)
		var strSitioWeb=$(this).attr('href'), strTitulo=$(this).attr('title');
		//asignar el titulo a la ventana
		$('#divVentanaTitulo').html(strTitulo);
		
		//la ventana esta visible?
		if(!$('#divVentana').is(':visible')){
			//la ventana no esta visible
			//creamos un iframe y lo "inyectamos" en la capa
			$('#divVentanaContenido').html('<iframe src="'+strSitioWeb+'"></iframe>');
			//bajar la opcidad de la ventana a 0 (invisible)
			$('#divVentana').css({'display':'block','opacity':0});
			//mostrar la ventana con una animacion :P
			$('#divVentana').stop(true,true).animate({
				height:400,
				width:600,
				opacity:1,
				bottom:120
			},300);
		}else{
			//la ventana esta visible
			//ocultar la ventana hacia abajo
			$('#divVentana').stop(true,true).slideUp(400,function(){
				//creamos un iframe y lo "inyectamos" en la capa
				$('#divVentanaContenido').html('<iframe src="'+strSitioWeb+'"></iframe>');
				//mostrar la ventana hacia arriba
				$(this).slideDown(500);
			});
		}
	});
	
	//evento que se produce al hacer clic en el boton cerrar de la ventana
	$('#divVentanaCerrar').click(function(){
		//animar la ventana para que desaparezca
		$('#divVentana').stop(true,true).animate({
			height:0,
			width:0,
			opacity:0,
			bottom:0
		},300,function(){
			//la ocultamos completamente
			$(this).css('display','none');
		});
	});
	
});