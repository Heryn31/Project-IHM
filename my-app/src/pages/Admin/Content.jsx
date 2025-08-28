import React from "react";
import { useNavigate } from "react-router-dom";

function Content() {
  const navigate = useNavigate();
  return (
    <>
    <div className="w-100 d-flex justify-content-center align-items-center border border-2" style={{ height: "50vh", color: "white" }}>
        <button className="btn btn-primary" onClick={() => navigate("/admin/parks")}>
            Manager les parcs et ses contenus
            <i class="bi bi-box-arrow-up-right ms-3"></i>
        </button>
    </div>
    </>
  );
}

export default Content;
