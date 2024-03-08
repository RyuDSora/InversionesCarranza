import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const router = express.Router()

const   directory = path.join(__dirname, '../../../images/');
                if (!fs.existsSync(directory)) {
                    fs.mkdirSync(directory, { recursive: true });
                }
const   directory2 = path.join(__dirname, '../../../bdimages/');
                if (!fs.existsSync(directory2)) {
                    fs.mkdirSync(directory2, { recursive: true });
                }

const diskstorage = multer.diskStorage({
    
    destination: path.join(__dirname, '../../../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-ryudsora-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('image')

router.get('/images/', (req, res) => {
    res.send('Welcome to my image app')
})

router.post('/images/post', fileUpload,(req, res) => {

    req.getConnection((err, conn) => {
        if(err) return res.status(500).send('server error')
        

        const tipo = req.file.mimetype
        const descricion = "no description"
        const nombre = req.file.originalname
        const archivo = fs.readFileSync(path.join(__dirname, '../../../images/' + req.file.filename))

        const query = 'INSERT INTO imagenes (tipo, descricion, nombre, archivo) VALUES (?, ?, ?, ?)';
        const values = [tipo, descricion, nombre, archivo];
        
        conn.query(query, values, (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send('server error');
            }
            const insertId = result.insertId;
            res.status(200).json({ id: insertId });
        });
    })
    
})

router.get('/images/get', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send('server error');
        
        conn.query('SELECT * FROM imagenes', (err, rows) => {
            if (err) return res.status(500).send('server error');

            rows.map(img => {
                fs.writeFileSync(path.join(__dirname,'../../../bdimages/'+img.id+'inca.jpg'),img.archivo)
            })

            const imgdir = fs.readdirSync(path.join(__dirname,'../../../bdimages/'))
            res.json(imgdir);
        });
    });
});


export default  router
