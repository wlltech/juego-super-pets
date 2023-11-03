// Variables globales
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

// Función para iniciar el Juego
function iniciarJuego() {
    let botonReiniciarJuego = document.getElementById('reiniciarButton');
    botonReiniciarJuego.style.display = 'none';

    let seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    seccionSeleccionarAtaque.style.display = 'none';

    let botonSeleccionarMascota = document.getElementById('boton-seleccionar-mascota');
    botonSeleccionarMascota.addEventListener('click', seleccionarMascotaJugador);

    let buttonBaba = document.getElementById('boton-baba');
    buttonBaba.addEventListener('click', ataqueBaba);
    let buttonOlfato = document.getElementById('boton-olfato');
    buttonOlfato.addEventListener('click', ataqueOlfato);
    let buttonMirada = document.getElementById('boton-mirada');
    buttonMirada.addEventListener('click', ataqueMirada);

    let buttonReiniciar = document.getElementById("reiniciarButton");
    buttonReiniciar.addEventListener('click', reiniciarJuego);
}

// Funciones para seleccionar mascotas
function seleccionarMascotaJugador() {
    let seccionSeleccionarMascota = document.getElementById('seleccionar-mascota');
    seccionSeleccionarMascota.style.display = 'none';

    let seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    seccionSeleccionarAtaque.style.display = 'flex';

    let inputPerro = document.getElementById('perro');
    let inputGato = document.getElementById('gato');
    let inputCaracol = document.getElementById('caracol');
    let spanMascotaJugador = document.getElementById('mascota-jugador');

    if (inputPerro.checked) {
        spanMascotaJugador.innerHTML = 'Perro';
    } else if (inputGato.checked) {
        spanMascotaJugador.innerHTML = 'Gato';
    } else if (inputCaracol.checked) {
        spanMascotaJugador.innerHTML = 'Caracol';
    } else {
        alert('Selecciona alguna mascota');
        reiniciarJuego();
    }

    seleccionarMascotaEnemigo();
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaEnemigo() {
    let seleccionAleatoria = aleatorio(1, 3);
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo');

    if (seleccionAleatoria == 1) {
        spanMascotaEnemigo.innerHTML = 'Perro';
    } else if (seleccionAleatoria == 2) {
        spanMascotaEnemigo.innerHTML = 'Gato';
    } else {
        spanMascotaEnemigo.innerHTML = 'Caracol';
    }
}

// Funciones para el ataque de las mascotas

function ataqueBaba() {
    ataqueJugador = 'Baba resbaladiza';
    ataqueMascotaEnemigo()
}

function ataqueOlfato() {
    ataqueJugador = 'Olfato rastreador';
    ataqueMascotaEnemigo()
}

function ataqueMirada() {
    ataqueJugador = 'Mirada hipnotizante';
    ataqueMascotaEnemigo()
}

function ataqueMascotaEnemigo() {
    let ataqueAleatorio = aleatorio(1, 3);

    if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'Baba resbaladiza';
    } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'Olfato rastreador';
    } else {
        ataqueEnemigo = 'Mirada hipnotizante';
    }
    combate();
}

function combate() {
    let spanVidasJugador = document.getElementById('vidas-mascota-jugador');
    let spanVidasEnemigo = document.getElementById('vidas-mascota-enemigo');


    if (ataqueJugador == ataqueEnemigo) {
        mostrarMensaje('Empate')
    } else if (ataqueJugador == 'Mirada hipnotizante' && ataqueEnemigo == 'Olfato rastreador') {
        mostrarMensaje('Ganaste')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == 'Baba resbaladiza' && ataqueEnemigo == 'Mirada hipnotizante') {
        mostrarMensaje('Ganaste')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == 'Olfato rastreador' && ataqueEnemigo == 'Baba resbaladiza') {
        mostrarMensaje("Ganaste")
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        mostrarMensaje('Perdiste')
        vidasJugador--
        spanVidasJugador.innerHTML = vidasJugador;
    }
    revisarVidas();
}

function revisarVidas() {
    if (vidasEnemigo == 0) {
        mostrarResultadoFinal("FELICIDADES!!!! 🥳");
    } else if (vidasJugador == 0) {
        mostrarResultadoFinal("😭 Inténta nuevamente");
    }
}

function mostrarMensaje(resultadoAtaque) {
    let spanAtaqueJugador = document.getElementById('ataque-jugador');
    let spanAtaqueEnemigo = document.getElementById('ataque-enemigo');
    let spanResultado = document.getElementById('resultado');

    let parrafoJugador = document.createElement('p');
    let parrafoEnemigo = document.createElement('p');

    parrafoJugador.innerHTML = ataqueJugador;
    parrafoEnemigo.innerHTML = ataqueEnemigo;
    spanResultado.innerHTML = resultadoAtaque;

    spanAtaqueJugador.appendChild(parrafoJugador);
    spanAtaqueEnemigo.appendChild(parrafoEnemigo);
}

function mostrarResultadoFinal(resultadoFinal) {
    let divMensajes = document.getElementById('mensaje-ataques');
    let parrafo = document.createElement('p');
    let buttonBaba = document.getElementById('boton-baba');
    let buttonOlfato = document.getElementById('boton-olfato');
    let buttonMirada = document.getElementById('boton-mirada');

    parrafo.innerHTML = resultadoFinal;
    divMensajes.appendChild(parrafo);

    buttonBaba.disabled = true;
    buttonOlfato.disabled = true;
    buttonMirada.disabled = true;

    let botonReiniciarJuego = document.getElementById('reiniciarButton');
    botonReiniciarJuego.style.display = 'flex';
}

function reiniciarJuego() {
    location.reload();
}

window.addEventListener('load', iniciarJuego);