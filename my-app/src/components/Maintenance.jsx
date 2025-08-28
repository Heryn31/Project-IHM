import React from "react";
import { Link } from "react-router-dom";
import Baobab from "../assets/images/baobab.jpeg"; // ton PNG animé

const Maintenance = () => {
  return (
    <div class="error-container">
      <div class="error-content">
        <i class="bi bi-gear-wide-connected fs-1"></i>
        <h1>Cette page est en maintenance</h1>
        <p>Merci de revenir plus tard</p>
        <a href="/" class="btn bg-black text-white">
          Revenir a l'accueil
        </a>
      </div>
    </div>
  );
};

export default Maintenance;
