import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'

const CarroForm = () => {
    const [modelo, setModelo] = useState('');
    const [ano, setAno] = useState('');
    const [placa, setPlaca] = useState('');
    const [marcaId, setMarcaId] = useState('');
    const [marcas, setMarcas] = useState([]);

    useEffect(() => {
        const fetchMarcas = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/marca');
                setMarcas(response.data);
            } catch (error) {
                console.error('Erro ao buscar marcas:', error);
            }
        };

        fetchMarcas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const carroData = { Modelo: modelo, Ano: ano, Placa: placa, MarcaId: marcaId };

        try {
            const response = await axios.post('http://localhost:8081/api/carro', carroData);
            console.log('Carro cadastrado:', response.data);
            // Limpar o formulário após o envio
            setModelo('');
            setAno('');
            setPlaca('');
            setMarcaId('');
        } catch (error) {
            console.error('Erro ao cadastrar carro:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Cadastrar Carro</h2>
            <div>
                <label>Modelo:</label>
                <input
                    type="text"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Ano:</label>
                <input
                    type="text"
                    value={ano}
                    onChange={(e) => setAno(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Placa:</label>
                <input
                    type="text"
                    value={placa}
                    onChange={(e) => setPlaca(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Marca:</label>
                <select value={marcaId} onChange={(e) => setMarcaId(e.target.value)} required>
                    <option value="">Selecione uma marca</option>
                    {marcas.map((marca) => (
                        <option key={marca.CodigoMarca} value={marca.CodigoMarca}>
                            {marca.Nome}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Cadastrar Carro</button>
        </form>
    );
};

export default CarroForm;