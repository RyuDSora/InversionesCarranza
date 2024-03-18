import express from 'express';
import multer from 'multer';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Image  from '../models/ImagenesModels.js'; 

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const directory = path.join(__dirname, '../../../images/');
if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
}

const directory2 = path.join(__dirname, '../../../bdimages/');
if (!fs.existsSync(directory2)) {
    fs.mkdirSync(directory2, { recursive: true });
}

const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../../../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-ryudsora-' + file.originalname);
    }
});

const fileUpload = multer({
    storage: diskstorage
}).single('image');

router.get('/images/', (req, res) => {
    res.send('Welcome to my image app');
});

router.post('/images/post', fileUpload, async (req, res) => {
    try {
        const { mimetype, originalname } = req.file;
        const description = "no description";
        const name = originalname;
        const file = fs.readFileSync(path.join(__dirname, '../../../images/' + req.file.filename));

        const image = await Image.create({
            tipo: mimetype,
            descricion: description,
            nombre: name,
            archivo: file
        });

        res.status(200).json({ id: image.id });
    } catch (error) {
        console.error(error);
        res.status(500).send('server error');
    }
});

router.get('/images/get', async (req, res) => {
    try {
        const images = await Image.findAll();

        images.forEach(img => {
            fs.writeFileSync(path.join(__dirname, '../../../bdimages/' + img.id + 'inca.jpg'), img.archivo);
        });

        const imgdir = fs.readdirSync(path.join(__dirname, '../../../bdimages/'));
        res.json(imgdir);
    } catch (error) {
        console.error(error);
        res.status(500).send('server error');
    }
});

export default router;
