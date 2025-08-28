import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

import loginImage from '../../assets/images/login.jpg';
import './login.css';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useTranslation } from 'react-i18next';

function Login() {
  const { t } = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loadingGuest, setLoadingGuest] = useState(false); // état de chargement pour compte invité

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login',
        { email, password },
        { withCredentials: true }
      );
      sessionStorage.setItem('toastMessage', 'Connexion réussie !');
      setEmail('');
      setPassword('');
      window.location.href = '/';
      console.log(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Erreur');
    }
  };

  const handleGuestLogin = async () => {
    try {
      setLoadingGuest(true);
      const res = await axios.post('http://localhost:5000/api/guest-login', {}, {
        withCredentials: true,
      });
      sessionStorage.setItem('toastMessage', 'Connexion en tant qu\'invité réussie !');
      window.location.href = '/';
      console.log('Guest user:', res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Erreur lors de la connexion en tant qu\'invité');
    } finally {
      setLoadingGuest(false);
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-100">
        <div className="row h-100">

          <motion.div
            initial={{ x: '-100px' }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="col-sm-6 px-0 d-none d-sm-block overflow-hidden">
            <img
              src={loginImage}
              alt="baleine"
              className="w-100 vh-100 object-fit-cover"
            />
          </motion.div>

          <div className="col-sm-6 d-flex flex-column justify-content-center align-items-center text-center text-black">

            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
              href='/'
              className="px-5 ms-xl-4 fw-normal mb-3 pb-3 text-decoration-none text-dark"
              style={{ letterSpacing: '1px' }}
            >
              {t('brand')}
            </motion.a>

            <div className="d-flex align-items-center px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form onSubmit={handleSubmit} style={{ width: '33rem' }}>

                <div className="mb-3 pb-3">
                  <motion.h3
                    initial={{ y: '20px', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
                    className="h1 fs-1 fw-bold mb-0 text-decoration-none"
                  >
                    {t('login')}
                  </motion.h3>
                </div>

                <div className="form-outline mb-4">
                  <motion.input
                    initial={{ opacity: 0, x: '20px' }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1, ease: 'easeInOut' }}
                    type="email"
                    id="form2Example18"
                    className="form-control form-control-lg"
                    placeholder={t('contacts.yourEmail')}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-outline mb-4 position-relative">
                  <motion.input
                    initial={{ opacity: 0, x: '-20px' }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.5, ease: 'easeInOut' }}
                    type={showPassword ? 'text' : 'password'}
                    id="form2Example28"
                    className="form-control form-control-lg"
                    placeholder={t('contacts.yourPassword')}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <motion.i
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.5, ease: 'easeInOut' }}
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
                </div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 2, ease: 'easeInOut' }}
                  className="small mb-5 pb-lg-2">
                  <a className="text-muted" href="#!">
                    {t('forgotPassword')}
                  </a>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.5, ease: 'easeInOut' }}
                  className="w-100 pt-1 mb-4 d-flex justify-content-center">
                  <button className="w-100 btn btn-main btn-block" type="submit">
                    {t('login')}
                  </button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.5, ease: 'easeInOut' }}
                  className="w-100 pt-1 mb-4 d-flex justify-content-center">
                  <button
                    className="w-100 btn btn-second btn-block"
                    type="button"
                    onClick={handleGuestLogin}
                    disabled={loadingGuest}
                  >
                    {loadingGuest ? (
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : (
                      <i className="bi bi-incognito me-3"></i>
                    )}
                    {t('guestAccount')}
                  </button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5, ease: 'easeInOut' }}
                  className="mt-5 text-center"
                >
                  {t('haveNotAccount')} &nbsp;
                  <a href="/sign" className="link-main">
                    {t('register')}
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
    </section>
  );
}

export default Login;
