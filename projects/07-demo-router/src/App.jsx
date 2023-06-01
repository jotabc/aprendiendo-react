import React, { Suspense } from 'react'
import { Router } from './Router'
import { Page404 } from './pages/Page404'
import { routes } from './routes'
import { Route } from './Route'

const LazySearchPage = React.lazy(
  () => import('./pages/SearchPage.jsx').then(module => ({ default: module.SearchPage }))
)

function App () {
  return (
    <main>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Router routes={routes} defaultComponent={Page404}>
          <Route path='/search/:query' Component={LazySearchPage} />
          <Route path='/router' Component={() => <h1>Router Component</h1>} />
        </Router>
      </Suspense>
    </main>
  )
}
export default App
