import { useEffect, useState } from 'react'
import { EVENTS } from '../const'

export function Router ({ routes = [], defaultComponent: DefaultComponent = () => null }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    // una buena práctica es siempre crear la función para el listener porque así nos seguramos que donde le pasemos siempre tenga la misma referencia y es una forma que podemos asegurarnos que le quitamos el evento después.
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }
    // pushstate evento que escucha la navegación para adelante con la flecha de navegador.
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    // popstate evento que escihca escucha la navegación hacia atrás con la flecha de navegador. o el window.back
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  const Page = routes.find(({ path }) => path === currentPath)?.Component

  return Page ? <Page /> : <DefaultComponent />
}
