import sharp from 'sharp';
import tinify from 'tinify';
import {UploadApiErrorResponse, UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import {Readable} from 'stream';
import {randomUUID} from 'crypto';


export default class ImageProcessor {
    private image: Express.Multer.File;
    constructor(image: Express.Multer.File) {
        this.image = image;
    }

    /**
     * Resize image
     *
     * @param width
     * @param height
     * @returns Promise<Buffer>
     */
    public async resize(width: number, height: number) {
        return await sharp(this.image.buffer).jpeg().resize({width, height}).toBuffer();
    }

    /**
     * Optimize the image buffer
     *
     * @param buffer
     * @returns Promise<Uint8Array>
     */
    public async optimizeByBuffer(buffer: Buffer) {
        return await tinify.fromBuffer(buffer).toBuffer();
    }

    /**
     * Save image to the public directory
     *
     * @param buffer
     * @param path
     */
    public async saveAsFile(buffer: Buffer | Uint8Array, path: string) {
        return await sharp(buffer).jpeg().toFile(path);
    }

    /**
     * Upload to cloudinary the image
     *
     * @param buffer
     * @param options
     */
    uploadToCloudinaryStream(buffer: Buffer | Uint8Array, options = {}): Promise<UploadApiErrorResponse | UploadApiResponse | undefined> {
        return new Promise((resolve, reject) => {
            const TransformStream = cloudinary.uploader.upload_stream(options, (error, result) => {
               if (error) reject(error);
               resolve(result);
            });

            let stream = Readable.from(buffer);
            stream.pipe(TransformStream);
        });
    }
}