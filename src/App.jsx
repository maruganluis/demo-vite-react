import { useState } from "react";

// Componente Square //

function Square({value, onSquareClick}) {

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );  
}



// Tablero del 3 en raya //

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true); // Alternar entre X y O
  const [squares, setSquares] = useState(Array(9).fill(null)); // Rellenar el tablero de nulls

  function handleClick(i) {
    if (squares[i]) {  // Si la casilla esta ocupada, no deja sobreescribir
      return;
    }
    const nextSquares = squares.slice(); // Crea una copia del tablero
    if (xIsNext) {
      nextSquares[i] = `X`; 
    } else {
      nextSquares[i] = `0`;
    }
    setSquares(nextSquares); // Actualiza el estado del board con la copia slice modificada
    setXIsNext(!xIsNext); // Esto cambia el turno, si era true, ahora será false, y viceversa
  }

    // Mostrar el estado del juego: quién ganó o cuál es el siguiente jugador //

  const winner = calculateWinner(squares); // Recibe el array squares, que es el estado actual del tablero
  let status; // Variable para guardar el mensaje que se mostrará en la pantalla
  if (winner) {
    status = `Ganador: ` + winner; // Si winner tiene un valor (X - O), significa que hay un ganador, y le asigna a status este mensaje
  } else {
    status = `Siguiente jugador: ` + (xIsNext ? `X` : `0`);   // Operador ternario: si xIsNext es true, muestra "X", si xIsNext es false, muestra "0"
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board__row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board__row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board__row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      
    </>
  );
}


// Definir un ganador //

function calculateWinner(squares) {
  const lines = [ // Definición de posibles combinaciones ganadoras (lines)
    [0, 1, 2], // Primera fila
    [3, 4, 5], // Segunda fila
    [6, 7, 8], // Tercera fila
    [0, 3, 6], // Primera columna
    [1, 4, 7], // Segunda columna
    [2, 5, 8], // Tercera columna
    [0, 4, 8], // Diagonal principal
    [2, 4, 6], // Diagonal secundaria
  ];
  for (let i = 0; i < lines.length; i++) { // Recorre cada combinación ganadora (lines[i])
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) { // Comprueba si hay un ganador
      return squares[a];
    }
  }
return null; // Si el bucle termina sin encontrar una línea ganadora, significa que no hay un ganador aún, devuelve null
}
