import { Card, IconButton, Stack, Typography } from '@mui/material'
import { useQuestionStore } from '../store/questions'
import { type Question as QuestionType } from '../types.d'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

function Question ({ info }: { info: QuestionType }) {
  return (
    <Card variant='outlined' sx={{ bgcolor: '#222', padding: 2 }}>
      <Typography variant='h5'>
        {info.question}
      </Typography>
      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
    </Card>
  )
}

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
