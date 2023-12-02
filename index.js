// Importación del módulo Express, que ayuda a crear aplicaciones web en Node.js
// Para instalar express en la terminal escribir npm install express
// Express es un framework para Node.js que simplifica la creación de aplicaciones web. 
const express = require("express");

// Creación de una aplicación Express
// Al llamar a la función express(), se inicializa y se guarda una instancia de la aplicación en la variable app
const app = express();

// Manejo de una solicitud GET en la ruta raíz "/"
app.get("/", (req, res) => {
    // Esta función se ejecuta cuando se recibe una solicitud GET en la ruta "/"

    // 'req' (request) representa la solicitud que llega al servidor.
    // 'res' (response) representa la respuesta que se enviará de vuelta al cliente.
    
    // La función definida aquí es el manejador para la solicitud GET en la ruta "/".
    // Cuando alguien accede al servidor con una solicitud GET en la ruta raíz "/",
    // esta función se ejecuta para manejar esa solicitud.

    // Dentro del manejador, se utiliza 'res.send()' para enviar una respuesta al cliente.
    res.send("Hola");
});


// La aplicación escucha peticiones en el puerto 8080
app.listen(8080, () => {
    // Esta función se ejecuta cuando el servidor comienza a escuchar en el puerto 8080
    console.log("Servidor funcionando"); 
});


// para apagar el servidor en la terminal, oprimir en MAC "ctrl c"