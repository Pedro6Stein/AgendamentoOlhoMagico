import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import logoOlhoMagico from "../assets/logo-olho-magico.png.png";

const LOGIN_API_URL = 'http://localhost:8080/api/admin/login';

function AdminLogin({ onLogin, setView }) {
    const [cpf, setCpf] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const cleanCpf = cpf.replace(/\D/g, ''); 

        // --- 🔑 CHAVE MESTRA TEMPORÁRIA (Enquanto não tem Backend) ---
        if (cleanCpf === '00000000858') { // CPF: 000.000.008-58 limpo
            setTimeout(() => {
                // Cria um token falso para enganar a verificação
                localStorage.setItem('adminToken', 'token-mestre-temporario');
                setMessage('🔓 Chave Mestra Aceita! Acessando sistema...');
                onLogin(true); 
                setLoading(false);
            }, 1500); 
            return; 
        }
        // -----------------------------------------------------------

        try {
            const response = await axios.post(LOGIN_API_URL, { cpf: cleanCpf });

            const token = response.data.token;
            if (token) {
                localStorage.setItem('adminToken', token);
                setMessage('✅ Autenticação bem-sucedida! Redirecionando...');
                onLogin(true);
            } else {
                setMessage('❌ Erro: Token não recebido. CPF pode estar inválido.');
                onLogin(false);
            }

        } catch (error) {
            setMessage('❌ Acesso Negado. Verifique o CPF ou se o servidor Java está rodando.');
            onLogin(false);
            console.error('Erro de Login:', error.response ? error.response.data : error.message);
        } finally {
            // Só desativa o loading aqui se não tiver entrado no if da chave mestra
            if (cleanCpf !== '00000000858') {
                setLoading(false);
            }
        }
    };

    const handleCpfChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 3) value = value.substring(0, 3) + '.' + value.substring(3);
        if (value.length > 7) value = value.substring(0, 7) + '.' + value.substring(7);
        if (value.length > 11) value = value.substring(0, 11) + '-' + value.substring(11);
        setCpf(value.substring(0, 14));
    }

    return (
        <div className="flex items-center justify-center min-h-screen p-4 sm:p-8">
            <motion.div 
                className="w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl shadow-black/50 lg:grid-cols-2"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    
                    {/* SEÇÃO DE BRANDING */}
                    <div className="flex flex-col items-center justify-center p-8 text-center text-white bg-gradient-to-br from-grafite to-grafite-light sm:p-12">
                        <img 
                            src={logoOlhoMagico} 
                            alt="Logo Olho Mágico" 
                            className="w-48 h-auto mb-6 drop-shadow-lg" 
                        /> 
                        <h1 className="mb-2 text-xl font-extrabold tracking-wider text-amarelo-olho md:text-2xl">
                            Área Restrita
                        </h1>
                        <p className="text-lg text-gray-400">Acesso exclusivo para Administradores cadastrados.</p>
                        <button 
                            onClick={() => setView('agendamento')}
                            className="mt-6 px-4 py-2 text-sm text-gray-300 transition duration-200 rounded-lg hover:text-white hover:bg-grafite-medium"
                        >
                            ← Voltar para Agendamento Público
                        </button>
                    </div>

                    {/* FORMULÁRIO DE LOGIN */}
                    <div className="p-8 bg-grafite-medium sm:p-12">
                        <h2 className="mb-8 text-3xl font-bold text-center text-amarelo-olho">Login Admin</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            
                            <motion.input
                                name="cpf"
                                value={cpf}
                                onChange={handleCpfChange}
                                placeholder="CPF (Apenas números válidos)"
                                required
                                maxLength="14"
                                className="w-full p-4 text-white transition-all duration-300 border-2 rounded-lg bg-grafite-light border-grafite-light focus:border-amarelo-olho focus:ring-1 focus:ring-amarelo-olho"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            />
                            
                            <motion.button 
                                type="submit" 
                                disabled={loading} 
                                className="w-full py-4 text-lg font-extrabold uppercase transition duration-200 rounded-lg shadow-lg bg-amarelo-olho text-grafite-medium hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                whileHover={{ scale: 1.02 }} 
                                whileTap={{ scale: 0.98 }}
                            >
                                {loading ? 'VERIFICANDO...' : 'ACESSAR DASHBOARD'}
                            </motion.button>

                            {message && (
                                <motion.p 
                                    className={`p-3 text-center rounded-lg font-medium ${message.includes('🔓') || message.includes('✅') ? 'bg-green-800/30 text-green-400' : 'bg-red-800/30 text-red-400'}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                >
                                    {message}
                                </motion.p>
                            )}
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default AdminLogin;