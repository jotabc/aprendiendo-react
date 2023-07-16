import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Button,
  Col,
  Container,
  Row,
  Stack
} from 'react-bootstrap'
import { useEffect } from 'react'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { ArrowIcon, ClipBoardIcon, SpeakerIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

function App () {
  const {
    interchangeLanguages,
    state,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

  const { fromLanguage, toLanguage, fromText, result } = state
  const debouncedFromText = useDebounce(fromText)

  useEffect(() => {
    if (fromText === '') return

    translate({ fromLanguage, toLanguage, text: fromText })
      .then(result => {
        // En ts == tiene una comparación de que si es null o undefined
        if (result == null) return
        setResult(result)
      })
      .catch(() => setResult('Error'))
  }, [debouncedFromText, fromLanguage])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result)
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  return (
    <Container fluid>
      <h2>Google Translate</h2>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.From}
              onChange={setFromLanguage}
              value={state.fromLanguage}
            />
            <TextArea
              onChange={setFromText}
              loading={state.loading}
              value={state.fromText}
              type={SectionType.From}
            />
          </Stack>
        </Col>

        <Col xs='auto'>
          <Button
            variant='link'
            disabled={state.fromLanguage === AUTO_LANGUAGE}
            onClick={interchangeLanguages}
          >
            <ArrowIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SectionType.To}
              onChange={setToLanguage}
              value={state.toLanguage}
            />
            <div style={{ position: 'relative' }}>
              <TextArea
                onChange={setResult}
                loading={state.loading}
                value={state.result}
                type={SectionType.To}
              />
              <div style={{ position: 'absolute', left: 0, bottom: 0 }}>
                <Button
                  variant='link'
                  onClick={handleClipboard}
                >
                  <ClipBoardIcon />
                </Button>
                <Button
                  variant='link'
                  onClick={handleSpeak}
                >
                  <SpeakerIcon />
                </Button>
              </div>
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
