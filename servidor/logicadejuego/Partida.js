const Dado = require('./Dado');
const GestorInformacionPartida = require('./GestorInformacionPartida');
const Jugador = require('./Jugador')
const {nanoid} = require('nanoid');
const Tablero = require('./Tablero');
const Turno = require('./Turno');

class Partida{
    constructor(cantidadPersonas, personaCreadora){
        this.ID = nanoid(10);
        /**@type {Jugador} */
        this.Creador = new Jugador(personaCreadora, 'rojo');
        this.CantidadPersonas = cantidadPersonas;
        this.PersonasUnidas = 1;
        /**@type {Jugador} */
        this.PersonaDos = null;
        /**@type {Jugador} */
        this.PersonaTres = null;
        /**@type {Jugador} */
        this.PersonaCuatro = null;
        this.Iniciado = false;
        this.EtapaSeleccion = false;
        this.EtapaJuego = false;
        this.Finalizado = false;
        /**@type {Turno} */
        this.Turnos = null;
        /**@type {GestorInformacionPartida} */
        this.Gestor = new GestorInformacionPartida();
        this.TableroPartida = new Tablero();
    }

    /**
     * 
     * @param {string} nombrePersona 
     */
    EliminarPersona(nombrePersona){
        if(this.PersonaDos == null && this.PersonaDos.Nombre == nombrePersona){
            this.PersonaDos = null;
            this.PersonasUnidas--;
        }
        else if(this.PersonaTres != null && this.PersonaTres.Nombre == nombrePersona){
            this.PersonaCuatro = null;
            this.PersonasUnidas--;
        }
        else if(this.PersonaCuatro != null && this.PersonaCuatro.Nombre == nombrePersona){
            this.PersonaCuatro = null;
            this.PersonasUnidas--;
        }
    }

    TirarDado(nombrePersona){
        if(this.EtapaSeleccion)
            return [nombrePersona, this.ElegirPrimero(nombrePersona)];
        if(this.EtapaJuego && nombrePersona == this.Gestor.JugadorActual)
            return [nombrePersona, this.Gestor.CambiarUltimoNumero(Dado.TirarDado())];
        return null;
    }

    MoverFicha(color, numero, casillaActual){
        const pasos = this.Gestor.NumeroSacado;
        const camino = this.TableroPartida.MoverFicha(color, numero, casillaActual, pasos);
        var fichasMovidas = camino.length;
        for(var cantidad = 3; fichasMovidas == 2; cantidad++){
            const nuevoCamino = this.TableroPartida.MoverFicha(color, numero, casillaActual, 20);
            fichasMovidas = nuevoCamino.length;
            camino.concat(nuevoCamino);
        }
        this.CambiarJugador();
        return camino;
    }

    CambiarJugador(){
        if(this.Gestor.NumeroSacado != 6)
            this.Gestor.ReiniciarUltimoNumero(this.Turnos.DarSiguiente())
    }

    ConsultarJugadorActual(){
        return this.Gestor.JugadorActual;
    }
}

module.exports = Partida;