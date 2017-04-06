var express = require('express'); //Usamos express
var bodyParser = require('body-parser'); //Usamos body parser para el post (No sé exáctamente en qué)

var app = express(); //la variable de aplicación

app.use(bodyParser.urlencoded({ extended: true })); //Esto se usa para leer las urls
app.use(bodyParser.json()); //esto se usa para pasar las peticiones post a objetos javascript

//Contenido estático
//__dirname es el directorio actual donde se ejecuta la aplicación
var dirEstatico = __dirname+ '/st' //st es donde colocamos el contenido estático
app.use(express.static(dirEstatico)); //La aplicación considera ese directorio para las peticiones
console.log("Sirviendo contenido estático de: " + dirEstatico)

// Página a devolver cuando no se pide ninguna. Index.
app.get('/'
    , function(request, response){
        var index = __dirname + '/st/html/DisenoBase.html' 
        response.sendFile(index);
    }
);

//Un ejemplo de get
app.get('/handle'
    , function (request, response) {
        //En los métodos get accedemos a los parámetros con query
        var aux = request.query.ParametroConGet;
        response.end("hola " + aux);
    }
);

//Un ejemplo de post
app.post('/GrabaNombre'
    , function (request, response) {
    //En los métodos post accedemos a los parámetros con body (hay que usar el bodyParser.json)
        var nombre = request.body.nombre;
        response.end("Dato: " + nombre);
    }
);

var port = 8000;
app.listen(port);
console.log('Listening on port ' + port);
console.log("Servidor Express escuchando en modo %s", app.settings.env);// lo que he visto es "development"
