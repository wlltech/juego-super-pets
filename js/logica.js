// Variables globales
let mascotas = [];
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
let estructuraTarjetasMascotas;
let estructuraBotonesAtaques;
let inputCaracol;
let inputGato;
let inputPerro;
let mascotaJugador;
let buttonPiedra;
let buttonTijera;
let buttonPapel;


// Variables para seleccionar elementos del DOM
let spanAtaqueEnemigo = document.getElementById('ataque-enemigo');
let spanAtaqueJugador = document.getElementById('ataque-jugador');
let botonSeleccionarMascota = document.getElementById('boton-seleccionar-mascota');
let divMensajes = document.getElementById('mensaje-ataques');
let botonReiniciarJuego = document.getElementById('reiniciarButton');
let spanResultado = document.getElementById('resultado');
let buttonReiniciar = document.getElementById("reiniciarButton");
let seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
let seccionSeleccionarMascota = document.getElementById('seleccionar-mascota');
let spanVidasJugador = document.getElementById('vidas-mascota-jugador');
let spanVidasEnemigo = document.getElementById('vidas-mascota-enemigo');
let spanMascotaJugador = document.getElementById('mascota-jugador');
let spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const idContenedorMascotas = document.getElementById('contenedor-mascotas');
const divAtaques = document.getElementById('contenedor-ataques');

//Clases
class Mascotas {
    constructor(nombre, imagen, vidas) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.vidas = vidas;
        this.ataques = [];
    }
}

//Objetos
let perro = new Mascotas('Perro', './images/perro.png', 3);
let gato = new Mascotas('Gato', './images/gato.png', 3);
let caracol = new Mascotas('Caracol', './images/caracol.png', 3);

// Objetos literales u objetos anónimos
perro.ataques.push(
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

caracol.ataques.push(
    { nombre: '🥌', id: 'piedra' },
    { nombre: '🥌', id: 'piedra' },
    { nombre: '📄', id: 'papel' },
    { nombre: '🥌', id: 'piedra' },
    { nombre: '🔪', id: 'tijera' }
)

//Agregar mascotas al arreglo  let mascotas = [];
mascotas.push(perro, gato, caracol);

// Función para iniciar el Juego
function iniciarJuego() {

    botonReiniciarJuego.style.display = 'none';
    seccionSeleccionarAtaque.style.display = 'none';

    mascotas.forEach((mascota) => {
        // Para cada mascota en el arreglo 'mascotas', se ejecuta este bloque de código

        estructuraTarjetasMascotas = `
        <input type="radio" name="mascota" id="${mascota.nombre}" />
            <label for="${mascota.nombre}">
                <p>${mascota.nombre}</p>
                <img src="${mascota.imagen}" alt="${mascota.nombre}" id="${mascota.nombre}">
            </label>
        `
        // Agrega la estructura de la tarjeta de mascota al elemento con id 'idContenedorMascotas'
        idContenedorMascotas.innerHTML += estructuraTarjetasMascotas;

        inputCaracol = document.getElementById('Caracol');
        inputGato = document.getElementById('Gato');
        inputPerro = document.getElementById('Perro');
    })

    botonSeleccionarMascota.addEventListener('click', seleccionarMascotaJugador);
    buttonReiniciar.addEventListener('click', reiniciarJuego);
}

// Funciones para seleccionar mascotas
function seleccionarMascotaJugador() {

    seccionSeleccionarMascota.style.display = 'none';
    seccionSeleccionarAtaque.style.display = 'flex';

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

    extraerAtaques(mascotaJugador);
    seleccionarMascotaEnemigo();
}

function extraerAtaques(mascotaJugador) {
    let ataquesExtraidos
    for (let i = 0; i < mascotas.length; i++) {

        if (mascotaJugador === mascotas[i].nombre) {
            ataquesExtraidos = mascotas[i].ataques
        }
    }
    mostrarAtaques(ataquesExtraidos);
}

function mostrarAtaques(ataquesExtraidos) {

    ataquesExtraidos.forEach((ataque) => {
        estructuraBotonesAtaques = `
        <button id="${ataque.id}" class="botones-ataques">${ataque.nombre}</button>
        `;
        divAtaques.innerHTML += estructuraBotonesAtaques;
    });

    buttonPiedra = document.getElementById('piedra');
    buttonTijera = document.getElementById('tijera');
    buttonPapel = document.getElementById('papel');

    buttonPiedra.addEventListener('click', ataquePiedra);
    buttonPapel.addEventListener('click', ataquePapel);
    buttonTijera.addEventListener('click', ataqueTijera);
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaEnemigo() {

    let seleccionAleatoria = aleatorio(0, mascotas.length - 1);
    console.log('mascota enemigo: ' + seleccionAleatoria)
    spanMascotaEnemigo.innerHTML = mascotas[seleccionAleatoria].nombre;
}

// Funciones para el ataque de las mascotas
function ataquePiedra() {
    ataqueJugador = 'Piedra';
    ataqueMascotaEnemigo()
}

function ataquePapel() {
    ataqueJugador = 'Papel';
    ataqueMascotaEnemigo()
}

function ataqueTijera() {
    ataqueJugador = 'Tijera';
    ataqueMascotaEnemigo()
}

function ataqueMascotaEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'Piedra';
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'Papel';
    } else {
        ataqueEnemigo = 'Tijera';
    }
    combate();
}

function combate() {

    if (ataqueJugador == ataqueEnemigo) {
        mostrarMensaje('Empate 😬')
    } else if (ataqueJugador == 'Tijera' && ataqueEnemigo == 'Papel') {
        mostrarMensaje('Ganaste 🥳')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == 'Piedra' && ataqueEnemigo == 'Tijera') {
        mostrarMensaje('Ganaste 🥳')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == 'Papel' && ataqueEnemigo == 'Piedra') {
        mostrarMensaje("Ganaste 🥳")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        mostrarMensaje('Perdiste 😭')
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador;
    }
    revisarVidas();
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        mostrarResultadoFinal("FELICIDADES!!!!");
    } else if (vidasJugador == 0) {
        mostrarResultadoFinal("Inténta nuevamente");
    }
}

function mostrarMensaje(resultadoAtaque) {

    let parrafoJugador = document.createElement('p');
    let parrafoEnemigo = document.createElement('p');

    parrafoJugador.innerHTML = ataqueJugador;
    parrafoEnemigo.innerHTML = ataqueEnemigo;
    spanResultado.innerHTML = resultadoAtaque;

    spanAtaqueJugador.appendChild(parrafoJugador);
    spanAtaqueEnemigo.appendChild(parrafoEnemigo);
}

function mostrarResultadoFinal(resultadoFinal) {

    let parrafo = document.createElement('p');
    parrafo.innerHTML = resultadoFinal;
    divMensajes.appendChild(parrafo);

    buttonPiedra.disabled = true;
    buttonPapel.disabled = true;
    buttonTijera.disabled = true;

    botonReiniciarJuego.style.display = 'flex';
}

function reiniciarJuego() {
    location.reload();
}

window.addEventListener('load', iniciarJuego);