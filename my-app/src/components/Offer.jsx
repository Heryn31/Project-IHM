import React from 'react'
import { useTranslation } from 'react-i18next'

function Offer({ theme }) {
    const { t } = useTranslation();
    return (
        <>
            <div className={`${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                <div className="container py-5">
                    <div className="row text-center mb-5">
                        <div className="col">
                            <h2 className="display-4 fw-bold">{t('offers.title')}</h2>
                            <p>{t('offers.disclaimer')}</p>
                        </div>
                    </div>
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {/* Pass Découverte */}
                        <div className="col">
                            <div className={`card h-100 pricing-card shadow-sm ${theme === 'dark' ? 'bg-dark text-white border-light' : 'bg-white text-dark'}`}>
                                <div className="card-body p-5">
                                    <h5 className={`card-title text-uppercase mb-4 ${theme === 'dark' ? 'text-light' : 'text-muted'}`}>{t('offers.discoverPass.name')}</h5>
                                    <h1 className="display-5 mb-4">{t('offers.discoverPass.price')}<small className={`${theme === 'dark' ? 'text-light' : 'text-muted'}`}>{t('offers.discoverPass.unit')}</small></h1>
                                    <ul className="list-unstyled feature-list">
                                        {t('offers.discoverPass.features', { returnObjects: true }).map((item, i) => (
                                            <li key={i}><i className="bi bi-check2 text-info me-2"></i>{item}</li>
                                        ))}
                                    </ul>
                                    <button className="btn btn-lg w-100 mt-4 btn-main">{t('offers.cta')}</button>
                                </div>
                            </div>
                        </div>

                        {/* Pass Famille */}
                        <div className="col">
                            <div className={`card h-100 pricing-card shadow position-relative ${theme === 'dark' ? 'bg-dark text-white border-light' : 'bg-white text-dark'}`}>
                                <span className="badge px-4 py-2 bg-main text-white">{t('offers.familyPass.badge')}</span>
                                <div className="card-body p-5">
                                    <h5 className="card-title text-uppercase mb-4">{t('offers.familyPass.name')}</h5>
                                    <h1 className="display-5 mb-4">{t('offers.familyPass.price')}<small className={`${theme === 'dark' ? 'text-light' : 'text-muted'}`}>{t('offers.familyPass.unit')}</small></h1>
                                    <ul className="list-unstyled feature-list">
                                        {t('offers.familyPass.features', { returnObjects: true }).map((item, i) => (
                                            <li key={i}><i className="bi bi-check2 text-primary me-2"></i>{item}</li>
                                        ))}
                                    </ul>
                                    <button className="btn btn-lg w-100 mt-4 btn-main">{t('offers.cta')}</button>
                                </div>
                            </div>
                        </div>

                        {/* Pass National */}
                        <div className="col">
                            <div className={`card h-100 pricing-card shadow-sm ${theme === 'dark' ? 'bg-dark text-white border-light' : 'bg-white text-dark'}`}>
                                <div className="card-body p-5">
                                    <h5 className={`card-title text-uppercase mb-4 ${theme === 'dark' ? 'text-light' : 'text-muted'}`}>{t('offers.nationalPass.name')}</h5>
                                    <h1 className="display-5 mb-4">{t('offers.nationalPass.price')}<small className={`${theme === 'dark' ? 'text-light' : 'text-muted'}`}>{t('offers.nationalPass.unit')}</small></h1>
                                    <ul className="list-unstyled feature-list">
                                        {t('offers.nationalPass.features', { returnObjects: true }).map((item, i) => (
                                            <li key={i}><i className="bi bi-check2 text-primary me-2"></i>{item}</li>
                                        ))}
                                    </ul>
                                    <button className="btn btn-lg w-100 mt-4 btn-main">{t('offers.cta')}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Offer
