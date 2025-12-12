import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import TextType from '../TextType/TextType'
import styles from './Navigation.module.css'

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const { isDark, toggleTheme } = useTheme()
  
  // Перевірка чи це головна сторінка
  const isHome = location.pathname === '/' || location.pathname === ''

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Закриваємо меню при зміні роуту
  useEffect(() => {
    closeMenu()
  }, [location])

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.navLogo}>
          <TextType
            text={['Гештальт']}
            as="span"
            typingSpeed={100}
            pauseDuration={0}
            loop={false}
            showCursor={false}
            className={styles.logoText}
            initialDelay={300}
          />
        </Link>

        <div className={styles.navRight}>
          {/* Theme Toggle */}
          <button
            className={styles.themeToggle}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <div className={styles.themeIconContainer}>
              <div className={`${styles.themeIcon} ${styles.sunIcon} ${!isDark ? styles.active : ''}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              </div>
              <div className={`${styles.themeIcon} ${styles.moonIcon} ${isDark ? styles.active : ''}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              </div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <ul className={`${styles.navMenu} ${styles.desktopMenu}`}>
            <li>
              <Link 
                to="/" 
                className={isHome ? styles.active : ''}
              >
                Головна
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={location.pathname === '/about' ? styles.active : ''}
              >
                Про гештальт
              </Link>
            </li>
            <li>
              <Link 
                to="/therapy" 
                className={location.pathname === '/therapy' ? styles.active : ''}
              >
                Терапія
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`${styles.menuToggle} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <ul className={styles.navMenuMobile}>
          <li>
            <Link 
              to="/" 
              className={isHome ? styles.active : ''}
              onClick={closeMenu}
            >
              Головна
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={location.pathname === '/about' ? styles.active : ''}
              onClick={closeMenu}
            >
              Про гештальт
            </Link>
          </li>
          <li>
            <Link 
              to="/therapy" 
              className={location.pathname === '/therapy' ? styles.active : ''}
              onClick={closeMenu}
            >
              Терапія
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation

