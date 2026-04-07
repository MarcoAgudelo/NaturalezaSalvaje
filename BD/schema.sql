-- =========================
-- ROLES (ENUM)
-- =========================
CREATE TYPE rol_usuario AS ENUM ('cliente', 'admin');

CREATE TYPE estado_pedido AS ENUM (
  'pendiente',
  'pagado',
  'enviado',
  'entregado',
  'cancelado'
);

CREATE TYPE estado_pago AS ENUM (
  'pendiente',
  'aprobado',
  'rechazado'
);

-- =========================
-- USUARIOS
-- =========================
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombres VARCHAR(100) NOT NULL,
  apellidos VARCHAR (100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password TEXT,
  google_id TEXT,
  rol rol_usuario DEFAULT 'cliente',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- DIRECCIONES
-- =========================
CREATE TABLE direcciones (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
  ciudad VARCHAR(100) NOT NULL,
  departamento VARCHAR(100) NOT NULL,
  direccion TEXT NOT NULL,
  codigo_postal VARCHAR(20),
  telefono VARCHAR(20),
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- CATEGORIAS
-- =========================
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT
);

-- =========================
-- PRODUCTOS
-- =========================
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  descripcion TEXT,
  precio NUMERIC(10,2) NOT NULL,
  imagen TEXT,
  categoria_id INT REFERENCES categorias(id),
  activo BOOLEAN DEFAULT TRUE,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- CARRITO
-- =========================
CREATE TABLE carrito (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id) ON DELETE CASCADE,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- CARRITO ITEMS
-- =========================
CREATE TABLE carrito_items (
  id SERIAL PRIMARY KEY,
  carrito_id INT REFERENCES carrito(id) ON DELETE CASCADE,
  producto_id INT REFERENCES productos(id),
  cantidad INT NOT NULL CHECK (cantidad > 0)
);

-- =========================
-- PEDIDOS
-- =========================
CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  usuario_id INT REFERENCES usuarios(id),
  direccion_id INT REFERENCES direcciones(id),
  total NUMERIC(12,2) NOT NULL,
  estado estado_pedido DEFAULT 'pendiente',
  envio_gratis BOOLEAN DEFAULT FALSE,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- DETALLE PEDIDO
-- =========================
CREATE TABLE detalle_pedido (
  id SERIAL PRIMARY KEY,
  pedido_id INT REFERENCES pedidos(id) ON DELETE CASCADE,
  producto_id INT REFERENCES productos(id),
  cantidad INT NOT NULL CHECK (cantidad > 0),
  precio_unitario NUMERIC(10,2) NOT NULL
);

-- =========================
-- PAGOS
-- =========================
CREATE TABLE pagos (
  id SERIAL PRIMARY KEY,
  pedido_id INT REFERENCES pedidos(id) ON DELETE CASCADE,
  metodo VARCHAR(50) DEFAULT 'wompi',
  referencia TEXT,
  estado estado_pago DEFAULT 'pendiente',
  monto NUMERIC(12,2) NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);