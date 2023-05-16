import { WINNER_COMBOS } from "../constants"

export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a]
    }
  }

  // si no hay ganador
  return null
}

export const checkEndGame = (newBoard) => {
  // every le decimos si todos los square todos o todos lo elementos del array son null en este caso.
  return newBoard.every((square) => square !== null)
}