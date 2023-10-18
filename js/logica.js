function iniciarJuego(){
    let botonSeleccionarMascota = document.getElementById('boton-seleccionar-mascota');
    botonSeleccionarMascota.addEventListener('click', seleccionarMascotaJugador);
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
}


window.addEventListener('load', iniciarJuego);