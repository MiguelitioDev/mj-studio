import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { projects } from "../../data/projects";
import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import styles from "./Header.module.css";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const showProjects = projects.length > 0;

  return (
    <header className={`${styles.header} on-dark`}>
      <Container>
        <div className={styles.inner}>
          <Link to="/" className={styles.brand}>
            <img
              src="/brand/logo-branca.png"
              alt="MJ Studios — página inicial"
              width={125}
              height={48}
              className={styles.brandLogo}
            />
          </Link>

          <button
            type="button"
            className={styles.menuToggle}
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
            aria-label={menuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            <span>Menu</span>
          </button>

          <nav
            id="menu-principal"
            aria-label="Principal"
            className={menuOpen ? styles.navOpen : styles.nav}
          >
            <ul className={styles.navList}>
              <li>
                <NavLink
                  to="/modelos"
                  className={({ isActive }) =>
                    [styles.navLink, isActive ? styles.navLinkActive : ""]
                      .filter(Boolean)
                      .join(" ")
                  }
                >
                  Modelos
                </NavLink>
              </li>
              <li>
                <Link to="/#pacotes" className={styles.navLink}>
                  Pacotes
                </Link>
              </li>
              <li>
                <Link to="/#como-funciona" className={styles.navLink}>
                  Como funciona
                </Link>
              </li>
              {showProjects && (
                <li>
                  <NavLink
                    to="/projetos"
                    className={({ isActive }) =>
                      [styles.navLink, isActive ? styles.navLinkActive : ""]
                        .filter(Boolean)
                        .join(" ")
                    }
                  >
                    Projetos
                  </NavLink>
                </li>
              )}
            </ul>

            <div className={styles.ctaWrap}>
              <Button to="/orcamento" variant="primary">
                Pedir orçamento
              </Button>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
}
