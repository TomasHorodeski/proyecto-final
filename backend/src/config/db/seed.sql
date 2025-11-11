CREATE DATABASE IF NOT EXISTS almacen CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE almacen;

DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS subcategorias;
DROP TABLE IF EXISTS categorias;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL
);

CREATE TABLE subcategorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  categoria_id INT NOT NULL,
  nombre VARCHAR(80) NOT NULL,
  FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subcategoria_id INT NOT NULL,
  nombre VARCHAR(120) NOT NULL,
  descripcion TEXT,
  precio INT NOT NULL,
  imagen VARCHAR(255),
  destacado TINYINT DEFAULT 0,
  promo TINYINT DEFAULT 0,
  FOREIGN KEY (subcategoria_id) REFERENCES subcategorias(id)
);

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80),
  email VARCHAR(120) UNIQUE,
  password_hash VARCHAR(200)
);

INSERT INTO categorias (nombre) VALUES
('Quesos'), ('Fiambres'), ('Bebidas'), ('Picadas'), ('Sandwiches');

INSERT INTO subcategorias (categoria_id, nombre) VALUES
(1,'Quesos duros'),(1,'Quesos blandos'),
(2,'Crudos'),(2,'Cocidos'),
(3,'Gaseosas'),(3,'Cervezas'),
(4,'Tablas combinadas'),
(5,'Fríos');

INSERT INTO productos (subcategoria_id, nombre, descripcion, precio, imagen, destacado, promo) VALUES
(1,'Reggianito Don Domingo','Queso reggianito',20857,'/assets/images/quesos/reggianito.jpg',1,0),
(1,'Parmesano Canut','Queso parmesano',14744,'/assets/images/quesos/parmesano.jpg',1,0),
(2,'Camembert Natural 200g','Camembert 200g',6099,'/assets/images/quesos/camembert.jpg',0,1),
(3,'Jamón Cocido Cabaña Argentina','Feteado',12999,'/assets/images/fiambres/jamon-cocido.jpg',0,0),
(4,'Salame de Milán Los Calvos','Pieza 1kg',18999,'/assets/images/fiambres/salame-milan.jpg',0,0),
(5,'Coca-Cola 1.5L','Gaseosa cola',3500,'/assets/images/bebidas/coca.jpg',0,1),
(7,'Picada clásica','Quesos + fiambres',25999,'/assets/images/picadas/clasica.jpg',1,0),
(8,'Sánguche de crudo y queso','En pan de campo',6999,'/assets/images/sandwiches/crudo-queso.jpg',0,0);

INSERT INTO usuarios (nombre,email,password_hash)
VALUES ('Admin','admin@demo.com','$2b$10$uh9S.h5HzE4myjK4EAp.XeKrjljmLSg87hfkf5NrinaYUNteTE8yq')
ON DUPLICATE KEY UPDATE password_hash=VALUES(password_hash);


