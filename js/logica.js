function iniciarJuego(){
    let botonSeleccionarMascota = document.getElementById('boton-seleccionar-mascota');
    botonSeleccionarMascota.addEventListener('click', seleccionarMascotaJugador);
}

function seleccionarMascotaJugador(){
    let inputPerro = document.getElementById('perro');
    let inputGato = document.getElementById('gato');
    let inputCaracol = document.getElementById('caracol');

    if (inputPerro.checked){
        alert("Seleccionaste el Perro")
    } else if (inputGato.checked){
        alert("Seleccionaste el Gato")
    } else if (inputCaracol.checked){
        alert("Seleccionaste el Caracol")
    }
}


window.addEventListener('load', iniciarJuego);