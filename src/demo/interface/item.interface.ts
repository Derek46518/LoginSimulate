// Define an Item interface as sample data structure
export interface Item {
    id?: number;
    uuid: string;
    name: string;
    description: string | null; // Because 'description' is optional in schema, support null
    created_at: Date | null; // Optional field if returned from db
    updated_at: Date | null; // Optional field if returned from db
}
