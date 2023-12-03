// Importación del módulo Express, que ayuda a crear aplicaciones web en Node.js
// Para instalar express en la terminal escribir npm install express
// Express es un framework para Node.js que simplifica la creación de aplicaciones web. 
// Creación de una aplicación Express
const express = require("express");

const cors = require("cors")

// Al llamar a la función express(), se inicializa y se guarda una instancia de la aplicación en la variable app
const app = express();

app.use(cors())
app.use(express.json())

const jugadores = []

class Jugador {
    constructor(id){
        this.id = id
    }

    asignarMascota(mascota) {
        this.mascota = mascota
    }
}

class Mascota {
    constructor(nombre) {
        this.nombre = nombre
    }
}

// Manejo de una solicitud GET en la ruta raíz "/"
app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    res.setHeader("Access-Control-Allow-Origin", "*")

    jugadores.push(jugador)
    // Esta función se ejecuta cuando se recibe una solicitud GET en la ruta "/"

    // 'req' (request) representa la solicitud que llega al servidor.
    // 'res' (response) representa la respuesta que se enviará de vuelta al cliente.
    
    // La función definida aquí es el manejador para la solicitud GET en la ruta "/".
    // Cuando alguien accede al servidor con una solicitud GET en la ruta raíz "/",
    // esta función se ejecuta para manejar esa solicitud.

    // Dentro del manejador, se utiliza 'res.send()' para enviar una respuesta al cliente.
    res.send(id);
});

app.post("/mascota/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.mascota || ""
    const mascota = new Mascota(nombre)
    
    const jugadorIndex = jugadores.findIndex ((jugador) => jugadorId === jugador.id)

if (jugadorIndex >= 0 ){
    jugadores [jugadorIndex].asignarMascota(mascota)
}

    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})


// La aplicación escucha peticiones en el puerto 8080
app.listen(8080, () => {
    // Esta función se ejecuta cuando el servidor comienza a escuchar en el puerto 8080
    console.log("Servidor funcionando"); 
});


// para apagar el servidor en la terminal, oprimir en MAC "ctrl c"

// Claro, la librería cors en Node.js es como un guardián que ayuda a los servidores web 
// a compartir información con otros sitios de manera segura. Cuando un sitio web 
// (como www.ejemplo.com) quiere obtener datos de otro servidor (como api.otroservidor.com), 
// a veces los navegadores bloquean esa acción por seguridad. cors ayuda a decirle al 
// navegador que está bien permitir esta comunicación entre sitios web diferentes. 
// Es como un permiso especial que se agrega al servidor para que pueda compartir datos 
// de manera segura con otros sitios, lo que resulta útil cuando estás construyendo 
// aplicaciones web que necesitan recibir o enviar información desde o hacia otros 
// lugares en internet.v