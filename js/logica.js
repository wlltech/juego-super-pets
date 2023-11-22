// Variables globales
let ataqueJugador = [];
let ataqueEnemigo = [];
let botonesDinamicos = [];
let buttonPiedra;
let buttonTijera;
let buttonPapel;
let estructuraTarjetasMascotas;
let estructuraBotonesAtaques;
let inputCaracol;
let inputGato;
let inputPerro;
let mascotaJugador;
let mascotas = [];
let vidasJugador = 3;
let vidasEnemigo = 3;

// Variables para seleccionar elementos del DOM
const ataquesMascotaEnemigo = document.getElementById('ataque-enemigo');
const botonSeleccionarMascota = document.getElementById('boton-seleccionar-mascota');
const botonReiniciarJuego = document.getElementById('reiniciarButton');
const buttonReiniciar = document.getElementById("reiniciarButton");
const divAtaques = document.getElementById('contenedor-ataques');
const divMensajes = document.getElementById('mensaje-ataques');
const idContenedorMascotas = document.getElementById('contenedor-mascotas');
const seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const seccionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const spanAtaqueEnemigo = document.getElementById('ataque-enemigo');
const spanAtaqueJugador = document.getElementById('ataque-jugador');
const spanMascotaEnemigo = document.getElementById('mascota-enemigo');
const spanMascotaJugador = document.getElementById('mascota-jugador');
const spanResultado = document.getElementById('resultado');
const spanVidasEnemigo = document.getElementById('vidas-mascota-enemigo');
const spanVidasJugador = document.getElementById('vidas-mascota-jugador');

//Clases
class Mascota {
    constructor(nombre, imagen, vidas) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.vidas = vidas;
        this.ataques = [];
    }
}

//Objetos de la clase Mascota
let perro = new Mascota('Perro', './images/perro.png', 3);
let gato = new Mascota('Gato', './images/gato.png', 3);
let caracol = new Mascota('Caracol', './images/caracol.png', 3);

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

//Agregar mascotas al arreglo "let mascotas = [];"
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

    botonSeleccionarMascota.addEventListener('click', gestionarSeleccionMascota);
    buttonReiniciar.addEventListener('click', reiniciarJuego);
}

// Funciones muestran la selección de la Mascota
function gestionarSeleccionMascota() {

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
        <button id="${ataque.id}" class="botones-ataques botones-dinamicos">${ataque.nombre}</button>
        `;
        divAtaques.innerHTML += estructuraBotonesAtaques;
    });

    buttonPiedra = document.getElementById('piedra');
    buttonTijera = document.getElementById('tijera');
    buttonPapel = document.getElementById('papel');

    botonesDinamicos = document.querySelectorAll('.botones-dinamicos');

}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaEnemigo() {

    let seleccionAleatoria = aleatorio(0, mascotas.length - 1);

    spanMascotaEnemigo.innerHTML = mascotas[seleccionAleatoria].nombre;
    ataquesMascotaEnemigo.innerHTML = mascotas[seleccionAleatoria].ataque;

    secuenciaAtaques()
}

function secuenciaAtaques() {
    botonesDinamicos.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🥌') {
                ataqueJugador.push('PIEDRA');
                console.log('jugador: '+ataqueJugador);
                boton.style.background = '#112f59'
            } else if (e.target.textContent === '📄') {
                ataqueJugador.push('PAPEL');
                console.log('jugador: '+ataqueJugador);
                boton.style.background = '#112f59'
            } else {
                ataqueJugador.push('TIJERA');
                console.log('jugador: '+ataqueJugador);
                boton.style.background = '#112f59'
            }
            ataqueMascotaEnemigo();
        })
    })

    
}

// Funciones para el ataque de las mascotas

function ataqueMascotaEnemigo() {
    let ataqueAleatorio = aleatorio(0, ataquesMascotaEnemigo.length -1);

    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('PIEDRA');
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('PAPEL');
    } else {
        ataqueEnemigo.push('TIJERA');
    }
    console.log('enemigo: '+ataqueEnemigo);
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