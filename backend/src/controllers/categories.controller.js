const { obtenerCategorias } = require('../models/categories.model');

const getCategorias = async (req, res) => {
    try{
        const categorias = await obtenerCategorias ();
        res.json(categorias);
    }catch(error){
    console.error('Error al obtener categorias' + error);
    res.status(500).json({error: 'Error al obtener categorias'});
    }
};

module.exports = {
    getCategorias
};