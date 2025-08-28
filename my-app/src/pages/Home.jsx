import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import Gallery from '../components/Gallery';
import Stats from '../components/Stats';
import Parcs from '../components/Parcs';
import Offer from '../components/Offer';
import BestParks from '../components/BestParks';
import Actu from '../components/Actu';


import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useTranslation } from 'react-i18next';

function Home() {
    const { i18n } = useTranslation();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
    }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);

        // 🎯 Affiche un toast lors du changement de thème
        const message = i18n.language === 'fr'
            ? (newTheme === 'dark' ? 'Thème sombre activé' : 'Thème clair activé')
            : (newTheme === 'dark' ? 'Dark theme enabled' : 'Light theme enabled');

        toast.success(message);
    };

    return (
        <div>
            <Navbar theme={theme} toggleTheme={toggleTheme} showCenter />
            <section id="accueil"><Hero theme={theme} /></section>
            {/* <section id="parcs"><Parcs theme={theme} /></section> */}
            <section id="parcs"><BestParks theme={theme} /></section>
            <section id="gallery"><Gallery theme={theme} /></section>
            <section id="stats"><Stats theme={theme} /></section>
            <section id="offer"><Offer theme={theme} /></section>
            {/* <section id="actu"><Actu theme={theme} /></section> */}
            <section id="contact"><Contact theme={theme} /></section>
            <Footer theme={theme} />
            {/* Conteneur des notifications */}
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
        </div>
    );
}

export default Home;
