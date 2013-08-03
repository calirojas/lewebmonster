<!DOCTYPE html>
<html>
	<head>
		<title>Ejemplo para leer un archivo de Excel con PHP - www.lewebmonster.com</title>
		<link rel="stylesheet" type="text/css" href="css/excel.css">
	</head>
	<body>
		<div id="divContenedor">
			<h1>Ejemplo para leer un archivo de Excel con PHP</h1>
			<table border="0" width="100%" cellpadding="0" cellspacing="0">
				<thead>
					<tr>
						<th>Columna 1</th>
						<th>Columna 2</th>
						<th>Columna 3</th>
						<th>Columna 4</th>
					</tr>
				</thead>
				<tbody>
				<?php
					//incluimos la clase
					require_once 'php/ext/PHPExcel-1.7.7/Classes/PHPExcel/IOFactory.php';
					
					//cargamos el archivo que deseamos leer
					$objPHPExcel = PHPExcel_IOFactory::load('xls/prueba.xls');
					//obtenemos los datos de la hoja activa (la primera)
					$objHoja=$objPHPExcel->getActiveSheet()->toArray(null,true,true,true);
					
					//recorremos las filas obtenidas
					foreach ($objHoja as $iIndice=>$objCelda) {
						//imprimimos el contenido de la celda utilizando la letra de cada columna
						echo '
							<tr>
								<td>'.$objCelda['A'].'</td>
								<td>'.$objCelda['B'].'</td>
								<td>'.$objCelda['D'].'</td>
								<td>'.$objCelda['E'].'</td>
							</tr>
						';
					}
				?>
				</tbody>
				<tfoot>
					<td colspan="4">Ejemplo por Cali Rojas - <a href="http://www.lewebmonster.com">www.lewebmonster.com</a></td>
				</tfoot>
			</table>
		</div>
	</body>
</html>