$(function(){
	//evento al presionar una tecla
	$(document).on('keydown',function(e){
		//obtenemos el codigo de la tecla presionada (con "which")
		//y lo convertimos a la letra correspondiente con String.fromCharCode(codigo)
		
		var strCapa=String.fromCharCode(e.which);
		//mostramos la capa que corresponde a la letra (cualquiera dentro de LEWEBMONSTER)
		if(strCapa!='')$('#div'+strCapa).stop(true,true).fadeTo('slow',.6);
	});
	
	//evento al soltar la tecla
	$(document).on('keyup',function(e){
		//obtenemos el codigo de la tecla presionada (con "which")
		//y lo convertimos a la letra correspondiente con String.fromCharCode(codigo)
		
		var strCapa=String.fromCharCode(e.which);
		//ocultamos la capa que corresponde a la letra (cualquiera dentro de LEWEBMONSTER)
		if(strCapa!='') $('#div'+strCapa).stop(true,true).fadeOut();
	});
	
	//evento al presionar y/o mantener una tecla presionada
	$(document).on('keypress',function(e){
		//grabamos en una capa todas las pulsaciones de teclas del usuario
		//en el evento keypress se distinguen mayusculas y minusculas
		var $divLog=$('#divLog');
		
		//si la capa divLog no contiene un "ul" entonces lo agregamos
		if(!$divLog.find('ul').length){
			$divLog.append('<ul/>');
			//registramos la tecla
			$divLog.find('ul').append('<li>'+ String.fromCharCode(e.which)+'</li>')
		}else{
			//registramos la tecla
			$divLog.find('ul').prepend('<li>'+ String.fromCharCode(e.which)+'</li>')
		}
	});
});