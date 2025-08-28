import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
function Price() {
  const exchangeRate = 4500;
  const [showModal, setShowModal] = useState(false);
  const [newAmount, setNewAmount] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [prices, setPrices] = useState([]);

  // ouvrir modal
  const handleOpen = (price) => {
    setSelectedPrice(price);
    setNewAmount(price.amount);
    setShowModal(true);
  };

  // fermer modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedPrice(null);
    setNewAmount("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/prices/${selectedPrice.type}`, {
        amount: newAmount,
        currency: selectedPrice.currency,
      });
      // après l'update réussi
      toast.success("Prix mis à jour avec succès");
      handleClose();

      // attendre 2 secondes avant le reload
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la mise à jour");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/prices") 
      .then((res) => {
        setPrices(res.data);
      })
      .catch((err) => {
        console.error("Erreur fetch prices:", err);
      });
  }, []);
  return (
    <>
      <div className="container py-5">
          <div className="row g-4 justify-content-center">
          {prices.map((price, index) => (
            <div key={index} className="col-12 col-md-4">
              <div className="card shadow-sm h-100 text-center">
                <div className="card-body">
                  <i className="bi bi-credit-card display-6 mb-3 text-secondary"></i>
                  <p className="card-text">{price.type}</p>
                  <h5
                    className="card-title fw-semibold"
                    style={{ fontSize: "3.5rem" }}
                  >
                    {price.amount} {(price.currency || "MGA").toUpperCase()}
                  </h5>
                  <p className="card-text fw-bold">
                    ≈ {(price.amount / exchangeRate).toLocaleString()} USD
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleOpen(price)}
                  >
                    <i className="bi bi-pencil-square me-2"></i> Modifier
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Modal flottant centré */}
      {showModal && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="bg-white p-4 rounded shadow" style={{ minWidth: "350px" }}>
            <h5 className="mb-3">
              Modifier prix – {selectedPrice?.type}
            </h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nouveau montant</label>
                <input
                  type="number"
                  className="form-control"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-secondary" onClick={handleClose}>
                  Annuler
                </button>
                <button type="submit" className="btn btn-success">
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
      </div>
    </>
  );
}

export default Price;
