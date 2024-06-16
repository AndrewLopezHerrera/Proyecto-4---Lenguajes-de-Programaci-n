const Ficha = require("./Ficha");
const Jugador = require("./Jugador");

class GestorInformacionPartida{
    constructor(){
        /**@type {string} */
        this.JugadorActual = null;
        /**@type {Ficha} */
        this.UltimaFichaMovida = null;
        this.CantidadMaximoSacados = 0;
        /**@type {number} */
        this.NumeroSacado = null;
    }

    CambiarUltimoNumero(numero){
        this.NumeroSacado = numero
        if(numero == 6)
            this.CantidadMaximoSacados++;
        if(this.CantidadMaximoSacados === 3)
            return 'AC';
        else
            return 'OK';
    }

    ReiniciarUltimoNumero(nombreJugador){
        this.CantidadMaximoSacados = 0;
        this.JugadorActual = nombreJugador;
    }

    CambiarUltimaFicha(ultimaFicha){
        this.UltimaFichaMovida = ultimaFicha;
    }
}

module.exports = GestorInformacionPartida;