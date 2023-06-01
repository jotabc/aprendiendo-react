import React from 'react'

const LazyAboutPage = React.lazy(
  () => import('./pages/AboutPage').then(module => ({ default: module.AboutPage }))
)

const LazyHomePage = React.lazy(
  () => import('./pages/HomePage').then(module => ({ default: module.HomePage }))
)

export const routes = [
  {
    path: '/',
    Component: LazyHomePage
  },
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  }
]
