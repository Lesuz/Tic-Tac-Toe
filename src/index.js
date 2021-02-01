import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// component Square
const Square = (props) => {

  return (
    <button 
      className="square"
      onClick={props.onClickEvent}
    >
      {props.value}
    </button>
  )
}

// component Board
const Board = () => {

  // Making an array which has a value of null for each square
  const initialSquares = Array(9).fill(null);

  const [squares, setSquares] = useState(initialSquares)
  const [xIsNext, setXIsNext] = useState(true);

  const handleClickEvent = (i) => {

    // Make a copy of square state array
    const newSquares = [...squares]


    const winnerDeclared = Boolean(calculateWinner(newSquares))
    const squareFilled = Boolean(newSquares[i])
    if (winnerDeclared || squareFilled) {
      return;
    }

    // Mutate the copy, setting the i-th element to 'X'
    newSquares[i] = xIsNext ? 'X' : 'O'
    // Call the setSquares function with the mutated copy
    setSquares(newSquares)
    // Set the displayd player sign to the other one
    setXIsNext(!xIsNext)
  }

  // rendering each square with their own clickevent and value
  const renderSquare = (i) => {
    return(
      <Square 
        value={squares[i]}
        onClickEvent={() => handleClickEvent(i)}
      />
    )
  }

  const winner = calculateWinner(squares)
  const status = winner ?  
    `Winner: ${winner}` :
    `Next player: ${xIsNext ? 'X' : 'O'}`

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
    </div>
  )
}

const Game = () => {
  return (
    <div className="game">
      Tic-Tac-Toe
      <Board/>
    </div>
  )
}

ReactDOM.render(<Game />, document.getElementById('root'))

function calculateWinner(squares){

  // all possible winning lines
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // winning rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // winning columns
    [0, 4, 8], [2, 4, 6] // winning diagonials
  ]

  for(let line of lines) {
    const [a, b, c] = line;
    
    if( squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a] // X or O
    }
  }

  return null
}