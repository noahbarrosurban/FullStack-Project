const ModelMarca = require('../model/marca'); // Importa o modelo Marca
const ModelCarro = require('../model/carro'); // Importa o modelo Carro para verificar a relação

class MarcaController {
    // Listar todas as marcas
    static async List(req, res) {
        try {
            const marcas = await ModelMarca.findAll();
            return res.status(200).send(marcas);
        } catch (error) {
            console.error('Erro na List', error);
            return res.status(500).send({ message: 'Erro ao listar marcas' });
        }
    }

    // Criar uma nova marca
    static async Create(req, res) {
        try {
            const { Nome } = req.body;
            const marca = await ModelMarca.create({ Nome });
            return res.status(201).send(marca);
        } catch (error) {
            console.error('Erro na Create', error);
            return res.status(500).send({ message: 'Erro ao criar marca' });
        }
    }

    // Atualizar uma marca existente
    static async Update(req, res) {
        try {
            const { CodigoMarca } = req.params; // Pegue o CodigoMarca dos parâmetros da URL
            const { Nome } = req.body; // Pegue o Nome do corpo da requisição
    
            const marca = await ModelMarca.findByPk(CodigoMarca);
            if (!marca) {
                return res.status(404).send({ message: 'Marca não encontrada' });
            }
    
            marca.Nome = Nome || marca.Nome; // Atualiza o nome se fornecido
            await marca.save(); // Salva as alterações
            return res.status(200).send(marca); // Retorna a marca atualizada
        } catch (error) {
            console.error('Erro no Update', error);
            return res.status(500).send({ message: 'Erro ao atualizar marca' });
        }
    }

    // Obter uma marca específica por Código
    static async GetOne(req, res) {
        try {
            const { CodigoMarca } = req.params;
            const marca = await ModelMarca.findByPk(CodigoMarca);
            if (!marca) {
                return res.status(404).send({ message: 'Marca não encontrada' });
            }
            return res.status(200).send(marca);
        } catch (error) {
            console.error('Erro na GetOne', error);
            return res.status(500).send({ message: 'Erro ao obter marca' });
        }
    }

    // Deletar uma marca
    static async Delete(req, res) {
        try {
            const { CodigoMarca } = req.params; // Pegue o CodigoMarca dos parâmetros da URL
            const marca = await ModelMarca.findByPk(CodigoMarca);
            if (!marca) {
                return res.status(404).send({ message: 'Marca não encontrada' });
            }

            // Verifica se há carros associados a esta marca
            const carros = await ModelCarro.findAll({ where: { MarcaId: CodigoMarca } });
            if (carros.length > 0) {
                return res.status(400).send({ message: 'Não é possível deletar, há carros associados a essa marca' });
            }
    
            await marca.destroy(); // Deleta a marca
            return res.status(200).send({ message: 'Marca deletada com sucesso' });
        } catch (error) {
            console.error('Erro na Delete', error);
            return res.status(500).send({ message: 'Erro ao deletar marca' });
        }
    }
}

module.exports = MarcaController;
