//cali rojas
//lewebmonster.com

$(function(){
//funcion para buscar en una tabla con jQuery
	$.fntBuscarEnTabla=function(strCadena,strIDdeTabla){
		//seleccionamos la tabla en la que vamos a buscar
		var $objTabla=$('#'+strIDdeTabla);
		//eliminamos la fila temporal que contiene una leyenda cuando
		//la busqueda no devuelve resultados
		$objTabla.find('#trFilaConMensaje').remove();
		
		//iteramos en todas las filas del body de la tabla
	    $objTabla.find('tbody tr').each(function(iIndiceFila,objFila){
	    	//obtenemos todas las celdas de la fila
	        var $objCeldas=$(objFila).find('td');
	        
	        //verificamos que la fila tenga celdas
	        if($objCeldas.length>0){
				var blnLaCadenaExiste=false;
				//recorremos todas las celdas de la fila actual
	            $objCeldas.each(function(iIndiceCelda,objCeldaFila){
	            	//limpiamos la cadena que el usuario esta buscando (de caracteres que puedan chocar con
	            	//codigo JavaScript, lo cual genera un error en runtime)
					var objRegEx=new RegExp(RegExp.escape(strCadena),'i');
					//comparamos si la cadena buscada esta en la celda
					if(objRegEx.test($(objCeldaFila).text())){
						//indicamos que hemos encontrado la cadena
						blnLaCadenaExiste=true;
						//salimos del bucle (el de las celdas o columnas)
						return false;
					}
				});
				//si la cadena fue encontrada, entonces mostramos el contenido de la fila,
				//sino, se oculta la fila por completo
				if(blnLaCadenaExiste===true)$(objFila).show();else $(objFila).hide();
			}
		});
	    
	    //si no hay resultados agregamos una fila temporal para decirle al usuario que
	    //no hemos encontrado lo que busca
		if($objTabla.find('tbody tr:visible').length==0){
			//obtenemos la cantidad de columnas para hacer un colspan
			var iColumnas=$objTabla.find('tbody tr:first-child td').length;
			//agregamos al cuerpo de la tabla la fila con el mensaje			
				$('<tr>',{
					id: 'trFilaConMensaje'
				}).append(
					//agregamos a la fila una celda con el mensaje
					$('<td>',{
						colspan: iColumnas,
						align: 'center',
						html: '<em>No hay resultados, intente otra b&uacute;squeda</em>'
					})
				).appendTo($objTabla.find('tbody'));
		}
	}
	
//extendemos RegEx y agregamos un metodo que nos permita limpiar los caracteres
//que el usuario busca en la tabla, esto es para evitar errores de sintaxis en
//tiempo de ejecucion
	RegExp.escape=function(strCadena){
		var strCaracteresEspeciales=new RegExp("[.*+?|()\\[\\]{}\\\\]", "g");
		//devolvemos la cadena limpia
		return strCadena.replace(strCaracteresEspeciales, "\\$&");
	};
	
//hacemos la busqueda en el evento search del control de busqueda
	$('#txtBuscar').on('search',function(){
		//le decimos a la funcion que busque en la tabla tblTabla el
		//valor que contiene el campo actual
		$.fntBuscarEnTabla($(this).val(),'tblTabla');
	});
});