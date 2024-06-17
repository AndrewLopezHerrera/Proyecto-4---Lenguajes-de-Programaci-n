CREATE DATABASE parchisDB;

USE parchisDB;

CREATE TABLE partidas (
  id VARCHAR(36) PRIMARY KEY,
  creador VARCHAR(255) NOT NULL,
  ganador VARCHAR(255)
);

DELIMITER //

CREATE PROCEDURE ObtenerGanadoresConMasVictorias()
BEGIN
    SET @ranking = 0;

    SELECT 
        @ranking := @ranking + 1 AS indice,
        ganador,
        victorias
    FROM (
        SELECT 
            ganador, 
            COUNT(*) AS victorias
        FROM partidas
        WHERE ganador IS NOT NULL
        GROUP BY ganador
        ORDER BY victorias DESC
    ) AS subquery;
END //

DELIMITER ;

DELIMITER //
CREATE PROCEDURE guardarPartida(
  IN p_id
  VARCHAR(36),
  IN p_creador VARCHAR(255),
  IN p_ganador VARCHAR(255)
)
BEGIN
  INSERT INTO partidas (id, creador, ganador) VALUES (p_id, p_creador, p_ganador);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE obtenerTodasPartidas()
BEGIN
  SELECT * FROM partidas;
END //
DELIMITER ;

CREATE USER 'partidasUser'@'localhost' IDENTIFIED BY 'parchis1234';
GRANT EXECUTE ON PROCEDURE parchisDB.guardarPartida TO 'partidasUser'@'localhost';
GRANT EXECUTE ON PROCEDURE parchisDB.obtenerTodasPartidas TO 'partidasUser'@'localhost';