import { Header } from './components/Header'
import { Route } from 'wouter'
import { Suspense, lazy, useEffect } from 'react'

const TopStoriesPage = lazy(() => import('./pages/TopStories'))

const DetailPage = lazy(() => import('./pages/Detail'))

export function App () {
  useEffect(() => {
    document.title = 'Hacker News Technical Test USA'
  }, [])
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
