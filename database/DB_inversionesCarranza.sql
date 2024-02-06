create database DB_InCarranza;
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

