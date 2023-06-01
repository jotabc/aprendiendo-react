import { BUTTON, EVENTS } from './const'

export function navigate (href) {
  window.history.pushState({}, '', href) // => esto hace que no se refresque cuando vamos a otra página.
  // crear un evento personalizado para indicar de que hemos cambiado la url.
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  // enviamos el evento
  window.dispatchEvent(navigationEvent)
}

export function Link ({ target, to, ...props }) {
  const handleClick = (e) => {
    const isMainEvent = e.button === BUTTON.primary // primary click mouse => "leftClick"
    const isModifiedEvent = e.metaKey || e.altKey || e.ctrlKey || e.shiftKey
    const isManageableEvnet = target === undefined || target === '_self'

    if (isMainEvent && isManageableEvnet && !isModifiedEvent) {
      e.preventDefault()
      navigate(to)
      window.scrollTo(0, 0)
    }
  }

  return (
    <a onClick={handleClick} href={to} target={target} {...props} />
  )
}
