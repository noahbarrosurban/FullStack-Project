import React, { useState } from 'react';
import axios from 'axios';
import './style.css'

const CadastrarMarca = () => {
    const [nome, setNome] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            await axios.post('http://localhost:8081/api/marca', {
                Nome: nome,
            });
            setSuccess(true); // Exibe mensagem de sucesso
            setNome(''); // Limpa o campo após o envio
        } catch (error) {
            console.error('Erro ao cadastrar marca:', error);
            setError('Erro ao cadastrar a marca. Tente novamente.');
        }
    };

    return (
        <div className="container">
            <h2>Cadastrar Marca</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="form-group">
                    <label>Nome da Marca:</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                        placeholder="Digite o nome da marca"
                    />
                </div>
                <button type="submit">Cadastrar Marca</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Marca cadastrada com sucesso!</p>}
        </div>
    );
};

export default CadastrarMarca;