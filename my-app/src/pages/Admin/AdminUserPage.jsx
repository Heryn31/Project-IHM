import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Price from "./Price";
import Content from "./Content";
import Chart from "./Chart";
import Cover from "./Cover";

function AdminUserPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  // Charger les utilisateurs
  useEffect(() => {
    fetchUsers();
    fetchMessages();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Erreur lors du fetch des utilisateurs :", err);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/messages');
      setMessages(response.data);
      // Calculer le nombre de messages non lus
      const unread = response.data.filter(msg => !msg.read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.error('Erreur lors de la récupération des messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/messages/${id}/read`);
      setMessages(messages.map(msg => 
        msg._id === id ? { ...msg, read: true } : msg
      ));
      setUnreadCount(prev => prev - 1);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const deleteMessage = async (id) => {
    if (window.confirm('Supprimer ce message ?')) {
      try {
        await axios.delete(`http://localhost:5000/api/messages/${id}`);
        setMessages(messages.filter(msg => msg._id !== id));
        // Recalculer le nombre de messages non lus
        const unread = messages.filter(msg => !msg.read && msg._id !== id).length;
        setUnreadCount(unread);
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        toast.error(
          "Erreur lors de la suppression de l'utilisateur : " + data.message
        );
        return;
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      toast.success("Utilisateur supprimé avec succès");
    } catch (error) {
      console.log("Erreur lors de la suppression : " + error.message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
          <p className="fs-5">
            En cours de chargement... (si le temps est long, veuillez patienter)
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 text-center">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
        <h2 className="mb-3 mb-md-0 fw-bold" style={{ fontSize: "3.5rem" }}>Dashboard</h2>
        
        <div className="d-flex align-items-center gap-3">
          {/* Bouton "Voir le site" */}
          <a href="/">
            <button className="btn btn-main">{t("seeWebsite")}</button>
          </a>

          {/* Dropdown des notifications */}
          <div className="dropdown">
            <button 
              className="btn btn-outline-black position-relative dropdown-toggle"
              type="button"
              id="notificationDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-bell-fill"></i>
              {unreadCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {unreadCount}
                  <span className="visually-hidden">messages non lus</span>
                </span>
              )}
            </button>
            
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="notificationDropdown">
              <li><h6 className="dropdown-header">Messages des visiteurs</h6></li>
              
              {messages.length === 0 ? (
                <li><span className="dropdown-item-text">Aucun message</span></li>
              ) : (
                messages.slice(0, 5).map(message => (
                  <li key={message._id}>
                    <div className={`dropdown-item ${message.read ? '' : 'fw-bold'}`}>
                      <div className="d-flex justify-content-between">
                        <strong>{message.name}</strong>
                        {!message.read && (
                          <span className="badge bg-primary">Nouveau</span>
                        )}
                      </div>
                      <p className="mb-1 small text-truncate">{message.message}</p>
                      <small className="text-muted">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  </li>
                ))
              )}
              
              <li><hr className="dropdown-divider"/></li>
              <li>
                <button 
                  className="dropdown-item text-center" 
                  onClick={() => navigate("/admin/messages")}
                >
                  <i className="bi bi-inbox me-1"></i>
                  Voir tous les messages ({messages.length})
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Chart />
      <Price />
      <Content />

      {/* Section Messages */}
      <div className="row mt-5">
        <div className="col-12">
          <h2 className="my-5 fw-semibold">Messages des visiteurs</h2>
          
          {messages.length === 0 ? (
            <p className="text-center mt-4">Aucun message pour le moment</p>
          ) : (
            <div className="row">
              {messages.map((message) => (
                <div key={message._id} className="col-md-6 col-lg-4 mb-4">
                  <div className={`card h-100 ${message.read ? '' : 'border-primary'}`}>
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title">{message.name}</h5>
                        {!message.read && (
                          <span className="badge bg-primary">Nouveau</span>
                        )}
                      </div>
                      <h6 className="card-subtitle mb-2 text-muted">{message.email}</h6>
                      <p className="card-text">{message.message}</p>
                      <small className="text-muted">
                        {new Date(message.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    <div className="card-footer bg-transparent">
                      <div className="d-flex gap-2">
                        {!message.read && (
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => markAsRead(message._id)}
                          >
                            Marquer comme lu
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Section Utilisateurs */}
      <h2 className="my-5 fw-semibold" style={{ fontSize: "4.5rem" }}>{t("userList")}</h2>
      <table className="table table-bordered">
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
                  className={`badge text-light d-block w-100 h-100 text-center ${
                    user.status === "online" ? "bg-success" : "bg-secondary"
                  }`}
                  style={{ lineHeight: "normal" }}
                >
                  ● {user.status}
                </span>
              </td>
              <td>
                <span
                  className={`badge text-light d-block w-100 h-100 text-center ${
                    user.role === "admin" ? "bg-success" : "bg-secondary"
                  }`}
                  style={{ lineHeight: "normal" }}
                >
                  ● {user.role}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-danger"
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
                        <h6 className="modal-title" id="deleteModalLabel">
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ToastContainer pour afficher les notifications */}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        theme="colored"
      />
    </div>
  );
}

export default AdminUserPage;