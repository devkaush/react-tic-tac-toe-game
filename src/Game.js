import React, { useState } from 'react'
import Board from './Board'

export default function Game() {
    const [ticTac, setTicTac] = useState({
        history: [ { squares: Array(9).fill(null) } ], 
        stepNumber:0, xIsNext: true})

    function handleClick(i){
        const history = ticTac.history.slice(0, ticTac.stepNumber+1)
        const current = history[history.length-1]
        const squares = current.squares.slice()
        if(calculateWinner(squares) || squares[i]) return

        squares[i] = ticTac.xIsNext ? 'X':'O'
        const newTicTac = { history : history.concat([{squares: squares}]), stepNumber:history.length, xIsNext : !ticTac.xIsNext}
        setTicTac(newTicTac)
    }

    const history = ticTac.history
    const current = history[ticTac.stepNumber]
    const winner = calculateWinner(current.squares)

    function jumpTo(step){
        setTicTac({history: history, stepNumber: step, xIsNext: (step%2) === 0})
    }

    let status
    if(winner){
        status = "Winner is: " + winner
    }else{
        status = "Next Player is: " + (ticTac.xIsNext ? 'X': 'O')
    }

    const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <div key={move}>
            <button className='movesButton' onClick={() => jumpTo(move)}>{desc}</button>
          </div>
        )
      })


    return (
        <div>
            <div className='gameHeading'>
                <h2>Tic Tac Toe</h2>
            </div>
            <div className='game'>
                <div className="gameBoard">
                  <Board squares = {current.squares} onClick={i => handleClick(i)}/>
                </div>

                <div className='nextWho'>
                    <h3>{status}</h3>
                </div>
                <div className='gameInfo'>
                    <h3>All Moves</h3>
                    <div>{moves}</div>
                </div>
            </div>
            
        </div>
    )

    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
      }
}
