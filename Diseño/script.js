document.addEventListener('DOMContentLoaded', () => {
    const boardElement = document.getElementById('board');

    const boardLayout = [
        ['red','red', 'red', 'red', 'red', 'red', 'path', 'path', 'path', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
        ['red','home', 'home', 'home', 'home', 'red', 'path', 'goal', 'path', 'yellow', 'home', 'home', 'home', 'home', 'yellow'],
        ['red','home', 'home', 'home', 'home', 'red', 'path', 'goal', 'path', 'yellow', 'home', 'home', 'home', 'home', 'yellow'],
        ['red','home', 'home', 'home', 'home', 'red', 'path', 'goal', 'path', 'yellow', 'home', 'home', 'home', 'home', 'yellow'],
        ['red','home', 'home', 'home', 'home', 'red', 'path', 'goal', 'path', 'yellow', 'home', 'home', 'home', 'home', 'yellow'],
        ['red','red', 'red', 'red', 'red', 'red', 'path', 'goal', 'path', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow', 'yellow'],
        ['path','path', 'path', 'path', 'path', 'path', 'path', 'goal', 'path', 'path', 'path', 'path', 'path', 'path', 'path'],
        ['path','goal', 'goal', 'goal', 'goal', 'goal', 'goal', 'center', 'goal', 'goal', 'goal', 'goal', 'goal', 'goal', 'path'],
        ['path','path', 'path', 'path', 'path', 'path', 'path', 'goal', 'path', 'path', 'path', 'path', 'path', 'path', 'path'],
        ['green','green', 'green', 'green', 'green', 'green', 'path', 'goal', 'path', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue'],
        ['green','home', 'home', 'home', 'home', 'green', 'path', 'goal', 'path', 'blue', 'home', 'home', 'home', 'home', 'blue'],
        ['green','home', 'home', 'home', 'home', 'green', 'path', 'goal', 'path', 'blue', 'home', 'home', 'home', 'home', 'blue'],
        ['green','home', 'home', 'home', 'home', 'green', 'path', 'goal', 'path', 'blue', 'home', 'home', 'home', 'home', 'blue'],
        ['green','home', 'home', 'home', 'home', 'green', 'path', 'goal', 'path', 'blue', 'home', 'home', 'home', 'home', 'blue'],
        ['green','green', 'green', 'green', 'green', 'green', 'path', 'path', 'path', 'blue', 'blue', 'blue', 'blue', 'blue', 'blue']
    ];

    // Crear el tablero de Parchís
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            const cellType = boardLayout[i][j];
            if (cellType === 'red' || cellType === 'blue' || cellType === 'yellow' || cellType === 'green') {
                cell.classList.add('home-base', cellType);
            } else if (cellType === 'path') {
                cell.classList.add('path');
            } else if (cellType === 'goal') {
                cell.classList.add('goal');
            } else if (cellType === 'home') {
                cell.classList.add('home-base', 'safe-zone');
            }

            boardElement.appendChild(cell);
        }
    }

    // Conectar con el backend usando LocalTunnel
    const socket = new WebSocket('wss://your-localtunnel-url');

    socket.onopen = function() {
        console.log('Connected to server');
    };

    socket.onmessage = function(event) {
        const data = JSON.parse(event.data);
        // Actualizar la interfaz de usuario con los datos recibidos del servidor
        console.log(data);
    };

    socket.onclose = function() {
        console.log('Disconnected from server');
    };

    socket.onerror = function(error) {
        console.error('WebSocket error: ' + error);
    };

    // Función para mover piezas
    function movePiece(pieceId, targetCellId) {
        socket.send(JSON.stringify({ action: 'move', pieceId, targetCellId }));
    }

    // Añadir eventos de clic a las celdas del tablero
    document.querySelectorAll('.cell').forEach(cell => {
        cell.addEventListener('click', () => {
            // Eliminar cualquier ficha existente en la celda
            if (cell.children.length > 0) {
                cell.removeChild(cell.children[0]);
            } else {
                // Crear una nueva ficha y añadirla a la celda
                const piece = document.createElement('div');
                piece.classList.add('piece');
                cell.appendChild(piece);
            }
        });
    });
});

