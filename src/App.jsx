import { useState } from "react";

// Componente Square //

function Square({value, onSquareClick}) { // Esto son las propiedades que el componente recibe cuando se usa (props)

  return (
    <button className="square" onClick={onSquareClick}>
      {value}  
    </button> // Value, contenido de la casilla, puede ser "X", "0" o null (se muestra dentro del button)
  );  
}



// Tablero del 3 en raya //

function Board({ xIsNext, squares, onPlay }) { // Props de Board, xIsNext = indica si el turno es X o 0, squares representa el estado actual del tablero, onPlay es una función que el componente Board llama cuando se actualiza el tablero
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) { // Si ya hay un ganador, devuelve un valor distinto de null y no deja hacer mas clics
      return;
    }
    const nextSquares = squares.slice(); // Copia del array squares, no se debe modificar directamente el estado
    if (xIsNext) { // Actualizar la casilla seleccionada
      nextSquares[i] = `X`;
    } else {
      nextSquares[i] = `0`;
    }
    onPlay(nextSquares); // LLamas a onPlay, en lugar de actualizar directamente el estado del tablero, llama a la función onPlay y le pasa el nuevo tablero (nextSquares)
  }
  
    // Este cambio sigue un principio clave de React: elevar el estado

        // Antes: El estado del tablero (squares) y el turno (xIsNext) estaban dentro del componente Board
        // Ahora: Estos estados se gestionan en un nivel superior, es el componente padre quien actualiza el estado = Game  //



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


// Componente principal del 3 en raya, componente padre. Gestiona el estado global del juego (turnos, historial, tablero actual...) //

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]); // Indica de quien es el turno actual, true=X, false=0
  const currentSquares = history[history.length - 1]; // History es un array que guarda el historial de todos los tableros, cada vez que se hace una jugada, se agrega una copia del nuevo tablero al historial

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares]); //Crea un nuevo array copiando el historial actual (...history) y añade el nuevo tablero (nextSquares), así se guarda el estado del tablero despues de la jugada
    setXIsNext(!xIsNext); 
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} /> 
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>  // El tablero no actualiza el estado directamente, llama al handPlay cuando hay una jugada, pasando el nuevo tablero como argumento
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
