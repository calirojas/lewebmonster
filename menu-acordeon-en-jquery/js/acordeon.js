$(document).ready(function(){
	/*expandir todos los bloques con la clase clsActivo y agregar la clase clsArriba a los
	titulos de cada uno de esos bloques*/
	$('.clsActivo').stop(true,true).slideToggle().parent().find('.clsSeccion').addClass('clsArriba');
	/*buscamos el ultimo li, del ultimo ul y le agregamos la clase clsUltimo para redondear el
	borde inferior*/
	$('.clsContenedor').last('ul').find('li:last-child').addClass('clsUltimo');
	/*agregamos la clase clsAbajo a todos los elementos del acordeon, que inicialmente
	se muestren cerrados (sin la clase clsActivo)*/
	$(".clsContenedor .clsSeccion ").not('[class$="clsArriba"]').addClass('clsAbajo');
			
	/*evento que se dispara al hacer clic en cualquiera de los contenedores del acordeon*/
	$('.clsContenedor').click(function(){
		/*mostramos u ocultamos la lista (ul) utilizando slideToggle*/
		$(this).find('ul').stop(true,true).slideToggle('fast',function(){
			//verificar la clase que tiene el titulo del contenedor
			if($(this).parent().find('.clsSeccion').hasClass('clsAbajo')){
				//eliminamos la clase clsAbajo y agregamos la clase clsArriba (para los iconos)
				$(this).parent().find('.clsSeccion').removeClass('clsAbajo').addClass('clsArriba');
			}else{
				//eliminamos la clase clsArriba y agregamos la clase clsAbajo (para los iconos)
				$(this).parent().find('.clsSeccion').removeClass('clsArriba').addClass('clsAbajo');
			}
		});
	});
});