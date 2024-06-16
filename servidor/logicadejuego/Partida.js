const Dado = require('./Dado');
const GestorInformacionPartida = require('./GestorInformacionPartida');
const Jugador = require('./Jugador')
const {nanoid} = require('nanoid');
const Tablero = require('./Tablero');
const Turno = require('./Turno');
const { Socket } = require('socket.io');

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

    AgregarPersonas(){
        if(this.CantidadPersonas != this.PersonasUnidas)
            this.PersonasUnidas++;
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

    TirarDado(nombrePersona, io){
        if(this.EtapaSeleccion)
            return this.TirarDadoSeleccion(nombrePersona, io);
        if(this.EtapaJuego && nombrePersona == this.Gestor.JugadorActual)
            return this.TirarDadoJuego(nombrePersona, io);
        return null;
    }

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
     * 
     * @param {string} nombrePersona 
     * @param {Socket} io 
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

    CambiarJugador(){
        if(this.Gestor.NumeroSacado != 6)
            this.Gestor.ReiniciarUltimoNumero(this.Turnos.DarSiguiente().Nombre);
    }

    ConsultarJugadorActual(){
        return this.Gestor.JugadorActual;
    }
}

module.exports = Partida;