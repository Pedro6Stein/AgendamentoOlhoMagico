import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

import logoOlhoMagico from "../assets/logo-olho-magico.png.png";

const API_URL = "http://localhost:8080/api/agendamentos";
const WHATSAPP_BASE_URL =
  "https://api.whatsapp.com/send?phone=5511971266547&text=";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

function Agendamento() {
  const [formData, setFormData] = useState({
    nomeCliente: "",
    telefoneCliente: "",
    emailCliente: "",
    dataAgendamento: "",
    servicoDesejado: "",
    marcaModelo: "",
    placaVeiculo: "",
    anoVeiculo: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatWhatsAppText = (data) => {
    const anoTexto = data.anoVeiculo ? data.anoVeiculo : "Não informado";
    const text = `Olá Wilson, gostaria de fazer um agendamento. Meus dados são:
- Nome: ${data.nomeCliente}
- Telefone: ${data.telefoneCliente}
- E-mail: ${data.emailCliente}
- Carro: ${data.marcaModelo} (${data.placaVeiculo})
- Ano: ${anoTexto}
- Data/Hora Sugerida: ${data.dataAgendamento}
- Serviço: ${data.servicoDesejado}
Você tem horário disponível?`;
    return encodeURIComponent(text.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(API_URL, formData);
      setMessage(
        "✅ Agendamento pré-reservado! Redirecionando para o WhatsApp..."
      );
    } catch (error) {
      setMessage(
        "⚠️ Redirecionando para o WhatsApp para confirmar o agendamento."
      );
      console.error("Backend offline ou erro:", error);
    } finally {
      const whatsappText = formatWhatsAppText(formData);
      const whatsappLink = `${WHATSAPP_BASE_URL}${whatsappText}`;

      setTimeout(() => {
        window.open(whatsappLink, "_blank");
      }, 1500);

      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 sm:p-8">
      <motion.div
        className="grid w-full max-w-6xl overflow-hidden rounded-2xl shadow-2xl shadow-black/50 lg:grid-cols-2"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        {/* Esquerda: Branding com a SUA LOGO */}
        <div className="flex flex-col items-center justify-center p-8 text-center text-white bg-gradient-to-br from-grafite to-grafite-light sm:p-12">
          <img
            src={logoOlhoMagico}
            alt="Logo Olho Mágico"
            className="w-100 h-auto mb-6 drop-shadow-2xl rounded-lg"
          />

          <motion.p
            className="text-lg text-gray-400 mt-2 font-medium"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Inspeção e Consultoria Automotiva Premium.
          </motion.p>
        </div>

        {/* Direita: Formulário */}
        <div className="p-8 bg-grafite-medium sm:p-12">
          <h2 className="mb-6 text-2xl font-bold text-center text-amarelo-olho">
            Solicite um Agendamento
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* DADOS PESSOAIS */}
            <h3 className="pt-4 pb-2 text-lg font-semibold border-b border-gray-600 text-amarelo-olho">
              Dados Pessoais
            </h3>
            {["nomeCliente", "telefoneCliente", "emailCliente"].map((name) => (
              <input
                key={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={
                  name === "nomeCliente"
                    ? "Nome Completo"
                    : name === "telefoneCliente"
                    ? "Telefone"
                    : "Email"
                }
                className="w-full p-3 text-white transition-all border-2 rounded-lg bg-grafite-light border-grafite-light focus:border-amarelo-olho focus:outline-none"
                required
              />
            ))}

            {/* SERVIÇO */}
            <h3 className="pt-4 pb-2 text-lg font-semibold border-b border-gray-600 text-amarelo-olho">
              Serviço e Horário
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="dataAgendamento"
                value={formData.dataAgendamento}
                onChange={handleChange}
                placeholder="Data/Hora"
                className="w-full p-3 text-white transition-all border-2 rounded-lg bg-grafite-light border-grafite-light focus:border-amarelo-olho focus:outline-none"
                required
              />
              <input
                name="servicoDesejado"
                value={formData.servicoDesejado}
                onChange={handleChange}
                placeholder="Serviço"
                className="w-full p-3 text-white transition-all border-2 rounded-lg bg-grafite-light border-grafite-light focus:border-amarelo-olho focus:outline-none"
                required
              />
            </div>

            {/* VEÍCULO */}
            <h3 className="pt-4 pb-2 text-lg font-semibold border-b border-gray-600 text-amarelo-olho">
              Dados do Veículo
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <input
                name="marcaModelo"
                value={formData.marcaModelo}
                onChange={handleChange}
                placeholder="Modelo"
                className="col-span-3 sm:col-span-1 w-full p-3 text-white border-2 rounded-lg bg-grafite-light border-grafite-light focus:border-amarelo-olho focus:outline-none"
                required
              />
              <input
                name="placaVeiculo"
                value={formData.placaVeiculo}
                onChange={handleChange}
                placeholder="Placa"
                className="col-span-1 w-full p-3 text-white border-2 rounded-lg bg-grafite-light border-grafite-light focus:border-amarelo-olho focus:outline-none"
                required
              />
              <input
                name="anoVeiculo"
                value={formData.anoVeiculo}
                onChange={handleChange}
                placeholder="Ano"
                className="col-span-2 sm:col-span-1 w-full p-3 text-white border-2 rounded-lg bg-grafite-light border-grafite-light focus:border-amarelo-olho focus:outline-none"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-lg font-extrabold uppercase transition duration-200 rounded-lg shadow-lg bg-amarelo-olho text-grafite-medium hover:bg-yellow-500 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? "ENVIANDO..." : "AGENDAR NO WHATSAPP"}
            </motion.button>

            {message && (
              <p className="mt-4 text-center text-sm font-medium text-green-400">
                {message}
              </p>
            )}
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default Agendamento;
