//funcion que es llamada en el evento submit del formulario
function fntValidar(){
	//obtener el formulario para utilizarlo en la validacion
	var frmFormulario=document.forms['frmNotas'];
	//contar la cantidad de elementos que contiene el formulario
	var iElementos=frmFormulario.elements.length;
			
	//recorrer todos los elementos del formulario
	for(var iCont=0;iCont<iElementos;iCont++){
		//obtener el elemento actual para utilizarlo
		var objElemento=frmFormulario.elements[iCont];
				
		//validar unicamente los elementos del tipo "text" (campos de texto)
		if(objElemento.type=='text'){
			/*estamos utilizando la funcion trim (funcion no propia de JavaScript)
			para eliminar los espacios en blanco al inicio y final de una cadena*/
			if(trim(objElemento.value)==''){
				//mostramos un mensaje al usuario
				alert('Por favor, complete todos los campos del formulario.');
				//enfocamos el campo que exta vacio
				objElemento.focus();
				//borramos el contenido del campo (podria contener espacios en blanco)
				objElemento.value='';
				//devolvemos false para que el formulario no sea procesado
				return false;
			}
		}
	}
			
	//llegamos hasta aqui solo en caso de que todos los campos no esten vacios
	//le preguntamos al usuario si desea almacenar los datos
	if(!confirm('¿Desea almacenar los datos actuales?')){
		//el usuario indica que no desea almacenar los datos
		//entonces devolvemos false para que el formulario no sea procesado
		return false;
	}
}
		
//funcion para eliminar los espacios al inicio y final de cualquier cadena
//en otros lenguajes se conoce como "trim", JavaScript no cuenta con ella
function trim(strTexto){
	//eliminamos los espacios iniciales y finales, con expresiones regulares
	return strTexto.replace(/^\s+/g,'').replace(/\s+$/g,'');
}