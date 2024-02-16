import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import userRoutes from './src/routes/userRoutes';
import authRoutes from './src/routes/authRoutes';
import multer from 'multer';
import tinify from 'tinify';

dotenv.config();

tinify.key = process.env.TINY_PNG_API_KEY as string;

const app = express();
const PORT = process.env.PORT || 3001;
const upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.single('photo'));

app.use('/api', userRoutes, authRoutes);
app.use(express.static('public'));

if (['production', 'ci'].includes(process.env.NODE_ENV as string)) {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve('client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});