import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore'

function App () {
  const { changeSpanish } = useStore()

  return (
    <div>
      <h1>Google Traslate Clone</h1>
      <button
        onClick={changeSpanish}
      >
        Cambiar a español
      </button>
    </div>
  )
}

export default App
