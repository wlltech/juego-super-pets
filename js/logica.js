// Variables globales
let ataqueElegidoJugador = [];
let ataqueElegidoEnemigo = [];
let botonesDinamicos = [];
let botonPiedra;
let botonTijera;
let botonPapel;
let estructuraTarjetasMascotas;
let estructuraBotonesAtaques;
let resumenAtaquesJugador;
let resumenAtaquesEnemigo;
let inputCaracol;
let inputGato;
let inputPerro;
let mascotaJugador;
let mascotaJugadorObjeto;
let mascotaEnemigo;
let mascotas = [];
let victoriasJugador = 0;
let victoriasEnemigo = 0;
// Canvas
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = './images/ai-bg-city.jpg'

let jugadorId =null

let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 30;
const anchoMaximoDelMapa = 600;

if (anchoDelMapa > anchoMaximoDelMapa) {
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800;
mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos

// Variables para seleccionar elementos del DOM
const botonSeleccionarMascota = document.getElementById('boton-seleccionar-mascota');
const botonReiniciarJuego = document.getElementById('reiniciarButton');
const buttonReiniciar = document.getElementById("reiniciarButton");
const divAtaques = document.getElementById('contenedor-ataques');
const divMensajes = document.getElementById('mensaje-ataques');
const idContenedorMascotas = document.getElementById('contenedor-mascotas');
const seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const seccionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const spanataqueElegidoEnemigo = document.getElementById('ataque-enemigo');
const spanataqueElegidoJugador = document.getElementById('ataque-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanResultado = document.getElementById('resultado');
const spanVictoriasEnemigo = document.getElementById('victorias-mascota-enemigo');
const spanVictoriasJugador = document.getElementById('cictorias-mascota-jugador');
// Cavas
const seccionVerMapa = document.getElementById('ver-mapa');
const etiquetaCanvas = document.getElementById('mapa');

//Clases
class Mascota {
    constructor(nombre, imagen, victorias, fotoMapa) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.victorias = victorias;
        this.ataques = [];
        this.ancho = 60;
        this.alto = 60;
        this.x = aleatorio(0,mapa.width - this.ancho);
        this.y = aleatorio(0, mapa.height - this.alto);
        this.mapaImagen = new Image();
        this.mapaImagen.src = fotoMapa;
        this.velocidadX = 0;
        this.velocidadY = 0;
    }

    pintarMascota() {
        lienzo.drawImage(
            this.mapaImagen,
            this.x,
            this.y,
            this.ancho,
            this.alto
        );
    }
}

//Objetos de la clase Mascota
let perro = new Mascota('Perro', './images/perro.png', 0, './images/perro-head.png');
let gato = new Mascota('Gato', './images/gato.png', 0, './images/gato-head.png');
let caracol = new Mascota('Caracol', './images/caracol.png', 0, './images/caracol-head.png');

let perroEnemigo = new Mascota('Perro', './images/perro.png', 0, './images/perro-enemigo.png');
let gatoEnemigo = new Mascota('Gato', './images/gato.png', 0, './images/gato-enemigo.png');
let caracolEnemigo = new Mascota('Caracol', './images/caracol.png', 0, './images/caracol-enemigo.png');

// Objetos literales u objetos anónimos
perro.ataques.push(
    { nombre: '🥌', id: 'piedra' },
    { nombre: '🥌', id: 'piedra' },
    { nombre: '📄', id: 'papel' },
    { nombre: '📄', id: 'papel' },
    { nombre: '🔪', id: 'tijera' }
)

perroEnemigo.ataques.push(
    { nombre: '🥌', id: 'piedra' },
    { nombre: '🥌', id: 'piedra' },
    { nombre: '📄', id: 'papel' },
    { nombre: '📄', id: 'papel' },
    { nombre: '🔪', id: 'tijera' }
)

gato.ataques.push(
    { nombre: '🔪', id: 'tijera' },
    { nombre: '🔪', id: 'tijera' },
    { nombre: '📄', id: 'papel' },
    { nombre: '📄', id: 'piedra' },
    { nombre: '🔪', id: 'tijera' }
)

gatoEnemigo.ataques.push(
    { nombre: '🔪', id: 'tijera' },
    { nombre: '🔪', id: 'tijera' },
    { nombre: '📄', id: 'papel' },
    { nombre: '📄', id: 'piedra' },
    { nombre: '🔪', id: 'tijera' }
)

caracol.ataques.push(
    { nombre: '🥌', id: 'piedra' },
    { nombre: '🥌', id: 'piedra' },
    { nombre: '📄', id: 'papel' },
    { nombre: '🥌', id: 'piedra' },
    { nombre: '🔪', id: 'tijera' }
)

caracolEnemigo.ataques.push(
    { nombre: '🥌', id: 'piedra' },
    { nombre: '🥌', id: 'piedra' },
    { nombre: '📄', id: 'papel' },
    { nombre: '🥌', id: 'piedra' },
    { nombre: '🔪', id: 'tijera' }
)

//Agregar mascotas al arreglo "let mascotas = [];"
mascotas.push(perro, gato, caracol);

// Función para iniciar el Juego
function iniciarJuego() {

    botonReiniciarJuego.style.display = 'none';
    seccionSeleccionarAtaque.style.display = 'none';
    seccionVerMapa.style.display = 'none';

    // Para cada mascota en el arreglo 'mascotas', se ejecuta este bloque de código
    mascotas.forEach((mascota) => {
        estructuraTarjetasMascotas = `
        <input type="radio" name="mascota" id="${mascota.nombre}" />
            <label for="${mascota.nombre}">
                <p>${mascota.nombre}</p>
                <img src="${mascota.imagen}" alt="${mascota.nombre}" id="${mascota.nombre}">
            </label>
        `
        // Agrega la estructura de la tarjeta de mascota al elemento con id 'idContenedorMascotas'
        idContenedorMascotas.innerHTML += estructuraTarjetasMascotas;

        // Como las cards de las mascotas aún no existen, por eso se agregan en este
        // momento y no arriba, las siguiente variables para capturar el ID de las cards
        inputCaracol = document.getElementById('Caracol');
        inputGato = document.getElementById('Gato');
        inputPerro = document.getElementById('Perro');
    })

    botonSeleccionarMascota.addEventListener('click', accionAlElegirMascotaJugador);
    buttonReiniciar.addEventListener('click', reiniciarJuego);

    unirseAlJuego ();
}

// Esta función realiza una solicitud (fetch) a un servidor local en el puerto 8080 para unirse a un juego.
function unirseAlJuego() {
    fetch("http://localhost:8080/unirse") // Realiza una solicitud GET al endpoint /unirse
    .then(function (res) { // Cuando la solicitud obtiene una respuesta
        console.log(res); // Imprime la respuesta en la consola

        if (res.ok) { // Verifica si la respuesta tiene un estado 'ok' (200-299)
            res.text() // Convierte la respuesta a texto
            .then(function(respuesta) { // Cuando se obtiene el texto de la respuesta
                console.log(respuesta); // Imprime el texto de la respuesta en la consola
                jugadorId = respuesta
            });
        }
    });
}

// Funciones que se ejecutan al seleccionar la mascota
function accionAlElegirMascotaJugador() {

    seccionSeleccionarMascota.style.display = 'none';

    // Canvas -  dibujar lienzo

    if (inputPerro.checked) {
        // inputPerro.id, se está haciendo referencia al identificador único (ID) del elemento en el DOM
        spanMascotaJugador.innerHTML = inputPerro.id;
        mascotaJugador = inputPerro.id;
    } else if (inputGato.checked) {
        spanMascotaJugador.innerHTML = inputGato.id;
        mascotaJugador = inputGato.id;
    } else if (inputCaracol.checked) {
        spanMascotaJugador.innerHTML = inputCaracol.id;
        mascotaJugador = inputCaracol.id;
    } else {
        alert('Selecciona alguna mascota');
        reiniciarJuego();
    }

    seleccionarMascota(mascotaJugador)

    extraeAtaquesMascotaJugador(mascotaJugador);
    seccionVerMapa.style.display = 'flex';
    iniciarMapa();
}

// 
function seleccionarMascota(mascotaJugador){
    fetch(`http://localhost:8080/jugador${jugadorId}`, {
        method: "post",
        header: {
            "Content - Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })

    })
    
}

// Función para saber los ataques de la mascota seleccionada por el jugador
function extraeAtaquesMascotaJugador(mascotaJugador) {
    let ataquesHeredados
    for (let i = 0; i < mascotas.length; i++) {

        if (mascotaJugador === mascotas[i].nombre) {
            ataquesHeredados = mascotas[i].ataques
        }
    }
    mostrarAtaquesJugador(ataquesHeredados);
}

// Función para mostrar en pantalla los ataques de la mascota seleccionada por el jugador
function mostrarAtaquesJugador(ataquesHeredados) {

    ataquesHeredados.forEach((ataque) => {
        estructuraBotonesAtaques = `
        <button id="${ataque.id}" class="botones-ataques botones-dinamicos">${ataque.nombre}</button>
        `;
        divAtaques.innerHTML += estructuraBotonesAtaques;
    });

    botonPiedra = document.getElementById('piedra'); /* REVISAR*/
    botonPapel = document.getElementById('papel');
    botonTijera = document.getElementById('tijera');

    botonesDinamicos = document.querySelectorAll('.botones-dinamicos');

}

// Función que genera números aleatorios
function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// Función donde a partir de un número aleatorio el enemigo selecciona su mascota
function seleccionarMascotaEnemigo() {

    let seleccionAleatoria = aleatorio(0, mascotas.length - 1);
    spanMascotaEnemigo.innerHTML = mascotas[seleccionAleatoria].nombre;
    mascotaEnemigo = mascotas[seleccionAleatoria].nombre;
    accionAlElegirAtaquesJugador();

}

// Función que guarda los ataques seleccionados por el jugador y los deshabilita
// para que no puedan ser usados de nuevo
function accionAlElegirAtaquesJugador() {
    botonesDinamicos.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🥌') {
                ataqueElegidoJugador.push('Piedra');
                boton.style.background = '#112f59'
                boton.disabled = true;
            } else if (e.target.textContent === '📄') {
                ataqueElegidoJugador.push('Papel');
                console.log('jugador: ' + ataqueElegidoJugador);
                boton.style.background = '#112f59'
                boton.disabled = true;
            } else {
                ataqueElegidoJugador.push('Tijera');
                console.log('jugador: ' + ataqueElegidoJugador);
                boton.style.background = '#112f59'
                boton.disabled = true;
            }
            ataqueMascotaEnemigo(mascotaEnemigo);
        })
    })

}

function ataqueMascotaEnemigo(mascotaEnemigo) {  /* REVISAR */

    for (let i = 0; i < mascotas.length; i++) {
        if (mascotaEnemigo === mascotas[i].nombre) {
            // Recorre los ataques de la mascota enemiga y los agrega individualmente
            mascotas[i].ataques.forEach((ataque) => {
                ataqueElegidoEnemigo.push(ataque.id);
            });
        }
    }

    console.log('ataque enemigo: ' + ataqueElegidoEnemigo);
    iniciarCombate()
}

function iniciarCombate() {
    if (ataqueElegidoJugador.length > 4) {
        combate();
    }
}

function guardarAtaquesJugadores(i) {
    resumenAtaquesJugador = ataqueElegidoJugador[i];
    resumenAtaquesEnemigo = ataqueElegidoEnemigo[i];
}

function combate() {

    for (let i = 0; i < ataqueElegidoJugador.length; i++) {
        if (ataqueElegidoJugador[i] === ataqueElegidoEnemigo[i]) {
            guardarAtaquesJugadores(i);
            console.log('resultado parcial: ' + guardarAtaquesJugadores(i))
            
        } else if (ataqueElegidoJugador[i] === 'PIEDRA' && ataqueElegidoEnemigo[i] === 'TIJERA') {
            guardarAtaquesJugadores(i);
            console.log('resultado parcial: ' + guardarAtaquesJugadores(i))
            victoriasJugador++

        } else if (ataqueElegidoJugador[i] === 'PAPEL' && ataqueElegidoEnemigo[i] === 'PIEDRA') {
            guardarAtaquesJugadores(i);
            console.log('resultado parcial: ' + guardarAtaquesJugadores(i))
            victoriasJugador++

        } else if (ataqueElegidoJugador[i] === 'TIJERA' && ataqueElegidoEnemigo[i] === 'PAPEL') {
            guardarAtaquesJugadores(i);
            console.log('resultado parcial: ' + guardarAtaquesJugadores(i))
            victoriasJugador++

        } else {
            guardarAtaquesJugadores(i);
            console.log('resultado parcial: ' + guardarAtaquesJugadores(i))
            victoriasEnemigo++

        }
    }
    revisarVictorias();
}
function revisarVictorias() {
    if (victoriasEnemigo === victoriasJugador) {
        mostrarResultadoFinal("EMPATE");
    } else if (victoriasJugador > victoriasEnemigo) {
        mostrarResultadoFinal("GANASTE!!!!!!!");
    } else {
        mostrarResultadoFinal("PERDISTE");
    }
}

function mostrarMensaje(resultadoAtaque) {

    let parrafoJugador = document.createElement('p');
    let parrafoEnemigo = document.createElement('p');

    parrafoJugador.innerHTML = resumenAtaquesJugador;
    parrafoEnemigo.innerHTML = resumenAtaquesEnemigo;
    spanResultado.innerHTML = resultadoAtaque;

    spanataqueElegidoJugador.appendChild(parrafoJugador);
    spanataqueElegidoEnemigo.appendChild(parrafoEnemigo);
}

function mostrarResultadoFinal(resultadoFinal) {

    let parrafo = document.createElement('p');
    parrafo.innerHTML = resultadoFinal;
    divMensajes.appendChild(parrafo);

    botonReiniciarJuego.style.display = 'flex';
}

function reiniciarJuego() {
    location.reload();
}

function moverDerecha() {
    mascotaJugadorObjeto.velocidadX = 5;
}

function moverBajar() {
    mascotaJugadorObjeto.velocidadY = 5;
}

function moverSubir() {
    mascotaJugadorObjeto.velocidadY = -5;
}

function moverIzquierda() {
    mascotaJugadorObjeto.velocidadX = -5;
}

function pintarCanvas() {
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX;
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY;
    lienzo.clearRect(0, 0, mapa.width, mapa.height);
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMascota();
    perroEnemigo.pintarMascota();
    gatoEnemigo.pintarMascota();
    caracolEnemigo.pintarMascota();

    if (mascotaJugadorObjeto.velocidadX !== 0 || mascotaJugadorObjeto.velocidadY !== 0){
        revisarColicion(perroEnemigo);
        revisarColicion(gatoEnemigo);
        revisarColicion(caracolEnemigo);
    }
}

function detenerMovimiento() {
    mascotaJugadorObjeto.velocidadX = 0;
    mascotaJugadorObjeto.velocidadY = 0;
}


// Esta función escucha las teclas del teclado y ejecuta las funciones según corresponde para
// mover la mascota
function sePresionoUnaTecla(event) {
    switch (event.key) {
        case 'ArrowUp':
            moverSubir();
            break;
        case 'ArrowDown':
            moverBajar();
            break;
        case 'ArrowLeft':
            moverIzquierda();
            break;
        case 'ArrowRight':
            moverDerecha();
            break;
        default:
            break;
    }
}

function iniciarMapa() {

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador);

    intervalo = setInterval(pintarCanvas, 50);
    window.addEventListener('keydown', sePresionoUnaTecla);
    window.addEventListener('keyup', detenerMovimiento);
}

function obtenerObjetoMascota() {
    for (let i = 0; i < mascotas.length; i++) {
        if (mascotaJugador === mascotas[i].nombre) {
            return mascotas[i];
        }

    }
}

function revisarColicion(enemigo) {
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x

    if (
        abajoMascota < arribaEnemigo ||
        arribaMascota > abajoEnemigo ||
        derechaMascota < izquierdaEnemigo ||
        izquierdaMascota > derechaEnemigo
    ) {
        return
    }

    detenerMovimiento();
    clearInterval(intervalo);
    seccionSeleccionarAtaque.style.display = 'flex';
    seccionVerMapa.style.display = 'none';
    seleccionarMascotaEnemigo(mascotaEnemigo);
    //alert("Hay colisión con " + enemigo.nombre);
}

window.addEventListener('load', iniciarJuego);