$(function(){
	//efecto circular para el regalo rojo
	$('#imgRegaloRojo').circulate({
        speed: 1000,
        height: 120,
        width: -500,
        sizeAdjustment: 15,
        loop: true,
        zIndexValues: [1, 0, 0, 1]
    });
    
    //efecto circular para el regalo verde
	$('#imgRegaloVerde').circulate({
        speed: 1000,
        height: 120,
        width: 500,
        sizeAdjustment: 15,
        loop: true,
        zIndexValues: [1, 0, 0, 1]
    });
    
    //efecto circular para el regalo morado
	$('#imgRegaloMorado').circulate({
        speed: 1600,
        height: 120,
        width: 500,
        sizeAdjustment: 15,
        loop: true,
        zIndexValues: [1, 0, 0, 1]
    });
    
    //efecto circular para el regalo azul
	$('#imgRegaloAzul').circulate({
        speed: 2000,
        height: 120,
        width: -500,
        sizeAdjustment: 15,
        loop: true,
        zIndexValues: [1, 0, 0, 1]
    });
    
});