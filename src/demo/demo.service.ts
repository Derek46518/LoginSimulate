import { Injectable } from '@nestjs/common';
import { Item } from './interface/item.interface';
import { CreateItemDto } from './dto/item.dto';
import { DbService } from '@/db/db.service';
import { items } from '@/db/schema';
import { generateUUID } from '@carry0987/utils';
import { eq } from 'drizzle-orm';

@Injectable()
export class DemoService {
    private readonly db = this.dbService.getDatabase();

    constructor(private readonly dbService: DbService) {}

    // Retrieve all items
    public async findAll(): Promise<Item[]> {
        // Query all items from the database
        return await this.db.select().from(items);
    }

    // Retrieve an item by id
    public async findOne(id: number): Promise<Item | undefined> {
        // Fetch an item based on the id
        const result = await this.db
            .select()
            .from(items)
            .where(eq(items.id, id));

        return result[0]; // Return the first item or undefined
    }

    // Create a new item
    public async create(itemData: CreateItemDto): Promise<Item> {
        // Insert a new item into the database
        const newItem = {
            uuid: generateUUID(), // Generate a unique ID
            name: itemData.name,
            description: itemData.description,
            created_at: new Date(),
            updated_at: new Date()
        };

        await this.db.insert(items).values(newItem);

        return newItem;
    }

    // Update an existing item by UUID
    public async update(
        uuid: string,
        itemData: Partial<Item>
    ): Promise<Item | undefined> {
        // Update item in the database
        const result = await this.db
            .update(items)
            .set(itemData)
            .where(eq(items.uuid, uuid))
            .returning(); // Return the updated item

        return result[0]; // Return the first updated item or undefined
    }

    // Remove an item by id
    public async remove(id: number): Promise<boolean> {
        // Delete an item from the database
        const result = await this.db
            .delete(items)
            .where(eq(items.id, id))
            .returning();

        return result.length > 0; // If any rows were affected, return true
    }
}
