import React from 'react'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// import presentImage from '../assets/images/presentImage.jpeg'
import lemurien from '../assets/images/lemur.jpg'
import geeko from '../assets/images/geeko.jpeg'
import oiseau from '../assets/images/oiseau.jpeg'
import ravinala from '../assets/images/ravinala.avif'
import baobab from '../assets/images/baobab-1.jpg'
import fosa from '../assets/images/fosa.jpg'


function Gallery({ theme }) {
    const { t } = useTranslation();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const galleryItems = t('galleries.items', { returnObjects: true });

    const imageSources = [lemurien, fosa, oiseau, geeko, ravinala, baobab];

    const images = [
        [0, 1], // 1ère colonne (2 éléments)
        [2, 3], // 2ème colonne
        [4, 5], // 3ème colonne
    ].map(column =>
        column.map(index => ({
            src: imageSources[index],
            alt: galleryItems[index].title,
            title: galleryItems[index].title,
            desc: galleryItems[index].desc,
        }))
    );

    return (
        <>
            {/* Section titre */}
            <div
                className={`py-5 pt-5 d-flex flex-column align-items-center justify-content-center ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}
                style={{ minHeight: '100vh' }}
            >
                <div className="w-100 text-center d-flex flex-column align-items-center px-3">
                    <div style={{ overflow: 'hidden', width: '100%', maxWidth: '500px' }}>
                        <motion.h2
                            className={`display-6 fw-bold mb-3 ${theme === 'dark' ? 'text-light' : 'text-dark'}`}
                            initial={{ y: '100%' }}
                            whileInView={{ y: 0 }}
                            transition={{ duration: 0.7, ease: 'easeOut' }}
                            viewport={{ once: true }}
                        >
                            {t('galleries.title')}
                        </motion.h2>
                    </div>
                    <div className="w-100 text-center px-2">
                        <p className="w-100 mx-auto" style={{ maxWidth: '600px' }}>
                            {t('galleries.description')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Galerie */}
            <div className={`container-fluid py-5 ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {images.map((column, colIdx) => (
                        <div key={colIdx} className="col">
                            {column.map(({ src, alt, title, desc }, idx) => (
                                <motion.div
                                    key={idx}
                                    className="position-relative overflow-hidden shadow rounded mb-4"
                                    initial={{ opacity: 0, y: 100 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, ease: 'easeOut' }}
                                    viewport={{ once: true, amount: 0.3 }}
                                    whileHover={
                                        !isMobile
                                            ? { filter: theme === 'dark' ? 'grayscale(0%)' : 'grayscale(0%)' }
                                            : {}
                                    }
                                    style={{
                                        height: '300px',
                                        cursor: 'pointer',
                                        filter: theme === 'dark' ? 'grayscale(100%)' : 'grayscale(0%)',
                                        transition: 'filter 0.3s ease'
                                    }}
                                >
                                    <img
                                        src={src}
                                        alt={alt}
                                        className="w-100 h-100"
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <motion.div
                                        initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 100 }}
                                        whileHover={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center text-white text-center"
                                        style={{ backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(2px)' }}
                                    >
                                        <h5 className="fw-bold">{title}</h5>
                                        <p>{desc}</p>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            className="btn btn-main"
                                        >
                                            {t('galleries.consult')} <i className="bi bi-plus-circle-fill"></i>
                                        </motion.button>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="w-100 text-center mt-4">
                    <button className='btn btn-main'>
                        {t('galleries.seeMore')} <i className="bi bi-three-dots ms-3"></i>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Gallery
