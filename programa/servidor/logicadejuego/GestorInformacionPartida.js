const Ficha = require("./Ficha");
const Jugador = require("./Jugador");

/**
 * Esta clase administra la información de la partida.
 * @author Mynell Myers y Andrew López
 */
class GestorInformacionPartida{
    /**
     * El método constructor.
     */
    constructor(){
        /**@type {string} */
        this.JugadorActual = null;
        /**@type {Ficha} */
        this.UltimaFichaMovida = null;
        this.CantidadMaximoSacados = 0;
        /**@type {number} */
        this.NumeroSacado = null;
    }

    /**
     * Cambia el último número sacado por el usuario.
     * @param {number} numero El último número.
     * @returns {'AC'|'OK'} AC cuando se ha sacado tres veces un seis, OK cuando no.
     */
    CambiarUltimoNumero(numero){
        this.NumeroSacado = numero
        if(numero == 6)
            this.CantidadMaximoSacados++;
        if(this.CantidadMaximoSacados === 3 && this.UltimaFichaMovida != null)
            return 'AC';
        else
            return 'OK';
    }

    /**
     * Cambia el jugador que está jugando
     * @param {string} nombreJugador Nombre del jugador.
     */
    ReiniciarUltimoNumero(nombreJugador){
        this.CantidadMaximoSacados = 0;
        this.JugadorActual = nombreJugador;
    }

    /**
     * Cambia la última ficha movida.
     * @param {Ficha} ultimaFicha Ultima ficha movida.
     */
    CambiarUltimaFicha(ultimaFicha){
        this.UltimaFichaMovida = ultimaFicha;
    }
}

module.exports = GestorInformacionPartida;