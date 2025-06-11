import React from 'react'
import Skeleton from 'react-loading-skeleton';

function HeroSkeleton() {
    return (
        <>
            <section className="d-flex align-items-center mb-5">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-6">
                            {/* Skeleton for Title */}
                            <Skeleton height={60} width={250} style={{ marginBottom: '20px' }} />
                            {/* Skeleton for Paragraph */}
                            <Skeleton count={3} height={20} width={300} style={{ marginBottom: '20px' }} />
                            {/* Skeleton for Button */}
                            <Skeleton height={40} width={150} style={{ marginTop: '10px' }} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSkeleton
