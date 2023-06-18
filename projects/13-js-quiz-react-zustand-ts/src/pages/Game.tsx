import { IconButton, Stack } from '@mui/material'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Question } from '../components/Question'
import { useQuestionStore } from '../store/questions'
import { Footer } from '../components/Footer'

export function Game () {
  const questions = useQuestionStore(state => state.questions)
  const currentQuestions = useQuestionStore(state => state.currentQuestions)
  const goNextQuestion = useQuestionStore(state => state.goNextQuestion)
  const previousQuestion = useQuestionStore(state => state.previousQuestion)

  const questionInfo = questions[currentQuestions]

  return (
    <>
      <Stack direction='row' gap={2} justifyContent='center' alignItems='center'>
        <IconButton onClick={previousQuestion} disabled={currentQuestions === 0}>
          <ArrowBackIosNew />
        </IconButton>

        {currentQuestions + 1} / {questions.length}
        {/* questions.length - 1 => esto significa final del array */}
        <IconButton onClick={goNextQuestion} disabled={currentQuestions >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}
