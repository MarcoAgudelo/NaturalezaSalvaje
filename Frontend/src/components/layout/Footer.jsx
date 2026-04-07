    /*
MIT License
Copyright (c) 2021 MDBootstrap
...
*/
function Footer() {
  return (
    <div className="container-fluid p-0">
      {/* Footer */}
      <footer
        className="text-center text-lg-start text-dark"
        style={{ backgroundColor: "#ECEFF1" }}
      >
        {/* Section: Social media */}
        <section
          className="d-flex justify-content-between p-4 text-white"
          style={{ backgroundColor: "#F88D88" }}
        >
          {/* Left */}
          <div className="me-5">
            <span>Conéctate con nosotros en las redes sociales:</span>
          </div>

          {/* Right */}
          <div>
            <a href="https://www.instagram.com/naturalezasalvaje.oficial/?hl=es" className="text-white me-4">
            <i className="fab fa-instagram"></i>
            </a>
            <a href="https://api.whatsapp.com/send/?phone=573336452416&text=Hola%21+NaturalezaSalvaje+me+interesan+sus+productos%2C+quiero+m%C3%A1s+informaci%C3%B3n&type=phone_number&app_absent=0&utm_source=ig"
                className="me-4 text-reset" target="_blank">
            <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </section>

        {/* Section: Links */}
        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">

              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Naturaleza Salvaje</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                />
                <p>
                NaturalezaSalvaje es una marca de cosmética natural creada para cuidar tu piel con ingredientes puros
                y libres de químicos agresivos.
                Elaboramos cada producto de forma artesanal, priorizando la sostenibilidad y el bienestar real.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Productos</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                />
                <p><a href="#" className="text-dark">Tonico Capilar</a></p>
                <p><a href="#" className="text-dark">Shampoo</a></p>
                <p><a href="#" className="text-dark">Acondicionador</a></p>
                <p><a href="#" className="text-dark">Agua de Rosas</a></p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Te pueden servir</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                />
                <p><a href="https://envia.co/" className="text-dark">Rastrea tu pedido</a></p>
                <p><a href="/login" className="text-dark">Tu cuenta</a></p>
                <p><a href="/privacidad" className="text-dark">Privacidad</a></p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contacto</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: "60px", backgroundColor: "#7c4dff", height: "2px" }}
                />
                <p><i className="fas fa-home me-3"></i> Manizales, Caldas, Colombia</p>
                <p><i className="fas fa-envelope me-3"></i>pedidos.naturalezsalvaje@gmail.com </p>
                <p><i className="fas fa-phone me-3"></i> +57 333 645 24 16</p>
                
              </div>

            </div>
          </div>
        </section>

        {/* Copyright */}
        <div className="text-center p-3"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
            >
            © 2025 Naturaleza Salvaje — Cosmética Natural 🌿  
            <br />
            Manizales, Colombia
            </div>
      </footer>
    </div>

  );
}

export default Footer;