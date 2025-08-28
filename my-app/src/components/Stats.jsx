import React from 'react'
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from 'react-i18next';

function AnimatedCounter({ to, duration = 1.5 }) {
    const controls = useAnimation();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (isInView) {
            controls.start({
                count: to,
                transition: { duration, ease: "easeOut" },
            });
        }
    }, [controls, isInView, to, duration]);

    return (
        <motion.span
            ref={ref}
            animate={controls}
            initial={{ count: 0 }}
            onUpdate={(latest) => {
                setCount(Math.floor(latest.count));
            }}
        >
            {count}
        </motion.span>
    );
}

function Stats({ theme }) {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    return (
        <div className={`d-flex flex-column justify-content-center align-items-center ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}
            style={{ minHeight: '100vh', padding: '2rem 0' }}>
            <div className={`container py-3 py-md-5 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                <div className="col-lg-8 w-100 d-flex flex-row justify-content-between text-center" style={{ overflow: 'hidden' }}>
                    <motion.h2
                        className={`fw-bold mb-3 w-100 display-6 ${theme === 'dark' ? 'text-white' : 'text-dark'} fs-4 fs-md-3 fs-lg-2`}
                        initial={{ y: '100%' }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    >
                        {lang === 'fr' ? 'Statistiques des espèces endémiques de Madagascar' : 'Statistics of endemic species of Madagascar'}
                    </motion.h2>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4 mb-3">
                        <div className={`card text-center h-100 ${theme === 'dark' ? 'bg-secondary text-white' : ''}`}>
                            <div className="card-body d-flex flex-column justify-content-center">
                                <h5 className="card-title"><AnimatedCounter to={113} /> {lang === 'fr' ? 'espèces' : 'species'}</h5>
                                <p className="card-text">
                                    {lang === 'fr' 
                                        ? 'Toutes les espèces de lémuriens sont endémiques à Madagascar' 
                                        : 'All lemur species are endemic to Madagascar'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mb-3">
                        <div className={`card text-center h-100 ${theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            <div className="card-body d-flex flex-column justify-content-center">
                                <h5 className="card-title">+ <AnimatedCounter to={14} />K {lang === 'fr' ? 'plantes' : 'plants'}</h5>
                                <p className="card-text">
                                    {lang === 'fr' 
                                        ? 'Environ 90% des plantes vasculaires sont endémiques' 
                                        : 'About 90% of vascular plants are endemic'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mb-3">
                        <div className={`card text-center h-100 ${theme === 'dark' ? 'bg-secondary text-white' : ''}`}>
                            <div className="card-body d-flex flex-column justify-content-center">
                                <h5 className="card-title"><AnimatedCounter to={107} /> {lang === 'fr' ? 'oiseaux' : 'birds'}</h5>
                                <p className="card-text">
                                    {lang === 'fr' 
                                        ? 'Sur 294 espèces d\'oiseaux, 107 sont endémiques' 
                                        : 'Out of 294 bird species, 107 are endemic'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-12 col-md-4 mb-3">
                        <div className={`card text-center h-100 ${theme === 'dark' ? 'bg-secondary text-white' : ''}`}>
                            <div className="card-body d-flex flex-column justify-content-center">
                                <h5 className="card-title"><AnimatedCounter to={341} /> {lang === 'fr' ? 'amphibiens' : 'amphibians'}</h5>
                                <p className="card-text">
                                    {lang === 'fr' 
                                        ? '99% des amphibiens sont uniques à Madagascar' 
                                        : '99% of amphibians are unique to Madagascar'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mb-3">
                        <div className={`card text-center h-100 ${theme === 'dark' ? 'bg-secondary text-white' : ''}`}>
                            <div className="card-body d-flex flex-column justify-content-center">
                                <h5 className="card-title"><AnimatedCounter to={6} /> {lang === 'fr' ? 'baobabs' : 'baobabs'}</h5>
                                <p className="card-text">
                                    {lang === 'fr' 
                                        ? 'Sur 8 espèces mondiales de baobabs, 6 sont endémiques' 
                                        : 'Out of 8 worldwide baobab species, 6 are endemic'}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mb-3">
                        <div className={`card text-center h-100 ${theme === 'dark' ? 'bg-secondary text-white' : ''}`}>
                            <div className="card-body d-flex flex-column justify-content-center">
                                <h5 className="card-title">+ <AnimatedCounter to={31} />% {lang === 'fr' ? 'menacés' : 'threatened'}</h5>
                                <p className="card-text">
                                    {lang === 'fr' 
                                        ? '31% des lémuriens sont en danger critique d\'extinction' 
                                        : '31% of lemurs are critically endangered'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stats