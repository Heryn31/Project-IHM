import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function Contact({ theme }) {
    const { t } = useTranslation();
    //Messages
      const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
      const [isSubmitting, setIsSubmitting] = useState(false);
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.id]: e.target.value
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        try {
          await axios.post('http://localhost:5000/api/messages', formData);
          toast.success(t('contacts.messageSent'));
          setFormData({ name: '', email: '', message: '' });
        } catch (error) {
          toast.error(t('contacts.messageError', { error: error.message }));
        } finally {
          setIsSubmitting(false);
        }
      };
    return (
        <div
            className={`container-fluid ${theme === 'dark' ? 'bg-dark' : 'bg-light'} py-5`}
            id="contact"
        >
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 col-lg-8 text-center">
                    <motion.h2
                        className={`display-5 fw-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-dark'}`}
                        initial={{ y: '100%' }}
                        whileInView={{ y: 0 }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                        viewport={{ once: true }}
                    >
                        {t('contacts.needQuestion')}
                    </motion.h2>
                </div>
            </div>

            <div className="row justify-content-center text-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div
                        className={`contacts-form p-4 rounded shadow ${theme === 'dark' ? 'bg-dark text-white' : 'bg-white text-dark'}`}
                    >
                        <p className={`mb-4 ${theme === 'dark' ? 'text-light' : 'text-muted'}`}>
                            {t('contacts.questionMessage')}
                        </p>
                        <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                            {t('contacts.yourName')}
                            </label>
                            <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                            {t('contacts.yourEmail')}
                            </label>
                            <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">
                            {t('contacts.yourMessage')}
                            </label>
                            <textarea
                            className="form-control"
                            id="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            ></textarea>
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-main"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" />
                                {t('contacts.sending')}
                            </>
                            ) : (
                            <>
                                {t('contacts.sendMessage')} <i className="bi bi-send-fill"></i>
                            </>
                            )}
                        </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default Contact
