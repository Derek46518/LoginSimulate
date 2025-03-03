import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import * as net from 'net';

@Injectable()
export class NetService {
    constructor() {}

    public handleResponse(
        res: Response | null,
        statusCode: number,
        logMessage: string,
        clientMessage?: string,
        error?: Error
    ) {
        if (error) {
            console.error(logMessage, error);
        } else {
            console.log(logMessage);
        }

        if (res) {
            if (statusCode >= 400 && error) {
                res.status(statusCode).send(clientMessage || error.message);
            } else {
                res.status(statusCode).send(clientMessage || logMessage);
            }
        }
    }

    public async isPortInUse(port: number): Promise<boolean> {
        return new Promise((resolve) => {
            const tester = net
                .createServer()
                .once('error', (err: any) => {
                    if (err.code === 'EADDRINUSE') {
                        resolve(true); // Port is in use
                    } else {
                        resolve(false);
                    }
                })
                .once('listening', () => {
                    tester
                        .once('close', () => resolve(false)) // Port is free
                        .close();
                })
                .listen(port);
        });
    }
}
