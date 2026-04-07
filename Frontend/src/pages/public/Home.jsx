import "../../styles/Home.css";
import tonico from "../../assets/tonico_home.png";
import Jabon_Avena from "../../assets/jabon_avena.png";
import tonico_capilar from "../../assets/tonico_capilar.png";
import biotina from "../../assets/Biotina.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
      const [categorias, setCategorias] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
        const cargarCategorias = async () => {
          try {
            const res = await fetch('http://localhost:4000/api/categorias');
            if (!res.ok) {
              throw new Error ('Error al cargar las categorias');
            }
            const data = await res.json();
            setCategorias(data);
          } catch (error) {
            setError(error.message);
          }finally{
            setLoading(false);
          }
        };
        cargarCategorias();
      }, []);

    if (loading) return <p>Cargando categorias...</p>;
    if(error) return <p>Error: {error}</p>;
    if(categorias.length === 0) return <p>No hay categorias disponibles</p>;

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-text">
          <h1>Tónico capilar de romero</h1>
          <p>
            Fortalece el crecimiento, estimula el cuero cabelludo
            y nutre tu cabello de forma natural.
          </p>

          {/* BOTÓN */}
          <Link to="/catalogo" className="hero-btn">
            Ver más
          </Link>
        </div>

        <div className="hero-image">
          <img src={tonico} alt="Tónico capilar de romero" />
        </div>
      </section>
      {/* BENEFITS SECTION */}
      <section className="benefits">
        <div className="benefit-card">
            <span className="benefit-icon">🌱</span>
            <h3>100% Natural</h3>
            <p>Ingredientes puros, sin químicos agresivos.</p>
        </div>

        <div className="benefit-card">
            <span className="benefit-icon">🧪</span>
            <h3>Sin químicos</h3>
            <p>Libre de parabenos, sulfatos y toxinas.</p>
        </div>

        <div className="benefit-card">
            <span className="benefit-icon">♻️</span>
            <h3>Sostenible</h3>
            <p>Producción responsable con el medio ambiente.</p>
        </div>

         <div className="benefit-card">
            <span className="benefit-icon">🧴</span>
            <h3>Artesanal</h3>
            <p>Elaborado a mano con amor y cuidado.</p>
        </div>
    </section>
    {/* FEATURED PRODUCTS */}
    <section className="featured">
        <div className="featured-header">
            <h2>Productos destacados</h2>
            <p>Lo más amado por nuestra comunidad</p>
         </div>

        <div className="featured-grid">

        <div className="product-card">
            <img src={tonico_capilar} alt="Tónico capilar de romero" />
            <h3>Tónico capilar de romero</h3>
            <p className="price">$30.000 COP</p>
            <a href="/producto/1" className="product-btn">Ver producto</a>
        </div>

        <div className="product-card">
            <img src={Jabon_Avena} alt="Jabon de avena" />
            <h3>Jabon de Avena</h3>
            <p className="price">$8.000 COP</p>
            <a href="/producto/2" className="product-btn">Ver producto</a>
        </div>

        <div className="product-card">
            <img src={biotina} alt="Biotina" />
            <h3>Biotina Capilar</h3>
            <p className="price">$22.000 COP</p>
            <a href="/producto/3" className="product-btn">Ver producto</a>
        </div>

        </div>
    </section>
    {/* categorias */}
    <section className="categories">
        <div className="categories-header">
          <h2>Nuestras categorias</h2>
          <p>Revisa la que mas te guste</p>
        </div>

        <div className="categories-grid">
          {categorias.map((cat) => (
            <Link key={cat.id} to={`/categoria/${cat.id}`} className="card-link">
              <div className="categories-card">
                <h3>{cat.nombre}</h3>
                <p>{cat.descripcion}</p>
              </div>
            </Link>

          ))}
        </div>

    </section>
    <section className="brand-section container-fluid">
        <div className="brand-box">
          <h2>Conecta con lo natural</h2>
          <h4>Cuidado consciente. Naturaleza real.</h4>
          <p>
            En Naturaleza Salvaje creamos productos naturales y artesanales
            para personas que buscan algo más que cosmética.
            Creamos experiencias de conexión con la naturaleza, con el cuerpo
            y con el bienestar real.
          </p>
        </div>
      </section>

    </>
  );
}

export default Home;