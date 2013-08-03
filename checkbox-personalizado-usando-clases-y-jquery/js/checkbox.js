$(function(){
	//evento al hacer clic en cualquiera de los items de la lista
	$('li.clsCheckBox').on('click',function(){
		//intercambiamos la clase del elemento
		$(this).toggleClass('clsMarcado');
	});
	
	//evento clic del boton btnMarcarTodos
	$('#btnMarcarTodos').on('click',function(){
		//agregamos la clase clsMarcado solo a los elementos que no la tengan
		$('li.clsCheckBox').not('.clsMarcado').addClass('clsMarcado');
	});
	
	//evento clic del boton btnDesmarcarTodos
	$('#btnDesmarcarTodos').on('click',function(){
		//eliminamos la clase clsMarcado a todos los elementos
		$('li.clsCheckBox').removeClass('clsMarcado');
	});
	
	//evento al hacer clic en el boton btnElementosMarcados
	$('#btnElementosMarcados').on('click',function(){
		//variable para almacenar el texto de cada elemento marcado
		var strListaMarcados='';
		//obtenemos todos los elementos con la clase .csMarcado
		var $objMarcados=$('li.clsMarcado');
		//cantidad de elementos marcados
		var iCantidad=$objMarcados.length
		
		//recorremos los elementos marcados (los que tienen la clase clsMarcado)
		$($objMarcados).each(function(){
			//obtenemos el texto del elemento y lo agregamos a la variable
			strListaMarcados+='\n'+$.trim($(this).text());
		});
		
		//mostramos el mensaje
		if(iCantidad>0){
			alert('Elementos marcados: '+iCantidad+
			'\n\nLista de elementos marcados:'+strListaMarcados);
		}else{
			alert('No hay elementos marcados.')
		}
	});
	
	//evento al hacer clic en el boton btnElementosDesmarcados 
	$('#btnElementosDesmarcados').on('click',function(){
		//variable para almacenar el texto de cada elemento desmarcado
		var strListaDesmarcados='';
		//obtenemos todos los elementos .clsCheckBox que no tengan la clase clsMarcado
		var $objDesmarcados=$('li.clsCheckBox').not('.clsMarcado');
		//cantidad de elementos desmarcados
		var iCantidad=$objDesmarcados.length;
		
		//recorremos los elementos desmarcados
		$($objDesmarcados).each(function(){
			//obtenemos el texto del elemento y lo agregamos a la variable
			strListaDesmarcados+='\n'+$.trim($(this).text());
		});
		
		//mostramos el mensaje
		if(iCantidad>0){
			alert('Elementos desmarcados: '+iCantidad+
			'\n\nLista de elementos desmarcados:'+strListaDesmarcados);
		}else{
			alert('No hay elementos desmarcados.')
		}
	});
	
});
