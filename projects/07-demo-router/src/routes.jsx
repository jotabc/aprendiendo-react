import { AboutPage, HomePage } from './pages'
import { SearchPage } from './pages/SearchPage'

export const routes = [
  {
    path: '/',
    Component: HomePage
  },
  {
    path: '/about',
    Component: AboutPage
  },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]
