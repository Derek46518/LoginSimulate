import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body
} from '@nestjs/common';
import { DemoService } from './demo.service'; // Update with actual path to your service
import { CreateItemDto } from './dto/item.dto'; // Create a DTO for item creation

@Controller('demo')
export class DemoController {
    constructor(private readonly demoService: DemoService) {}

    @Get()
    // Get all items
    public getAllItems() {
        // Use DemoService to interact with data layer
        return this.demoService.findAll();
    }

    @Get(':id')
    // Get a specific item by ID
    public getItem(@Param('id') id: number) {
        // Use DemoService to fetch an item by ID
        const result = this.demoService.findOne(id);
        if (!result) {
            return 'Item not found';
        }

        return result;
    }

    @Post()
    // Create a new item
    public createItem(@Body() createItemDto: CreateItemDto) {
        // Use DemoService to create a new item
        return this.demoService.create(createItemDto);
    }

    @Put(':uuid')
    // Update an item by UUID
    public updateItem(
        @Param('uuid') uuid: string,
        @Body() updateItemDto: CreateItemDto
    ) {
        // Use DemoService to update an existing item
        return this.demoService.update(uuid, updateItemDto);
    }

    @Delete(':id')
    // Delete an item by ID
    public deleteItem(@Param('id') id: number) {
        // Use DemoService to remove an item by ID
        return this.demoService.remove(id);
    }
}
