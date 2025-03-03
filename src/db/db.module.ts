import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DbService } from './db.service';

@Module({
    providers: [ConfigService, DbService],
    exports: [DbService]
})
export class DbModule {}
