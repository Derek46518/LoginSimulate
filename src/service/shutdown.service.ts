import { Injectable } from '@nestjs/common';
import { Server } from 'http';
import { NetService } from './net.service';

@Injectable()
export class ShutdownService {
    constructor(private readonly netService: NetService) {}

    public gracefulShutdown(server: Server, signal: string) {
        console.info(`\n${signal} signal received.`);
        this.netService.handleResponse(null, 200, 'Closing http server.');
        server.close(() => {
            this.netService.handleResponse(null, 200, 'Http server closed.');
            process.exit(0);
        });
    }
}
