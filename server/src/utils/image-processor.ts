import sharp from 'sharp';
import tinify from 'tinify';


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
}