import React from 'react'
import faunes_images from '../assets/images/lemur.jpg'

function Presentation() {
    return (
        <>
            <section className="present-section mb-lg-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h3 className="fw-bold">Faune & Flore uniques</h3>
                            <p>
                                Abritant plus de 80 espèces d’oiseaux et plusieurs types de lémuriens, l’Isalo est un refuge pour la biodiversité malgache.
                            </p>
                            <button className='btn btn-primary'>Plus de details</button>
                        </div>
                        <div className="col-md-6">
                            <img src={faunes_images} alt="Hero Image" loading='lazy' className="img-fluid present-image" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Presentation
