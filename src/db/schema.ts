import {
    pgTable,
    serial,
    varchar,
    text,
    timestamp,
    uuid
} from 'drizzle-orm/pg-core';

// Items table
export const items = pgTable('items', {
    id: serial('id').primaryKey(),
    uuid: uuid('uuid').notNull().unique(),
    name: varchar('name', { length: 50 }).notNull().unique(),
    description: text('description'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow()
});
