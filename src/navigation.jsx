/* import homeImg from './assets/img/home.svg'; */
import euroImg from './assets/img/euro.svg';
/* import profilImg from './assets/img/profil.svg'; */
import settingImg from './assets/img/setting.svg';

import { Link } from 'react-router-dom';

import packageJson from '../package.json'





export function NavigationsBar(){
    return (
    
    <nav className="footer-nav">
  <Link to="/">
    <img src={euroImg} alt="Lohnrechner" />
    <span>Lohnrechner</span>
  </Link>

  <Link to="/einstellungen">
    <img src={settingImg} alt="Einstellungen" />
    <span>Einstellungen</span>
  </Link> <br/>
  
  <br/>

  <Link to="/impressum" className="impressum-link">
    <span className='smal imDa'>Impressum</span>
  </Link>
  <Link to="/datenschutz" className="datenschutz-link">
    <span className='smal imDa'>Datenschutz</span>
  </Link>

  <div className="smal">App Version: {packageJson.version}</div> 
  
</nav>

    
    )
}