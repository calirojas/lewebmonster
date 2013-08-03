<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>Recorrer y validar los campos de un formulario HTML con JavaScript - calirojas.com</title>
	<link type="text/css" rel="stylesheet" href="css/estilos.css">
</head>
<body>
	<form name="frmNotas" action="" method="post" onsubmit="return fntValidar();">
		<table align="center" border="0">
			<caption>Formulario de estudiantes</caption>
			<thead>
				<tr>
					<th>#</th>
					<th>Nombre del estudiante</th>
					<th>Nota</th>
				</tr>
			</thead>
			<tbody>
			<?php
				for($iCont=1;$iCont<=15;$iCont++){
					echo '
						<tr>
							<td align="center">'.$iCont.'</td>
							<td><input type="text" name="txtNombre'.$iCont.'" size="40"></td>
							<td><input type="text" name="txtNota'.$iCont.'" size="4"></td>
						</tr>
					';
				}
			?>
			</tbody>
			<tfoot>
				<tr>
					<td colspan="3" align="right">
						<input type="reset" value="Limpiar los campos">
						<input type="submit" value="Guardar">
					</td>
				</tr>
			</tfoot>
		</table>
	</form>
	<div id="divCali">
		<a href="http://calirojas.com">
			<img src="img/calirojas.jpg" border="0">
		</a>
	</div>
	<script type="text/javascript" src="js/validar.js"></script>
</body>
</html>