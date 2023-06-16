import { Button } from '@mui/material'
import { useQuestionStore } from '../store/questions'

export function Start () {
  const fetcQuestions = useQuestionStore(state => state.fetchQuetions)

  const handleClick = () => {
    fetcQuestions(5)
  }
  return (
    <Button onClick={handleClick} variant='contained'>
      ¡Empezar!
    </Button>
  )
}
