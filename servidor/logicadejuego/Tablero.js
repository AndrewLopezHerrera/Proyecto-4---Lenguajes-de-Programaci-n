const Casilla = require('./Casilla');
const CasaAmarilla = require('./CasaAmarilla');
const CasaAzul = require('./CasaAzul');
const CasaRoja = require('./CasaRoja');
const CasaVerde = require('./CasaVerde');
const Ficha = require('./Ficha');

class Tablero{
    constructor(){
        /**@type {Object.<string, string>} */
        this.Casillas = {};
        this.CrearCasillas();
        /**@type {CasaAmarilla} */
        this.CasaAmarilla = new CasaAmarilla();
        /**@type {CasaAzul} */
        this.CasaAzul = new CasaAzul();
        /**@type {CasaVerde} */
        this.CasaVerde = new CasaVerde();
        /**@type {CasaRoja} */
        this.CasaRoja = new CasaRoja();
        this.Casillas['Casilla25Azul'].Espacios = Array(4);
        this.Casillas['Casilla42Rojo'].Espacios = Array(4);
        this.Casillas['Casilla60Verde'].Espacios = Array(4);
        this.Casillas['Casilla76Amarillo'].Espacios = Array(4);
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
            this.CrearPasillos(numero);
        }
    }

    CrearPasillos(numero){
        if(numero >= 18 && numero <= 25)
            this.Casillas['Casilla' + numero + 'Azul'] = new Casilla(numero, true);
        if(numero >= 35 && numero <= 42)
            this.Casillas['Casilla' + numero + 'Rojo'] = new Casilla(numero, true);
        if(numero >= 53 && numero <= 60)
            this.Casillas['Casilla' + numero + 'Verde'] = new Casilla(numero, true);
        if(numero >= 69 && numero <= 76)
            this.Casillas['Casilla' + numero + 'Amarillo'] = new Casilla(numero, true);
    }

    /**
     * 
     * @param {string} color 
     * @param {number} numero 
     * @param {string} casillaActual 
     * @param {number} cantidadEspacios 
     * @returns {Object[]}
     */
    MoverFicha(color, numero, casillaActual, cantidadEspacios){
        const casilla = this.Casillas[casillaActual];
        if(casilla == undefined && cantidadEspacios == 5)
            return this.SacarFicha(color, numero);
        const ficha = this.SeleccionarFicha(color, numero, casilla);
        if(color == 'azul')
            return this.MoverFichaAzul(ficha, casilla, casillaActual, cantidadEspacios);
        else if(color == 'verde')
            return this.MoverFichaVerde(ficha, casilla, casillaActual, cantidadEspacios);
        else if(color == 'amarillo')
            return this.MoverFichaAmarilla(ficha, casilla, cantidadEspacios);
        else
            return this.MoverFichaRojo(ficha, casilla, casillaActual, cantidadEspacios);
    }

    /**
     * 
     * @param {Ficha} ficha 
     * @param {Casilla} casilla
     * @param {number} espacios
     */
    MoverFichaAmarilla(ficha, casilla, espacios){
        const posicionActual = ficha.PosicionActual;
        const camino = this.BuscarBloqueosAmarillo(posicionActual, espacios);
        if(resultado == null)
            return null;
        const casillaDestino = this.Casillas[camino[camino.length - 1]];
        casilla.EliminarFicha(ficha);
        const fichaDevuelta = casillaDestino.InsertarFicha(ficha);
        ficha.PosicionActual = casillaDestino.NumeroCasilla;
        if(fichaDevuelta != ficha){
            this.DevolverFicha(fichaDevuelta);
            return EnviarInformacion(ficha, camino, fichaDevuelta)
        }
        return this.EnviarInformacion(ficha, camino);
    }

    MoverFichaRojo(ficha, casilla, nombreCasilla, espacios){
        const posicionActual = ficha.PosicionActual;
        const camino = this.BuscarBloqueos(posicionActual, espacios, nombreCasilla, 34, 'rojo');
        if(resultado == null)
            return null;
        const casillaDestino = this.Casillas[camino[camino.length - 1]];
        casilla.EliminarFicha(ficha);
        const fichaDevuelta = casillaDestino.InsertarFicha(ficha);
        ficha.PosicionActual = casillaDestino.NumeroCasilla;
        if(fichaDevuelta != ficha){
            this.DevolverFicha(fichaDevuelta);
            return EnviarInformacion(ficha, camino, fichaDevuelta)
        }
        return this.EnviarInformacion(ficha, camino);
    }

    MoverFichaAzul(ficha, casilla, nombreCasilla, espacios){
        const posicionActual = ficha.PosicionActual;
        const casillaDestino = this.BuscarBloqueos(posicionActual, espacios, nombreCasilla, 17, 'azul')
        if(resultado == null)
            return null;
        const camino = this.Casillas[camino[camino.length - 1]];
        casilla.EliminarFicha(ficha);
        const fichaDevuelta = casillaDestino.InsertarFicha(ficha);
        ficha.PosicionActual = casillaDestino.NumeroCasilla;
        if(fichaDevuelta != ficha){
            this.DevolverFicha(fichaDevuelta);
            return EnviarInformacion(ficha, camino, fichaDevuelta)
        }
        return this.EnviarInformacion(ficha, camino);
    }

    MoverFichaVerde(ficha, casilla, nombreCasilla, espacios){
        const posicionActual = ficha.PosicionActual;
        const casillaDestino = this.BuscarBloqueos(posicionActual, espacios, nombreCasilla, 51, 'rojo')
        if(resultado == null)
            return null;
        const camino = this.Casillas[camino[camino.length - 1]];
        casilla.EliminarFicha(ficha);
        const fichaDevuelta = casillaDestino.InsertarFicha(ficha);
        ficha.PosicionActual = casillaDestino.NumeroCasilla;
        if(fichaDevuelta != ficha){
            this.DevolverFicha(fichaDevuelta);
            return EnviarInformacion(ficha, camino, fichaDevuelta)
        }
        return this.EnviarInformacion(ficha, camino);
    }

    SacarFicha(color, numero){
        const ficha = null;
        if(color == 'verde')
            ficha = this.CasaVerde.SacarFicha(numero);
        else if(color == 'rojo')
            ficha = this.CasaRoja.SacarFicha(numero);
        else if(color == 'azul')
            ficha = this.CasaAzul.SacarFicha(numero);
        else
            ficha = this.CasaAmarilla.SacarFicha(numero);
        const casilla = this.Casillas['Casilla' + ficha.Numero];
        if(casilla.Espacios.length == 2)
            return this.IngresarFicha(ficha);
        else
            this.VerificarResultadoCasilla(ficha, casilla)
    }

    IngresarFicha(ficha){
        if(color == 'verde')
            this.CasaVerde.IngresarFicha(ficha);
        else if(color == 'rojo')
            this.CasaRoja.IngresarFicha(ficha);
        else if(color == 'azul')
            this.CasaAzul.IngresarFicha(ficha);
        else
            this.CasaAmarilla.IngresarFicha(ficha);
        return null;
    }

    /**
     * 
     * @param {Ficha} ficha 
     * @param {Casilla} casilla 
     * @returns 
     */
    VerificarResultadoCasilla(ficha, casilla){
        const fichaDevuelta = casilla.InsertarFicha(ficha);
        if(ficha == fichaDevuelta)
            return this.EnviarInformacion(ficha, ['Casilla' + ficha.Numero], fichaDevuelta);
        else
            return this.EnviarInformacion(ficha, ['Casilla' + ficha.Numero]);
    }

    /**
     * 
     * @param {Ficha} fichaMovida 
     * @param {Ficha} fichaDevuelta 
     */
    EnviarInformacion(fichaMovida, camino, fichaDevuelta){
        const fichaUno = {};
        fichaUno['color'] = fichaMovida.Color;
        fichaUno['numero'] = fichaMovida.Numero;
        fichaUno['posicion'] = fichaMovida.PosicionActual;
        fichaUno['camino'] = camino;
        const fichaDos = {};
        fichaDos['color'] = fichaDevuelta.Color;
        fichaDos['numero'] = fichaDevuelta.Numero;
        fichaDos['posicion'] = fichaDevuelta.PosicionActual;
        const fichas = [fichaUno, fichaDos];
        return fichas;
    }

    EnviarInformacion(fichaMovida, camino){
        const fichaUno = {};
        fichaUno['color'] = fichaMovida.Color;
        fichaUno['numero'] = fichaMovida.Numero;
        fichaUno['posicion'] = fichaMovida.PosicionActual;
        fichaUno['camino'] = camino;
        const fichas = [fichaUno];
        return fichas;
    }

    /**
     * 
     * @param {Ficha} ficha  
     */
    DevolverFicha(ficha){
        if(ficha.Color == 'azul')
            this.CasaAzul.IngresarFicha(ficha);
        else if(ficha.Color == 'amarillo')
            this.CasaAmarilla.IngresarFicha(ficha);
        else if(ficha.Color == 'verde')
            this.CasaVerde.IngresarFicha(ficha);
        else
            this.CasaRoja.IngresarFicha(ficha);
    }

    /**
     * 
     * @param {string} color 
     * @param {number} numero 
     * @param {Casilla} casillaActual 
     * @returns {Ficha}
     */
    SeleccionarFicha(color, numero, casillaActual){
        const fichas = casillaActual.Espacios;
        const fichaUno = fichas[0];
        const fichaDos = fichas[1];
        fichaSeleccionada = null;
        if(fichaUno.Color == color && fichaUno.Numero == numero)
            return fichaUno;
        return fichaDos;
    }

    /**
     * 
     * @param {number} posicionActual 
     * @param {number} cantidadEspacios 
     * @returns {string[]}
     */
    BuscarBloqueosAmarillo(posicionActual, cantidadEspacios){
        var posicionFinal = posicionActual + espacios;
        if(posicionFinal > 76)
            return false;
        const camino = [];
        for(var espacios = 1; espacios <= cantidadEspacios; espacios++){
            const posicionEvaluada = posicionActual + espacios;
            if(posicionFinal > 68){
                if(this.Casillas['Casilla' + posicionEvaluada + 'Amarillo'].Espacios.length == 2)
                    return null;
                camino.push('Casilla' + posicionEvaluada + 'Amarillo');
            }
            else{
                if(this.Casillas['Casilla' + posicionEvaluada].Espacios.length == 2)
                    return null;
                camino.push('Casilla' + posicionEvaluada);
            }
        }
        if(entrarPasillo)
            return this.Casillas['Casilla' + (posicionActual + espacios) + 'Amarillo'];
        return this.Casillas['Casilla' + (posicionActual + espacios)];
    }

    /**
     * 
     * @param {number} posicionActual 
     * @param {number} cantidadEspacios 
     * @param {string} nombreCasilla 
     * @param {number} entradaPasillo 
     * @param {string} color 
     * @returns {string[]}
     */
    BuscarBloqueos(posicionActual, cantidadEspacios, nombreCasilla, entradaPasillo, color){
        var entrarPasillo = false;
        var casilla;
        var camino = []
        for(var espacios = 1; espacios <= cantidadEspacios; espacios++){
            casilla = posicionActual + espacios;
            if(casilla > 68)
                casilla -= 68
            if(entrarPasillo){
                if(this.Casillas['Casilla' + casilla + color].Espacios.length == 2)
                    return null;
                camino.push('Casilla' + casilla + color);
            }
            else
                if(casilla == entradaPasillo || nombreCasilla.length > 9)
                    entrarPasillo = true;
                if(this.Casillas['Casilla' + casilla].Espacios.length == 2)
                    return null;
                camino.push('Casilla' + casilla);
        }
        if(entrarPasillo)
            return this.Casillas['Casilla' + casilla + color];
        return this.Casillas['Casilla' + casilla];
    }
}

module.exports = Tablero;