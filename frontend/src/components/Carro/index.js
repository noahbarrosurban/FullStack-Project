import './style.css'
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Atualizado para usar useNavigate
import axios from 'axios';

const Carro = () => {
    const [carros, setCarros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCarros = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/carro'); // Substitua pela URL correta
                setCarros(response.data);
            } catch (error) {
                console.error('Erro ao buscar carros:', error);
                setError('Erro ao carregar os carros.');
            } finally {
                setLoading(false);
            }
        };

        fetchCarros();
    }, []);

    const handleDelete = async (codigo) => {
        try {
            await axios.delete(`http://localhost:8081/api/carro/${codigo}`);
            setCarros(carros.filter(carro => carro.Codigo !== codigo));
        } catch (error) {
            console.error('Erro ao deletar carro:', error);
            setError('Erro ao deletar o carro.');
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container">
            <div className="cardContainer">
                {carros.map(carro => (
                    <div key={carro.Codigo} className="card">
                        <h3>{carro.Modelo}</h3>
                        <p>Ano: {carro.Ano}</p>
                        <p>Placa: {carro.Placa}</p>
                        <p>Marca: {carro.marca.Nome}</p> {/* Assumindo que a relação com Marca está sendo incluída */}
                    
                        <div className="buttonGroup">
    <Link to={`/carros/edit/${carro.Codigo}`} className="button">
        Editar
    </Link>
    <button 
        onClick={() => handleDelete(carro.Codigo)} 
        className="button"
    >
        Deletar
    </button>
</div>

                    </div>
                ))}
            </div>
        </div>
    );
};
export default Carro;