import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
//Import toastify
import { ToastContainer, toast } from "react-toastify";

function AdminPage() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur lors du fetch des utilisateurs :", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center">Chargement...</p>;

  // // Fonction pour supprimer un utilisateur
  // const handleDelete = (userId) => {
  //   fetch(`http://localhost:5000/api/users/${userId}`, {
  //     method: "DELETE",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUsers(data);
  //     })
  //     .catch((err) => {
  //       console.error("Erreur lors de la suppression de l'utilisateur :", err);
  //     });
  // };
  const handleDelete = async (userId) => {

  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: 'DELETE',
      credentials: 'include', // si tu utilises des sessions, garde ce paramètre
    });

    if (!response.ok) {
      const data = await response.json();
      toast.error('Erreur lors de la suppression de l\'utilisateur : ' + data.message);
      return;
    }

    // Met à jour la liste des utilisateurs côté client
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    toast.success('Utilisateur supprimé avec succès');
  } catch (error) {
    console.log("Erreur lors de la suppression : " + error.message);
  }
};

  return (
    <div className="container mt-4 text-center">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h2 className="mb-3 mb-md-0">{t("userList")}</h2>
        <a href="/">
          <button className="btn btn-main">{t("seeWebsite")}</button>
        </a>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>{t("name")}</th>
            <th>Email</th>
            <th>Status</th>
            <th>Role</th>
            <th colSpan={2}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id || index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span
                  className={`badge text-light ${
                    user.status === "online" ? "bg-success" : "bg-secondary"
                  }`}
                >
                  ● {user.status}
                </span>
              </td>
              <td>
                <span
                  className={`badge text-light ${
                    user.role === "admin" ? "bg-success" : "bg-secondary"
                  }`}
                >
                  ● {user.role}
                </span>
              </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    data-bs-toggle="modal"
                    data-bs-target={`#delete-modal-${user._id}`}
                  >
                    <i className="bi bi-trash-fill me-3"></i>Delete
                  </button>
                  <div
                    className="modal fade"
                    id={`delete-modal-${user._id}`}
                    tabIndex="-1"
                    aria-labelledby="deleteModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h6
                            className="modal-title"
                            id="deleteModalLabel"
                          >
                            {t("deleteConfirmation")}
                          </h6>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            {t("cancel")}
                          </button>
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => handleDelete(user._id)}
                            data-bs-dismiss="modal"
                          >
                            {t("delete")}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  <i className="bi bi-trash-fill me-3"></i>Delete
                </button> */}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* ToastContainer pour afficher les notifications */}
      <ToastContainer 
        position="top-right"
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
  );
}

export default AdminPage;
