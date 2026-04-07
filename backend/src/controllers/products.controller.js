const { obtenerProductos,
        obtenerProductosPorCategoria,
        obtenerProductoPorId} = require('../models/products.model');

const getProductos = async (req, res) => {
    try{
        const productos = await obtenerProductos ();
        res.json(productos);
    } catch (error){
        console.error('Error al obtener productos: '+error);
        res.status(500).json({error: 'Error al obtener productos'});
    }
};

const getProductosPorCategoria = async(req, res) => {
    const {id} = req.params;

    try {
        const productos = await obtenerProductosPorCategoria(id);
        res.json({
            categoria_id: id,
            productos
        });
    }catch (error){
        console.error('Error al obtener productos: '+error);
        res.status(500).json({error: 'Error al obtener productos'});
    }
};

const getProductosPorId = async (req, res) => {
    const {id} = req.params;

    try {
        const producto = await obtenerProductoPorId(id);
        res.json({
            producto
        });
    } catch (error) {
        console.error('Error al obtener el producto: '+error);
        res.status(500).json({error: 'Error al obtener producto'});
    }
};

module.exports = {
    getProductos,
    getProductosPorCategoria,
    getProductosPorId
};
