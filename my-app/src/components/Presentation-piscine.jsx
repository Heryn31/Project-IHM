import React from 'react'
import piscine from '../assets/images/piscine.jpg'

function Presentation() {
    return (
        <>
            <section className="present-section mb-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <h3 className="fw-bold">Piscines naturelles</h3>
                            <p>
                                Offrez-vous un moment de détente dans les eaux cristallines des piscines naturelles, nichées au cœur du massif.
                            </p>
                            <button className='btn btn-primary'>Plus de details</button>
                        </div>
                        <div className="col-md-6">
                            <img src={piscine} alt="Hero Image" loading='lazy' className="img-fluid present-image" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Presentation
