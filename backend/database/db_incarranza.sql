create database db_incarranza;

-- creamos el usuario para la base de datos
CREATE USER 'InCarranza'@'localhost' IDENTIFIED BY 'admin';
GRANT ALL PRIVILEGES ON * . * TO 'InCarranza'@'localhost';
FLUSH PRIVILEGES;

use db_incarranza;

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';



-- -----------------------------------------------------
-- Table `imagenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `imagenes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `descricion` VARCHAR(45) NOT NULL,
  `tipo` VARCHAR(15) NOT NULL,
  `archivo` LONGBLOB NOT NULL,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rol` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `apellido` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `telefono` VARCHAR(15) NOT NULL,
  `contasenia` VARCHAR(45) NOT NULL,
  `fechaNacimiento` DATETIME NOT NULL,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `perrfil` INT NULL,
  `fondo` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_usuarios_imagenes1_idx` (`perrfil` ASC) VISIBLE,
  INDEX `fk_usuarios_imagenes2_idx` (`fondo` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_imagenes1`
    FOREIGN KEY (`perrfil`)
    REFERENCES `imagenes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_imagenes2`
    FOREIGN KEY (`fondo`)
    REFERENCES `imagenes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

ALTER TABLE `usuarios` MODIFY COLUMN `contasenia` VARCHAR(60) NOT NULL;

UPDATE usuarios SET contasenia = 'U2FsdGVkX187Se7m7qHWgwDmW372K0EiuYrBRHBZJQc='
WHERE nombre = 'Eduar';

-- -----------------------------------------------------
-- Table `servicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `servicios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_servicio` VARCHAR(45) NOT NULL,
  `detalle_servicio` VARCHAR(500) NOT NULL,
  `servicio_padre` INT NULL,
  `img_principal` INT NULL,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_servicios_servicios_idx` (`servicio_padre` ASC) VISIBLE,
  INDEX `fk_servicios_imagenes1_idx` (`img_principal` ASC) VISIBLE,
  CONSTRAINT `fk_servicios_servicios`
    FOREIGN KEY (`servicio_padre`)
    REFERENCES `servicios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_servicios_imagenes1`
    FOREIGN KEY (`img_principal`)
    REFERENCES `imagenes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `mydb`.`proyectos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombreProyecto` VARCHAR(45) NOT NULL,
  `descripcion_proyecto` VARCHAR(500) NOT NULL,
  `img_principal` INT NULL,
  `categoria_servicio` INT NOT NULL,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_proyectos_servicios1_idx` (`categoria_servicio` ASC) VISIBLE,
  INDEX `fk_proyectos_imagenes1_idx` (`img_principal` ASC) VISIBLE,
  CONSTRAINT `fk_proyectos_servicios1`
    FOREIGN KEY (`categoria_servicio`)
    REFERENCES `servicios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_proyectos_imagenes1`
    FOREIGN KEY (`img_principal`)
    REFERENCES `imagenes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  
ENGINE = InnoDB;



-- -----------------------------------------------------
-- Table `proyectos_has_imagenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectos_has_imagenes` (
  `idproyecto` INT NOT NULL,
  `idimagen` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `fk_proyectos_has_imagenes_imagenes1_idx` (`idimagen` ASC) VISIBLE,
  INDEX `fk_proyectos_has_imagenes_proyectos1_idx` (`idproyecto` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_proyectos_has_imagenes_proyectos1`
    FOREIGN KEY (`idproyecto`)
    REFERENCES `proyectos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_proyectos_has_imagenes_imagenes1`
    FOREIGN KEY (`idimagen`)
    REFERENCES `imagenes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

insert into usuarios (rol,nombre, apellido, telefono,correo, contasenia, fechaNacimiento) values 
(1,"Eduar","Carranza","11111111","correo_admin@incarranza.com","principal","1992-09-22"), 
(2,"Paco","Lopez","12514145","correo_cliente@incarranza.com","1234","1988-01-12");
insert into imagenes (nombre,descricion,tipo,archivo) VALUES
(img1,"vacio","image/jpg","/nohayimagenaun") 

-- * El rol nos sirve para identificar si es admin o cliente, para esto usaremos lo siguente 1 = admin y 2 = cliente*/
-- Admin ya que su rol es 1
-- Cliente ya que su rol es 2


-----------------------------------------------------------
--tabla estados
-----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `estados` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_estado` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(400) NOT NULL,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;
INSERT INTO estados (nombre_estado,descripcion)
VALUES ('Enviado','Primer estado de una solicitud hecha por un cliente, en caso de estar en este estado el cliente aun puede hacer cambios e incluso borrar su solicitud'),
       ('En Proceso','Segundo estado, es cuando el administrador ha visto la solicitud y esta en el proceso de platica y verificaciones con el cliente, aqui no podra hacer cambios el clientes'),
       ('Aprobado','si la solicitud es aprobada por inversiones carranza y el cliente tambien da su aprobacion pasara al estado de aprobado'),
       ('Desaprobado', 'En caso de no llegar a un acuerdo la solicitud quedaria desaprobada');

-----------------------------------------------------------
-- tabla para solicitudes
-----------------------------------------------------------

CREATE TABLE IF NOT EXISTS `solicitudes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_cliente` INT NOT NULL,
  `categoria_servicio` INT NOT NULL,
  `id_estado` int NOT NULL,
  `descripcion_solicitud` VARCHAR(1000) NOT NULL,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_solicitudes_servicios1_idx` (`categoria_servicio` ASC) VISIBLE,
  INDEX `fk_solicitudes_usuarios_idx` (`id_cliente` ASC) VISIBLE,
  INDEX `fk_solicitudes_estados_idx` (`id_estado` asc) VISIBLE,
  CONSTRAINT `fk_solicitudes_servicios1`
    FOREIGN KEY (`categoria_servicio`)
    REFERENCES `servicios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_solicitudes_usuarios`
    FOREIGN KEY (`id_cliente`)
    REFERENCES `usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_solicitudes_estados`
    FOREIGN KEY (`id_estado`)
    REFERENCES `estados` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  
ENGINE = InnoDB;


----------------------------------------------------------
---+-tabla calificaciones
----------------------------------------------------------
--en la variable calificaciones se guardaran valores desde 0-10 con puntos decimales como 0.0 5.5, 7.5 o 10.0

CREATE TABLE IF NOT EXISTS `calificaciones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idProyecto` INT NOT NULL,
  `idUsuario` INT NOT NULL,
  `calificacion` DECIMAL(3, 1) NOT NULL, 
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_calificaciones_proyectos_idx` (`idProyecto` ASC) VISIBLE,
  INDEX `fk_calificaciones_usuarios_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_calificaciones_proyectos`
    FOREIGN KEY (`idProyecto`)
    REFERENCES `proyectos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_calificaciones_usuarios`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  
ENGINE = InnoDB;

--SELECT AVG(calificacion) from calificaciones WHERE `idProyecto`=16;
--INSERT INTO calificaciones (idProyecto,idUsuario,calificacion)
--      VALUES (16,2,10.0),
--             (23,2,7.5),
--             (24,2,9.0),
--             (25,2,0.0);
------------------------------------------------------------------
--tabla reseñas
------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS `resenias` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idProyecto` INT NOT NULL,
  `idUsuario` INT NOT NULL,
  `resenia_proyecto` VARCHAR(500) NOT NULL,
  `createdAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `fk_resenias_proyectos_idx` (`idProyecto` ASC) VISIBLE,
  INDEX `fk_resenias_usuarios_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_resenias_proyectos`
    FOREIGN KEY (`idProyecto`)
    REFERENCES `proyectos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_resenias_usuarios`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
  
ENGINE = InnoDB;