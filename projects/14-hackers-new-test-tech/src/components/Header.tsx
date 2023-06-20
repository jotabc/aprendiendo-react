import { header, link, img } from './Haeder.css'
import logo from '../assets/logo.svg'
import { Link } from 'wouter'

export function Header () {
  return (
    <header>
      <nav className={header}>
        <img
          className={img}
          src={logo}
          alt='Logo de Hacker New'
        />
        <Link href='/' className={link}>Hacker News</Link>
      </nav>
    </header>
  )
}
