$(function(){
//detectamos el scroll de la ventana
	$(window).on('scroll',function(){
		//cuando el usuario hace scroll en la ventana movemos la capa flotante
		//lo hacemos con una pequena animacion
		$('#divFlotante').stop().animate({
			//tomamos la posicion actual del scroll vertical de la ventana
			//con scrollTop y le sumamos 80 pixeles
			marginTop: ($(window).scrollTop()+80)+'px'
		},'slow');
	});	
});