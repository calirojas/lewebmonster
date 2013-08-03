//detectamos el evento beforeunload de la ventana, el cual nos permite
//mostrar la confirmacion de salida
window.onbeforeunload=function(){
	//verificamos si el checkbox esta marcado
	if(document.getElementById('chkConfirmarSalida').checked){
		//mostramos un mensaje al usuario avisandole
		return 'Aquí podemos poner cualquier mensaje :)';
	}
};

//clic en el boton salir (solo por cuestiones de prueba, no es necesario)
document.getElementById('btnSalir').onclick=function(){
	//redireccionamos a otra pagina
	window.location='http://www.lewebmonster.com/';
};