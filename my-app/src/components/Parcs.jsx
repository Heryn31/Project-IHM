import { useEffect, useState } from 'react';

import React from 'react';

import { useTranslation } from 'react-i18next';


import { motion } from 'framer-motion';
import andasibe from '../assets/images/andasibe.jpeg';
import isalo from '../assets/images/hero-background-3.jpg';
import ranomafana from '../assets/images/ranomafana.jpg';
import tsingy from '../assets/images/tsingy.jpeg';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useRef } from 'react';


function Parcs({ theme }) {

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedPark, setSelectedPark] = useState(null);
    const [cartHover, setCartHover] = useState(false);
    const [bookmarkHover, setBookmarkHover] = useState(false);

    const openModal = (park) => {
        setSelectedPark(park);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedPark(null);
    };


    const { t } = useTranslation();
    const parkImages = [andasibe, isalo, ranomafana, tsingy];
    const parkTranslations = t('parks', { returnObjects: true });

    const slides = parkTranslations.map((park, index) => ({
        src: parkImages[index],
        name: park.name,
        title: park.title,
    }));

    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const swiperRef = useRef(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (swiperRef.current) {
                swiperRef.current.update();
                updateNavButtons(swiperRef.current);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (modalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [modalOpen]);


    const updateNavButtons = (swiper) => {
        if (prevRef.current && nextRef.current) {
            const isMobile = window.innerWidth < 768; // md = 768px en Bootstrap

            if (isMobile) {
                prevRef.current.style.display = 'none';
                nextRef.current.style.display = 'none';
            } else {
                prevRef.current.style.display = swiper.isBeginning ? 'none' : 'flex';
                nextRef.current.style.display = swiper.isEnd ? 'none' : 'flex';
            }
        }
    };


    return (
        <div className={`position-relative ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
            <div className={`container py-5 pt-5 ${theme === 'dark' ? 'bg-dark' : 'bg-light'}`}>
                <div className="col-lg-8 w-100 d-flex flex-column justify-content-center align-items-center text-center" style={{ height: '100vh' }}>
                    <h2 className={`fw-bold mb-3 w-100 display-5 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
                        {t('the')} <span className='display-1' style={{ fontSize: '150px' }}>04</span> {t('mostPopular')} <br />
                    </h2>
                    <a href="/parks"><button className='mt-5 btn btn-main'>{t('seeAllParcs')}</button></a>
                </div>
            </div>


            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={20}
                slidesPerView={isMobile ? 1 : 2}
                navigation={{
                    prevEl: '.swiper-button-prev-custom',
                    nextEl: '.swiper-button-next-custom',
                }}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    swiper.update();
                    setTimeout(() => updateNavButtons(swiper), 0); // Appeler après initialisation
                }}
                onSlideChange={(swiper) => {
                    swiper.update();
                    updateNavButtons(swiper);
                }}
                pagination={{
                    el: '.custom-pagination',
                    clickable: true,
                    bulletClass: 'swiper-pagination-bullet',
                    bulletActiveClass: 'swiper-pagination-bullet-active',
                }}

                className="text-white"
                // id='parcs'
                style={{ height: '100vh' }}
            >

                <div
                    className="swiper-button-prev-custom position-absolute top-50 start-0 translate-middle-y z-3 ms-5" style={{ cursor: 'pointer' }}
                    ref={prevRef}
                >
                    <i className="bi-caret-left-fill text-white me-3" style={{ fontSize: '7rem' }}></i>
                </div>
                <div
                    className="swiper-button-next-custom position-absolute top-50 end-0 translate-middle-y z-3 me-5" style={{ cursor: 'pointer' }}
                    ref={nextRef}
                >
                    <i className="bi-caret-right-fill text-white" style={{ fontSize: '7rem' }}></i>
                </div>

                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="position-relative h-100 d-flex flex-column justify-content-center rounded overflow-hidden">
                            <img
                                src={slide.src}
                                alt={slide.title}
                                className="img-fluid w-100 h-100"
                                style={{
                                    objectFit: 'cover',
                                    filter: theme === 'dark' ? 'grayscale(100%)' : 'grayscale(0%)', // Grayscale inversé selon le thème
                                    transition: 'filter 0.5s ease', // Transitions douces
                                }}
                                whileHover={{
                                    filter: theme === 'dark' ? 'grayscale(0%)' : 'grayscale(100%)', // Grayscale inversé au hover
                                }}
                            />
                            <motion.div
                                initial={{ opacity: 1 }}
                                // whileHover={{ opacity: 1 }}
                                // transition={{ duration: 0.6 }}
                                className='position-absolute bottom-0 start-0 w-100 h-25 d-flex flex-row justify-content-between align-items-center text-center p-5'
                                style={{
                                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                    backdropFilter: 'blur(6px)',
                                }}
                            >
                                <h5 className="display-6 fw-bold">{index + 1}- {slide.title}</h5>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="btn btn-main"
                                    onClick={() => openModal(slide)}
                                >
                                    {t('visit')}
                                </motion.button>
                            </motion.div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="custom-pagination w-100 h-100 d-flex justify-content-center mt-3 p-0"></div>
            {modalOpen && selectedPark && (
                <div className="modal fade show d-block" tabIndex="-1" style={{
                    backdropFilter: 'blur(8px)',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    zIndex: 1050
                }}
                    onClick={closeModal}
                >
                    <div className="modal-dialog modal-xl" onClick={(e) => e.stopPropagation()}>
                        <div className={`modal-content ${theme === 'dark' ? 'bg-dark text-white' : ''}`}>
                            {/* Park information  */}
                            <div className="modal-body ">
                                <div className="float-end flex-row d-flex justify-content-center align-items-center">
                                    <motion.button
                                        className="btn btn-main mb-3 me-3"
                                        onMouseEnter={() => setCartHover(true)}
                                        onMouseLeave={() => setCartHover(false)}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <i className={`bi ${cartHover ? 'bi-cart-fill' : 'bi-cart'} me-3`}></i>
                                        Ajouter au panier
                                    </motion.button>

                                    <motion.div
                                        className="btn mb-3"
                                        onMouseEnter={() => setBookmarkHover(true)}
                                        onMouseLeave={() => setBookmarkHover(false)}
                                    >
                                        <i className={`bi ${theme === 'dark' ? 'bg-dark' : 'bg-light'} ${bookmarkHover ? 'bi-bookmark-fill' : 'bi-bookmark'}`}></i>
                                    </motion.div>
                                </div>
                                <img src={selectedPark.src} alt={selectedPark.title} className="img-fluid mb-3" />
                                <h1 className='fw-bold text-center'>{selectedPark.title}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
}

export default Parcs;