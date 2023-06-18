import { Button } from '@mui/material'
import { useQuestionsData } from '../hooks/useQuestionsData'
import { useQuestionStore } from '../store/questions'

export function Footer () {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionStore(state => state.reset)

  return (
    <footer style={{ textAlign: 'center', marginTop: '1rem' }}>
      <strong>{`${correct} correctas - ${incorrect} incorrectas - ${unanswered} sin contestar`}</strong>
      <div style={{ marginTop: '1rem' }}>

        <Button onClick={() => reset()}>
          Resetear Juego
        </Button>
      </div>
    </footer>
  )
}
