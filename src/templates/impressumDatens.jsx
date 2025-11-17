import { Link } from "react-router-dom";

export function ImpressumDatens() {
  return (
    <>
<div className='impDa'>
  <Link to="/impressum" className="impressum-link">
    <span className='smal imDa'>Impressum</span>
  </Link>
  <Link to="/datenschutz" className="datenschutz-link">
    <span className='smal imDa'>Datenschutz</span>
  </Link>
  </div><br/>
<span className='smal' >&copy; {new Date().getFullYear()} - Alle Rechte vorbehalten </span>
    </>
  )
};
