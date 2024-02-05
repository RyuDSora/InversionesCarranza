SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema DBIC
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema DBIC
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DBIC` DEFAULT CHARACTER SET utf8 ;
USE `DBIC` ;

-- -----------------------------------------------------
-- Table `DBIC`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DBIC`.`usuarios` (
  `idusuario` INT NOT NULL,
  `nombre_usuario` VARCHAR(45) NULL,
  `apellido_usuario` VARCHAR(45) NULL,
  `correo` VARCHAR(45) NULL,
  `contrasena` VARCHAR(45) NULL,
  `telefono_principal` VARCHAR(45) NULL,
  PRIMARY KEY (`idusuario`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
