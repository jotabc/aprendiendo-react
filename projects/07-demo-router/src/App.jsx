import { Router } from './Router'
import { Page404 } from './pages'
import { routes } from './routes'

function App () {
  return (
    <main>
      <Router routes={routes} defaultComponent={Page404} />
    </main>
  )
}
export default App
