export interface Book {
    id: string; 
    title: string;
    author: string;
    category: string;
    isbn: string;
    isActive: boolean;
    createdAt: string;
    modifiedAt: string | null;
}