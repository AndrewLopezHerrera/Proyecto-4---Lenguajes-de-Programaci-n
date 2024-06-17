const mysql = require('mysql2');

/**
 * @class Ranking
 * @brief Clase para gestionar el ranking de jugadores y partidas en una base de datos MySQL.
 * @author Mynell Myers y Andrew López
 */
class Ranking {
  /**
   * @brief Constructor de la clase Ranking.
   * Inicializa la conexión a la base de datos.
   */
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

  /**
   * @brief Método para mostrar el ranking de jugadores.
   * @return {Promise} Promesa que se resuelve con los resultados del ranking o se rechaza con un error.
   */
  MostrarRanking() {
    return new Promise((resolve, reject) => {
      const query = `
        CALL obtenerTodasPartidas()
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

  /**
   * @brief Método para agregar una nueva partida.
   * @param {string} id - ID de la partida.
   * @param {string} creador - Nombre del creador de la partida.
   * @param {string} ganador - Nombre del ganador de la partida.
   * @return {Promise} Promesa que se resuelve con los resultados de la inserción o se rechaza con un error.
   */
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

  /**
   * @brief Método para cerrar la conexión a la base de datos.
   */
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
