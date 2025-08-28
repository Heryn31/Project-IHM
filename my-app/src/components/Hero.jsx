import React from 'react'
import { motion } from 'framer-motion';

import { useTranslation } from 'react-i18next';

function Hero({ theme }) {
    const { t } = useTranslation();
    return (
        <>
            <motion.section
                id="accueil"
                className="hero-section d-flex align-items-center"
                style={{
                    height: '100vh',
                    filter: theme === 'dark' ? 'grayscale(100%)' : 'grayscale(0%)',
                    transition: 'filter 0.5s ease',
                }}
                whileHover={{
                    filter: theme === 'dark' ? 'grayscale(0%)' : '',
                }}
            >
                <div
                    className="d-flex w-100 flex-column flex-lg-row text-light"
                    style={{
                        backdropFilter: 'blur(0.2px)',
                    }}
                >
                    <motion.div
                        className="col-lg-6 px-3 px-lg-5 py-5 d-flex flex-column justify-content-center align-items-center w-100 text-center text-lg-start"
                    >
                        {/* Masque + animation du titre */}
                        <div style={{ overflow: 'hidden' }}>
                            <motion.h1
                                className="display-3 fw-bold fs-md-2"
                                initial={{ y: '100px' }}
                                animate={{ y: 0 }}
                                transition={{ duration: 0.8, ease: 'easeOut'}}
                                style={{
                                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                    fontSize: 'clamp(2.5rem, 5vw, 6rem)',
                                }}
                            >
                                {t('welcomeTitle')}
                            </motion.h1>
                        </div>

                        {/* Phrase d'accroche */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 1.5 }}
                            className="fs-5 mt-3"
                            style={{
                                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
                            }}
                        >
                            {t('hero-desc')}
                        </motion.p>

                        {/* Bouton animé */}
                        <motion.button
                            className="btn btn-main mt-3"
                            initial={{  y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            onClick={() => window.location.href = "#parcs"}
                            aria-label="Découvrir les parcs de Madagascar"
                        >
                            {t('discover')}
                        </motion.button>
                    </motion.div>
                </div>
            </motion.section>


        </>
    )
}

export default Hero
