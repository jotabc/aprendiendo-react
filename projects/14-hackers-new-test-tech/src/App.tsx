import { Header } from './components/Header'
import { Route } from 'wouter'
import { Suspense, lazy } from 'react'

const TopStoriesPage = lazy(() => import('./pages/TopStories'))

const DetailPage = lazy(() => import('./pages/Detail'))

export function App () {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback='Loading...'>
          <Route path='/' component={TopStoriesPage} />
          <Route path='/article/:id' component={DetailPage} />
        </Suspense>
      </main>
    </>
  )
}
