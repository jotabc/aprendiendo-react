import { Question } from '../components/Question'
import { useQuestionStore } from '../store/questions'

export function Game () {
  const questions = useQuestionStore(state => state.questions)
  const currentQuestions = useQuestionStore(state => state.currentQuestions)

  const questionInfo = questions[currentQuestions]

  return (
    <>
      <Question info={questionInfo} />
    </>
  )
}
