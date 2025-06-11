import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Pour les notifications
import "react-toastify/dist/ReactToastify.css"; // Styles de toast
import { useTranslation } from "react-i18next";

import axios from "axios";

export default function Navbar({ theme, toggleTheme, showCenter }) {
  const { t, i18n } = useTranslation();
  const [activeSection, setActiveSection] = useState("accueil");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null); // null = pas encore vérifié

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  //Block scroll on menu show:
  // useEffect(() => {
  //   if (open) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "";
  //   }

  //   // Nettoyage en cas de démontage du composant
  //   return () => {
  //     document.body.style.overflow = "";
  //   };
  // }, [open]);

  //SMART NAVBAR
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setShowNavbar(false);
      } else {
        // Scrolling up
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Afficher le toast de notification à chaque changement de langue
  useEffect(() => {
    const languageChangeToast = () => {
      // Message toast en fonction de la langue et du thème
      const languageMessage =
        i18n.language === "fr" ? "Langue changée" : "Language changed";

      toast.success(`${languageMessage}`);
    };

    // Lorsque la langue change, on affiche un toast
    const handleLanguageChange = () => {
      languageChangeToast();
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n, theme]);

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
      {
        threshold: 0.3,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  // Vérification de l'authentification de l'utilisateur
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
          toast.success(message); // Affiche le toast
          sessionStorage.removeItem("toastMessage"); // Nettoie après affichage
        }
      })
      .catch(() => setUser(false));
  }, []);
  // console.log(user);
  // Fin de la vérification de l'authentification

  //Deconnection de l'utilisateur
  const handleLogout = () => {
    axios
      .get("http://localhost:5000/api/logout", { withCredentials: true })
      .then(() => {
        setUser(null); // Met à jour l'état de l'utilisateur
        sessionStorage.setItem("toastMessage", t("logoutSuccess")); // Stocke le message pour la prochaine session
        window.location.href = "/"; // Redirige vers la page d'accueil
      })
      .catch((err) => {
        console.error("Erreur lors de la déconnexion :", err);
        toast.error(t("logoutError")); // Affiche un message d'erreur
      });
  };
  // Classe pour les liens de navigation

  const linkClass = (section) =>
    `nav-link  ${
      activeSection === section
        ? "fw-semibold border-bottom border-success text-success"
        : `${theme === "dark" ? "text-white" : "text-dark"}`
    }`;

  return (
    <>
      <motion.nav
        className={`navbar navbar-expand-lg fixed-top py-3 ${
          theme === "dark" ? "navbar-dark bg-dark" : "navbar-light bg-light"
        }`}
        initial={{ y: "-100%" }}
        animate={{ y: showNavbar ? 0 : -100 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="container-fluid px-5">
          {/* Branding à gauche */}
          <div className="d-flex align-items-center">
            <a
              href="/"
              className={`mb-0 nav-link ${
                theme === "dark" ? "text-white" : "text-dark"
              }`}
            >
              {t("brand")}
            </a>
          </div>

          {/* Centre avec menu */}
          {showCenter && (
            <div className="d-none d-lg-flex mx-auto gap-5">
              <a href="#accueil" className={linkClass("accueil")}>
                {t("home")}
              </a>
              <a href="#parcs" className={linkClass("parcs")}>
                {t("park")}
              </a>
              <a href="#gallery" className={linkClass("gallery")}>
                {t("gallery")}
              </a>
              <a href="#offer" className={linkClass("offer")}>
                {t("offer")}
              </a>
              <a href="#contact" className={linkClass("contact")}>
                {t("contact")}
              </a>
            </div>
          )}

          {/* Outils à droite */}
          <div className="d-flex align-items-center gap-3">
            {/* Bouton de bascule du thème */}
            <button
              onClick={toggleTheme}
              className="btn d-flex align-items-center"
            >
              <i
                className={`bi ${
                  theme === "light"
                    ? "bi-moon-fill text-dark"
                    : "bi-sun-fill text-light"
                } me-2`}
              ></i>
            </button>

            {/* Menu Langue */}
            <div className={`dropdown text-light`}>
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
                style={{ cursor: "pointer" }}
              >
                <li>
                  <a
                    className={`dropdown-item ${
                      theme === "dark" ? "text-white" : ""
                    } ${i18n.language === "fr" ? "bg-success text-white" : ""}`}
                    onClick={() => i18n.changeLanguage("fr")}
                  >
                    {i18n.language === "fr" && (
                      <i className="bi bi-check me-2"></i>
                    )}{" "}
                    Français
                  </a>
                </li>
                <li>
                  <a
                    className={`dropdown-item ${
                      theme === "dark" ? "text-white" : ""
                    } ${i18n.language === "en" ? "bg-success text-white" : ""}`}
                    onClick={() => i18n.changeLanguage("en")}
                  >
                    {i18n.language === "en" && (
                      <i className="bi bi-check me-2"></i>
                    )}{" "}
                    English
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="dropdown text-center"
              onClick={() => setOpen(!open)}
              style={{ cursor: "pointer" }}
            >
              <button
                className="btn btn-main"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded={open}
              >
                <i class="bi bi-person-circle me-3"></i>
                {user ? user.name : t("contacts.yourAccount")}
              </button>
              {open && (
                <div
                  className="modal show d-block"
                  tabIndex="-1"
                  role="dialog"
                  style={{
                    backgroundColor: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  <div
                    className="w-100 modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className={`modal-content ${
                        theme === "dark" ? "bg-dark text-white" : ""
                      }`}
                    >
                      <motion.div className="modal-body">
                        <ul className="list-unstyled mb-0">
                          {user ? (
                            <>
                              <li>
                                <a
                                  className={`btn btn-main btn-lg dropdown-item py-3 my-2 ${
                                    theme === "dark" ? "text-white" : ""
                                  }`}
                                  href="/account"
                                >
                                  <i className="bi bi-gear-wide-connected me-3"></i>
                                  {t("settings")}
                                </a>
                              </li>

                              <li>
                                <a
                                  className={`btn btn-main btn-lg dropdown-item py-3 my-2 ${
                                    theme === "dark" ? "text-white" : ""
                                  }`}
                                  href="#"
                                >
                                  <i className="bi bi-car-front-fill me-3"></i>
                                  {t("seeDestination")}
                                </a>
                              </li>

                              {user.role === "admin" && (
                                <li>
                                  <a
                                    className={`btn btn-main btn-lg dropdown-item py-3 my-2 ${
                                      theme === "dark" ? "text-white" : ""
                                    }`}
                                    href="/admin"
                                  >
                                    <i className="bi bi-tools me-3"></i>
                                    {t("manageContent")}
                                  </a>
                                  <a
                                    className={`btn btn-main btn-lg dropdown-item py-3 my-2 ${
                                      theme === "dark" ? "text-white" : ""
                                    }`}
                                    href="/message"
                                  >
                                    <i class="bi bi-envelope-fill me-3"></i>
                                    Message
                                  </a>
                                </li>
                              )}

                              <li>
                                <button
                                  className="btn btn-lg dropdown-item py-3 my-2 text-danger"
                                  onClick={handleLogout}
                                >
                                  <i className="bi bi-box-arrow-left me-3"></i>
                                  {t("logout")}
                                </button>
                              </li>
                            </>
                          ) : (
                            <>
                              <li>
                                <a
                                  className={`btn btn-main btn-lg dropdown-item py-3 my-2 ${
                                    theme === "dark" ? "text-white" : ""
                                  }`}
                                  href="/login"
                                >
                                  <i className="bi bi-box-arrow-in-right me-3"></i>
                                  {t("login")}
                                </a>
                              </li>
                              <li>
                                <a
                                  className={`btn btn-main btn-lg dropdown-item py-3 my-2 ${
                                    theme === "dark" ? "text-white" : ""
                                  }`}
                                  href="/sign"
                                >
                                  <i className="bi bi-person-add me-3"></i>
                                  {t("register")}
                                </a>
                              </li>
                            </>
                          )}
                        </ul>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  );
}
