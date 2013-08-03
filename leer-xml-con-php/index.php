<!DOCTYPE html>
<html>
	<head>
		<title>Ejemplo para leer un XML con PHP - www.lewebmonster.com</title>
		<link rel="stylesheet" type="text/css" href="css/leer-xml.css">
	</head>
	<body>
		<div id="divContenedor">
			<div id="divInfo">
				<h1>Leer un XML con PHP y la extensi&oacute;n SimpleXML</h1>
				<p>Ejemplo por Cali Rojas - <a href="http://www.lewebmonster.com">www.lewebmonster.com</a></p>
			</div>
			<div id="divTabla">
				<table width="100%">
					<thead>
						<tr>
							<th>Identificaci&oacute;n</th>
							<th>Nombre</th>
							<th>Apellidos</th>
							<th>G&eacute;nero</th>
							<th>Estado</th>
						</tr>
					</thead>
					<tbody>
					<?php
						//cargamos el archivo por medio de la funcion simplexml_load_file
						if($xmlEstudiantes=@simplexml_load_file('xml/prueba-local.xml')){
							//seleccionamos todos los nodos estudiante
							$objEstudiantes=$xmlEstudiantes->estudiante;					
							//utilizamos un foreach para recorrer los elementos obtenidos
							foreach($objEstudiantes as $objEstudiante){
								//imprimimos una fila con el contenido
								//los nombres y apellidos los decodificamos con utf8_decode
								//esto es simplemente para que sea vean bien los acentos que puedan
								//contener estos dos datos
								echo '
									<tr>
										<td>'.
											$objEstudiante->identificacion.
											' <em>('.$objEstudiante->identificacion['tipo'].')</em>'.
										'</td>
										<td>'.utf8_decode($objEstudiante->nombre).'</td>
										<td>'.utf8_decode($objEstudiante->apellidos).'</td>
										<td>'.$objEstudiante->genero.'</td>
										<td>'.$objEstudiante['estado'].'</td>
									</tr>
								';
							}
							
							//liberamos el objeto de la memoria
							unset($xmlEstudiantes);
						}else{
							echo '
								<tr>
									<td colspan="5" align="center">Error al leer el archivo.</td>
								</tr>
							';
						}
					?>
					</tbody>
					<tfoot>
						<tr>
							<td colspan="5">
								Ejemplo para leer archivos XML con PHP y SimpleXML
							</td>
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	</body>
</html>