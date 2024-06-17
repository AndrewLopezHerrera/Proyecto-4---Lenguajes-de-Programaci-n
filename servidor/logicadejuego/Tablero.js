const Casilla = require('./Casilla');
const CasaAmarilla = require('./CasaAmarilla');
const CasaAzul = require('./CasaAzul');
const CasaRoja = require('./CasaRoja');
const CasaVerde = require('./CasaVerde');
const Ficha = require('./Ficha');
const Casa = require('./Casa');

/**
 * Esta clase representa el tablero del parchis.
 * @author Mynell Myers y Andrew López
 */
class Tablero{
    /**
     * El método constructor.
     */
    constructor(){
        /**@type {Object.<string, string>} */
        this.Casillas = {};
        this.CrearCasillas();
        this.CrearPasillos();
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

    /**
     * Crea las casillas del tablero.
     */
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

    /**
     * Crea los pasillos del tablero.
     */
    CrearPasillos(){
        for(var numero = 18; numero <= 25; numero++)
            this.Casillas['Casilla' + numero + 'Azul'] = new Casilla(numero, true);
        for(var numero = 35; numero <= 42; numero++)
            this.Casillas['Casilla' + numero + 'Rojo'] = new Casilla(numero, true);
        for(var numero = 53; numero <= 60; numero++)
            this.Casillas['Casilla' + numero + 'Verde'] = new Casilla(numero, true);
        for(var numero = 69; numero <= 76; numero++)
            this.Casillas['Casilla' + numero + 'Amarillo'] = new Casilla(numero, true);
    }

    /**
     * Envia a mover la ficha seleccionada por un jugador en específico.
     * @param {string} color El color de la ficha.
     * @param {number} numero El número de la ficha.
     * @param {string} casillaActual La casilla en la que se encuentra la casilla.
     * @param {number} cantidadEspacios La cantidad de espacios que debe moverse la ficha.
     * @returns {Object[]} Una lista con al información de las fichas: color, numero y camino recorrido.
     */
    MoverFicha(color, numero, casillaActual, cantidadEspacios){
        const casilla = this.Casillas[casillaActual];
        if(casilla == undefined && cantidadEspacios == 5)
            return this.SacarFicha(color, numero);
        if(casilla == undefined)
            return null;
        console.log(casillaActual, casilla, color, numero);
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
     * Mueve las fichas amarillas.
     * @param {Ficha} ficha La ficha seleccionada.
     * @param {Casilla} casilla La casilla en la que se encuentra la ficha
     * @param {number} espacios La cantidad de espacios a moverse.
     */
    MoverFichaAmarilla(ficha, casilla, espacios){
        const posicionActual = ficha.PosicionActual;
        const camino = this.BuscarBloqueosAmarillo(posicionActual, espacios);
        if(camino == null)
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

    /**
     * Mueve las fichas rojas.
     * @param {Ficha} ficha La ficha seleccionada.
     * @param {Casilla} casilla La casilla en la que se encuentra la ficha
     * @param {number} espacios La cantidad de espacios a moverse.
     */
    MoverFichaRojo(ficha, casilla, nombreCasilla, espacios){
        const posicionActual = ficha.PosicionActual;
        const camino = this.BuscarBloqueos(posicionActual, espacios, nombreCasilla, 34, 'rojo');
        if(camino == null)
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

    /**
     * Mueve las fichas azules.
     * @param {Ficha} ficha La ficha seleccionada.
     * @param {Casilla} casilla La casilla en la que se encuentra la ficha
     * @param {number} espacios La cantidad de espacios a moverse.
     */
    MoverFichaAzul(ficha, casilla, nombreCasilla, espacios){
        const posicionActual = ficha.PosicionActual;
        const casillaDestino = this.BuscarBloqueos(posicionActual, espacios, nombreCasilla, 17, 'azul')
        if(casillaDestino == null)
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

    /**
     * Mueve las fichas verde.
     * @param {Ficha} ficha La ficha seleccionada.
     * @param {Casilla} casilla La casilla en la que se encuentra la ficha
     * @param {number} espacios La cantidad de espacios a moverse.
     */
    MoverFichaVerde(ficha, casilla, nombreCasilla, espacios){
        const posicionActual = ficha.PosicionActual;
        const casillaDestino = this.BuscarBloqueos(posicionActual, espacios, nombreCasilla, 51, 'rojo')
        if(casillaDestino == null)
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

    /**
     * Saca una ficha de la casa de esta.
     * @param {string} color El color de la ficha.
     * @param {number} numero El número de la ficha.
     * @returns {Ficha} La ficha que ha sido extrída de la casa.
     */
    SacarFicha(color, numero){
        var ficha = null;
        if(color == 'verde')
            ficha = this.CasaVerde.SacarFicha(numero);
        else if(color == 'rojo')
            ficha = this.CasaRoja.SacarFicha(numero);
        else if(color == 'azul')
            ficha = this.CasaAzul.SacarFicha(numero);
        else
            ficha = this.CasaAmarilla.SacarFicha(numero);
        const casilla = this.Casillas['Casilla' + ficha.PosicionActual];
        if(casilla.Espacios == null && casilla.Espacios == null)
            return this.IngresarFicha(ficha);
        else
            return this.VerificarResultadoCasilla(ficha, casilla)
    }

    /**
     * Ingresa una ficha a la casa que le corresponde.
     * @param {Ficha} ficha La ficha que se desea ingresar.
     * @returns {null} Envia nulo porque no se puede avanzar más.
     */
    IngresarFicha(ficha){
        if(ficha.Color == 'verde')
            this.CasaVerde.IngresarFicha(ficha);
        else if(ficha.Color == 'rojo')
            this.CasaRoja.IngresarFicha(ficha);
        else if(ficha.Color == 'azul')
            this.CasaAzul.IngresarFicha(ficha);
        else
            this.CasaAmarilla.IngresarFicha(ficha);
        return null;
    }

    /**
     * Verifica si la ficha movida se comió a otra ficha en el proceso.
     * @param {Ficha} ficha La ficha que se movió.
     * @param {Casilla} casilla la casilla en la que se desea insertar la ficha.
     * @returns {Object[]} La lista de las fichas que se movieron.
     */
    VerificarResultadoCasilla(ficha, casilla){
        const fichaDevuelta = casilla.InsertarFicha(ficha);
        const casillaAnterior = 'Casilla' + Casa.DarUbicacionInicial(ficha);
        if(ficha == fichaDevuelta)
            return this.EnviarInformacion(ficha, [casillaAnterior, 'Casilla' + ficha.PosicionActual]);
        else
            return this.EnviarInformacion(ficha, [casillaAnterior, 'Casilla' + ficha.PosicionActual], fichaDevuelta);
    }

    /**
     * Arma la información cuando la ficha movida se comió otra ficha.
     * @param {Ficha} fichaMovida La ficha que se movió,
     * @param {String[]} camino El camino recorrido por la ficha que se movió.
     * @param {Ficha} fichaDevuelta La ficha que se comió la otra ficha.
     * @returns {Object[]} La lista con la información de los movimientos.
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
        fichaDos['camino'] = ['Casilla' + fichaMovida.PosicionActual, 'Casilla' + fichaDevuelta.PosicionActual];
        const fichas = [fichaUno, fichaDos];
        return fichas;
    }

    /**
     * Arma la información cuando la ficha se ha movido.
     * @param {Ficha} fichaMovida La ficha que se movió,
     * @param {String[]} camino El camino recorrido por la ficha que se movió.
     * @returns {Object[]} La lista con la información de los movimientos.
     */
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
     * Ingresa la ficha a la casa cuando ha sido comida por otra ficha.
     * @param {Ficha} ficha La ficha que se ha movido.
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
     * Selecciona una ficha según las características de esta.
     * @param {string} color El color de la ficha.
     * @param {number} numero El número de la ficha.
     * @param {Casilla} casillaActual La casilla en la que se encuentra la ficha.
     * @returns {Ficha} La ficha que se ha movido.
     */
    SeleccionarFicha(color, numero, casillaActual){
        const fichas = casillaActual.Espacios;
        const fichaUno = fichas[0];
        const fichaDos = fichas[1];
        if(fichaUno.Color == color && fichaUno.Numero == numero)
            return fichaUno;
        return fichaDos;
    }

    /**
     * Busca los bloqueos que se encuentran cuando se mueve una ficha amarilla.
     * @param {number} posicionActual La posición actual de la ficha.
     * @param {number} cantidadEspacios La cantidad de espacios que se debe mover una ficha.
     * @returns {string[]} El camino que recorre la ficha amarilla.
     */
    BuscarBloqueosAmarillo(posicionActual, cantidadEspacios){
        var posicionFinal = posicionActual + espacios;
        if(posicionFinal > 76)
            return false;
        const camino = [];
        for(var espacios = 0; espacios <= cantidadEspacios; espacios++){
            const posicionEvaluada = posicionActual + espacios;
            if(posicionFinal > 68){
                if(this.Casillas['Casilla' + posicionEvaluada + 'Amarillo'].Espacios[0] != null
                    && this.Casillas['Casilla' + posicionEvaluada + 'Amarillo'].Espacios[1] != null
                )
                    return null;
                camino.push('Casilla' + posicionEvaluada + 'Amarillo');
            }
            else{
                if(this.Casillas['Casilla' + posicionEvaluada].Espacios[0] != null
                    && this.Casillas['Casilla' + posicionEvaluada].Espacios[1] != null
                )
                    return null;
                camino.push('Casilla' + posicionEvaluada);
            }
        }
        return camino;
    }

    /**
     * Busca los bloqueos que están cuando se mueve otra ficha que no sean las amarilla.
     * @param {number} posicionActual La posición en la que se encuentra las fichas.
     * @param {number} cantidadEspacios La cantidad que se debe mover la ficha.
     * @param {string} nombreCasilla El nombre de la casilla actual.
     * @param {number} entradaPasillo La entrada del pasillo según el color.
     * @param {string} color El color de la ficha.
     * @returns {string[]} El camino que se genera.
     */
    BuscarBloqueos(posicionActual, cantidadEspacios, nombreCasilla, entradaPasillo, color){
        var entrarPasillo = false;
        var casilla;
        var camino = []
        for(var espacios = 0; espacios <= cantidadEspacios; espacios++){
            casilla = posicionActual + espacios;
            if(casilla > 68)
                casilla -= 68
            if(entrarPasillo){
                if(this.Casillas['Casilla' + casilla + color].Espacios.length[0] != null
                    && this.Casillas['Casilla' + casilla + color].Espacios.length[1] != null)
                    return null;
                camino.push('Casilla' + casilla + color);
            }
            else
                if(casilla == entradaPasillo || nombreCasilla.length > 9)
                    entrarPasillo = true;
                if(this.Casillas['Casilla' + casilla].Espacios.length[0] != null
                    && this.Casillas['Casilla' + casilla].Espacios.length[1] != null
                )
                    return null;
                camino.push('Casilla' + casilla);
        }
        return camino;
    }
}

module.exports = Tablero;