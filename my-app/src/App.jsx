import '@fontsource/poppins/100.css'; // Thin
import '@fontsource/poppins/200.css'; // Extra Light
import '@fontsource/poppins/300.css'; // Light
import '@fontsource/poppins/400.css'; // Regular
import '@fontsource/poppins/500.css'; // Medium
import '@fontsource/poppins/600.css'; // Semi Bold
import '@fontsource/poppins/700.css'; // Bold
import '@fontsource/poppins/800.css'; // Extra Bold
import '@fontsource/poppins/900.css'; // Black

import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import './i18n';




import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Auth/login';
import Sign from './pages/Auth/sign';
import Home from './pages/Home';
import Parks from './pages/Parks/parks';
import AdminUserPage from './pages/Admin/AdminUserPage';

function App() {


  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/account" element={<div>Account Page</div>} />
          <Route path="/parks" element={<Parks />} />
          <Route path="/admin" element={<AdminUserPage />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
