import React, { useState } from "react";
import axios from "axios";
import "./Agendamento.css";

const API_URL = "http://localhost:8080/api/agendamentos";
const WHATSAPP_BASE_URL =
  "https://api.whatsapp.com/send?phone=5511971266547&text=";

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
    const text = `Olá Wilson, gostaria de fazer um agendamento. Meus dados são:
- Nome: ${data.nomeCliente}
- Telefone: ${data.telefoneCliente}
- E-mail: ${data.emailCliente}
- Carro: ${data.marcaModelo} (${data.placaVeiculo})
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
        "✅ Agendamento pré-reservado com sucesso! Redirecionando para o WhatsApp..."
      );

      const whatsappText = formatWhatsAppText(formData);
      const whatsappLink = `${WHATSAPP_BASE_URL}${whatsappText}`;

      setTimeout(() => {
        window.open(whatsappLink, "_blank");
      }, 2000);

      setFormData({
        nomeCliente: "",
        telefoneCliente: "",
        emailCliente: "",
        dataAgendamento: "",
        servicoDesejado: "",
        marcaModelo: "",
        placaVeiculo: "",
        anoVeiculo: "",
      });
    } catch (error) {
      setMessage(
        "❌ Agendamento salvo no Front, mas o envio para o Backend falhou. Verifique se o servidor Java (8080) está rodando e o CORS está configurado."
      );
      console.error("Erro de API/Backend:", error);

      const whatsappText = formatWhatsAppText(formData);
      const whatsappLink = `${WHATSAPP_BASE_URL}${whatsappText}`;
      window.open(whatsappLink, "_blank");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="agendamento-container">
      <h2 className="agendamento-header">Agendamento - Olho Mágico</h2>
      <p className="agendamento-subtitle">
        Preencha seus dados e os detalhes do seu veículo para a pré-reserva.
      </p>

      <form onSubmit={handleSubmit} className="agendamento-form">
        {/* DADOS PESSOAIS */}
        <h3 className="section-title">Dados Pessoais</h3>
        <input
          name="nomeCliente"
          value={formData.nomeCliente}
          onChange={handleChange}
          placeholder="Nome Completo"
          required
          className="agendamento-input"
        />
        <input
          name="telefoneCliente"
          value={formData.telefoneCliente}
          onChange={handleChange}
          placeholder="Telefone (WhatsApp)"
          required
          className="agendamento-input"
        />
        <input
          name="emailCliente"
          value={formData.emailCliente}
          onChange={handleChange}
          placeholder="Email"
          required
          className="agendamento-input"
        />

        {/* DETALHES DO AGENDAMENTO */}
        <h3 className="section-title">Detalhes do Agendamento</h3>
        <input
          name="dataAgendamento"
          value={formData.dataAgendamento}
          onChange={handleChange}
          placeholder="Data e Hora Sugerida (Ex: 01/12/2025 - 14:00)"
          required
          className="agendamento-input"
        />
        <input
          name="servicoDesejado"
          value={formData.servicoDesejado}
          onChange={handleChange}
          placeholder="Serviço Desejado (Ex: Inspeção Completa)"
          required
          className="agendamento-input"
        />

        {/* DADOS DO VEÍCULO */}
        <h3 className="section-title">Dados do Veículo</h3>
        <input
          name="marcaModelo"
          value={formData.marcaModelo}
          onChange={handleChange}
          placeholder="Marca e Modelo (Ex: BMW Série 3)"
          required
          className="agendamento-input"
        />
        <input
          name="placaVeiculo"
          value={formData.placaVeiculo}
          onChange={handleChange}
          placeholder="Placa do Veículo"
          required
          className="agendamento-input"
        />
        <input
          name="anoVeiculo"
          value={formData.anoVeiculo}
          onChange={handleChange}
          placeholder="Ano do Veículo (Opcional)"
          className="agendamento-input"
        />

        <button type="submit" disabled={loading} className="agendamento-button">
          {loading ? "AGENDANDO..." : "AGENDAR E ENVIAR WHATSAPP"}
        </button>

        {message && (
          <p
            className={
              message.includes("✅") ? "message-success" : "message-error"
            }
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default Agendamento;
