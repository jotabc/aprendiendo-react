import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from 'components/Square'
import { WinnerModal } from 'components/WinnerModal'
import { Board } from 'components/Board'
import { TURNS } from './constants'
import { checkEndGame, checkWinnerFrom } from 'logic/board'
import { resetGameStorage, saveGameToStorage } from 'logic/storage'

function App () {
  const [winner, setWinner] = useState(null)
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnsFromStorage = window.localStorage.getItem('turn')
    return turnsFromStorage ?? TURNS.X
  })

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  const updateBoard = (index) => {
    // no actualiza la posicion si ua tiene un valor
    if (board[index] || winner) return
    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // cambia el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // guardar partida
    saveGameToStorage({
      board: newBoard,
      newTurn
    })
    // revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset game</button>
      <Board
        board={board}
        updateBoard={updateBoard}
      />
      {/* TURNS */}
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal
        winner={winner}
        resetGame={resetGame}
      />
    </main>
  )
}

export default App
