import { Route } from '../Route'
import { Router } from './Router'
import { AboutPage, HomePage, Page404 } from './pages'
import { routes } from './routes'

function App () {
  return (
    <main>
      <Router routes={routes} defaultComponent={Page404}>
        <Route path='/' Component={HomePage} />
        <Route path='/about' Component={AboutPage} />
        <Route path='/router' Component={() => <h1>Router Component</h1>} />
      </Router>
    </main>
  )
}
export default App
