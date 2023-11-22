// Variables globales
let ataqueJugador = [];
let ataqueEnemigo = [];
let botonesDinamicos = [];
let buttonPiedra;
let buttonTijera;
let buttonPapel;
let estructuraTarjetasMascotas;
let estructuraBotonesAtaques;
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let inputCaracol;
let inputGato;
let inputPerro;
let mascotaJugador;
let mascotas = [];
let victoriasJugador = 0;
let victoriasEnemigo = 0;
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

    ataquesMascotaJugador(mascotaJugador);
    seleccionarMascotaEnemigo();
}

function ataquesMascotaJugador(mascotaJugador) {
    let ataquesExtraidos
    for (let i = 0; i < mascotas.length; i++) {

        if (mascotaJugador === mascotas[i].nombre) {
            ataquesExtraidos = mascotas[i].ataques
        }
    }
    mostrarAtaquesJugador(ataquesExtraidos);
}

function mostrarAtaquesJugador(ataquesExtraidos) {

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
    

    secuenciaAtaques()
}

function secuenciaAtaques() {
    botonesDinamicos.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🥌') {
                ataqueJugador.push('PIEDRA');
                console.log('jugador: ' + ataqueJugador);
                boton.style.background = '#112f59'
                buttonPiedra.disabled = true;
            } else if (e.target.textContent === '📄') {
                ataqueJugador.push('PAPEL');
                console.log('jugador: ' + ataqueJugador);
                boton.style.background = '#112f59'
                buttonPiedra.disabled = true;
            } else {
                ataqueJugador.push('TIJERA');
                console.log('jugador: ' + ataqueJugador);
                boton.style.background = '#112f59'
                buttonPiedra.disabled = true;
            }
            ataqueMascotaEnemigo();
        })
    })

}

function ataqueMascotaEnemigo() {  /* ----- */
    let ataqueAleatorio = aleatorio(0, 4);
    if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
        ataqueEnemigo.push('PIEDRA');
    } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('PAPEL');
    } else {
        ataqueEnemigo.push('TIJERA');
    }
    console.log('enemigo: ' + ataqueEnemigo);
    iniciarCombate()
}

function iniciarCombate() {
    if (ataqueJugador.length > 4) {
        combate();
    }
}

function guardarAtaquesJugadores(i) {
    indexAtaqueJugador = ataqueJugador[i];
    indexAtaqueEnemigo = ataqueEnemigo[i];
}

function combate() {

    for (let i = 0; i < ataqueJugador.length; i++) {
        if (ataqueJugador[i] === ataqueEnemigo[i]) {
            guardarAtaquesJugadores(i);
            mostrarMensaje('Empate 😬')
        } else if (ataqueJugador[i] === 'PIEDRA' && ataqueEnemigo[i] === 'TIJERA') {
            guardarAtaquesJugadores(i);
            mostrarMensaje('Ganaste 🙂')
            victoriasJugador ++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[i] === 'PAPEL' && ataqueEnemigo[i] === 'PIEDRA') {
            guardarAtaquesJugadores(i);
            mostrarMensaje('Ganaste 🙂')
            victoriasJugador ++
            spanVidasJugador.innerHTML = victoriasJugador
        } else if (ataqueJugador[i] === 'TIJERA' && ataqueEnemigo[i] === 'PAPEL') {
            guardarAtaquesJugadores(i);
            mostrarMensaje('Ganaste 🙂')
            victoriasJugador ++
            spanVidasJugador.innerHTML = victoriasJugador
        } else {
            guardarAtaquesJugadores(i);
            mostrarMensaje('Perdiste 😭')
            vidasEnemigo ++
            spanVidasEnemigo.innerHTML = vidasEnemigo
        }

        revisarVictorias();
    }
}
    function revisarVictorias() {
        if (victoriasEnemigo === victoriasJugador) {
            mostrarResultadoFinal("EMPATE");
        } else if (victoriasJugador > victoriasJugador) {
            mostrarResultadoFinal("GANASTE!!!!!!!");
        } else {
            mostrarResultadoFinal("PERDISTE");
        }
    }

    function mostrarMensaje(resultadoAtaque) {

        let parrafoJugador = document.createElement('p');
        let parrafoEnemigo = document.createElement('p');

        parrafoJugador.innerHTML = indexAtaqueJugador;
        parrafoEnemigo.innerHTML = indexAtaqueEnemigo;
        spanResultado.innerHTML = resultadoAtaque;

        spanAtaqueJugador.appendChild(parrafoJugador);
        spanAtaqueEnemigo.appendChild(parrafoEnemigo);
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

    window.addEventListener('load', iniciarJuego);