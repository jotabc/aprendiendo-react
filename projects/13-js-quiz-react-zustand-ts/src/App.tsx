import { Stack, Typography } from '@mui/material'
import Container from '@mui/material/Container'
import { JavaScriptLogo } from './components/JavaScriptLogo'
import { Start } from './pages/Star'
import { useQuestionStore } from './store/questions'
import { Game } from './pages/Game'

export function App () {
  const questions = useQuestionStore(state => state.questions)

  return (
    <main>
      <Container maxWidth='md'>
        <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
          <JavaScriptLogo />
          <Typography variant='h2' component='h1'>
            JavaScript Quizz - Zustand
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}
