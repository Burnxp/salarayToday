import styles from "./Footer.module.css"

export function Footer() {
  return (
    <footer className={styles.bottom}>
      <nav className={styles.footerNav}>
        <a href="index.php" className={styles.link}>
          <img src="img/home.svg" alt="Startseite" />
          <span>Startseite</span>
        </a>
        <a href="lohndaten.html" className={styles.link}>
          <img src="img/euro.svg" alt="Lohndaten" />
          <span>Lohndaten</span>
        </a>
        <a href="einstellungen.html" className={styles.link}>
          <img src="img/setting.svg" alt="Einstellungen" />
          <span>Einstellungen</span>
        </a>
      </nav>
    </footer>
  )
}
