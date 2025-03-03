import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '@/app.module';
import { ShutdownService } from '@/service/shutdown.service';
import { NetService } from '@/service/net.service';

function applyConsoleStyles(str: string, colorCode: string): string {
    return `${colorCode}${str}\x1b[0m`;
}

async function logServiceInfo(
    app: INestApplication,
    port: number,
    version: string
): Promise<void> {
    const configService = app.get(ConfigService);
    const devMode = configService.get<boolean>('DEV_MODE', false);

    const infoOutput = `
============================================
${applyConsoleStyles(`NestJS-Example is running on port ${port}`, '\x1b[36m')}
============================================
${applyConsoleStyles(`Program Version: ${version}`, '\x1b[36m')}
${applyConsoleStyles(`Node Version: ${process.version}`, '\x1b[36m')}
============================================
${applyConsoleStyles(`Dev Mode: ${devMode}`, '\x1b[36m')}
============================================
    `;
    console.log(infoOutput.trim());
}

async function initializeApp(): Promise<INestApplication> {
    return await NestFactory.create(AppModule);
}

async function checkPortAvailability(
    port: number,
    netService: NetService
): Promise<void> {
    const portInUse = await netService.isPortInUse(port);
    if (portInUse) {
        console.error(
            applyConsoleStyles(
                `Error: Port ${port} is already in use.`,
                '\x1b[31m'
            )
        );
        process.exit(1);
    }
}

function registerShutdownHooks(
    app: INestApplication,
    shutdownService: ShutdownService,
    server: any
): void {
    process.on('SIGTERM', () =>
        shutdownService.gracefulShutdown(server, 'SIGTERM')
    );
    process.on('SIGINT', () =>
        shutdownService.gracefulShutdown(server, 'SIGINT')
    );

    app.enableShutdownHooks(); // Enable hooks within the application
}

async function bootstrap() {
    try {
        // App initialization
        const app = await initializeApp();
        const configService = app.get(ConfigService);
        const shutdownService = app.get(ShutdownService);
        const netService = app.get(NetService);

        // Load and check configuration
        const port = configService.get<number>('PORT', 3000);
        await checkPortAvailability(port, netService);

        // Load the package version beforehand
        const { version } = await import('../package.json');

        // Start the application on the specified port
        const server = await app.listen(port);

        // Log application information
        await logServiceInfo(app, port, version);

        // Register shutdown hooks
        registerShutdownHooks(app, shutdownService, server);
    } catch (error) {
        console.error(
            applyConsoleStyles(
                `Application failed to start: ${(error as Error).message}`,
                '\x1b[31m'
            )
        );
        process.exit(1);
    }
}

bootstrap();
