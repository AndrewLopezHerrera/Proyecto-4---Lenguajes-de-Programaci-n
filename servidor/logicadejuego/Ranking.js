class Ranking{
    constructor(){

    }

    MostrarRanking(){

    }
}

module.exports = Ranking;

const mysql = require('mysql');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'nombre_de_tu_base_de_datos',
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err.stack);
    return;
  }

  console.log('Conectado como id', connection.threadId);
});

// Ejemplo de consulta
connection.query('SELECT 1 + 1 AS solution', (error, results, fields) => {
  if (error) throw error;
  console.log('La solución es:', results[0].solution);
});

// Cerrar la conexión al finalizar
connection.end((err) => {
  if (err) {
    console.error('Error al cerrar la conexión:', err.stack);
    return;
  }

  console.log('Conexión cerrada');
});
