let ataqueJugador
let ataqueEnemigo

function iniciarJuego(){
    let botonSeleccionarMascota = document.getElementById('boton-seleccionar-mascota');
    botonSeleccionarMascota.addEventListener('click', seleccionarMascotaJugador);

    let botonBaba = document.getElementById('boton-baba');
    botonBaba.addEventListener('click', ataqueBaba);
    let botonOlfato = document.getElementById('boton-olfato');
    botonOlfato.addEventListener('click', ataqueOlfato);
    let botonMirada = document.getElementById('boton-mirada');
    botonMirada.addEventListener('click', ataqueMirada);
}

function seleccionarMascotaJugador(){
    let inputPerro = document.getElementById('perro');
    let inputGato = document.getElementById('gato');
    let inputCaracol = document.getElementById('caracol');
    let spanMascotaJugador = document.getElementById('mascota-jugador');

    if (inputPerro.checked){
        alert("Seleccionaste el Perro 🐕");
        spanMascotaJugador.innerHTML = 'Perro';
    } else if (inputGato.checked){
        alert("Seleccionaste el Gato 😼")
        spanMascotaJugador.innerHTML = 'Gato';
    } else if (inputCaracol.checked){
        alert("Seleccionaste el Caracol 🐌");
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

function ataqueBaba (){
    let spanAtaqueJugador = document.getElementById('ataque-jugador');
    ataqueJugador = 'BABA'
    alert("Seleccionaste el ataque baba 😝");
    spanAtaqueJugador.innerHTML = ' Baba resbaladiza';
    ataqueMascotaEnemigo()
}

function ataqueOlfato (){
    let spanAtaqueJugador = document.getElementById('ataque-jugador');
    ataqueJugador = 'OLFATO'
    alert("Seleccionaste el ataque olfato 🐽");
    spanAtaqueJugador.innerHTML = ' Olfato rastreador';
    ataqueMascotaEnemigo()
}

function ataqueMirada (){
    let spanAtaqueJugador = document.getElementById('ataque-jugador');
    ataqueJugador = 'MIRADA'
    alert("Seleccionaste el ataque mirada 👀");
    spanAtaqueJugador.innerHTML = ' Mirada hipnotizante';
    ataqueMascotaEnemigo()
}

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function ataqueMascotaEnemigo() {
    let ataqueAleatorio = aleatorio (1,3);
    let spanMascotaEnemigo = document.getElementById('ataque-enemigo');

    if (ataqueAleatorio == 1 ){
        spanMascotaEnemigo.innerHTML = 'Baba resbaladiza';
    } else if (ataqueAleatorio == 2){
        spanMascotaEnemigo.innerHTML = 'Olfato rastreador';
    } else {
        spanMascotaEnemigo.innerHTML = 'Mirada hipnotizante';
    }
}

window.addEventListener('load', iniciarJuego);