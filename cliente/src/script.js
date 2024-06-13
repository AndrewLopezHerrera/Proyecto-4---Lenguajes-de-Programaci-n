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

const App = () => {
  const [serverData, setServerData] = useState(null);
  const [idPartida, setIdPartida] = useState('');
  const [nombreJugador, setNombreJugador] = useState('');
  const [dado, setDado] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
    };

    fetchData();
  }, []);

  const handleJoinRoom = () => {
    socket.emit('joinRoom', idPartida);
  };

  const handleTirarDado = async () => {

  };

  return (
    <div>
      <h1>Datos del servidor:</h1>
      {serverData ? (
        <pre>{JSON.stringify(serverData, null, 2)}</pre>
      ) : (
        <p>Cargando...</p>
      )}
      <div>
        <input
          type="text"
          placeholder="ID de la partida"
          value={idPartida}
          onChange={(e) => setIdPartida(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nombre del jugador"
          value={nombreJugador}
          onChange={(e) => setNombreJugador(e.target.value)}
        />
        <button onClick={handleJoinRoom}>Unirse a la partida</button>
        <button onClick={handleTirarDado}>Tirar dado</button>
      </div>
      {dado && <p>Resultado del dado: {dado}</p>}
    </div>
  );
};

export default App;

//PIEZAS

var piezas= [
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

//INICIACION

document.addEventListener('DOMContentLoaded', () => {
    const tableroElement = document.getElementById('tablero');

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
    var pasilloCont=0;

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

    tableroLayout.forEach((row, rowIndex) => {
        row.forEach((celdaType, colIndex) => {
            const celda = createCelda(celdaType, rowIndex, colIndex);
            tableroElement.appendChild(celda);
        });
    });

    piezas.forEach(pieza =>{
        placePieza(pieza.pos,pieza.color);
    })
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
});

document.getElementById('manejarpartidas').addEventListener('click', () => {
    esconderContenido();
    document.getElementById('partidasContainer').style.display = 'block';
    temporizadorPartidas = setInterval(mostrarPartidas, 7000);
});

document.getElementById('ranking').addEventListener('click', () => {
    esconderContenido();
    document.getElementById('rankingContainer').style.display = 'block';
});

document.getElementById('reglas').addEventListener('click', () => {
    esconderContenido();
    document.getElementById('reglasContainer').style.display = 'block';
});

document.getElementById('iniciosesion').addEventListener('click', () => {
    esconderContenido();
    document.getElementById('jugador1').textContent = document.getElementById('nomUsuario').value;
    document.getElementById('menu').style.display = 'block';
    document.getElementById('partidasContainer').style.display = 'block';
    document.getElementById('bienvenida').style.display = 'none';
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
    console.log(partidas);
    const partidasListElement = document.getElementById('partidasList');
    partidasListElement.innerHTML = '';
    partidas.forEach(partida => {
        const partidaItem = document.createElement('li');
        partidaItem.classList.add('partida-item');

        const nombrePartidaElement = document.createElement('strong');
        nombrePartidaElement.textContent = `${partida['creador']}`;

        partidaItem.appendChild(nombrePartidaElement);
        partidaItem.id = partida['id'];

        const detallesDiv = document.createElement('div');
        detallesDiv.classList.add('detalles-partida');
        detallesDiv.innerHTML = `
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
        document.getElementById('partidasList').appendChild(partidaItem);
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
        await axios.post("http://localhost:4000/partida", {nombreJugador, cantidadPersonas});
        mostrarPartidas();
    } catch (error) {
        console.error('Error al agregar partidas:', error);
    }
}

document.getElementById('buscarPartida').addEventListener('click', () => {
    const terminoBusqueda = document.getElementById('busquedaPartida').value.trim().toLowerCase();
    const partidas = document.getElementById('partidasList').querySelectorAll('li');

    partidas.forEach(partida => {
        const nombrePartida = partida.querySelector('strong').textContent.toLowerCase();
        const idPartida = partida.id.toLowerCase();

        if (nombrePartida.includes(terminoBusqueda)|| idPartida.includes(terminoBusqueda)) {
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
function startRolling(pieza,number) {
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
            let camino =generarCamino(pieza.pos,number);
            console.log(camino);
            let nuevapos =movePiezaEnRango(camino,500,pieza.color);
            pieza.pos = nuevapos;
        } else {
            alert("Por favor, introduce un número válido entre 1 y 6.");
        }
    }, 3000);
}

document.getElementById('tirardado').addEventListener('click', function (){
    let random= Math.floor(Math.random() * 6) + 1;
    startRolling(piezas[0],random);
});

//MANEJO DE PIEZAS

function generarCamino(posicion, pasos){
    let cadena = posicion;
    let numero = parseInt(posicion.match(/\d+/)[0]);
    let lista = [];
    for (let index = 0; index <= pasos; index++) {
        lista[index] = cadena.replace(/\d+/, (numero + index)%69);
        cadena = posicion;
    }return lista.filter(elemento => elemento !== 'Casilla0');
}

function placePieza(celdaId, colors) {
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
    }pieza.style.backgroundColor = colors;
    celda.appendChild(pieza);
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

function movePiezaEnRango(rangoCasillas, intervalo,color) {
    let index = 0;
    const moveInterval = setInterval(() => {
        if (index < rangoCasillas.length) {
            if (index > 0) {
                removePieza(rangoCasillas[index - 1]);
                placePieza(rangoCasillas[index], color);
            }
            index++;
        } else {
            clearInterval(moveInterval);
        }
    }, intervalo);
    return rangoCasillas[rangoCasillas.length-1];
}
