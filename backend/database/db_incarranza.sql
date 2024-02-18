create database db_incarranza;

-- creamos el usuario para la base de datos
CREATE USER 'InCarranza'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON * . * TO 'InCarranza'@'localhost';
FLUSH PRIVILEGES;

use db_incarranza;

create table Usuarios (
	id int not null auto_increment primary key,
    rol int not null, 
    nombre varchar(45) not null,
    apellido varchar(45) not null,
    correo varchar(100) not null,
    telefono varchar(15) not null,
    contasenia varchar(45) not null,
    fechaNacimiento date not null,
    createdAt datetime DEFAULT CURRENT_TIMESTAMP,
    updatedAt datetime DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ProyectosRealizados (
    id int not null auto_increment primary key,
    servicios int not null, -- 1 = Servicio de construcción, 2 = Servicio de remodelación, 3 = Servicio de creación de planos
    titulo varchar(500) not null,
    descripcion text not null,
    imagen varchar(255) not null,
    createdAt datetime DEFAULT CURRENT_TIMESTAMP,
    updatedAt datetime DEFAULT CURRENT_TIMESTAMP
);

insert into usuarios (rol,nombre, apellido, telefono,correo, contasenia, fechaNacimiento) values 
(1,"Eduar","Carranza","11111111","correo_admin@incarranza.com","principal","1992-09-22"), 
(2,"Paco","Lopez","12514145","correo_cliente@incarranza.com","1234","1988-01-12"); 

-- * El rol nos sirve para identificar si es admin o cliente, para esto usaremos lo siguente 1 = admin y 2 = cliente*/
-- Admin ya que su rol es 1
-- Cliente ya que su rol es 2