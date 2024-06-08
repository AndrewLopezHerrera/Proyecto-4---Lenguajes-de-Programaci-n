document.addEventListener('DOMContentLoaded', () => {
    const tableroElement = document.getElementById('tablero');
    const btnCrear = document.getElementById('crearpartida');

    const tableroLayout = [
        ['rojo', 'rojo','rojo', 'rojo', 'rojo', 'rojo', 'rojo', 'rojo', 'casilla', 'casilla', 'casilla', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo'],
        ['rojo', 'rojo','rojo', 'rojo', 'rojo','rojo', 'rojo', 'rojo', 'casilla', 'projo', 'casilla', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo'],
        ['rojo', 'rojo','casa', 'casa', 'casa', 'casa', 'rojo', 'rojo', 'casilla', 'projo', 'casilla', 'amarillo', 'amarillo', 'casa', 'casa', 'casa', 'casa', 'amarillo', 'amarillo'],
        ['rojo', 'rojo','casa', 'casa', 'casa', 'casa', 'rojo', 'rojo', 'casilla', 'projo', 'casilla', 'amarillo', 'amarillo', 'casa', 'casa', 'casa', 'casa', 'amarillo', 'amarillo'],
        ['rojo', 'rojo','casa', 'casa', 'casa', 'casa', 'rojo', 'rojo', 'casilla', 'projo', 'casilla', 'amarillo', 'amarillo', 'casa', 'casa', 'casa', 'casa', 'amarillo', 'amarillo'],
        ['rojo', 'rojo','casa', 'casa', 'casa', 'casa', 'rojo', 'rojo', 'casilla', 'projo', 'casilla', 'amarillo', 'amarillo', 'casa', 'casa', 'casa', 'casa', 'amarillo', 'amarillo'],
        ['rojo', 'rojo','rojo', 'rojo', 'rojo','rojo', 'rojo', 'rojo', 'casilla', 'projo', 'casilla', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo'],
        ['rojo', 'rojo','rojo', 'rojo', 'rojo', 'rojo', 'rojo', 'rojo', 'casilla', 'projo', 'casilla', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo', 'amarillo'],
        ['casilla', 'casilla','casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'centro', 'projo', 'centro', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla'],
        ['casilla', 'pverde', 'pverde', 'pverde', 'pverde', 'pverde', 'pverde', 'pverde', 'pverde', 'centro', 'pazul', 'pazul', 'pazul', 'pazul', 'pazul', 'pazul', 'pazul', 'pazul', 'casilla'],
        ['casilla', 'casilla','casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'centro', 'pamarillo', 'centro', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla', 'casilla'],
        ['verde', 'verde','verde', 'verde', 'verde', 'verde', 'verde', 'verde', 'casilla', 'pamarillo', 'casilla', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul'],
        ['verde', 'verde','verde', 'verde', 'verde', 'verde', 'verde', 'verde', 'casilla', 'pamarillo', 'casilla', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul'],
        ['verde', 'verde','casa', 'casa', 'casa', 'casa', 'verde', 'verde', 'casilla', 'pamarillo', 'casilla', 'azul', 'azul', 'casa', 'casa', 'casa', 'casa', 'azul', 'azul'],
        ['verde', 'verde','casa', 'casa', 'casa', 'casa', 'verde', 'verde', 'casilla', 'pamarillo', 'casilla', 'azul', 'azul', 'casa', 'casa', 'casa', 'casa', 'azul', 'azul'],
        ['verde', 'verde','casa', 'casa', 'casa', 'casa', 'verde', 'verde', 'casilla', 'pamarillo', 'casilla', 'azul', 'azul', 'casa', 'casa', 'casa', 'casa', 'azul', 'azul'],
        ['verde', 'verde','casa', 'casa', 'casa', 'casa', 'verde', 'verde', 'casilla', 'pamarillo', 'casilla', 'azul', 'azul', 'casa', 'casa', 'casa', 'casa', 'azul', 'azul'],
        ['verde', 'verde','verde', 'verde', 'verde', 'verde', 'verde', 'verde', 'casilla', 'pamarillo', 'casilla', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul'],
        ['verde', 'verde','verde', 'verde', 'verde', 'verde', 'verde', 'verde', 'casilla', 'casilla', 'casilla', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul', 'azul']
    ];

    const listaCasillas = [35,34,33,36,32,37,31,38,30,39,29,40,28,41,27,42,26,50,49,48,47,46,45,44,43,25,24,23,22,21,20,19,18,51,17,52,53,54,55,56,57,58,59,9,10,11,12,13,14,15,16,60,8,61,7,62,6,63,5,64,4,65,3,66,2,67,68,1];
    var pasilloCont=0;

    function createCelda(celdaType, rowIndex, colIndex) {
        const celda = document.createElement('div');
        celda.classList.add('celda');
        celda.id = `Casilla-${rowIndex}-${colIndex}`;

        if(pasilloCont>= 8){pasilloCont = 0;}
        switch (celdaType) {
            case 'rojo':
            case 'azul':
            case 'amarillo':
            case 'verde':
                celda.classList.add('casa', celdaType);
                break;
            case 'casilla':
                celda.classList.add('casilla');
                const casillaNumero = listaCasillas.shift();
                celda.id = `Casilla${casillaNumero}`;
                const idText = document.createElement('div');
                idText.classList.add('casillaTexto');
                idText.textContent = casillaNumero;
                celda.appendChild(idText);
                switch(casillaNumero){
                    case 34:
                    case 29:
                    case 46:
                    case 51:
                    case 17:
                    case 12:
                    case 63:
                    case 68:
                        celda.style.backgroundColor = '#eeeeee';
                        break;
                    case 39:
                        celda.style.backgroundColor = '#ffcccc';
                        break;
                    case 22:
                        celda.style.backgroundColor = '#ccccff';
                        break;
                    case 56:
                        celda.style.backgroundColor = '#ccffcc';
                        break;
                    case 5:
                        celda.style.backgroundColor = '#ffffcc';
                        break;
                }
                break;
            case 'projo':
                celda.classList.add('pasillo', celdaType);
                celda.id = `Casilla${35+pasilloCont++}Rojo`;
                break;
            case 'pverde':
                celda.classList.add('pasillo', celdaType);
                celda.id = `Casilla${53+pasilloCont++}Verde`;
                break;
            case 'pamarillo':
                celda.classList.add('pasillo', celdaType);
                celda.id = `Casilla${69+pasilloCont++}Amarillo`;
                break;
            case 'pazul':
                celda.classList.add('pasillo', celdaType);
                celda.id = `Casilla${25-pasilloCont++}Azul`;
                break;
            case 'casa':
                celda.classList.add('casa', 'seguro');
                break;
            case 'centro':
                celda.classList.add('centro');
                break;
        }

        return celda;
    }

    tableroLayout.forEach((row, rowIndex) => {
        row.forEach((celdaType, colIndex) => {
            const celda = createCelda(celdaType, rowIndex, colIndex);
            tableroElement.appendChild(celda);
        });
    });

    const socket = new WebSocket('wss://your-localtunnel-url');

    socket.addEventListener('open', () => {
        console.log('Connected to server');
    });

    socket.addEventListener('message', (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
    });

    socket.addEventListener('close', () => {
        console.log('Disconnected from server');
    });

    socket.addEventListener('error', (error) => {
        console.error('WebSocket error: ' + error);
    });

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
                            if(color.style.backgroundColor!=p.style.backgroundColor)
                                obcolor=color.style.backgroundColor;
                            p.removeChild(color);
                            console.log(color.style.backgroundColor);
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
                placePieza(rangoCasillas[index], color);
                if (index > 0) {
                    removePieza(rangoCasillas[index - 1]);
                }
                index++;
            } else {
                clearInterval(moveInterval);
            }
        }, intervalo);
    }

    const rangoCasillas = ['Casilla18','Casilla19','Casilla20','Casilla21','Casilla22'];
    const intervalo = 500;

    btnCrear.addEventListener('click', function () {
        if(tableroElement.style.display == 'none')
            tableroElement.style.display = 'grid';
        else tableroElement.style.display = 'none';
    });

    movePiezaEnRango(rangoCasillas,intervalo,'#ff0000');

    //placePieza('Casilla17', '#7575ff');
    placePieza('Casilla19', '#7575ff');
});
