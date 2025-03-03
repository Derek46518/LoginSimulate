import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { Pool } from 'pg';

@Injectable()
export class DbService {
    private readonly db: NodePgDatabase<typeof schema>; // Type-safe schema mapping for Drizzle ORM
    private readonly logger = new Logger(DbService.name);

    constructor(private readonly configService: ConfigService) {
        // Initialize the database connection in the constructor
        const connectionString =
            this.configService.getOrThrow<string>('DATABASE_URL');
        const pool = new Pool({
            connectionString // Pooling configuration
        });
        this.db = drizzle(pool, { schema });

        // Log a message when the database connection is initialized
        this.logger.log('Database connection initialized');
    }

    // Getter to expose the drizzle instance
    public getDatabase(): NodePgDatabase<typeof schema> {
        return this.db;
    }
}
