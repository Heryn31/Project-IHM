import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function Navbar({ theme, toggleTheme, showCenter }) {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState("accueil");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navbarCollapsed, setNavbarCollapsed] = useState(true);

  // SMART NAVBAR - Masquer lors du défilement vers le bas
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Notifications de changement de langue
  useEffect(() => {
    const languageChangeToast = () => {
      const languageMessage =
        i18n.language === "fr" ? "Langue changée" : "Language changed";
      toast.success(`${languageMessage}`);
    };

    const handleLanguageChange = () => {
      languageChangeToast();
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n, theme]);

  // Observer pour les sections actives
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Vérification de l'authentification
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/check-auth", { withCredentials: true })
      .then((res) => {
        if (res.data.authenticated) {
          setUser(res.data.user);
        } else {
          setUser(false);
        }
        const message = sessionStorage.getItem("toastMessage");
        if (message) {
          toast.success(message);
          sessionStorage.removeItem("toastMessage");
        }
      })
      .catch(() => setUser(false));
  }, []);

  // Déconnexion
  const handleLogout = () => {
    axios
      .get("http://localhost:5000/api/logout", { withCredentials: true })
      .then(() => {
        setUser(null);
        sessionStorage.setItem("toastMessage", t("logoutSuccess"));
        window.location.href = "/";
      })
      .catch((err) => {
        console.error("Erreur lors de la déconnexion :", err);
        toast.error(t("logoutError"));
      });
  };

  const linkClass = (section) =>
    `nav-link ${
      activeSection === section
        ? "fw-semibold border-bottom border-success text-success"
        : `${theme === "dark" ? "text-white" : "text-dark"}`
    }`;

  return (
    <>
      <motion.nav
        className={`navbar navbar-expand-lg fixed-top py-2 py-md-3 ${
          theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
        }`}
        initial={{ y: "-100%" }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="container-fluid px-3 px-md-4 px-lg-5">
          {/* Brand */}
          <a
            href="/"
            className={`navbar-brand mb-0 ${
              theme === "dark" ? "text-white" : "text-dark"
            }`}
          >
            {t("brand")}
          </a>

          {/* Hamburger button for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setNavbarCollapsed(!navbarCollapsed)}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar content */}
          <div
            className={`collapse navbar-collapse ${
              !navbarCollapsed ? "show" : ""
            }`}
          >
            {/* Centre avec menu */}
            {showCenter && (
              <div className="navbar-nav mx-auto gap-3 gap-lg-4 gap-xl-5">
                <a
                  href="#accueil"
                  className={`nav-item nav-link ${linkClass("accueil")}`}
                >
                  {t("home")}
                </a>
                <a
                  href="#parcs"
                  className={`nav-item nav-link ${linkClass("parcs")}`}
                >
                  {t("park")}
                </a>
                <a
                  href="#gallery"
                  className={`nav-item nav-link ${linkClass("gallery")}`}
                >
                  {t("gallery")}
                </a>
                <a
                  href="#offer"
                  className={`nav-item nav-link ${linkClass("offer")}`}
                >
                  {t("offer")}
                </a>
                <a
                  href="#contact"
                  className={`nav-item nav-link ${linkClass("contact")}`}
                >
                  {t("contact")}
                </a>
              </div>
            )}

            {/* Outils à droite */}
            <div className="d-flex flex-column flex-lg-row align-items-center align-items-lg-center gap-3 mt-3 mt-lg-0">
              {/* Bouton de bascule du thème */}
              <button
                onClick={toggleTheme}
                className="btn d-flex align-items-center"
                aria-label="Toggle theme"
              >
                <i
                  className={`bi ${
                    theme === "light"
                      ? "bi-moon-fill text-dark"
                      : "bi-sun-fill text-light"
                  }`}
                ></i>
              </button>

              {/* Menu Langue */}
              <div className="dropdown">
                <button
                  className={`btn ${
                    theme === "dark" ? "text-light" : "text-dark"
                  } dropdown-toggle`}
                  type="button"
                  id="dropdownLangue"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-translate"></i>
                </button>
                <ul
                  className={`dropdown-menu dropdown-menu-end ${
                    theme === "dark" ? "bg-dark text-white" : ""
                  }`}
                >
                  <li>
                    <a
                      className={`dropdown-item ${
                        theme === "dark" ? "text-white" : ""
                      } ${
                        i18n.language === "fr" ? "bg-success text-white" : ""
                      }`}
                      onClick={() => i18n.changeLanguage("fr")}
                    >
                      {i18n.language === "fr" && (
                        <i className="bi bi-check me-2"></i>
                      )}
                      Français
                    </a>
                  </li>
                  <li>
                    <a
                      className={`dropdown-item ${
                        theme === "dark" ? "text-white" : ""
                      } ${
                        i18n.language === "en" ? "bg-success text-white" : ""
                      }`}
                      onClick={() => i18n.changeLanguage("en")}
                    >
                      {i18n.language === "en" && (
                        <i className="bi bi-check me-2"></i>
                      )}
                      English
                    </a>
                  </li>
                </ul>
              </div>

              {/* Menu utilisateur */}
              <div className="dropdown">
                <button
                  className={
                    user
                      ? "btn btn-main d-flex align-items-center"
                      : `btn d-flex align-items-center ${
                          theme === "dark"
                            ? "btn-outline-light"
                            : "btn-outline-dark"
                        }`
                  }
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-expanded={open}
                  onClick={() => setOpen(!open)}
                >
                  <i
                    className={
                      user
                        ? "bi bi-person-check-fill me-2"
                        : "bi bi-person-circle me-2"
                    }
                  ></i>
                  <span>{user ? user.name : t("contacts.yourAccount")}</span>
                </button>

                <ul
                  className={`dropdown-menu dropdown-menu-end ${
                    theme === "dark"
                      ? "bg-dark text-white"
                      : "bg-light text-dark"
                  }`}
                >
                  {user ? (
                    <>
                      <li>
                        <a
                          className={`dropdown-item ${
                            theme === "dark"
                              ? "bg-dark text-white"
                              : "bg-light text-dark"
                          }`}
                          href="/account"
                        >
                          <i className="bi bi-gear-wide-connected me-2"></i>
                          {t("settings")}
                        </a>
                      </li>
                      <li>
                        <a
                          className={`dropdown-item ${
                            theme === "dark"
                              ? "bg-dark text-white"
                              : "bg-light text-dark"
                          }`}
                          href="#"
                        >
                          <i className="bi bi-car-front-fill me-2"></i>
                          {t("seeDestination")}
                        </a>
                      </li>
                      {user.role === "admin" && (
                        <>
                          <li>
                            <a
                              className={`dropdown-item ${
                                theme === "dark"
                                  ? "bg-dark text-white"
                                  : "bg-light text-dark"
                              }`}
                              href="/admin"
                            >
                              <i className="bi bi-tools me-2"></i>
                              {t("manageContent")}
                            </a>
                          </li>
                          <li>
                            <a
                              className={`dropdown-item ${
                                theme === "dark"
                                  ? "bg-dark text-white"
                                  : "bg-light text-dark"
                              }`}
                              href="/message"
                            >
                              <i className="bi bi-envelope-fill me-2"></i>
                              Message
                            </a>
                          </li>
                        </>
                      )}
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={handleLogout}
                        >
                          <i className="bi bi-box-arrow-left me-2"></i>
                          {t("logout")}
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <a
                          className={`dropdown-item ${
                            theme === "dark"
                              ? "bg-dark text-white"
                              : "bg-light text-dark"
                          }`}
                          href="/login"
                        >
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          {t("login")}
                        </a>
                      </li>
                      <li>
                        <a
                          className={`dropdown-item ${
                            theme === "dark"
                              ? "bg-dark text-white"
                              : "bg-light text-dark"
                          }`}
                          href="/sign"
                        >
                          <i className="bi bi-person-add me-2"></i>
                          {t("register")}
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
