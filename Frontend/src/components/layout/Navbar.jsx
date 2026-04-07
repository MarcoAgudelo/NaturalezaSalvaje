import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-main">

        {/* IZQUIERDA */}
        <div className="navbar-left">

          {/* BOTÓN HAMBURGUESA (solo visible en móvil por CSS) */}
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* LOGO */}
          <Link to="/" className="navbar-logo">
            <img src="imagenes/logo.jpeg" alt="logo" />
          </Link>

        </div>

        {/* LINKS (desktop) */}
        <div className="navbar-links">
          <Link to="/">Inicio</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/productos">Productos</Link>
        </div>

        {/* DERECHA */}
        <div className="navbar-right">

          {/* BOTÓN BUSCAR */}
          <button
            className="icon-button"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <i className="fas fa-search"></i>
          </button>

          <Link to="/login" className="icon-button">
            <i className="fas fa-user"></i>
          </Link>

          <Link to="/carrito" className="icon-button">
            <i className="fas fa-cart-shopping"></i>
          </Link>

        </div>
      </div>

      {/* BARRA DE BÚSQUEDA */}
      {searchOpen && (
        <div className="search-bar">
          <form 
          className="search-wrapper"
          onSubmit={(e) => e.preventDefault()}
          >
            <input type="text" placeholder="Buscar productos..." />
              <button type="submit" className="search-button">
                <i className="fas fa-search"></i>
              </button>
          </form>
        </div>
        )}

      {/* MENÚ MÓVIL */}
{/* MENÚ MÓVIL (Pestaña completa) */}
{menuOpen && (
  <div className="mobile-menu-overlay">
    <div className="mobile-menu-header">
      {/* BOTÓN CERRAR */}
      <button className="close-menu" onClick={() => setMenuOpen(false)}>
        <i className="fas fa-times"></i>
      </button>
      
      {/* BARRA DE BÚSQUEDA FUNCIONAL */}
      <form 
        className="mobile-search-wrapper" 
        onSubmit={(e) => { e.preventDefault(); /* Aquí puedes añadir lógica de búsqueda */ }}
      >
        <input type="text" placeholder="Buscar" />
        <button type="submit" style={{ background: 'none', border: 'none', padding: 0 }}>
          <i className="fas fa-search"></i>
        </button>
      </form>

      {/* ICONOS CON NAVEGACIÓN */}
      <div className="mobile-header-icons">
        <Link to="/login" onClick={() => setMenuOpen(false)} aria-label="Ir a Login">
          <i className="far fa-user"></i>
        </Link>
        <Link to="/carrito" onClick={() => setMenuOpen(false)} aria-label="Ver Carrito">
          <i className="fas fa-bag-shopping"></i>
        </Link>
      </div>
    </div>

    <div className="mobile-menu-content">
      <ul className="mobile-nav-list">
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <i className="fas fa-home"></i> Inicio
          </Link>
          <i className="fas fa-chevron-right arrow"></i>
        </li>
        <li>
          <Link to="/nosotros" onClick={() => setMenuOpen(false)}>
            <i className="fas fa-users"></i> Nosotros
          </Link>
          <i className="fas fa-chevron-right arrow"></i>
        </li>
        <li>
          <Link to="/productos" onClick={() => setMenuOpen(false)}>
            <i className="fas fa-spa"></i> Productos
          </Link>
          <i className="fas fa-chevron-right arrow"></i>
        </li>
      </ul>

      <ul className="mobile-nav-list secondary">
        <li>
          <Link to="/blog" onClick={() => setMenuOpen(false)}>
            <i className="far fa-comment-dots"></i> Blog
          </Link>
        </li>
        <li>
          <Link to="/tiendas" onClick={() => setMenuOpen(false)}>
            <i className="fas fa-map-marker-alt"></i> Puntos de Venta
          </Link>
        </li>
      </ul>
    </div>
  </div>
)}
    </nav>
  );
}

export default Navbar;
