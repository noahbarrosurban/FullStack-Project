const ModelCarro = require('../model/carro'); // O modelo Carro deve ser importado
const ModelMarca = require('../model/marca'); // O modelo Marca para validação

class CarroController {
    // Listar todos os carros
    static async List(req, res) {
        try {
            const carros = await ModelCarro.findAll({ include: { model: ModelMarca, as: 'marca' } });
            return res.status(200).send(carros);
        } catch (error) {
            console.error('Erro na List', error);
            return res.status(500).send({ message: 'Erro ao listar carros' });
        }
    }

    // Criar um novo carro
    static async Create(req, res) {
        try {
            const { Modelo, Ano, Placa, MarcaId } = req.body;

            // Verificar se a marca existe antes de criar o carro
            const marca = await ModelMarca.findByPk(MarcaId);
            if (!marca) {
                return res.status(404).send({ message: 'Marca não encontrada' });
            }

            const carro = await ModelCarro.create({
                Modelo,
                Ano,
                Placa,
                MarcaId
            });
            return res.status(201).send(carro);
        } catch (error) {
            console.error('Erro na Create', error);
            return res.status(500).send({ message: 'Erro ao criar carro' });
        }
    }

    // Atualizar um carro existente
    static async Update(req, res) {
        try {
            const { Codigo } = req.params; // Pegando o Codigo via params
            const { Modelo, Ano, Placa, MarcaId } = req.body;
    
            const carro = await ModelCarro.findByPk(Codigo);
            if (!carro) {
                return res.status(404).send({ message: 'Carro não encontrado' });
            }
    
            // Verificar se a marca existe (se for fornecida uma nova MarcaId)
            if (MarcaId) {
                const marca = await ModelMarca.findByPk(MarcaId);
                if (!marca) {
                    return res.status(404).send({ message: 'Marca não encontrada' });
                }
                carro.MarcaId = MarcaId;
            }
    
            carro.Modelo = Modelo || carro.Modelo;
            carro.Ano = Ano || carro.Ano;
            carro.Placa = Placa || carro.Placa;
    
            await carro.save();
            return res.status(200).send(carro);
        } catch (error) {
            console.error('Erro no Update', error);
            return res.status(500).send({ message: 'Erro ao atualizar carro' });
        }
    }

    // Obter um carro específico por Código
    static async GetOne(req, res) {
        try {
            const { Codigo } = req.params;

            const carro = await ModelCarro.findByPk(Codigo, { include: { model: ModelMarca, as: 'marca' } });
            if (!carro) {
                return res.status(404).send({ message: 'Carro não encontrado' });
            }

            return res.status(200).send(carro);
        } catch (error) {
            console.error('Erro na GetOne', error);
            return res.status(500).send({ message: 'Erro ao obter carro' });
        }
    }

    // Deletar um carro
    static async Delete(req, res) {
        try {
            const { Codigo } = req.params; // Pegando o Codigo via params
    
            const carro = await ModelCarro.findByPk(Codigo);
            if (!carro) {
                return res.status(404).send({ message: 'Carro não encontrado' });
            }
    
            await carro.destroy();
            return res.status(200).send({ message: 'Carro deletado com sucesso' });
        } catch (error) {
            console.error('Erro na Delete', error);
            return res.status(500).send({ message: 'Erro ao deletar carro' });
        }
    }
}

module.exports = CarroController;