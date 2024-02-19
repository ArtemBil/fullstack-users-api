import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import userRoutes from './src/routes/v1/userRoutes';
import authRoutes from './src/routes/v1/authRoutes';
import multer from 'multer';
import tinify from 'tinify';
import {v2 as cloudinaryApi} from 'cloudinary';
import imageRoutes from './src/routes/imageRoutes';

dotenv.config();

tinify.key = process.env.TINY_PNG_API_KEY as string;

cloudinaryApi.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT || 3001;
const upload = multer();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(upload.single('photo'));

app.use('/api/v1', userRoutes, authRoutes);
app.use('/', imageRoutes);

if (['production'].includes(process.env.NODE_ENV as string)) {
    const frontendPath = path.resolve(__dirname, '..', 'client', 'build');
    app.use(express.static(frontendPath));

    app.get('*', (req, res) => {
        res.sendFile(path.join(frontendPath, 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});