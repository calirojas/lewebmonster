$(function(){
//clic en el boton para agregar columnas
	$('#btnAgregarColumna').on('click',function(){
		//tomamos la tabla con la que vamos a trabajar
		var $objTabla=$('#tblTabla'),
		//contamos la cantidad de columnas que tiene la tabla
		iTotalColumnasExistentes=$('#tblTabla thead tr th').length;
		
		//aumentamos en uno el valor que contiene la variable
		iTotalColumnasExistentes++;
		
		//agregamos una columna con el titulo (en thead)
		$('<th>').html(
			'<a href="" class="clsEliminar">Eliminar</a>'
		).appendTo($objTabla.find('thead tr'));
		
		//adjuntamos los td's de la columna al body de la tabla
		$('<td>').html(
			'<input type="text" size="4">'
		).appendTo($objTabla.find('tbody tr'));
		
		//cambiamos el atributo colspan del pie de la tabla y su contenido
		$objTabla.find('tfoot tr td').attr('colspan',iTotalColumnasExistentes).
		text('La tabla tiene '+iTotalColumnasExistentes+' columnas');
	});
	
//clic en el enlace para eliminar la columna
	$('.clsEliminar').live('click',function(e){
		//prevenimos el comportamiento predeterminado del enlace
		e.preventDefault();
		
		//id de la tabla con la que estamos trabajando
		var $objTabla=$('#tblTabla'),
		//obtenemos el indice de la columna que se va a eliminar (padre del link)
		iColumnaAEliminar=$(this).parents('th').prevAll().length,
		//guardamos en una variable la cantidad de filas que tiene la tabla
		iTotalColumnasExistentes=$('#tblTabla thead tr th').length;
		
		//recorremos las filas de la tabla y eliminamos los td y th que se encuenten
		//en la columna que deseamos eliminar
		$objTabla.find('tr').each(function(){
			//con 'eq' especificamos el indice o la posicion del elemento
			//es como decir: eliminar el elemento TD/TH que este en el indice 4 (por ejemplo)
			$(this).find('td:eq('+iColumnaAEliminar+'),th:eq('+iColumnaAEliminar+')').remove();
		});
		
		//disminuimos la cantidad de columnas que contiene la variable (le restamos 1)
		iTotalColumnasExistentes--;
		//preparamos el mensaje que vamos a mostrar en el pie de la tabla
		var strMensaje='La tabla tiene '+iTotalColumnasExistentes+
		((iTotalColumnasExistentes==1)?' columna':' columnas');
		//ajustamos el atributo colspan del pie de la tabla
		$objTabla.find('tfoot tr td').attr('colspan',iTotalColumnasExistentes).text(strMensaje);
	});
});