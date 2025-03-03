import { Injectable } from '@nestjs/common';
import { promises as fsPromises } from 'fs';

@Injectable()
export class FileService {
    constructor() {}

    public async readFileAsync(filePath: string): Promise<Buffer> {
        return await fsPromises.readFile(filePath);
    }

    public async checkFileExists(filePath: string): Promise<boolean> {
        try {
            await fsPromises.access(filePath, fsPromises.constants.R_OK);
            return true;
        } catch (error) {
            console.error(`The file ${filePath} does not exist.`, error);
            return false;
        }
    }
}
