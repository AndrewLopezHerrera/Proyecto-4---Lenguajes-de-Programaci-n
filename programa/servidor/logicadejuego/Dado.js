/**
 * @class Dado
 * @brief Clase que representa un dado en el juego.
 * @author Mynell Myers y Andrew López
 */
class Dado {
    /**
     * @brief Método estático para tirar el dado y obtener un número aleatorio.
     * @returns {number} Número obtenido al tirar el dado.
     */
    static TirarDado() {
        const numeros = [1, 2, 3, 4, 4, 5, 5, 6, 6];
        const numero = Math.round(Math.random() * 8);
        return numeros[numero];
    }
}

module.exports = Dado;
