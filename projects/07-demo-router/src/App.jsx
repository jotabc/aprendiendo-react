import { Router } from './pages'
import { routes } from './routes'

function App () {
  return (
    <main>
      <Router routes={routes} />
    </main>
  )
}
export default App
