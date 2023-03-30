//hacemos la conexion a la base de datos
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'abproindividual',
  password: '1234',
  port: 5432,
});

pool.connect((error) => {
  if (error) {
    console.error('El error de conexión es: ' + error);
    return;
  }
  console.log('¡Conectado a la Base de Datos!');
});
//Exportar la base de datos
module.exports = pool;
