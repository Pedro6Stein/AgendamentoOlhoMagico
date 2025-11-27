import React, { useState } from "react";
import Agendamento from "./pages/Agendamento";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const [view, setView] = useState("agendamento");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (success) => {
    if (success) {
      setIsAuthenticated(true);
      setView("dashboard");
    } else {
      alert("Falha na autenticação. CPF inválido.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);

    localStorage.removeItem("adminToken");
    setView("login");
  };

  const renderView = () => {
    if (view === "agendamento") {
      return <Agendamento setView={setView} />;
    }

    if (view === "login") {
      return <AdminLogin onLogin={handleLogin} setView={setView} />;
    }

    if (view === "dashboard" || isAuthenticated) {
      return <AdminDashboard onLogout={handleLogout} />;
    }

    return <AdminLogin onLogin={handleLogin} setView={setView} />;
  };

  const Nav = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 bg-grafite-medium shadow-lg">
      <button
        onClick={() => setView("agendamento")}
        className="px-4 py-2 mx-2 text-white transition duration-200 rounded-lg hover:bg-gray-700"
      >
        Agendamento Público
      </button>
      <button
        onClick={() => setView("login")}
        className="px-4 py-2 mx-2 text-amarelo-olho border border-amarelo-olho transition duration-200 rounded-lg hover:bg-amarelo-olho hover:text-grafite-medium"
      >
        Área Admin
      </button>
    </nav>
  );

  return (
    <div className="pt-16">
      <Nav />
      {renderView()}
    </div>
  );
}

export default App;
