import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DbService } from './db.service';

describe('DbService', () => {
    let service: DbService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                ConfigModule.forRoot({
                    envFilePath: ['.env', '.env.local']
                })
            ],
            providers: [ConfigService, DbService]
        }).compile();

        service = module.get<DbService>(DbService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
