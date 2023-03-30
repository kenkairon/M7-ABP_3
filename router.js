//llama la librería de express y le asigna una constante
const express = require('express');
const bodyParser = require('body-parser');
//Asigna una variable para la express y le asigna una constante
const router = express.Router();
//const urlencodedParser = bodyParser.urlencoded({ extended: false })
const { body, validationResult } = require('express-validator')
//invocamos a la coneccion que se hace a traves de cliente
const conexion= require('./database/db');

// const{validateCreate}= require('./validators/estudiante')
//Configura la ruta principal

router.get('/', async (req, res) => {
    try {
        const results = await conexion.query('SELECT * FROM usuarios ORDER BY id ASC');
        res.render('index', { results: results.rows});
    } catch (error) {
        throw error;
    }
});
//ruta para crear registros
router.get('/create', (req, res)=> {
    res.render('create')
})
//lamamos el crud en controllers de la exportacion exports.save
const crud= require('./controllers/crud');
router.post('/create',crud.save,[
    body('nombre', 'Ingrese un nombre de usuario')
        .exists()
        .isLength({min:5}),
] ,(req, res)=> {
   //validación propia
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        console.log(req.body)
        const valores = req.body
        const validaciones = errors.array()
        res.render('create', {validaciones:validaciones, valores: valores})
    }else{
        res.render('index')
    }
})
//ruta para editar los registros
router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const results = await conexion.query('SELECT * FROM usuarios WHERE id=$1', [id]);
        console.log(id);
        res.render('edit', { est: results.rows });
    } catch (error) {
        throw error;
    }
});
router.post('/update', crud.update);

router.get('/delete/:id',async (req, res) => {
    const id = req.params.id;
    try {
        resultado = await conexion.query('DELETE FROM usuarios WHERE id = $1',[id]);
        if(resultado = true){
            req.flash('success', 'Estudiante Eliminado Correctamente')
            res.redirect('/');
        }
    }catch(error){
        throw error;
    }

});
//vamos a exportar el archivo router.js
module.exports = router