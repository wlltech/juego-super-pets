// Variables globales
let mascotas = [];
let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;
let estructuraTarjetasMascotas
let inputCaracol
let inputGato
let inputPerro
let spanMascotaEnemigo
let spanMascotaJugador

// Variables para seleccionar elementos del DOM
let spanAtaqueEnemigo = document.getElementById('ataque-enemigo');
let spanAtaqueJugador = document.getElementById('ataque-jugador');
let buttonBaba = document.getElementById('boton-baba');
let buttonMirada = document.getElementById('boton-mirada');
let buttonOlfato = document.getElementById('boton-olfato');
let botonSeleccionarMascota = document.getElementById('boton-seleccionar-mascota');
let divMensajes = document.getElementById('mensaje-ataques');
let botonReiniciarJuego = document.getElementById('reiniciarButton');
let spanResultado = document.getElementById('resultado');
let buttonReiniciar = document.getElementById("reiniciarButton");
let seccionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
let seccionSeleccionarMascota = document.getElementById('seleccionar-mascota');
let spanVidasJugador = document.getElementById('vidas-mascota-jugador');
let spanVidasEnemigo = document.getElementById('vidas-mascota-enemigo');
const idContenedorMascotas = document.getElementById('contenedor-mascotas');

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
    { nombre: '😝', id: 'boton-baba' },
    { nombre: '😝', id: 'boton-baba' },
    { nombre: '🐽', id: 'boton-olfato' },
    { nombre: '🐽', id: 'boton-olfato' },
    { nombre: '👀', id: 'boton-mirada' }
)

perro.ataques.push(
    { nombre: '👀', id: 'boton-mirada' },
    { nombre: '👀', id: 'boton-mirada' },
    { nombre: '🐽', id: 'boton-olfato' },
    { nombre: '🐽', id: 'boton-olfato' },
    { nombre: '👀', id: 'boton-mirada' }
)

perro.ataques.push(
    { nombre: '😝', id: 'boton-baba' },
    { nombre: '😝', id: 'boton-baba' },
    { nombre: '🐽', id: 'boton-olfato' },
    { nombre: '😝', id: 'boton-baba' },
    { nombre: '👀', id: 'boton-mirada' }
)

//Agregar mascotas al arreglo  let mascotas = [];
mascotas.push(perro, gato, caracol);

// Función para iniciar el Juego
function iniciarJuego() {

    botonReiniciarJuego.style.display = 'none';
    seccionSeleccionarAtaque.style.display = 'none';

    // Ciclo que recorre el arreglo mascotas y para cada elemento
    // genera la estructura HTML de la card de la mascota y la
    // inyecta en el div con el id="estructuraTarjetasMascotas"
    mascotas.forEach((mascota) => {
        estructuraTarjetasMascotas = `
        <input type="radio" name="mascota" id="${mascota.nombre}" />
            <label for="${mascota.nombre}">
                <p>${mascota.nombre}</p>
                <img src="${mascota.imagen}" alt="${mascota.nombre}" id="${mascota.nombre}">
            </label>
        `
        idContenedorMascotas.innerHTML += estructuraTarjetasMascotas;
        inputCaracol = document.getElementById('Caracol');
        inputGato = document.getElementById('Gato');
        inputPerro = document.getElementById('Perro');
        spanMascotaJugador = document.getElementById('mascota-jugador');
        spanMascotaEnemigo = document.getElementById('mascota-enemigo');
    })

    botonSeleccionarMascota.addEventListener('click', seleccionarMascotaJugador);
    buttonBaba.addEventListener('click', ataqueBaba);
    buttonOlfato.addEventListener('click', ataqueOlfato);
    buttonMirada.addEventListener('click', ataqueMirada);
    buttonReiniciar.addEventListener('click', reiniciarJuego);
}

// Funciones para seleccionar mascotas
function seleccionarMascotaJugador() {

    seccionSeleccionarMascota.style.display = 'none';
    seccionSeleccionarAtaque.style.display = 'flex';

    // Insertar imagen de mascota
    let imagenPerro = document.createElement('img');
    let imagenGato = document.createElement('img');
    let imagenCaracol = document.createElement('img');

    imagenPerro.src = '../images/perro.png';
    imagenGato.src = '../images/gato.png';
    imagenCaracol.src = '../images/caracol.png';

    if (inputPerro.checked) {
        spanMascotaJugador.appendChild(imagenPerro);
        //spanMascotaJugador.innerHTML = inputPerro.id;
    } else if (inputGato.checked) {
        spanMascotaJugador.appendChild(imagenGato);
        //spanMascotaJugador.innerHTML = inputGato.id;
    } else if (inputCaracol.checked) {
        spanMascotaJugador.appendChild(imagenCaracol);
        //spanMascotaJugador.innerHTML = inputCaracol.id;
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
    let seleccionAleatoria = aleatorio(0, mascotas.length);

    spanMascotaEnemigo.innerHTML = mascotas[seleccionAleatoria].nombre;


    // Insertar imagen de mascota
    //let imagenPerro = document.createElement('img');
    //let imagenGato = document.createElement('img');
    //let imagenCaracol = document.createElement('img');

    //imagenPerro.src = '../images/perro.png';
   // imagenGato.src = '../images/gato.png';
    //imagenCaracol.src = '../images/caracol.png';

   // if (seleccionAleatoria == 1) {
     //   spanMascotaEnemigo.appendChild(imagenPerro);
        // spanMascotaEnemigo.innerHTML = 'Perro';
   // } else if (seleccionAleatoria == 2) {
       // spanMascotaEnemigo.appendChild(imagenGato);
        // spanMascotaEnemigo.innerHTML = 'Gato';
   // } else {
     //   spanMascotaEnemigo.appendChild(imagenCaracol);
        // spanMascotaEnemigo.innerHTML = 'Caracol';
   // }
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

    if (ataqueJugador == ataqueEnemigo) {
        mostrarMensaje('Empate 😬')
    } else if (ataqueJugador == 'Mirada hipnotizante' && ataqueEnemigo == 'Olfato rastreador') {
        mostrarMensaje('Ganaste 🥳')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == 'Baba resbaladiza' && ataqueEnemigo == 'Mirada hipnotizante') {
        mostrarMensaje('Ganaste 🥳')
        vidasEnemigo--
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if (ataqueJugador == 'Olfato rastreador' && ataqueEnemigo == 'Baba resbaladiza') {
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

    buttonBaba.disabled = true;
    buttonOlfato.disabled = true;
    buttonMirada.disabled = true;

    botonReiniciarJuego.style.display = 'flex';
}

function reiniciarJuego() {
    location.reload();
}

window.addEventListener('load', iniciarJuego);