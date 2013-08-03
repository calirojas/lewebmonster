//ejemplo de agenda telefonica con localStoage
//autor: cali rojas
//blog: www.lewebmonster.com

$(function(){
	//verificamos si el navegador soporta localStorage
	if(!localStorage){
		setTimeout(function(){
			alert('Lo siento, pero su navegador no soporta localStorage.'+
			'No podrá utilizar la agenda :(');
		});
	}
	
	$.mostrarListaDeContactos=function(){
		//guardamos en una variable la cantidad de contactos y el cuerpo de la
		//tabla en la que mostraremos la lista (agregando filas con jQuery)
		var iTotalContactos=localStorage.length,
		$objCuerpoTablaContactos=$('#tblTablaContactos').find('tbody');
		
		//vaciamos el cuerpo de la tabla
		$objCuerpoTablaContactos.empty();
		
		//hay contactos almacenados?
		if(iTotalContactos>0){
			//recorremos la lista de contactos (los items almacenados en localStorage)
			for(var iContacto=0; iContacto<iTotalContactos; iContacto++){
				//guardamos en variables el telefono y nombre recuperados del localStorage
				var strTelefono=localStorage.key(iContacto),
				strNombre=localStorage.getItem(localStorage.key(iContacto));
				
				//agregamos una nueva fila con los datos del contacto
				$objCuerpoTablaContactos.append(
					$('<tr>').append(
						$('<td>',{ //fila con el nombre del contacto
							text	: strNombre,
							align	: 'left'
						}),
						$('<td>',{ //fila con el numero de telefono
							text	: strTelefono,
							align	: 'left'
						}),
						$('<td>',{ //fila para el boton de eliminar
							align	: 'center',
							width	: 60
						}).append(
							//agregamos a la fila el boton
							$('<input>',{
								type	: 'button',
								class	: 'clsEliminarContacto',
								value	: 'Eliminar',
							}).data('contactoAEliminar',strTelefono) //por medio del metodo
							//data almacenamos en el boton el numero que debemos eliminar
							//(esto no sera visible, es un truquillo interesante)
						)
					)
				);
			}
		//no hay contactos almacenados
		}else{
			//agregamos una fila con un mensaje indicando que no hay contactos
			$objCuerpoTablaContactos.append(
				$('<tr>').append(
					$('<td>',{
						text	: 'No se han agregado contactos',
						colspan	: 3,
						align	: 'center'
					})
				)
			);
		}
	};
	
	//funcion para limpiar los campos del formulario
	$.limpiarCamposDelFormulario=function(){
		//vaciamos el contenido de los campos de texto
		$('#txtNombre,#txtTelefono').val('');
		//enfocamos el campo para digitar el nombre
		$('#txtNombre').focus();
	};
	
	//evento submit del formulario
	$('#frmAgregarContacto').on('submit',function(eEvento){
		//evitamos que el form se envie (para que no recargue la pagina)
		eEvento.preventDefault();
		
		//obtenemos una "copia" de los campos de texto
		var $txtTelefono=$('#txtTelefono'),$txtNombre=$('#txtNombre');
		
		//verificamos que los datos no esten vacios
		//con $.trim() eliminamos los espacios al final y al inicio de las cadenas
		if($.trim($txtNombre.val())!='' && $.trim($txtTelefono.val())){
			//creamos dos variables con el nombre y telefono que vamos a guardar
			var strNombre=$.trim($txtNombre.val()),
			strTelefono=$.trim($txtTelefono.val());
			
			//preguntamos si el numero de telefono ya existe
			if(localStorage.getItem(strTelefono)){
				//el numero existe... desea actualizar?
				if(confirm('El número de teléfono ya existe ¿Desea actualizarlo?')){
					//actualizamos
					localStorage.setItem(strTelefono,strNombre);
					//cargamos en el cuerpo de la tabla la lista de contactos
					$.mostrarListaDeContactos();
					//limpiamos el formulario
					$.limpiarCamposDelFormulario();
				}
			//el numero no existe
			}else{
				//agregamos el contacto al localStorage
				localStorage.setItem(strTelefono,strNombre);
				//cargamos en el cuerpo de la tabla la lista de contactos
				$.mostrarListaDeContactos();
				//limpiamos el formulario
				$.limpiarCamposDelFormulario();
			}
		}else{	//en caso de que algun campo este vacio
			//verificamos si el nombre esta vacio
			if($.trim($txtNombre.val())==''){
				//mostramos un mensaje
				alert('Por favor, digite el nombre del contacto.');
				//enfocamos el campo para el nombre
				$txtNombre.val('').focus();
			//verificamos si el telefono esta vacio
			}else{
				//mostramos un mensaje
				alert('Por favor, digite el número del contacto.');
				//enfocamos el campo para el telefono
				$txtTelefono.val('').focus();
			}
		}
	});
	
	//clic en el boton para eliminar un contacto
	//se usa live en vez de on, porque el boton se creo en tiempo de ejecucion
	$('.clsEliminarContacto').live('click',function(){
		//obtenemos el contacto que se va a eliminar (recordar que esta almacenado en data)
		var strTelefonoAEliminar=$(this).data('contactoAEliminar');
		
		if(confirm('¿Desea eliminar el contacto seleccionado?')){
			//eliminamos el contacto usando la clave que esta asociada al nombre
			//recordemos que el item se guardo usando como clave el telefono
			localStorage.removeItem(strTelefonoAEliminar);
			//cargamos en el cuerpo de la tabla la lista de contactos
			$.mostrarListaDeContactos();
		}
	});
	
	//cuando la pagina carga mostramos la lista de contactos
	//ojo: esto se hace al inicio...
	$.mostrarListaDeContactos();
});