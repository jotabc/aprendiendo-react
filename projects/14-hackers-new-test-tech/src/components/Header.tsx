import { header, link, img } from './Haeder.css'
import logo from '../assets/logo.svg'

export function Header () {
  return (
    <header>
      <nav className={header}>
        <img
          className={img}
          src={logo}
          alt='Logo de Hacker New'
        />
        <a className={link}>Hacker News</a>
      </nav>
    </header>
  )
}
