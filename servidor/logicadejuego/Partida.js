const Dado = require('./Dado');
const GestorInformacionPartida = require('./GestorInformacionPartida');
const Jugador = require('./Jugador')
const {nanoid} = require('nanoid');
const Tablero = require('./Tablero');
const Turno = require('./Turno');
const { Socket } = require('socket.io');

/**
 * Esta clase representa la partida del juego.
 * 
 * @author Mynell Myers y Andrew López
 */
class Partida{
    /**
     * El método constructor.
     * @param {number} cantidadPersonas La cantidad personas que participan en la partida.
     * @param {string} personaCreadora La persona que creó la partida.
     */
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
     * Incrementa el número de persona unidas.
     */
    AgregarPersonas(){
        if(this.CantidadPersonas != this.PersonasUnidas)
            this.PersonasUnidas++;
    }

    /**
     * Este método elimina a una persona de la partida.
     * @param {string} nombrePersona El nombre de la persona a eliminar.
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

    /**
     * Este método envía a tirar el dado cuando una persona lo solicita.
     * @param {string} nombrePersona El nombre de la persona que tira el dado.
     * @param {Socket} io El socket que se comunica con el cliente.
     * @returns {number} El número que dio el dado.
     */
    TirarDado(nombrePersona, io){
        if(this.EtapaSeleccion)
            return this.TirarDadoSeleccion(nombrePersona, io);
        if(this.EtapaJuego && nombrePersona == this.Gestor.JugadorActual)
            return this.TirarDadoJuego(nombrePersona, io);
        return null;
    }

    /**
     * Este método sirve para tirar el dado en modo selección del primer jugador.
     * @param {string} nombrePersona El nombre de la persona que tira el dado.
     * @param {Socket} io El sockect que se comunica con el cliente.
     */
    TirarDadoSeleccion(nombrePersona, io){
        const resultado = this.ElegirPrimero(nombrePersona);
        const primero = resultado['primero'];
        io.to(this.ID).emit('observarNumero', nombrePersona, resultado['numero']);
        setTimeout(() =>{
            if(primero != undefined)
                io.to(this.ID).emit('dadoTirado', { primero });
        }, 3000)
    }

    /**
     * Este método envía a lanzar el dado cuando se está en modo de juego.
     * @param {string} nombrePersona Nombre de la persona que tira el dado.
     * @param {Socket} io El socket de conexión.
     * @returns {number} El número que dio el dado.
     */
    TirarDadoJuego(nombrePersona, io){
        const resultado = this.Gestor.CambiarUltimoNumero(Dado.TirarDado());
        const numero = this.Gestor.NumeroSacado;
        if(resultado == 'OK'){
            io.to(this.ID).emit('dadoTiradoJuego', numero, nombrePersona, {}, this.Gestor.JugadorActual);
        }
        else{
            const ficha = this.Gestor.UltimaFichaMovida;
            this.TableroPartida.DevolverFicha(ficha);
            CambiarJugador();
            io.to(this.ID).emit('dadoTiradoJuego', numero, nombrePersona, {'numero': ficha.Numero,
                'color': ficha.Color, 'destino' : [ficha.PosicionActual]}, this.Gestor.JugadorActual);
        }
        return numero;
    }

    /**
     * Este método envía a mover la ficha de un jugador.
     * @param {string} nombreJugador El nombre del jugador que mueve la ficha.
     * @param {string} color El color de la ficha a mover.
     * @param {number} numero El numero de la ficha a mover.
     * @param {string} casillaActual La casilla en la que se encuentra la ficha.
     * @param {Socket} io El socket de conexión.
     * @returns {undefined} Nada
     */
    MoverFicha(nombreJugador, color, numero, casillaActual, io){
        if(nombreJugador == this.Turnos.ObtenerActual().Nombre && color == this.Turnos.ObtenerActual().Color){
            const pasos = this.Gestor.NumeroSacado;
            const camino = this.TableroPartida.MoverFicha(color, numero, casillaActual, pasos);
            if(camino == null){
                this.CambiarJugador();
                io.to(this.ID).emit('moverFicha', [], this.Gestor.JugadorActual);
                return;
            }
            var fichasMovidas = camino.length;
            for(var cantidad = 3; fichasMovidas == 2; cantidad++){
                const nuevoCamino = this.TableroPartida.MoverFicha(color, numero, casillaActual, 20);
                fichasMovidas = nuevoCamino.length;
                camino.concat(nuevoCamino);
            }
            this.CambiarJugador();
            io.to(this.ID).emit('moverFicha', camino, this.Gestor.JugadorActual);
            return;
        }
        io.to(this.ID).emit('moverFicha', null, this.Gestor.JugadorActual);
    }

    /**
     * Cambia el turno del jugador.
     */
    CambiarJugador(){
        if(this.Gestor.NumeroSacado != 6)
            this.Gestor.ReiniciarUltimoNumero(this.Turnos.DarSiguiente().Nombre);
    }

    /**
     * Consulta quien es el jugador actual.
     * @returns {Jugador} El jugador actual.
     */
    ConsultarJugadorActual(){
        return this.Gestor.JugadorActual;
    }
}

module.exports = Partida;