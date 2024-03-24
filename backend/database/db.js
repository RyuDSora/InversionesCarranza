import {Sequelize} from 'sequelize'
    const db = new Sequelize(
        'db_incarranza',           //Database
        'InCarranza',              //Username
        'admin',                   //Password
        { 
        host: 'localhost',          
        dialect: 'mysql'
    })
export default db
//esta parte esta comentada, pero con esta se pueden conectar a 
//la base de datos que hay en la nube de TiDB Cloud Vercel
/**import { readFileSync } from 'fs';
import { Sequelize } from 'sequelize';
import { resolve } from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import mysql2 from 'mysql2';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

//certificaddo para la conexion segura con la nube
const pemPath = resolve(__dirname, 'isrgrootx1.pem');
 
const pemContent = readFileSync(pemPath);
    const db = new Sequelize({
        dialect: 'mysql',
        dialectModule: mysql2,
        host: 'gateway01.us-east-1.prod.aws.tidbcloud.com',
        port: '4000',
        username: '4LSVi2eZvABjM9G.root',
        password: 'Le8UOzvb8zsmDZNT' ,
        database: 'db_incarranza',
        dialectOptions: {
            ssl:{ minVersion: 'TLSv1.2',
                  rejectUnauthorized: true,
                  ca: pemContent ,
                }
               
          },
    })
export default db 
*/


