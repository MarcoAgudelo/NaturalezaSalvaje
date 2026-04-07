import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";


function ProductDetail (){
    const {id} = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=> {
        const cargarProducto = async () => {
            try{
                const res = await fetch(`http://localhost:4000/api/productos/${id}`);

                if(!res.ok){
                    
                    throw new Error("Error al cargar producto");
                }

                const data = await  res.json();
                setProducto (data.producto);
            }catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };

        cargarProducto();
    }, [id]);

    if (loading) return <p>Cargando Productos...</p>
    if (error) return <p>Error {error}</p>
    if (!producto) return <p>Este producto no ha sido encontrado</p>

    return(
        <p></p>
    );
}

export default ProductDetail;