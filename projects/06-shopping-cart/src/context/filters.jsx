import { createContext, useState } from 'react'

// 1. creamos el contexto
export const FiltersContext = createContext()

// 2. creamos un provider, para servir proveer el contexto
export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  return (
    <FiltersContext.Provider value={{
      filters,
      setFilters
    }}
    >
      {children}
    </FiltersContext.Provider>
  )
}
