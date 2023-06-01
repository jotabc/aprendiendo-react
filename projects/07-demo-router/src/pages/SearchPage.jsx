import { useEffect } from 'react'
import { useQueryParamas } from '../index'

console.log('SearchPage.jsx')

export function SearchPage ({ routesParams }) {
  const params = useQueryParamas()

  console.log(params)
  useEffect(() => {
    document.title = `Has buscado ${routesParams.query}`
  }, [routesParams.query])

  return (
    <h1>Has Buscado {routesParams.query} </h1>
  )
}
