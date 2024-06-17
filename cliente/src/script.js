import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const urlServer = "http://localhost:4000"
const socket = io(urlServer, {
    transports: ['websocket'],
    secure: true,
    rejectUnauthorized: false
});
let temporizadorPartidas = null;
let gameData=null;

//Tablero

let piezas= [];

const tableroLayout = [
    ['rojo', 'rojo','rojo', 'rojo', 'rojo', 'rojo', 'rojo', 'rojo', 'casilla', 'casilla', 'casilla', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul'],
    ['rojo', 'rojo','rojo', 'rojo', 'rojo','rojo', 'rojo', 'rojo', 'casilla', 'projo', 'casilla', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul'],
    ['rojo', 'rojo','casa', 'casa', 'casa', 'casa', 'rojo', 'rojo', 'casilla', 'projo', 'casilla', 'azul', 'azul', 'casa', 'casa', 'casa', 'casa', 'azul', 'azul'],
    ['rojo', 'rojo','casa', 'casa', 'casa', 'casa', 'rojo', 'rojo', 'casilla', 'projo', 'casilla', 'azul', 'azul', 'casa', 'casa', 'casa', 'casa', 'azul', 'azul'],
    ['rojo', 'rojo','casa', 'casa', 'casa', 'casa', 'rojo', 'rojo', 'casilla', 'projo', 'casilla', 'azul', 'azul', 'casa', 'casa', 'casa', 'casa', 'azul', 'azul'],
    ['rojo', 'rojo','casa', 'casa', 'casa', 'casa', 'rojo', 'rojo', 'casilla', 'projo', 'casilla', 'azul', 'azul', 'casa', 'casa', 'casa', 'casa', 'azul', 'azul'],
    ['rojo', 'rojo','rojo', 'rojo', 'rojo','rojo', 'rojo', 'rojo', 'casilla', 'projo', 'casilla', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul'],
    ['rojo', 'rojo','rojo', 'rojo', 'rojo', 'rojo', 'rojo', 'rojo', 'casilla', 'projo', 'casilla', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul'],
    ['casilla', 'casilla','casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'centro', 'projo', 'centro', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla'],
    ['casilla', 'pverde', 'pverde', 'pverde', 'pverde', 'pverde', 'pverde', 'pverde', 'pverde', 'centro', 'pazul', 'pazul', 'pazul', 'pazul', 'pazul', 'pazul', 'pazul', 'pazul', 'casilla'],
    ['casilla', 'casilla','casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'centro', 'pamarillo', 'centro', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla'],
    ['verde', 'verde','verde', 'verde', 'verde', 'verde', 'verde', 'verde', 'casilla', 'pamarillo', 'casilla', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo'],
    ['verde', 'verde','verde', 'verde', 'verde', 'verde', 'verde', 'verde', 'casilla', 'pamarillo', 'casilla', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo'],
    ['verde', 'verde','casa', 'casa', 'casa', 'casa', 'verde', 'verde', 'casilla', 'pamarillo', 'casilla', 'amarillo', 'amarillo', 'casa', 'casa', 'casa', 'casa', 'amarillo', 'amarillo'],
    ['verde', 'verde','casa', 'casa', 'casa', 'casa', 'verde', 'verde', 'casilla', 'pamarillo', 'casilla', 'amarillo', 'amarillo', 'casa', 'casa', 'casa', 'casa', 'amarillo', 'amarillo'],
    ['verde', 'verde','casa', 'casa', 'casa', 'casa', 'verde', 'verde', 'casilla', 'pamarillo', 'casilla', 'amarillo', 'amarillo', 'casa', 'casa', 'casa', 'casa', 'amarillo', 'amarillo'],
    ['verde', 'verde','casa', 'casa', 'casa', 'casa', 'verde', 'verde', 'casilla', 'pamarillo', 'casilla', 'amarillo', 'amarillo', 'casa', 'casa', 'casa', 'casa', 'amarillo', 'amarillo'],
    ['verde', 'verde','verde', 'verde', 'verde', 'verde', 'verde', 'verde', 'casilla', 'pamarillo', 'casilla', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo'],
    ['verde', 'verde','verde', 'verde', 'verde', 'verde', 'verde', 'verde', 'casilla', 'casilla', 'casilla', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo']
];

const listaCasillas = [35,34,33,36,32,37,31,38,30,39,29,40,28,41,27,42,26,50,49,48,47,46,45,44,43,25,24,23,22,21
    ,20,19,18,51,17,52,53,54,55,56,57,58,59,9,10,11,12,13,14,15,16,60,8,61,7,62,6,63,5,64,4,65,3,66,2,67,68,1];
let pasilloCont=0;

function createCelda(celdaType, rowIndex, colIndex) {
    const celda = document.createElement('div');
    celda.classList.add('celda');
    celda.id = `Casilla-${rowIndex}-${colIndex}`;

    if(pasilloCont>= 8){pasilloCont = 0;}
    if(celdaType==='rojo'||celdaType==='azul'||celdaType==='amarillo'||celdaType==='verde'){
        celda.classList.add('casa', celdaType);
    }else if(celdaType==='casilla'){
        celda.classList.add('casilla');
        const casillaNumero = listaCasillas.shift();
        celda.id = `Casilla${casillaNumero}`;
        const idText = document.createElement('div');
        idText.classList.add('casillaTexto');
        idText.textContent = casillaNumero;
        celda.appendChild(idText);
        if(casillaNumero===34||casillaNumero===29||casillaNumero===46||casillaNumero===51
            ||casillaNumero===17||casillaNumero===12||casillaNumero===63||casillaNumero===68)
            celda.style.backgroundColor = '#eeeeee';
        else if(casillaNumero===39)celda.style.backgroundColor = '#ffcccc';
        else if(casillaNumero===22)celda.style.backgroundColor = '#ccccff';
        else if(casillaNumero===56)celda.style.backgroundColor = '#ccffcc';
        else if(casillaNumero===5) celda.style.backgroundColor = '#ffffcc';
    }else if(celdaType==='projo'){
        celda.classList.add('pasillo', celdaType);
        celda.id = `Casilla${35+pasilloCont++}Rojo`;
    }else if(celdaType==='pverde'){
        celda.classList.add('pasillo', celdaType);
        celda.id = `Casilla${53+pasilloCont++}Verde`;
    }else if(celdaType==='pamarillo'){
        celda.classList.add('pasillo', celdaType);
        celda.id = `Casilla${69+pasilloCont++}Amarillo`;
    }else if(celdaType==='pazul'){
        celda.classList.add('pasillo', celdaType);
        celda.id = `Casilla${25-pasilloCont++}Azul`;
    }else if(celdaType==='casa'){
        celda.classList.add('casa', 'seguro');
    }else{celda.classList.add('centro');}

    if(celda.id === 'Casilla-14-14'){celda.id = 'Casilla100'}
    if(celda.id === 'Casilla-14-15'){celda.id = 'Casilla101'}
    if(celda.id === 'Casilla-15-14'){celda.id = 'Casilla102'}

    if(celda.id === 'Casilla-3-3'){celda.id = 'Casilla103'}
    if(celda.id === 'Casilla-3-4'){celda.id = 'Casilla104'}
    if(celda.id === 'Casilla-4-3'){celda.id = 'Casilla105'}

    if(celda.id === 'Casilla-3-14'){celda.id = 'Casilla106'}
    if(celda.id === 'Casilla-3-15'){celda.id = 'Casilla107'}
    if(celda.id === 'Casilla-4-14'){celda.id = 'Casilla108'}

    if(celda.id === 'Casilla-14-3'){celda.id = 'Casilla109'}
    if(celda.id === 'Casilla-14-4'){celda.id = 'Casilla110'}
    if(celda.id === 'Casilla-15-3'){celda.id = 'Casilla111'}
    return celda;
}

function inicializarTablero() {
    const tableroElement = document.getElementById('tablero');
    tableroElement.innerHTML = '';
    pasilloCont = 0;
    piezas=[
        {pos:"Casilla100",color:"#ffffcc"},
        {pos:"Casilla101",color:"#ffffcc"},
        {pos:"Casilla102",color:"#ffffcc"},
        {pos:"Casilla103",color:"#ffcccc"},
        {pos:"Casilla104",color:"#ffcccc"},
        {pos:"Casilla105",color:"#ffcccc"},
        {pos:"Casilla106",color:"#ccccff"},
        {pos:"Casilla107",color:"#ccccff"},
        {pos:"Casilla108",color:"#ccccff"},
        {pos:"Casilla109",color:"#ccffcc"},
        {pos:"Casilla110",color:"#ccffcc"},
        {pos:"Casilla111",color:"#ccffcc"}
    ];

    tableroLayout.forEach((row, rowIndex) => {
        row.forEach((celdaType, colIndex) => {
            const celda = createCelda(celdaType, rowIndex, colIndex);
            tableroElement.appendChild(celda);
        });
    });

    piezas.forEach((pieza,index) => {
        placePieza(pieza.pos,pieza.color,index);
    });
}

//Estadisticas

document.getElementById('cerrarEstadisticas').addEventListener('click', () => {
    document.getElementById('estadisticasContainer').style.display= 'none';
});

//RANKING

async function mostrarRanking(){
    try {
        const response = await axios.get(urlServer + '/ranking');
        response.data[0].forEach(ranking =>{
            const fila = document.createElement("tr");
            const celdaIndice = document.createElement("td");
            console.log(ranking);
            celdaIndice.textContent = String(ranking['indice']);
            fila.appendChild(celdaIndice);
            const celdaNombre = document.createElement("td");
            celdaNombre.textContent = ranking['ganador'];
            fila.appendChild(celdaNombre);
            const celdaVictorias = document.createElement("td");
            celdaVictorias.textContent = String(ranking['victorias']);
            fila.appendChild(celdaVictorias);
            document.getElementById('rankingTable').appendChild(fila);
        });
    } catch (error) {
        console.log('Error al mostrar ranking:', error);
    }
}

//INICIACION

document.addEventListener('DOMContentLoaded', () => {
    inicializarTablero();
});

//MENU PRINCIPAL

function mostrarTablero() {
    document.getElementById('menu').style.display = 'none';
    esconderContenido();
    document.getElementById('juegoContainer').style.display = 'block';
};

document.getElementById('agregarPartida').addEventListener('click', () => {
    agregarPartida();
    mostrarTablero();
    document.getElementById('jugadorUno').innerHTML = document.getElementById('nomUsuario').value;
});

document.getElementById('manejarpartidas').addEventListener('click', () => {
    esconderContenido();
    document.getElementById('partidasContainer').style.display = 'block';
    mostrarPartidas();
    temporizadorPartidas = setInterval(mostrarPartidas, 3000);
});

document.getElementById('ranking').addEventListener('click', () => {
    esconderContenido();
    mostrarRanking();
    document.getElementById('rankingContainer').style.display = 'block';
});

document.getElementById('reglas').addEventListener('click', () => {
    esconderContenido();
    document.getElementById('reglasContainer').style.display = 'block';
});

document.getElementById('iniciosesion').addEventListener('click', () => {
    const nomUsuario = document.getElementById('nomUsuario');
    if (nomUsuario.value !== '') {
        esconderContenido();
        mostrarPartidas();
        nomUsuario.classList.remove('invalid');
        document.getElementById('jugadorUno').textContent = document.getElementById('nomUsuario').value;
        document.getElementById('menu').style.display = 'block';
        document.getElementById('partidasContainer').style.display = 'block';
        document.getElementById('bienvenida').style.display = 'none';
    }else {
        nomUsuario.classList.add('invalid');
        nomUsuario.placeholder = 'Ingrese su nombre de usuario';
    }
    temporizadorPartidas = setInterval(mostrarPartidas, 3000);
});

function esconderContenido() {
    clearInterval(temporizadorPartidas);
    const contentElements = document.querySelectorAll('.contenido');
    contentElements.forEach(element => {
        element.style.display = 'none';
    });
}

//MANEJO DE PARTIDAS

async function mostrarPartidas() {
    const partidas = await mostrarPartidasServidor();
    const partidasListElement = document.getElementById('partidasList');
    const partidasIds = partidas.map(partida => partida.id);

    // Eliminar partidas que ya no están en la lista recibida
    Array.from(partidasListElement.children).forEach(child => {
        if (!partidasIds.includes(child.id)) {
            partidasListElement.removeChild(child);
        }
    });

    partidas.forEach(partida => {
        let partidaItem = document.getElementById(partida.id);

        if (!partidaItem) {
            // Crear nuevo elemento si no existe
            partidaItem = document.createElement('li');
            partidaItem.classList.add('partida-item');
            partidaItem.id = partida.id;

            const nombrePartidaElement = document.createElement('strong');
            nombrePartidaElement.textContent = `${partida.creador}`;
            partidaItem.appendChild(nombrePartidaElement);

            const detallesDiv = document.createElement('div');
            detallesDiv.classList.add('detalles-partida');
            detallesDiv.innerHTML = `
                <p>Id de la Sala: ${partida['id']}</p>
                <p>Número de jugadores: ${partida['jugadoresUnidos']} / ${partida['tamanoJugadores']}</p>
                <p>Estado: ${partida['jugadoresUnidos']===partida['tamanoJugadores'] ? 'En curso' : 'No iniciado'}</p>
                <button>Ingresar</button>
            `;
            detallesDiv.style.display = 'none';
            partidaItem.appendChild(detallesDiv);
            partidaItem.addEventListener('click', function() {
                const isExpanded = detallesDiv.style.display === 'block';
                detallesDiv.style.display = isExpanded ? 'none' : 'block';
            });
            const button = detallesDiv.querySelector('button');
            if (!button) {
                const newButton = document.createElement('button');
                newButton.textContent = 'Ingresar';
                newButton.setAttribute('onclick', `unirsePartida('${partida.id}')`);
                detallesDiv.appendChild(newButton);
            } else {
                button.setAttribute('onclick', `unirsePartida('${partida.id}')`);
            }
            document.getElementById('partidasList').appendChild(partidaItem);
        }
    });
}

/**
 * 
 * @returns {[]}
 */
async function mostrarPartidasServidor(){
    try {
        const response = await axios.get(urlServer + '/partidas');
        return response.data;
    } catch (error) {
        console.log('Error al mostrar partidas:', error);
        return [];
    }
}

async function agregarPartida(){
    const cantidadPersonas = parseInt(document.getElementById("numeroJugadores").value);
    try {
        const nombreJugador = document.getElementById('nomUsuario').value;
        const response = await axios.post(urlServer + "/partida", {nombreJugador, cantidadPersonas});
        gameData= response.data;
        gameData['yo'] = nombreJugador;
        const idPartida = response.data['id'];
        socket.emit('joinRoom', {idPartida, nombreJugador});
        document.getElementById('creadorJuego').innerText = nombreJugador;
        document.getElementById('idSala').innerText = idPartida;
        document.getElementById('cantMaxJugadores').innerHTML = response.data['tamanoJugadores'];

    } catch (error) {
        console.error('Error al agregar partidas:', error);
    }
}

document.getElementById('salirPartida').addEventListener('click', () => {
    salirPartida();
    esconderContenido();
    document.getElementById('menu').style.display = 'block';
    document.getElementById('partidasContainer').style.display = 'block';
});

async function salirPartida(){
    try {
        const idPartida= gameData.id;
        const nombreJugador= gameData.creador;
        const response = await axios.post(urlServer+"/partida/salir",{idPartida, nombreJugador});
    } catch (error) {
        console.log("No se logro cerra partida")
    }
}



window.unirsePartida = async function(idPartida){
    const nombreJugador = document.getElementById('nomUsuario').value;
    try {
        esconderContenido();
        const response = await axios.post(urlServer + "/partida/unirse", {idPartida, nombreJugador});
        socket.emit('joinRoom', {idPartida, nombreJugador});
        gameData = {'id': idPartida, 'yo' : nombreJugador};
        mostrarTablero();
        document.getElementById('idSala').innerText = idPartida;
        document.getElementById('cantMaxJugadores').innerText = response.data.resultado['cantidad'];
        actualizarJugadores(response.data.resultado);
    } catch (error) {
        console.log('No se puede unir');
    }
}

socket.on('jugadorUnido', (data) => {
    const jugadores = data.resultado;
    actualizarJugadores(jugadores);
});

function actualizarJugadores(jugadores){
    document.getElementById('jugadorUno').innerText = jugadores['jugadorUno'];
    document.getElementById('circuloUno').innerText = jugadores['jugadorUno'][0];
    document.getElementById('circuloUno').title = jugadores['jugadorUno'];
    document.getElementById('creadorJuego').innerText = jugadores['jugadorUno'];
    document.getElementById('cantJugadores').innerText = Object.keys(jugadores).length - 2;
    if(jugadores['jugadorDos'] != undefined){
        document.getElementById('jugadorDos').innerText = jugadores['jugadorDos'];
        document.getElementById('circuloDos').innerText = jugadores['jugadorDos'][0];
        document.getElementById('circuloDos').title = jugadores['jugadorDos'];
    }
    if(jugadores['jugadorTres'] !== undefined){
        document.getElementById('jugadorTres').innerText = jugadores['jugadorTres'];
        document.getElementById('circuloTres').innerText = jugadores['jugadorTres'][0];
        document.getElementById('circuloTres').title = jugadores['jugadorTres'];
    }
    if(jugadores['jugadorCuatro'] !== undefined){
        document.getElementById('jugadorCuatro').innerText = jugadores['jugadorCuatro'];
        document.getElementById('circuloCuatro').innerText = jugadores['jugadorCuatro'][0];
        document.getElementById('circuloCuatro').title = jugadores['jugadorCuatro'];
    }
    if(jugadores['estado'] === 'OK')
        document.getElementById('tirardado').style.display = 'block';
}

document.getElementById('buscarPartida').addEventListener('click', () => {
    const terminoBusqueda = document.getElementById('busquedaPartida').value.trim().toLowerCase();
    const partidas = document.getElementById('partidasList').querySelectorAll('li');

    partidas.forEach(partida => {
        const nombrePartida = partida.querySelector('strong').textContent.toLowerCase();
        const idPartida = partida.id.toLowerCase();

        if (nombrePartida.includes(terminoBusqueda) || idPartida.includes(terminoBusqueda)) {
            partida.removeAttribute('style');
        } else {
            partida.style.display = 'none';
        }
    });
});

//MANEJO DE DADO

const dado = document.getElementById('dado');

function rollDado(number) {
    let rotations = {
        1: [0, 0],
        2: [0, -90],
        3: [0, 180],
        4: [0, 90],
        5: [-90, 0],
        6: [90, 0]
    };

    let [x, y] = rotations[number];
    dado.style.transform = `rotateX(${x}deg) rotateY(${y}deg)`;
}
function startRolling(number) {
    let randomX = 0;
    let randomY = 0;
    let interval = setInterval(() => {
        randomY = (randomY + 90);
        randomX = (randomX + 90);
        dado.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg)`;
    }, 100);

    setTimeout(() => {
        clearInterval(interval);
        if (number >= 1 && number <= 6) {
            rollDado(number);
        } else {
            alert("Por favor, introduce un número válido entre 1 y 6.");
        }
    }, 3000);
}

let numDado = 0;
let numDadoAux = 0;


document.getElementById('tirardado').addEventListener('click', function (){
    document.getElementById('tirardado').style.display = 'none';
    socket.emit('tirarDado', gameData['id'], gameData['yo']);
});

socket.on('observarNumero', (nombrePersona, numero) => {
    console.log(nombrePersona, numero)
    if(nombrePersona == gameData['yo'])
        startRolling(numero);
})

socket.on('dadoTirado', (jugador) => {
    if(jugador.primero == gameData.yo)
        document.getElementById('tirardado').style.display = 'block';
    else
        document.getElementById('tirardado').style.display = 'none';
});

socket.on('dadoTiradoJuego', (numero, nombreJugador, movimientos, siguiente) => {
    startRolling(numero);
    if(nombreJugador == gameData.yo)
        numDado = 1;
    if(movimientos['numero'] != undefined){
        const numeroFicha = calcularNumeroDesdeServidor(movimientos['numero']);
        const colorFicha = calcularColorDesdeServidor(movimientos['color']);
        const nuevaPosicion = movePiezaEnRango(movimientos['destino'], 500, colorFicha, numeroFicha);
        piezas[numeroFicha].pos = nuevaPosicion;
    }
});
//MANEJO DE PIEZAS

function generarCamino(posicion, pasos){
    let cadena = posicion;
    let lista = [];
    let original = posicion;
    if(posicion === 'Casilla100' || posicion === 'Casilla101' || posicion === 'Casilla102'){posicion = 'Casilla5'}
    if(posicion === 'Casilla103' || posicion === 'Casilla104' || posicion === 'Casilla105'){posicion = 'Casilla39'}
    if(posicion === 'Casilla106' || posicion === 'Casilla107' || posicion === 'Casilla108'){posicion = 'Casilla22'}
    if(posicion === 'Casilla109' || posicion === 'Casilla110' || posicion === 'Casilla111'){posicion = 'Casilla56'}
    let numero = parseInt(posicion.match(/\d+/)[0]);
    for (let index = 0; index <= pasos; index++) {
        lista[index] = cadena.replace(/\d+/, (numero + index)%69);
        cadena = posicion;
        if((numero + index)%69 == 0){pasos++;}
    }
    if(original === 'Casilla100' || original === 'Casilla101' || original === 'Casilla102' 
        || original === 'Casilla103' || original === 'Casilla104' || original === 'Casilla105' 
        || original === 'Casilla106' || original === 'Casilla107' || original === 'Casilla108' 
        || original === 'Casilla109' || original === 'Casilla110' || original === 'Casilla111'){lista.unshift(original);}
    return lista.filter(elemento => elemento !== 'Casilla0');
}

function placePieza(celdaId, colors, piezaId) {
    const celda = document.getElementById(celdaId);
    const existingPiezas = celda.querySelectorAll('.pieza');
    const pieza = document.createElement('div');
    pieza.classList.add('pieza');
    if (existingPiezas.length > 0) {
        existingPiezas.forEach(p => {
            p.style.borderRadius = '0%'
            const colorDiv = document.createElement('div');
            colorDiv.classList.add('color');
            colorDiv.style.backgroundColor = p.style.backgroundColor;
            pieza.appendChild(colorDiv);
        });
        pieza.style.borderRadius = '0%';
        const colorDiv = document.createElement('div');
        colorDiv.classList.add('color');
        colorDiv.style.backgroundColor = colors;
        pieza.appendChild(colorDiv);
    }
    pieza.style.backgroundColor = colors;
    celda.appendChild(pieza);
    pieza.addEventListener('click', function () {
        if(numDado!==0){
            numDadoAux = numDado;
            numDado=0;
            console.log(piezas[piezaId].pos, piezas[piezaId].color, piezaId);
            moverPiezaServidor(piezas[piezaId].pos, piezas[piezaId].color, piezaId);
        }
    });
}

function moverPiezaServidor(posicionActual, color, piezaId){
    console.log('mover 1')
    const idPartida = gameData.id;
    console.log('mover 2')
    const nombreJugador = gameData.yo;
    console.log('mover 3')
    color = calcularColorHaciaServidor(color);
    console.log('mover 4')
    const numero = calcularNumeroHaciaServidor(piezaId);
    console.log('mover 5')
    socket.emit('moverFichaServidor', idPartida, nombreJugador, color, numero, posicionActual);
    console.log('mover 6')
}

socket.on('moverFicha', (movimientos, siguiente) => {
    if(movimientos != null){
        movimientos.forEach(movimiento => {
            console.log(movimientos);
            const color = calcularColorDesdeServidor(movimiento['color']);
            const numero = calcularNumeroDesdeServidor(movimiento['numero']);
            const nuevaPosicion = movePiezaEnRango(movimiento['camino'], 500, color, numero);
            console.log(color, numero, nuevaPosicion);
            piezas[numero].pos = nuevaPosicion;
        })
    }
    else
        numDado = numDadoAux;
    if(siguiente == gameData.yo && movimientos != null)
        document.getElementById('tirardado').style.display = 'block';
    else
        document.getElementById('tirardado').style.display = 'none';
});

function calcularColorHaciaServidor(color){
    if(color == '#ffffcc')
        return 'amarillo';
    if(color == '#ffcccc')
        return 'rojo';
    if(color == '#ccccff')
        return 'azul';
    return 'verde';
}

function calcularColorDesdeServidor(color){
    if(color == 'amarillo')
        return '#ffffcc';
    if(color == 'rojo')
        return '#ffcccc';
    if(color == 'azul')
        return '#ccccff';
    return '#ccffcc';
}

function calcularNumeroHaciaServidor(numero){
    if(numero <= 2)
        return numero + 1;
    if(numero >= 3 && numero <= 5)
        return numero - 2;
    if(numero >= 6 && numero <= 8)
        return numero - 5;
    return numero - 8;
}

function calcularNumeroDesdeServidor(numero){
    if(numero <= 2)
        return numero - 1;
    if(numero >= 3 && numero <= 5)
        return numero + 2;
    if(numero >= 6 && numero <= 8)
        return numero + 5;
    return numero + 8;
}

function removePieza(celdaId) {
    const celda = document.getElementById(celdaId);
    if (celda) {
        const pieza = celda.querySelector('.pieza');
        if (pieza) {
            if (pieza.style.borderRadius === '0%') {
                var obcolor= pieza.style.backgroundColor;
                celda.querySelectorAll('.pieza').forEach(p => {
                    p.style.borderRadius = '50%';
                    p.querySelectorAll('.color').forEach(color => {
                        if(color.style.backgroundColor!==p.style.backgroundColor)
                            obcolor=color.style.backgroundColor;
                        p.removeChild(color);
                    });
                    p.style.backgroundColor=obcolor;
                });celda.removeChild(pieza);
                return;
            }
            const textoSpan = document.createElement('span');
            textoSpan.textContent = celda.textContent;
            textoSpan.style.position = 'absolute';
            textoSpan.style.top = '50%';
            textoSpan.style.left = '50%';
            textoSpan.style.transform = 'translate(-50%, -50%)';
            textoSpan.style.fontFamily = "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif";
            textoSpan.style.fontSize = '10px';
            textoSpan.style.color = '#bbbbbb'
            celda.appendChild(textoSpan);
            celda.removeChild(pieza);
        } else {
            console.error('There is no pieza in this celda');
        }
    } else {
        console.error('Invalid celda ID');
    }
}

function movePiezaEnRango(rangoCasillas, intervalo,color,piezaId) {
    let index = 0;
    console.log(rangoCasillas, intervalo,color,piezaId);
    const moveInterval = setInterval(() => {
        if (index < rangoCasillas.length) {
            if (index > 0) {
                removePieza(rangoCasillas[index - 1]);
                placePieza(rangoCasillas[index], color,piezaId);
            }
            index++;
        } else {
            clearInterval(moveInterval);
        }
    }, intervalo);
    return rangoCasillas[rangoCasillas.length-1];
}
