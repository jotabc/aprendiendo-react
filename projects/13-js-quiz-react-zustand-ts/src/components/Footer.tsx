import { useQuestionsData } from '../hooks/useQuestionsData'

export function Footer () {
  const { correct, incorrect, unanswered } = useQuestionsData()
  return (
    <footer style={{ textAlign: 'center', marginTop: '1rem' }}>
      <strong>{`${correct} correctas - ${incorrect} incorrectas - ${unanswered} sin contestar`}</strong>
    </footer>
  )
}
