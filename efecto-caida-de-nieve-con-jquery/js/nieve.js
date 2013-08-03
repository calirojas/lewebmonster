$(function(){
//nevara sobre el documento completo
	$(document).snowfall({
		'flakeCount' : 50,	//cantidad de bolas
		'round' : true,		//las queremos redondas
		maxSize: 10,		//tamano maximo
		collection : '#divInfo'	//se acumulara nieve en esa capa
	});
});