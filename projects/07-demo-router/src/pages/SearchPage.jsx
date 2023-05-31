import { useEffect } from 'react'

export function SearchPage ({ routesParams }) {
  useEffect(() => {
    document.title = `Has buscado ${routesParams.query}`
  }, [routesParams.query])

  return (
    <h1>Has Buscado {routesParams.query} </h1>
  )
}
