import { Link } from "react-router-dom";

export function NavigationsBar() {
  return (
    <nav className="navigation">
      <Link className="navigation-link lohnrechnerSeite" to="/">
        Lohnrechner
      </Link>
      <Link className="navigation-link einstellungenSeite" to="/einstellungen">
        Einstellungen
      </Link>
    </nav>
  );
}
