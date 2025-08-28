import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { toast, ToastContainer } from "react-toastify";

function Parks() {
  const [parks, setParks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("fr");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [parkToDelete, setParkToDelete] = useState(null);
  const navigate = useNavigate();

  

  const [formData, setFormData] = useState({
    num: "",
    title: { fr: "", en: "" },
    description: { fr: "", en: "" },
    fauna: { fr: "", en: "" },
    flora: { fr: "", en: "" },
    activities: { fr: "", en: "" },
    access: { fr: "", en: "" },
    bestTime: { fr: "", en: "" },
  });

  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);

  // Récupération des parcs
  const fetchParks = () => {
    axios
      .get("http://localhost:5000/api/parks")
      .then((res) => {
        setParks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur fetch parks:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchParks();
  }, []);

  // Soumission formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:5000/api/parks/${editingId}`,
          formData
        );
      } else {
        await axios.post("http://localhost:5000/api/parks", formData);
      }
      resetForm();
      fetchParks();
      setShowModal(false);
      toast.success("Mise a jour effectue")
    } catch (err) {
      console.error("Erreur save park:", err);
    }
  };

  // Supprimer
  // Supprimer avec confirmation par modal
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/parks/${id}`);
      fetchParks();
      setShowDeleteModal(false);
      toast.success("Parc supprimé avec succès!");
    } catch (err) {
      console.error("Erreur suppression:", err);
      toast.error("Erreur lors de la suppression du parc");
    }
  };

  // Modifier
  const handleEdit = (park) => {
    setEditingId(park._id);
    setFormData({
      num: park.num,
      title: { ...park.title },
      description: { ...park.description },
      fauna: { ...park.fauna },
      flora: { ...park.flora },
      activities: { ...park.activities },
      access: { ...park.access },
      bestTime: { ...park.bestTime },
    });
    setShowModal(true);
    setStep(1);
  };

  // Reset
  const resetForm = () => {
    setEditingId(null);
    setFormData({
      num: "",
      title: { fr: "", en: "" },
      description: { fr: "", en: "" },
      fauna: { fr: "", en: "" },
      flora: { fr: "", en: "" },
      activities: { fr: "", en: "" },
      access: { fr: "", en: "" },
      bestTime: { fr: "", en: "" },
    });
    setStep(1);
  };

  // Ouvrir la modal de confirmation
  const confirmDelete = (park) => {
    setParkToDelete(park);
    setShowDeleteModal(true);
  };

  // Annuler la suppression
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setParkToDelete(null);
  };


  // Fil d'ariane
  const stepsLabels = [
    "Numéro",
    "Fr: Titre & Description",
    "Fr: Faune & Flore",
    "Fr: Activités & Accès",
    "Fr: Période",
    "En: Titre & Description",
    "En: Faune/Flore/Activités/Accès/Période",
    "Validation",
  ];

  // Rendu des champs par étape
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <label className="form-label">Numéro</label>
            <input
              type="number"
              className="form-control"
              value={formData.num}
              onChange={(e) =>
                setFormData({ ...formData, num: e.target.value })
              }
              required
            />
          </div>
        );
      case 2:
        return (
          <>
            <label className="form-label">Titre (FR)</label>
            <input
              type="text"
              className="form-control mb-2"
              value={formData.title.fr}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: { ...formData.title, fr: e.target.value },
                })
              }
              required
            />
            <label className="form-label">Description (FR)</label>
            <textarea
              className="form-control"
              value={formData.description.fr}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: { ...formData.description, fr: e.target.value },
                })
              }
              required
            />
          </>
        );
      case 3:
        return (
          <>
            <label className="form-label">Faune (FR)</label>
            <input
              type="text"
              className="form-control mb-2"
              value={formData.fauna.fr}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fauna: { ...formData.fauna, fr: e.target.value },
                })
              }
              required
            />
            <label className="form-label">Flore (FR)</label>
            <input
              type="text"
              className="form-control"
              value={formData.flora.fr}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  flora: { ...formData.flora, fr: e.target.value },
                })
              }
              required
            />
          </>
        );
      case 4:
        return (
          <>
            <label className="form-label">Activités (FR)</label>
            <input
              type="text"
              className="form-control mb-2"
              value={formData.activities.fr}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  activities: { ...formData.activities, fr: e.target.value },
                })
              }
              required
            />
            <label className="form-label">Accès (FR)</label>
            <input
              type="text"
              className="form-control"
              value={formData.access.fr}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  access: { ...formData.access, fr: e.target.value },
                })
              }
              required
            />
          </>
        );
      case 5:
        return (
          <>
            <label className="form-label">Période idéale (FR)</label>
            <input
              type="text"
              className="form-control"
              value={formData.bestTime.fr}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  bestTime: { ...formData.bestTime, fr: e.target.value },
                })
              }
              required
            />
          </>
        );
      case 6:
        return (
          <>
            <label className="form-label">Titre (EN)</label>
            <input
              type="text"
              className="form-control mb-2"
              value={formData.title.en}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: { ...formData.title, en: e.target.value },
                })
              }
            />
            <label className="form-label">Description (EN)</label>
            <textarea
              className="form-control"
              value={formData.description.en}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: { ...formData.description, en: e.target.value },
                })
              }
            />
          </>
        );
      case 7:
        return (
          <>
            {["fauna", "flora", "activities", "access", "bestTime"].map(
              (field) => (
                <div key={field} className="mb-2">
                  <label className="form-label text-capitalize">{field} (EN)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData[field].en}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        [field]: { ...prev[field], en: e.target.value },
                      }))
                    }
                  />
                </div>
              )
            )}
          </>
        );
      case 8:
        return (
          <div>
            <h5>Résumé</h5>
            <div className="border p-3 bg-light">
              <pre className="mb-0">{JSON.stringify(formData, null, 2)}</pre>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) return <p className="text-center mt-5">Chargement...</p>;

  return (
    <div>
      {/* Container pour les toasts */}
     
      {/* Modal de confirmation de suppression */}
      {showDeleteModal && parkToDelete && (
        <div>
          <div className="modal-backdrop fade show"></div>
          <div className="modal fade show d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmer la suppression</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={cancelDelete}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Êtes-vous sûr de vouloir supprimer le parc "{parkToDelete.title[lang]}" ?</p>
                  <p className="text-muted">Cette action est irréversible.</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={cancelDelete}
                  >
                    Annuler
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleDelete(parkToDelete._id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold fs-1 d-none d-lg-block">Liste des Parks</h1>
          <div className="d-flex gap-2">
            
            <select
              className="form-select w-auto"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
            </select>
            <button
              className="btn btn-dark"
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
            >
              Ajouter parc
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={() => navigate("/admin")}
            >
              Dashboard
            </button>
          </div>
        </div>

        {/* Modal multi-steps */}
        {showModal && (
  <div>
    {/* Bootstrap backdrop */}
    <div className="modal-backdrop fade show"></div>
    
    {/* Bootstrap modal */}
    <div className="modal fade show d-block" tabIndex="-1" aria-labelledby="parkModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title fs-4" id="parkModalLabel">
              {editingId ? "Modifier un parc" : "Ajouter un parc"}
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body p-4">
            {/* Fil d'ariane */}
            <div className="mb-4 fs-9">
              {stepsLabels.map((label, index) => (
                <span
                  key={index}
                  className={`me-2 ${
                    step === index + 1 ? "fw-bold text-dark" : "text-muted"
                  }`}
                >
                  {label}
                  {index < stepsLabels.length - 1 && " > "}
                </span>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {renderStep()}

              <div className="modal-footer px-0 pb-0 mt-4">
                {step > 1 && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setStep(step - 1)}
                  >
                    Précédent
                  </button>
                )}
                {step < stepsLabels.length ? (
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => setStep(step + 1)}
                  >
                    Suivant
                  </button>
                ) : (
                  <button type="submit" className="btn btn-success">
                    {editingId ? "Mettre à jour" : "Créer"}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

        {/* Liste des parcs */}
        <div className="row g-4">
          {parks.map((park) => (
            <div key={park._id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm p-3">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title fs-5">{park.title?.[lang] || "Sans titre"}</h5>
                    <span className="badge bg-primary">#{park.num}</span>
                  </div>
                  <p className="card-text">{park.description?.[lang] || "Aucune description"}</p>
                  <ul className="list-group list-group-flush mt-3">
                    <li className="list-group-item">
                      <strong>Faune :</strong> {park.fauna?.[lang] || "Non spécifié"}
                    </li>
                    <li className="list-group-item">
                      <strong>Flore :</strong> {park.flora?.[lang] || "Non spécifié"}
                    </li>
                    <li className="list-group-item">
                      <strong>Activités :</strong> {park.activities?.[lang] || "Non spécifié"}
                    </li>
                    <li className="list-group-item">
                      <strong>Accès :</strong> {park.access?.[lang] || "Non spécifié"}
                    </li>
                    <li className="list-group-item">
                      <strong>Période idéale :</strong> {park.bestTime?.[lang] || "Non spécifié"}
                    </li>
                  </ul>
                  <div className="mt-3 d-flex gap-2">
                    <button
                    className="btn btn-outline-dark btn-sm"
                    onClick={() => toast.info("Fonction en maintenance")}
                  >
                    <i className="bi bi-download me-3"></i>
                    Importer une image
                  </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(park)}
                >
                  Modifier
                </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => confirmDelete(park)}
                  >
                    Supprimer
                  </button>
                  
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {parks.length === 0 && !loading && (
          <p className="text-center mt-4">Aucun parc trouvé.</p>
        )}
      </div>
       <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      pauseOnHover
      theme="colored"
      />
    </div>
  );
}

export default Parks;