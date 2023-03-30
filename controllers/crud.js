const conexion= require('../database/db');

exports.save = (req,res)=>{

    const nombre= req.body.nombre;

    conexion.query('INSERT INTO usuarios (nombre) VALUES ($1)', [nombre], (error, results) => {
        if (error) {
            console.log(error);
        } else {
            req.flash('success', 'Usuario Agregado Correctamente')
            res.redirect('/');
        }
    })
}
exports.update = (req, res) => {
    const id = req.body.id;
    const nombre= req.body.nombre;


    conexion.query('UPDATE usuarios SET nombre=$1 WHERE id=$2', [nombre, id], (error, result) => {
        if (error) {
            console.log(error);
        } else {
        req.flash('success', 'Usuario Editado Correctamente')
        res.redirect('/');
        }
    })
}
