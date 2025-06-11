import React from 'react'
import { useTranslation } from 'react-i18next'

function Footer({ theme }) {
    const { t } = useTranslation();
    return (

        <>
            <footer
                className={`mt-auto py-5 text-center ${theme === 'dark' ? 'bg-dark text-white' : 'bg-white text-dark'}`}
            >
                <div className="container">
                    <div className="row">
                        {/* À propos */}
                        <div className="col-md-4 mb-4">
                            <h5 className="fw-bold">{t('footer.aboutTitle')}</h5>
                            <p>{t('footer.aboutDescription')}</p>
                        </div>

                        {/* Liens de navigation */}
                        <div className="col-md-4 mb-4">
                            <h5 className="fw-bold">{t('footer.navigationTitle')}</h5>
                            <ul className="list-unstyled">
                                <li>
                                    <a href="#accueil" className={theme === 'dark' ? 'text-white' : 'text-dark'}>
                                        {t('footer.home')}
                                    </a>
                                </li>
                                <li>
                                    <a href="#parcs" className={theme === 'dark' ? 'text-white' : 'text-dark'}>
                                        {t('footer.parks')}
                                    </a>
                                </li>
                                <li>
                                    <a href="#gallery" className={theme === 'dark' ? 'text-white' : 'text-dark'}>
                                        {t('footer.gallery')}
                                    </a>
                                </li>
                                <li>
                                    <a href="#stats" className={theme === 'dark' ? 'text-white' : 'text-dark'}>
                                        {t('footer.stats')}
                                    </a>
                                </li>
                                <li>
                                    <a href="#contact" className={theme === 'dark' ? 'text-white' : 'text-dark'}>
                                        {t('footer.contact')}
                                    </a>
                                </li>
                            </ul>
                        </div>
                        {/* Contact  */}
                        <div className="col-md-4 mb-4">
                            <h5 className="fw-bold">{t('footer.contactTitle')}</h5>
                            <ul className="list-unstyled">

                                <li>
                                    <i className={`bi bi-telephone ${theme === 'dark' ? 'text-white' : 'text-dark'}`}></i> 035 00 123 00
                                </li>

                                <li>
                                    <i className={`bi bi-envelope ${theme === 'dark' ? 'text-white' : 'text-dark'}`}></i> madagascarpark@gmail.com
                                </li>
                            </ul>
                        </div>

                        {/* Réseaux sociaux */}
                        <div className="col-md-4 mb-4">
                            <h5 className="fw-bold">{t('footer.followUs')}</h5>
                            <ul className="list-inline">
                                <li className="list-inline-item">
                                    <a href="#" className={theme === 'dark' ? 'text-white' : 'text-dark'}>
                                        <i className="bi bi-facebook fs-5"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className={theme === 'dark' ? 'text-white' : 'text-dark'}>
                                        <i className="bi bi-instagram fs-5"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className={theme === 'dark' ? 'text-white' : 'text-dark'}>
                                        <i className="bi bi-youtube fs-5"></i>
                                    </a>
                                </li>
                                <li className="list-inline-item">
                                    <a href="#" className={theme === 'dark' ? 'text-white' : 'text-dark'}>
                                        <i class="bi bi-github fs-5"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <hr className={theme === 'dark' ? 'border-light' : 'border-dark'} />

                    <div className="row">
                        <div className="col-12 text-center">
                            <p className="mb-0">&copy; 2025 {t('footer.copyright')}</p>
                        </div>
                    </div>
                </div>
            </footer>



        </>
    )
}

export default Footer
