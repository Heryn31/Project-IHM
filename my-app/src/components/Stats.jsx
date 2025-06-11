import React from 'react'
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
    return (
        <div className={`d-flex flex-column justify-content-center align-items-center ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}
            style={{ height: '100vh', paddingTop: '50px' }}>
            <div className={`container py-5 pt-5 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                <div className="col-lg-8 w-100 d-flex flex-row justify-content-between text-center" style={{ overflow: 'hidden' }}>
                    <motion.h2
                        className={`fw-bold mb-3 w-100 display-6 ${theme === 'dark' ? 'text-white' : 'text-dark'}  fs-md-5`}
                        initial={{ y: '100%' }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    >
                        Statistiques des espèces endémiques de Madagascar
                    </motion.h2>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className={`card text-center mb-4 ${theme === 'dark' ? 'bg-secondary text-white' : ''}`}>
                            <div className="card-body">
                                <h5 className="card-title"><AnimatedCounter to={113} /> espèces</h5>
                                <p className="card-text">Toutes les espèces de lémuriens sont endémiques à Madagascar</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className={`card text-center mb-4 ${theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            <div className="card-body">
                                <h5 className="card-title">+ <AnimatedCounter to={14} />K plantes</h5>
                                <p className="card-text">Environ 90% des plantes vasculaires sont endémiques</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className={`card text-center mb-4 ${theme === 'dark' ? 'bg-secondary text-white' : ''}`}>
                            <div className="card-body">
                                <h5 className="card-title"><AnimatedCounter to={107} /> oiseaux</h5>
                                <p className="card-text">Sur 294 espèces d'oiseaux, 107 sont endémiques</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className={`card text-center mb-4 ${theme === 'dark' ? 'bg-secondary text-white' : ''}`}>
                            <div className="card-body">
                                <h5 className="card-title"><AnimatedCounter to={341} /> amphibiens</h5>
                                <p className="card-text">99% des amphibiens sont uniques à Madagascar</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className={`card text-center mb-4 ${theme === 'dark' ? 'bg-secondary text-white' : ''}`}>
                            <div className="card-body">
                                <h5 className="card-title"><AnimatedCounter to={6} /> baobabs</h5>
                                <p className="card-text">Sur 8 espèces mondiales de baobabs, 6 sont endémiques</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className={`card text-center mb-4 ${theme === 'dark' ? 'bg-secondary text-white' : ''}`}>
                            <div className="card-body">
                                <h5 className="card-title">+ <AnimatedCounter to={31} />% menacés</h5>
                                <p className="card-text">31% des lémuriens sont en danger critique d'extinction</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Stats
