import React from "react";
import { Link } from "react-router-dom";
import Baobab from "../assets/images/baobab.jpeg"; // ton PNG animé

const P404 = () => {
  return (
    <div class="error-container">
      <div class="error-content">
        <h1>404</h1>
        <p>Oops! Ce contenu n'existe pas.</p>
        <a href="/" class="btn bg-black text-white">
          Revenir a l'accueil
        </a>
      </div>
    </div>
  );
};

export default P404;
