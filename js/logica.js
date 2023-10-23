// Función para iniciar el Juego
function iniciarJuego(){
    let botonSeleccionarMascota = document.getElementById('boton-seleccionar-mascota');
    botonSeleccionarMascota.addEventListener('click', seleccionarMascotaJugador);

    let buttonBaba = document.getElementById('boton-baba');
    buttonBaba.addEventListener('click', ataqueBaba);
    let buttonOlfato = document.getElementById('boton-olfato');
    buttonOlfato.addEventListener('click', ataqueOlfato);
    let buttonMirada = document.getElementById('boton-mirada');
    buttonMirada.addEventListener('click', ataqueMirada);
}

// Funciones para seleccionar mascotas
let ataqueJugador
let ataqueEnemigo

function seleccionarMascotaJugador(){
    let inputPerro = document.getElementById('perro');
    let inputGato = document.getElementById('gato');
    let inputCaracol = document.getElementById('caracol');
    let spanMascotaJugador = document.getElementById('mascota-jugador');

    if (inputPerro.checked){
        spanMascotaJugador.innerHTML = 'Perro';
    } else if (inputGato.checked){
        spanMascotaJugador.innerHTML = 'Gato';
    } else if (inputCaracol.checked){
        spanMascotaJugador.innerHTML = 'Caracol';
    } else {
        alert('Selecciona alguna mascota');
    }

    seleccionarMascotaEnemigo();
}

function seleccionarMascotaEnemigo() {
    let seleccionAleatoria = aleatorio (1,3);
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo');

    if (seleccionAleatoria == 1 ){
        spanMascotaEnemigo.innerHTML = 'Perro';
    } else if (seleccionAleatoria == 2){
        spanMascotaEnemigo.innerHTML = 'Gato';
    } else {
        spanMascotaEnemigo.innerHTML = 'Caracol';
    }
}

// Funciones para el ataque de las mascotas
function ataqueBaba (){
    ataqueJugador = 'Baba resbaladiza 😝';
    ataqueMascotaEnemigo()
}

function ataqueOlfato (){
    ataqueJugador = 'Olfato rastreador 🐽';
    ataqueMascotaEnemigo()
}

function ataqueMirada (){
    ataqueJugador = 'Mirada hipnotizante 👀';
    ataqueMascotaEnemigo()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function ataqueMascotaEnemigo() {
    let ataqueAleatorio = aleatorio (1,3);

    if (ataqueAleatorio == 1 ){
        ataqueEnemigo = 'Baba resbaladiza 😝';
    } else if (ataqueAleatorio == 2){
        ataqueEnemigo = 'Olfato rastreador 🐽';
    } else {
        ataqueEnemigo = 'Mirada hipnotizante 👀';
    }
    mostrarMensaje();
}

function mostrarMensaje (){
    let sectionMensajes = document.getElementById('mensajes');
    let parrafo = document.createElement('p');
    parrafo.innerHTML = 'Tu mascota atacó con '+ ataqueJugador +', la mascota del enemigo atacó con ' + ataqueEnemigo;
    sectionMensajes.appendChild(parrafo);
}

window.addEventListener('load', iniciarJuego);