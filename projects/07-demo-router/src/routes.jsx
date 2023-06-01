import React from 'react'

const LazyAboutPage = React.lazy(
  () => import('./pages/AboutPage.jsx').then(module => ({ default: module.AboutPage }))
)

const LazyHomePage = React.lazy(
  () => import('./pages/HomePage.jsx').then(module => ({ default: module.HomePage }))
)

export const routes = [
  {
    path: '/',
    Component: LazyHomePage
  },
  {
    path: '/about',
    Component: LazyAboutPage
  }
]
