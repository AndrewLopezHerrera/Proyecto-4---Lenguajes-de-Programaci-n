const Casilla = require('./Casilla');
const CasaAmarilla = require('./CasaAmarilla');
const CasaAzul = require('./CasaAzul');
const CasaRoja = require('./CasaRoja');
const CasaVerde = require('./CasaVerde');

class Tablero{
    constructor(){
        /**@type {Object.<string, Casilla>} */
        this.Casillas = {};
        this.CrearCasillas();
        this.CasaAmarilla = new CasaAmarilla();
        this.CasaAzul = new CasaAzul();
        this.CasaVerde = new CasaVerde();
        this.CasaRoja = new CasaRoja();
        this.PasilloAmarillo = CrearPasillo(69, 76);
        this.PasilloAzul = CrearPasillo(18, 25);
        this.PasilloRojo = CrearPasillo(35, 42);
        this.PasilloVerde = CrearPasillo(52, 59);
    }

    CrearCasillas(){
        for(var numero = 1; numero < 69; numero++){
            if(numero == 5 || numero == 22 || numero == 39 || numero == 56
                || numero == 12 || numero == 17 || numero == 29 || numero == 34
                || numero == 46 || numero == 51 || numero == 63 || numero == 68
            )
                this.Casillas['Casilla' + numero] = new Casilla(numero, true);
            else
            this.Casillas['Casilla' + numero] = new Casilla(numero, false);
        }
    }

    CrearPasillo(numeroInicial, numeroFinal){
        const pasillo = {}
        for(;numeroInicial <= numeroFinal; numeroInicial++)
            pasillo['Casilla' + numeroInicial] = new Casilla(numeroInicial, true);
        return pasillo;
    }

    MoverFicha(color, numero, posicionActual, cantidadEspacios){
        const ficha = this.SeleccionarFicha(color, numero, posicionActual);
        if(color == 'rojo')
            return this.MoverFichaRoja(ficha, cantidadEspacios);
        if(color == 'azul')
            return this.MoverFichaAzul(ficha, cantidadEspacios);
        if(color == 'verde')
            return this.CasaVerde(ficha, cantidadEspacios);
        if(color == 'amarillo')
            return this.CasaAmarilla(ficha, cantidadEspacios);
    }

    MoverFichaRoja(ficha, posicionActual, cantidadEspacios){
        const casillaActual = this.Casillas['Casilla' + posicionActual];
        var posicionFinal = posicionActual + cantidadEspacios;
        if(posicionFinal > 68)
            posicionFinal - 68;
        var resultado = null;
        if(posicionActual <= 34 && posicionFinal > 34 && posicionFinal <= 42)
            resultado = this.PasilloRojo['Casilla' + posicionFinal].InsertarFicha(ficha);
        else if(posicionFinal <= 42)
            resultado = this.Casillas['Casilla' + posicionFinal].InsertarFicha(ficha);
        if(resultado != null)
            casillaActual.EliminarFicha(ficha);
        return (ficha, resultado);
    }

    MoverFichaVerde(ficha, posicionActual, cantidadEspacios){
        const casillaActual = this.Casillas['Casilla' + posicionActual];
        var posicionFinal = posicionActual + cantidadEspacios;
        if(posicionFinal > 68)
            posicionFinal - 68;
        var resultado = null;
        if(posicionActual <= 51 && posicionFinal > 51 && posicionFinal)
            resultado = this.PasilloVerde['Casilla' + posicionFinal].InsertarFicha(ficha);
        else
            resultado = this.Casillas['Casilla' + posicionFinal].InsertarFicha(ficha);
        if(resultado != null)
            casillaActual.EliminarFicha(ficha);
        return (ficha, resultado);
    }

    MoverFichaAzul(ficha, posicionActual, cantidadEspacios){
        const casillaActual = this.Casillas['Casilla' + posicionActual];
        var posicionFinal = posicionActual + cantidadEspacios;
        if(posicionFinal > 68)
            posicionFinal - 68;
        var resultado = null;
        if(posicionActual <= 34 && posicionFinal > 34)
            resultado = this.PasilloRojo['Casilla' + posicionFinal].InsertarFicha(ficha);
        else
            resultado = this.Casillas['Casilla' + posicionFinal].InsertarFicha(ficha);
        if(resultado != null)
            casillaActual.EliminarFicha(ficha);
        return (ficha, resultado);
    }

    MoverFichaAmarilla(ficha, posicionActual, cantidadEspacios){
        const casillaActual = this.Casillas['Casilla' + posicionActual];
        var posicionFinal = posicionActual + cantidadEspacios;
        if(posicionFinal > 68)
            posicionFinal - 68;
        var resultado = null;
        if(posicionActual <= 34 && posicionFinal > 34)
            resultado = this.PasilloRojo['Casilla' + posicionFinal].InsertarFicha(ficha);
        else
            resultado = this.Casillas['Casilla' + posicionFinal].InsertarFicha(ficha);
        if(resultado != null)
            casillaActual.EliminarFicha(ficha);
        return (ficha, resultado);
    }

    SeleccionarFicha(color, numero, posicionActual){
        const casilla = this.Casillas['Casilla' + posicionActual];
        const fichas = casilla.Espacios;
        const fichaUno = fichas[0];
        const fichaDos = fichas[1];
        fichaSeleccionada = null;
        if(fichaUno.Color == color && fichaUno.Numero == numero)
            return fichaUno;
        return fichaDos;
    }
}

module.exports = Tablero;