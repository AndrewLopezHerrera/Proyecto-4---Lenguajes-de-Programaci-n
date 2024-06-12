const mysql = require('mysql2');

class Ranking {
  constructor() {
    this.connection = mysql.createConnection({
      host: 'localhost',
      user: 'partidasUser',
      password: 'parchis1234',
      database: 'parchisDB'
    });

    // Conectar a la base de datos
    this.connection.connect((err) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err.stack);
        return;
      }
      console.log('Conectado a la base de datos con ID:', this.connection.threadId);
    });
  }

  // Método para mostrar el ranking de jugadores
  MostrarRanking() {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT ganador, COUNT(*) as partidas_ganadas
        FROM partidas
        GROUP BY ganador
        ORDER BY partidas_ganadas DESC;
      `;
      this.connection.query(query, (err, results) => {
        if (err) {
          console.error('Error al obtener el ranking:', err.stack);
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Método para agregar una nueva partida
  AgregarPartida(id, creador, ganador) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO partidas (id, creador, ganador) VALUES (?, ?, ?)';
      this.connection.query(query, [id, creador, ganador], (err, results) => {
        if (err) {
          console.error('Error al agregar nueva partida:', err.stack);
          return reject(err);
        }
        resolve(results);
      });
    });
  }

  // Cerrar la conexión cuando ya no sea necesaria
  cerrarConexion() {
    this.connection.end((err) => {
      if (err) {
        console.error('Error al cerrar la conexión:', err.stack);
      } else {
        console.log('Conexión cerrada correctamente.');
      }
    });
  }
}

module.exports = Ranking;
