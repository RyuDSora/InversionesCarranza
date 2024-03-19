import express from 'express';
import multer from 'multer';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import Image  from '../models/ImagenesModels.js'; 

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const diskStorage = multer.memoryStorage();

const fileUpload = multer({
    storage: diskStorage
}).single('image');

router.get('/images/', (req, res) => {
    res.send('Welcome to my image app');
});

router.post('/images/post', fileUpload, async (req, res) => {
    try {
        const { mimetype, originalname, buffer } = req.file;
        const description = "no description";
        
        const image = await Image.create({
            tipo: mimetype,
            descricion: description,
            nombre: originalname,
            archivo: buffer
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

        res.json(images);
    } catch (error) {
        console.error(error);
        res.status(500).send('server error');
    }
});

export default router;