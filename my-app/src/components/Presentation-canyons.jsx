import React from 'react'
import presentImage from '../assets/images/presentImage.jpeg'
import presentImage2 from '../assets/images/lemur.jpg'

import { Swiper, SwiperSlide } from 'swiper/react';


import { Pagination } from 'swiper/modules';

function Presentation() {
    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      };
    return (
        <>
            <section className="present-section mb-lg-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h3 className="fw-bold">Paysages Spectaculaires</h3>
                            <p>
                                Explorez les canyons, falaises et arches de grès sculptés par le temps — un décor unique digne d’un western naturel.
                            </p>
                            <button className='btn btn-primary'>Plus de details</button>
                        </div>
                        <div className="col-md-6">
                            <Swiper
                                pagination={pagination}
                                modules={[Pagination]}
                                className="mySwiper"
                            >
                                <SwiperSlide>
                                    <img src={presentImage} loading="lazy" alt="Hero Image" className="img-fluid present-image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={presentImage2} loading="lazy" alt="Hero Image" className="img-fluid present-image" />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <img src={presentImage} loading="lazy" alt="Hero Image" className="img-fluid present-image" />
                                </SwiperSlide>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Presentation
