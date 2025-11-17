/* import homeImg from './assets/img/home.svg'; */
import euroImg from '../assets/img/euro.svg';
/* import profilImg from './assets/img/profil.svg'; */
import settingImg from '../assets/img/setting.svg';

import { Link } from 'react-router-dom';







export function NavigationsBar(){
    return (
    
    <nav className="footer-nav">
      <div className='link'>
    <Link to="/" >
    <img src={euroImg} alt="Lohnrechner" />
    <span>Lohnrechner</span>
  </Link>

  <Link to="/einstellungen" >
    <img src={settingImg} alt="Einstellungen" />
    <span>Einstellungen</span>
  </Link> 
      </div>

  
  <br/>
  
  
</nav>

    
    )
}