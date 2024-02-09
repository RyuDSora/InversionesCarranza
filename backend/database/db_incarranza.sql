create database DB_InCarranza;

CREATE USER 'InCarranza'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON * . * TO 'InCarranza'@'localhost';
FLUSH PRIVILEGES;

use db_incarranza;

create table Usuarios (
	id int not null auto_increment primary key,
    rol int not null, /* El rol nos sirve para identificar si es admin o cliente, para esto usaremos lo siguente 1 = admin y 2 = cliente*/
    nombre varchar(45) not null,
    apellido varchar(45) not null,
    correo varchar(100) not null,
    telefono varchar(15) not null,
    contasenia varchar(45) not null,
    fechaNacimiento date not null,
    createAt datetime DEFAULT CURRENT_TIMESTAMP,
    updateAt datetime DEFAULT CURRENT_TIMESTAMP
)

insert into usuarios (rol,nombre, apellido, telefono,correo, contasenia, fechaNacimiento) values 
(1,"1","Eduar","Carranza","11111111","correo_admin@incarranza.com","principal","1992-09-22"), --Admin ya que su rol es 1
(2,"2","Paco","Lopez","12514145","correo_cliente@incarranza.com","1234","1988-01-12"); -- Cliente ya que su rol es 2
