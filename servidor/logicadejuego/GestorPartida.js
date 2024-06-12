const Partida = require("./Partida");
const PartidaCuatroJugadores = require("./PartidaCuatroJugadores");
const PartidaDosJugadores = require("./PartidaDosJugadores");
const PartidaTresJugadores = require("./PartidaTresJugadores");
const Ranking = require("./Ranking");

class GestorPartida{
    constructor(){
        /**@type {Object.<string, Partida>} */
        this.Partidas = {};
        this.RankingPartidas = new Ranking();
    }

    MostrarPartidas(){
        const partidasEncontradas = [];
        const partidas = Object.values(this.Partidas);
        partidas.forEach(partida => {
            if(!partida.Iniciado){
                const informacionPartida = {}
                informacionPartida['id'] = partida.ID;
                informacionPartida['creador'] = partida.Creador;
                informacionPartida['jugadorDos'] = partida.PersonaDos.Nombre;
                if(partida.CantidadPersonas >= 3)
                    informacionPartida['jugadorTres'] = partida.PersonaTres.Nombre;
                if(partida.CantidadPersonas >= 4)
                    informacionPartida['jugadorCuatro'] = partida.PersonaCuatro.Nombre;
                informacionPartida['tamanoJugadores'] = partida.CantidadPersonas;
                informacionPartida['jugadoresUnidos'] = partida.PersonasUnidas;
                partidasEncontradas.push(informacionPartida);
            }
        })
    }

    CrearPartida(nombreJugador, cantidadPersonas){
        const partida = null;
        if(cantidadPersonas == 2)
            partida = new PartidaDosJugadores(cantidadPersonas, nombreJugador);
        else if(cantidadPersonas == 3)
            partida = new PartidaTresJugadores(cantidadPersonas, nombreJugador);
        else
            partida = new PartidaCuatroJugadores(cantidadPersonas, nombreJugador);
        const informacionPartida = CrearInformacion(partida);
        this.Partidas[partida.ID] = informacionPartida;
        return informacionPartida;
    }

    /**
     * 
     * @param {Partida} partida 
     * @returns 
     */
    CrearInformacion(partida){
        const informacionPartida = {};
        informacionPartida['id'] = partida.ID;
        informacionPartida['creador'] = partida.Creador;
        informacionPartida['tamanoJugadores'] = partida.CantidadPersonas;
        informacionPartida['jugadoresUnidos'] = partida.PersonasUnidas;
        return partida;
    }

    SalirPartida(idPartida, nombreJugador){
        const partida = this.Partidas[idPartida];
        if(partida == undefined)
            return null;
        if(partida.Creador.Nombre == nombreJugador){
            delete this.Partidas.idPartida;
        }
        else
            partida.EliminarPersona(nombreJugador);
    }

    UnirsePartida(idPartida, nombreJugador){
        const partida = this.Partidas[idPartida];
        if(partida == undefined)
            return null;
        return partida.AgregarPersona(nombreJugador);
    }

    TirarDado(idPartida, nombreJugador){
        const partida = this.Partidas[idPartida];
        if(partida == undefined)
            return null;
        return partida.TirarDado(nombreJugador);
    }

    MoverFicha(idPartida, color, numero, casillaActual){
        const partida = this.Partidas[idPartida];
        if(partida == undefined)
            return null;
        return partida.MoverFicha(color, numero, casillaActual);
    }

    MostrarGane(idPartida){
        const partida = this.Partidas[idPartida];
        if(partida == undefined)
            return null;
        const ganador = partida.MostrarGanador()
        if(ganador != null)
            this.GuardarPartida(partida, ganador);
        return ganador;
    }

    /**
     * 
     * @param {Partida} partida 
     * @param {string} ganador
     */
    GuardarPartida(partida, ganador){
        partida.EtapaJuego = false;
        partida.Finalizado = true;
        try {
            this.RankingPartidas.AgregarPartida(partida.ID, partida.Creador, ganador);;
          } catch (err) {
            console.error('Error al agregar partida:', err);
          }
    }

    MostrarRanking(){
        return this.RankingPartidas.MostrarRanking();
    }
}

module.exports = GestorPartida;