//invocar a librería de express
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');


//Motor de plantillas o setting
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//Esta función middleware se utiliza para analizar los datos enviados
//en una solicitud HTTP POST o PUT y extraer los datos de la carga útil del cuerpo de la solicitud.//


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({

	secret:'12645',
	resave:false,
	saveUninitialized:false

}));
app.use(flash());

// Configuración de express-flash

app.use((req, res, next) => {
    app.locals.messages = req.flash('success');
    next();
});
//es para usar en la carpeta app import
app.use('/', require('./router'));
//Escuchamos al servidor
app.listen(3000, ()=>{
	console.log('Servicio corriendo en http://localhost:3000');
});