import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const API_URL = "http://localhost:8080/api/agendamentos";

const LogoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-5 h-5 mr-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);

function AdminDashboard({ onLogout }) {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAgendamentos();
  }, []);

  const fetchAgendamentos = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAgendamentos(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      setError(
        "Falha ao carregar agendamentos. O servidor pode estar offline ou o token expirou."
      );
      setLoading(false);

      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 403)
      ) {
        onLogout();
      }
    }
  };

  const formatDate = (dateString) => {
    return dateString;
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-grafite">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-700">
          <div>
            <h1 className="text-3xl font-bold text-amarelo-olho">
              Painel Administrativo
            </h1>
            <p className="text-gray-400">
              Visualização de agendamentos recebidos.
            </p>
          </div>
          <button
            onClick={onLogout}
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-red-600/20 text-red-400 border border-red-600/50 rounded-lg hover:bg-red-600 hover:text-white transition-colors"
          >
            <LogoutIcon />
            Sair do Sistema
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amarelo-olho mx-auto mb-4"></div>
            <p className="text-gray-400">Carregando registros...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-500 text-red-200 p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold mb-2">Erro de Conexão</h3>
            <p>{error}</p>
            <button
              onClick={fetchAgendamentos}
              className="mt-4 text-sm underline hover:text-white"
            >
              Tentar Novamente
            </button>
          </div>
        ) : agendamentos.length === 0 ? (
          <div className="text-center py-20 bg-grafite-light rounded-xl border border-gray-700">
            <p className="text-xl text-gray-500">
              Nenhum agendamento encontrado até o momento.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl shadow-xl shadow-black/40 border border-gray-700 bg-grafite-light">
            <table className="w-full text-left text-gray-300">
              <thead className="bg-grafite-medium text-amarelo-olho uppercase text-sm font-bold">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Cliente</th>
                  <th className="p-4">Contato</th>
                  <th className="p-4">Veículo</th>
                  <th className="p-4">Serviço/Data</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {agendamentos.map((item, index) => (
                  <motion.tr
                    key={item.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="p-4 text-sm text-gray-500">#{item.id}</td>
                    <td className="p-4 font-medium text-white">
                      {item.nomeCliente}
                    </td>
                    <td className="p-4 text-sm">
                      <div className="flex flex-col">
                        <span>{item.telefoneCliente}</span>
                        <span className="text-xs text-gray-500">
                          {item.emailCliente}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-sm">
                      <span className="block font-bold text-gray-200">
                        {item.marcaModelo}
                      </span>
                      <span className="text-xs bg-gray-800 px-2 py-1 rounded inline-block mt-1 border border-gray-600">
                        {item.placaVeiculo}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      <div className="flex flex-col">
                        <span className="text-amarelo-olho font-semibold">
                          {item.servicoDesejado}
                        </span>
                        <span className="text-xs text-gray-400">
                          {item.dataAgendamento}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <a
                        href={`https://api.whatsapp.com/send?phone=55${item.telefoneCliente.replace(
                          /\D/g,
                          ""
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-400 hover:text-green-300 text-sm font-bold border border-green-400/30 px-3 py-1 rounded hover:bg-green-400/10 transition"
                      >
                        WhatsApp
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
