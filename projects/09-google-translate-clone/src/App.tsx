import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Button,
  Col,
  Container,
  Row,
  Stack
} from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { ArrowIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'

function App () {
  const {
    interchangeLanguages,
    state,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  } = useStore()

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
            <TextArea
              onChange={setResult}
              loading={state.loading}
              value={state.result}
              type={SectionType.To}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
