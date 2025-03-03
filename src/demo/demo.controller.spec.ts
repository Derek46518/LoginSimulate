import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from '@/db/db.module';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';

describe('DemoController', () => {
    let controller: DemoController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                DbModule,
                ConfigModule.forRoot({
                    envFilePath: ['.env', '.env.local']
                })
            ],
            controllers: [DemoController],
            providers: [DemoService]
        }).compile();

        controller = module.get<DemoController>(DemoController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
