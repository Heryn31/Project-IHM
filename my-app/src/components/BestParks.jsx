import React from 'react'

import { motion } from 'framer-motion';
import '../pages/Auth/login.css';
import { useTranslation} from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';

//import des images dans les assets --------- Mbola tsy dynamique tsara -------------->
import andasibeImage from '../../src/assets/images/andasibe.jpeg';
import isaloImage from '../../src/assets/images/isalo.jpeg';
import ranomafanaImage from '../../src/assets/images/ranomafana.jpg';
import tsingyImage from '../../src/assets/images/tsingy.jpeg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const parkImage = [andasibeImage, isaloImage, ranomafanaImage, tsingyImage];


function BestParks({ theme }) {
    const { t, i18n } = useTranslation();
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null); // <- Référence du Swiper
    const lang = i18n.language; 

    useEffect(() => {
        if (swiperRef.current && prevRef.current && nextRef.current) {
          // Force la mise à jour manuelle après le rendu
          swiperRef.current.params.navigation.prevEl = prevRef.current;
          swiperRef.current.params.navigation.nextEl = nextRef.current;
    
          // Réinitialiser la navigation
          swiperRef.current.navigation.destroy();
          swiperRef.current.navigation.init();
          swiperRef.current.navigation.update();
        }
      }, []);

     useEffect(() => {
        axios.get("http://localhost:5000/api/parks")
        .then(res => {
            setParks(res.data);
        })
        .catch(err => {
            console.error("Erreur fetch parks:", err);
        });
    }, []);

      const [parks, setParks] = useState([]);
    
    return (
        <div className={`position-relative  ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
            <div className={`container py-5 pt-5 ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
                <div className="col-lg-8 w-100 d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '100vh' }}>
                    <h2 className={`fw-bold mb-3 w-100 display-5 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
                        {t('the')} <span className='display-1 fw-bold' style={{ fontSize: '150px' }}>04</span> {t('mostPopular')} <br />
                    </h2>
                    <a href="/parks"><button className='mt-5 btn btn-main'>{t('seeAllParcs')}</button></a>
                </div>
            </div>


            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onBeforeInit={(swiper) => {
                    if (typeof swiper.params.navigation !== 'boolean') {
                        swiper.params.navigation.prevEl = prevRef.current;
                        swiper.params.navigation.nextEl = nextRef.current;
                    }
                }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                pagination={{ clickable: true, type: 'progressbar' }}
                spaceBetween={50}
                slidesPerView={1}
                className="vh-100"
                autoplay={{ delay: 8000 }}
                loop

            >
                {parks.slice(0, 4).map((park, index) => (
                <SwiperSlide key={index}>
                    <section className="vh-100">
                    <div className="container-fluid h-100">
                        <div className="row h-100">
                        <motion.div
                            initial={{ x: '-100px' }}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.5, ease: 'easeInOut' }}
                            className="col-sm-6 px-0 d-none d-sm-block overflow-hidden"
                        >
                            <img
                            src={parkImage[index]}
                            alt={`park-${index + 1}`}
                            className="w-100 vh-100 object-fit-cover"
                            />
                        </motion.div>

                        <div className="col-sm-6 d-flex flex-column justify-content-center text-black">
                            <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className={`px-5 fw-bold mb-3 pb-3 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}
                            style={{ letterSpacing: '1px', fontSize: '2.5rem' }}
                            >
                            {index + 1}. {park.title[lang]}
                            </motion.div>

                            <div className="d-flex flex-column px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                            <p className={`${theme === 'dark' ? 'text-light' : 'text-muted'}`}>
                                {park.description[lang]}
                            </p>
                            <ul className={`${theme === 'dark' ? 'text-light' : 'text-muted'}`}>
                                <li><strong>{t('Faune')} :</strong> {park.fauna[lang]}</li>
                                <li><strong>{t('Flore')} :</strong> {park.flora[lang]}</li>
                                <li><strong>{t('Activités')} :</strong> {park.activities[lang]}</li>
                                <li><strong>{t('Accès')} :</strong> {park.access[lang]}</li>
                                <li><strong>{t('Période idéale')} :</strong> {park.bestTime[lang]}</li>
                            </ul>
                            <a href="#offer" className="btn btn-main">
                                {t('visit') || 'Visiter le parc'}
                            </a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </section>
                </SwiperSlide>
                ))}

            </Swiper>
            <div className="d-flex justify-content-center gap-3 mt-3">
                <button ref={prevRef} className="btn btn-main">← {t('previous') || 'Précédent'}</button>
                <button ref={nextRef} className="btn btn-main">{t('next') || 'Suivant'} →</button>
            </div>
        </div>
    )
}

export default BestParks