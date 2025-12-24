import { NavLink } from "react-router-dom";

export function NavigationsBar() {
  return (
    <nav className="navigation">
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "navigation-link lohnrechnerSeite active"
            : "navigation-link lohnrechnerSeite"
        }
      >
        Lohnrechner
      </NavLink>

      <NavLink
        to="/einstellungen"
        className={({ isActive }) =>
          isActive
            ? "navigation-link einstellungenSeite active"
            : "navigation-link einstellungenSeite"
        }
      >
        Einstellungen
      </NavLink>
    </nav>
  );
}
