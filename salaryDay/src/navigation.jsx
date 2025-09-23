import homeImg from './assets/img/home.svg';
import euroImg from './assets/img/euro.svg';
import profilImg from './assets/img/profil.svg';
import settingImg from './assets/img/setting.svg';


export function NavigationsBar(){
    return (
    
    <nav className="footer-nav">
{/*     <a href="">
      <img src= {homeImg} alt="Startseite" />
      <span>Startseite</span>
    </a>
        <a href="">
      <img src={profilImg} alt="Profil" />
      <span>Profil</span>
    </a> */}
    <a href="./index.html">
      <img src={euroImg} alt="Lohnrechner" />
      <span>Lohnrechner</span>
    </a>

    <a href="./einstellungen.html">
      <img src={settingImg} alt="Einstellungen" />
      <span>Einstellungen</span>
    </a>
  </nav>
    
    )
}