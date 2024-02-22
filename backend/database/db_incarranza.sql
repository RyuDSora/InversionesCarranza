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
  `idimagenes` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descricion` VARCHAR(45) NOT NULL,
  `tipo` VARCHAR(5) NOT NULL,
  `archivo` BLOB NOT NULL,
  PRIMARY KEY (`idimagenes`))
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
    REFERENCES `imagenes` (`idimagenes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_usuarios_imagenes2`
    FOREIGN KEY (`fondo`)
    REFERENCES `imagenes` (`idimagenes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `servicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `servicios` (
  `idservicios` INT NOT NULL AUTO_INCREMENT,
  `nombre_servicio` VARCHAR(45) NOT NULL,
  `detalle_servicio` VARCHAR(45) NOT NULL,
  `servicio_padre` INT ,
  `img_principal` BLOB NOT NULL,
  PRIMARY KEY (`idservicios`),
  INDEX `fk_servicios_servicios_idx` (`servicio_padre` ASC) VISIBLE,
  CONSTRAINT `fk_servicios_servicios`
    FOREIGN KEY (`servicio_padre`)
    REFERENCES `servicios` (`idservicios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`proyectos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectos` (
  `idproyectos` INT NOT NULL AUTO_INCREMENT,
  `nombreProyecto` VARCHAR(45) NOT NULL,
  `descripcion_proyecto` VARCHAR(45) NOT NULL,
  `img_principal` BLOB NOT NULL,
  `categoria_servicio` INT NOT NULL,
  PRIMARY KEY (`idproyectos`),
  INDEX `fk_proyectos_servicios1_idx` (`categoria_servicio` ASC) VISIBLE,
  CONSTRAINT `fk_proyectos_servicios1`
    FOREIGN KEY (`categoria_servicio`)
    REFERENCES `servicios` (`idservicios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `proyectos_has_imagenes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectos_has_imagenes` (
  `idproyecto` INT NOT NULL,
  `idimagen` INT NOT NULL,
  `id` INT NOT NULL,
  INDEX `fk_proyectos_has_imagenes_imagenes1_idx` (`idimagen` ASC) VISIBLE,
  INDEX `fk_proyectos_has_imagenes_proyectos1_idx` (`idproyecto` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_proyectos_has_imagenes_proyectos1`
    FOREIGN KEY (`idproyecto`)
    REFERENCES `proyectos` (`idproyectos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_proyectos_has_imagenes_imagenes1`
    FOREIGN KEY (`idimagen`)
    REFERENCES `imagenes` (`idimagenes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

insert into usuarios (rol,nombre, apellido, telefono,correo, contasenia, fechaNacimiento) values 
(1,"Eduar","Carranza","11111111","correo_admin@incarranza.com","principal","1992-09-22"), 
(2,"Paco","Lopez","12514145","correo_cliente@incarranza.com","1234","1988-01-12"); 

-- * El rol nos sirve para identificar si es admin o cliente, para esto usaremos lo siguente 1 = admin y 2 = cliente*/
-- Admin ya que su rol es 1
-- Cliente ya que su rol es 2
