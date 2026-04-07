import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Privacity from "./pages/public/Privacity";
import Home from "./pages/public/Home";
import Products from "./pages/public/Products";
import Cart from "./pages/client/Cart";
import Login from "./pages/auth/Login";
import Footer from "./components/layout/Footer";
import About from "./pages/public/About";
import CategoriaPage from "./pages/public/CategoriaPage";
import ProductDetail from "./pages/public/ProductDetail";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacidad" element={<Privacity/>}/>
        <Route path="/productos" element={<Products />} />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nosotros" element={<About/>}/>
        <Route path="/categoria/:id" element={<CategoriaPage />} />
        <Route path="/producto/:id" element={<ProductDetail/>} />
      </Routes>

      <Footer/>
    </Router>
  );
}

export default App;

