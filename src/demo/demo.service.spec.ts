import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@/db/db.module';
import { DemoService } from './demo.service';

describe('DemoService', () => {
    let service: DemoService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                DbModule,
                ConfigModule.forRoot({
                    envFilePath: ['.env', '.env.local']
                })
            ],
            providers: [DemoService]
        }).compile();

        service = module.get<DemoService>(DemoService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
