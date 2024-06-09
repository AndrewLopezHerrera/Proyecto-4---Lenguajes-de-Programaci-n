const Jugador = require("./Jugador");

class GestorInformacionPartida{
    constructor(){
        /**@type {string} */
        this.JugadorActual = null;
        this.UltimaFichaMovida = null;
        this.CantidadMaximoSacados = 0;
        this.NumeroSacado = null;
    }

    CambiarUltimoNumero(numero){
        this.NumeroSacado = numero
        if(numero == 6)
            this.CantidadMaximoSacados++;
        if(this.CantidadMaximoSacados == 3)
            return 'OK';
        else
            return 'AC';
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