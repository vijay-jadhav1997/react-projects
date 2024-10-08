import { useTheme } from "../hooks/useTheme"
import dayIcon from '../assets/images/Sunrise.jpg'
import nightIcon from '../assets/images/night.jpg'

const Header = () => {
  const [isDark, setIsDark] = useTheme()
  
  function setTheme() {
    setIsDark(!isDark)
    localStorage.setItem('theme', JSON.stringify(!isDark))
  }
  
  return (
    <header className={`header-container ${isDark ? 'dark' : ''}`}>
      <div className="header-content">
        <h2 className="title"><a href="/">Where in the world?</a></h2>
        <p className="theme-changer" onClick={setTheme} >
          <span className="theme-icon-slider">
            {/* <i className={`fa-solid ${isDark ? "fa-sun": "fa-moon"}`}></i> */}
            <img src={isDark ? dayIcon : nightIcon} alt="" />
            <i></i>
          </span>
          &nbsp;&nbsp; {isDark ? "Light": "Dark"} Mode
        </p>
      </div>
    </header>
  )
}

export default Header