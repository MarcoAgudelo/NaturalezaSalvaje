import { useEffect, useState } from "react";
import "../../styles/Products.css";

function Products () {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const cargarProductos = async () => {
            try{
                const res = await fetch(`http://localhost:4000/api/productos`);

                if(!res.ok){
                    throw new Error ('Error al cargar productos');
                }

                const data = await res.json();
                setProductos(data);
            } catch(error) {
                setError(error.message);
            }finally {
                setLoading(false);
            }
        };
        cargarProductos();
    }, []);

    if (loading) return <p>Cargando productos...</p>;
    if(error) return <p>Error: {error}</p>;
    if(productos.length === 0) return <p>No hay productos disponibles</p>;

    return(
    <section className="products-page">
            <div className="products-header">
                <h1>Todos nuestros productos</h1>
                <p>Cosmetica natural para el cuidado de tu cuerpo</p>
            </div>

            <div className="products-grid">
                {productos.map(prod => (
                    <div key={prod.id} className="product-card">
                        <div className="product-image">
                            <img src={prod.imagen} alt={prod.nombre} />
                        </div>
                        <div className="product-info">
                            <h3>{prod.nombre}</h3>
                        <div className="product-categories">
                            <h2>{prod.categoria}</h2>
                        </div>
                        <p className="price">${prod.precio_formato} COP</p>
                        <button className="product-btn">Agregar al carrito</button>
                        </div>
                        </div>
                ))}
            </div>
        </section>
    );
}

export default Products;

