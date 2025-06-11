import React from 'react'
import maps from '../assets/images/maps.png'

function Presentation() {
    return (
        <>
            <div className="bg-white py-5 pt-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="fw-bold text-dark mb-3">Localisation: </h2>
                        </div>
                    </div>
                </div>
            </div>
            <section className="present-section mb-5">
                <div className="container">
                    <div className="column align-items-center">
                        <div>
                            <img src={maps} alt="Hero Image" loading='lazy' className="img-fluid maps-image" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Presentation
