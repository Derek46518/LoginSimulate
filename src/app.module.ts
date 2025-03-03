import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ShutdownService } from '@/service/shutdown.service';
import { NetService } from '@/service/net.service';
import { FileService } from '@/service/file.service';
import { DemoModule } from '@/demo/demo.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env', '.env.local']
        }),
        DemoModule
    ],
    controllers: [AppController],
    providers: [AppService, ShutdownService, NetService, FileService]
})
export class AppModule {}
