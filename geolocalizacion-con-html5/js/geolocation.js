//funcion autoejecutable para obtener las coordenadas con HTML Geolocation API
//y tambien dibujar un mapa utilizando el API de Google Maps
(function(){
	//capa que va a contener el mapa (esta definida en el documento HTML)
	var divMapa=document.getElementById('divMapa');
	//capa para mostrar las coordenadas (definida tambien en el HTML)
	var divCoordenadas=document.getElementById('divCoordenadas');
	
	//verificamos si el navegador soporta Geolocation API de HTML5
	if(navigator.geolocation){
		//intentamos obtener las coordenadas del usuario
		navigator.geolocation.getCurrentPosition(function(objPosicion){
			//almacenamos en variables la longitud y latitud
			var iLongitud=objPosicion.coords.longitude, iLatitud=objPosicion.coords.latitude;
			//mostramos en pantalla (solo texto) las coordenadas obtenidas
			divCoordenadas.innerHTML='Latitud: '+iLatitud+' - Longitud: '+iLongitud;
			
			//creamos un objeto (para Google Maps) con las coordenadas obtenidas por el API de HTML5
			var objCoordenadas=new google.maps.LatLng(iLatitud,iLongitud);
			
			//opciones del mapa
			var objOpciones={
				mapTypeId:		google.maps.MapTypeId.ROADMAP,	//mapa de carretera
				zoom: 			13,								//acercamiento
				mapTypeControl:	true,							//mostrar controles para cambiar el tipo de mapa
				center: 		objCoordenadas					//centramos el mapa en las coordenadas obtenidas
			};
			
			//dibujamos el mapa de la ubicacion (en la capa divMapa)
			var objMapa=new google.maps.Map(divMapa,objOpciones);
			//agregamos un marcador al mapa con nuestra ubicacion
			var objPunto=new google.maps.Marker({
				title:		'Hola mundo... aquí estoy yooo!',	//agregamos un tooltip al punto
				position:	objCoordenadas,						//indicamos las coordenadas del punto
				map:		objMapa								//este es el mapa que anteriormente creamos
			});
		},function(objError){
			//manejamos los errores devueltos por Geolocation API
			switch(objError.code){
				//no se pudo obtener la informacion de la ubicacion
				case objError.POSITION_UNAVAILABLE:
					divMapa.innerHTML='La información de su posición no está disponible.';
				break;
				//timeout al intentar obtener las coordenadas
				case objError.TIMEOUT:
					divMapa.innerHTML='Tiempo de espera agotado.';
				break;
				//el usuario no desea mostrar la ubicacion
				case objError.PERMISSION_DENIED:
					divMapa.innerHTML='Acceso denegado.';
				break;
				//errores desconocidos
				case objError.UNKNOWN_ERROR:
					divMapa.innerHTML='Error desconocido.';
				break;
			}
		});
	}else{
		//el navegador del usuario no soporta el API de Geolocalizacion de HTML5
		divCoordenadas.innerHTML='Su navegador no soporta Geolocation API de HTML5';
	}
})();