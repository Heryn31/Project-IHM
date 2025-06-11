import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import signImage from '../../assets/images/sign.jpg';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './login.css';
import { useTranslation } from 'react-i18next';

function Sign() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
        role: 'user'
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Le nom est requis';
        if (!formData.email) newErrors.email = 'L’email est requis';
        if (!formData.password) newErrors.password = 'Le mot de passe est requis';
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
        if (!formData.acceptTerms)
            newErrors.acceptTerms = 'Vous devez accepter les conditions';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            if (newErrors.acceptTerms) toast.error(newErrors.acceptTerms);
            if (newErrors.confirmPassword) toast.error(newErrors.confirmPassword);
            return;
        }

        setErrors({});

        try {
            const res = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    role: formData.role
                })
            });

            const data = await res.json();
            if (!res.ok) {
                toast.info(data.message);
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.error("Erreur serveur :", error);
        }
    };

    return (
        <>
            <section className="vh-100">
                <div className="container-fluid h-100">
                    <div className="row h-100">

                        <div className="col-sm-6 px-0 d-none d-sm-block overflow-hidden">
                            <motion.img
                                initial={{ x: '-100px' }}
                                animate={{ x: 0 }}
                                transition={{ duration: 0.5, ease: 'easeInOut' }}
                                src={signImage}
                                alt="baleine"
                                className="w-100 vh-100 object-fit-cover"
                            />
                        </div>

                        <div className="col-sm-6 d-flex flex-column justify-content-center text-black">

                            <motion.a
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
                                href='/'
                                className="px-5 ms-xl-4 fw-normal mb-3 pb-3 text-decoration-none text-dark"
                                style={{ letterSpacing: '1px' }}>
                                {t('brand')}
                            </motion.a>

                            <div className="d-flex align-items-center px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
                                <form style={{ width: '33rem' }}>

                                    <div className="mb-3 pb-3 overflow-hidden">
                                        <motion.h3
                                            initial={{ y: '20px', opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
                                            className="h1 fs-1 fw-bold mb-0 text-decoration-none">
                                            {t('register')}
                                        </motion.h3>
                                    </div>

                                    {/* Name */}
                                    <div className="form-outline mb-4">
                                        <motion.input
                                            initial={{ opacity: 0, x: '20px' }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 1, ease: 'easeInOut' }}
                                            type="text"
                                            name='name'
                                            className={`form-control form-control-lg ${errors.name ? 'is-invalid' : ''}`}
                                            placeholder={t('contacts.yourName')}
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                    </div>

                                    {/* Email */}
                                    <div className="form-outline mb-4">
                                        <motion.input
                                            initial={{ opacity: 0, x: '-20px' }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 1, ease: 'easeInOut' }}
                                            type="email"
                                            name='email'
                                            className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                                            placeholder={t('contacts.yourEmail')}
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                    </div>

                                    {/* Password */}
                                    <div className="form-outline mb-4 position-relative">
                                        <motion.input
                                            initial={{ opacity: 0, x: '20px' }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 1, ease: 'easeInOut' }}
                                            type={showPassword ? 'text' : 'password'}
                                            name='password'
                                            className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                                            placeholder={t('contacts.yourPassword')}
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                        <motion.i
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 2, ease: 'easeInOut' }}
                                            className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute`}
                                            onClick={togglePasswordVisibility}
                                            style={{
                                                top: '50%',
                                                right: '1rem',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer',
                                                fontSize: '1.2rem',
                                                color: '#6c757d'
                                            }}
                                        ></motion.i>
                                        {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="form-outline mb-4 position-relative">
                                        <motion.input
                                            initial={{ opacity: 0, x: '-20px' }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 1, ease: 'easeInOut' }}
                                            type={showPassword ? 'text' : 'password'}
                                            name='confirmPassword'
                                            className={`form-control form-control-lg ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                            placeholder={t('contacts.yourConfirmPassword')}
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                        />
                                        <motion.i
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.5, delay: 2, ease: 'easeInOut' }}
                                            className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'} position-absolute`}
                                            onClick={togglePasswordVisibility}
                                            style={{
                                                top: '50%',
                                                right: '1rem',
                                                transform: 'translateY(-50%)',
                                                cursor: 'pointer',
                                                fontSize: '1.2rem',
                                                color: '#6c757d'
                                            }}
                                        ></motion.i>
                                        {errors.confirmPassword && <div className="invalid-feedback d-block">{errors.confirmPassword}</div>}
                                    </div>

                                    {/* Accept terms */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 2, ease: 'easeInOut' }}
                                        className="form-check d-flex justify-content-center mb-2">
                                        <input
                                            className={`form-check-input me-2 ${errors.acceptTerms ? 'is-invalid' : ''}`}
                                            type="checkbox"
                                            name='acceptTerms'
                                            checked={formData.acceptTerms}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label" htmlFor="form2Example3c">
                                            {t('acceptTerms')}
                                        </label>
                                    </motion.div>
                                    {errors.acceptTerms && <div className="text-danger text-center mb-3">{errors.acceptTerms}</div>}

                                    {/* Submit */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 2.5, ease: 'easeInOut' }}
                                        className="w-100 pt-1 mb-4 d-flex justify-content-center">
                                        <button className="w-100 btn btn-main btn-block" type="button" onClick={handleSubmit}>
                                            {t('register')}
                                        </button>
                                    </motion.div>

                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 3, ease: 'easeInOut' }}
                                        className="mt-5 text-center">
                                        {t('haveAccount')} &nbsp;
                                        <a href="/login" className="link-main">
                                            {t('login')}
                                        </a>
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
                                        className="mt-5 d-flex justify-content-center">
                                        <motion.button
                                            className="btn btn-second btn-block"
                                            type="button"
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                        >
                                            <a href="/" className="text-decoration-none text-dark">
                                                <i className={`bi ${isHovered ? 'bi-house-fill' : 'bi-house'} me-3`}></i>
                                                {t('returnHome')}
                                            </a>
                                        </motion.button>
                                    </motion.div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <ToastContainer
                position="bottom-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </>
    );
}

export default Sign;
