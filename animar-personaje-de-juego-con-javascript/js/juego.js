/* animacion basica de un personaje para juegos con JavaScript
 * autor: cali rojas
 * web: www.lewebmonster.com
 */

//namspace del juego
var JUEGO={
	//controles que vamos a utilizar para mover el personaje
	CONTROLES:{
		ARRIBA: 38,			//tecla direccional arriba
		ABAJO: 40,			//tecla direccional abajo
		DERECHA: 39,		//tecla direccional derecha
		IZQUIERDA: 37,		//tecla direccional izquierda
		CONTROL: 17			//tecla control para que el personaje corra
	},
	//propiedades del personaje
	PERSONAJE:{
		ELEMENTO: document.getElementById('divPersonaje'),	//indicamos cual es la capa que contiene el personaje
		VELOCIDAD: 5,										//velocidad al caminar (pixeles que lo moveremos)
		VELOCIDAD_RAPIDA: 8,								//velocidad al correr (pixeles que lo moveremos)
		ESTADO: {											//estados del personaje
			SALTANDO: false,								//indica si el personaje esta saltando
			AGACHADO: false									//cuando el personaje se agacha se pone en true
		}
	},
	//array para almacenar las teclas presionadas por el usuario
	MOVIMIENTOS: Array(),
	//funcion para iniciar el juego
	INICIAR:function(){
		setInterval(function(){
			//esta presionada la tecla de abajo?
			if(JUEGO.MOVIMIENTOS[JUEGO.CONTROLES.ABAJO]){
				//cambiamos el estado agachado a true
				JUEGO.PERSONAJE.ESTADO.AGACHADO=true;
				//le cambiamos la altura a la capa para simular que se agacha el personaje
				JUEGO.PERSONAJE.ELEMENTO.style.height='35px';
			}else{
				//el personaje no esta agachado
				//colocamos el estado agachado en false
				JUEGO.PERSONAJE.ESTADO.AGACHADO=false;
				//le damos la altura normal (cuando el personaje esta de pie) a la capa
				JUEGO.PERSONAJE.ELEMENTO.style.height='55px';
			}
			//esta presionada la tecla izquierda?
			if(JUEGO.MOVIMIENTOS[JUEGO.CONTROLES.IZQUIERDA]){
				//colocamos al personaje la clase clsPosicionIzquierda (imagen que ve hacia la izquierda)
				JUEGO.PERSONAJE.ELEMENTO.className='clsPosicionIzquierda';
				
				//obtenemos la posicion actual del personaje (izquierda) y
				//verificamos si debemos caminar o correr para establecer la velocidad
				var iPosicionActual=parseInt(JUEGO.PERSONAJE.ELEMENTO.offsetLeft),
				iVelocidad=(JUEGO.MOVIMIENTOS[JUEGO.CONTROLES.CONTROL])?JUEGO.PERSONAJE.VELOCIDAD_RAPIDA:JUEGO.PERSONAJE.VELOCIDAD;
				//movemos el personaje
				JUEGO.PERSONAJE.ELEMENTO.style.left=(iPosicionActual-iVelocidad)+'px';
			}
			//esta presionada la tecla derecha?
			if(JUEGO.MOVIMIENTOS[JUEGO.CONTROLES.DERECHA]){
				//asignamos al personaje la clase clsPosicionDerecha (imagen que ve hacia la derecha)
				JUEGO.PERSONAJE.ELEMENTO.className='clsPosicionDerecha';
				
				//obtenemos la posicion actual del personaje (izquierda) y
				//verificamos si debemos caminar o correr para establecer la velocidad
				var iPosicionActual=parseInt(JUEGO.PERSONAJE.ELEMENTO.offsetLeft),
				iVelocidad=(JUEGO.MOVIMIENTOS[JUEGO.CONTROLES.CONTROL])?JUEGO.PERSONAJE.VELOCIDAD_RAPIDA:JUEGO.PERSONAJE.VELOCIDAD;
				//movemos el personaje
				JUEGO.PERSONAJE.ELEMENTO.style.left=(iPosicionActual+iVelocidad)+'px';
			}
		},30)
	},
	//funcion para que el personaje salte
	SALTAR: function(){
		//si el personaje ya esta saltando entonces ignoramos la orden
		if(!JUEGO.PERSONAJE.ESTADO.SALTANDO){
			//indicamos que Mario esta saltando
			JUEGO.PERSONAJE.ESTADO.SALTANDO=true;
			//le damos la posicion predeterminada (ojo en los estilos de #divPersonaje en el CSS)
			JUEGO.PERSONAJE.ELEMENTO.style.bottom='22px';
			
			//funcion para emular un salto
			function fntAnimar(){
				//timeout para emular el salto
				setTimeout(function(){
					//si la posicion es menor que 66 (queremos moverlo hasta ahi)
					if(parseInt(JUEGO.PERSONAJE.ELEMENTO.style.bottom)<66){
						//sumamos 1px a la posicion para subirlo
						JUEGO.PERSONAJE.ELEMENTO.style.bottom=(parseInt(JUEGO.PERSONAJE.ELEMENTO.style.bottom)+1)+'px';
						//volvemos a llamar a la funcion que emula el salto
						fntAnimar();
					}else{
						//el personaje debe volver al suelo
						fntBajar();
					}
				});
				
				//funcion interna para bajar el personaje del aire
				function fntBajar(){
					//timeout para simular que el personaje viene bajando
					setTimeout(function(){
						//si la posicion es mayor que 22 (22 es la posicion en la que debe estar en el suelo)
						if(parseInt(JUEGO.PERSONAJE.ELEMENTO.style.bottom)>22){
							//restamos 1px a la posicion para bajar la capa
							JUEGO.PERSONAJE.ELEMENTO.style.bottom=(parseInt(JUEGO.PERSONAJE.ELEMENTO.style.bottom)-1)+'px';
							//volvemos a llamar a la funcion para que el personaje siga bajando
							fntBajar();
						}else{
							//el personaje ya esta en el suelo, entonces indicamos que ya no esta saltando...
							//de esta forma podemos volver a saltar (si, mientras el personaje esta en el
							//aire se ignora la tecla de salto)
							JUEGO.PERSONAJE.ESTADO.SALTANDO=false;
						}
					});
				}
			}
			//llamamos a la funcion que emula el salto de Mario
			fntAnimar();
		}
	}
};

//evento al presionar una tecla
document.addEventListener('keydown',function(e){
	//agregamos al array la tecla (si es que no esta almacenada) y la colocamos en true
	JUEGO.MOVIMIENTOS[e.which]=true;
	
	//si la tecla de arriba esta presionada entonces llamamos a la funcion que hace que
	//el personaje de un pequeno salto
	if(JUEGO.MOVIMIENTOS[JUEGO.CONTROLES.ARRIBA]) JUEGO.SALTAR();
});

//evento al soltar las teclas presionadas
document.addEventListener('keyup',function(e){
	//colocamos la letra en false (dentro del array)
	JUEGO.MOVIMIENTOS[e.which]=false;
});

//evento al cargar toda la pagina
window.addEventListener('load',function(){
	//iniciamos el juego
	JUEGO.INICIAR();
});
