import React, { createContext, useState, useEffect } from 'react';
import { Book } from '../types';
import { API_URL } from '../lib/api';

interface BookContextType {
    books: Book[];
    fetchBooks: () => void;
    addBook: (book: Omit<Book, 'id' | 'createdAt' | 'modifiedAt' | 'isActive'>) => void;
    updateBook: (id: string, book: Partial<Book>) => void;
    deleteBook: (id: string) => void;
    successMessage: { text: string; type: 'success' | 'error' } | null;
    setSuccessMessage: (message: { text: string; type: 'success' | 'error' } | null) => void;
}

export const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [successMessage, setSuccessMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${API_URL}books`);
            if (!response.ok) throw new Error('Failed to fetch books');
            const data = await response.json();
            setBooks(data || []);
        } catch (error) {
            console.error('Error fetching books:', error);
            setBooks([]);
            setSuccessMessage({ text: 'Failed to fetch books.', type: 'error' });
        }
    };

    const addBook = async (book: Omit<Book, 'id' | 'createdAt' | 'modifiedAt' | 'isActive'>) => {
        const newBook = {
            ...book,
            createdAt: new Date().toISOString(),
            modifiedAt: null,
            isActive: true,
        };
        try {
            const response = await fetch(`${API_URL}books`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newBook),
            });
            if (!response.ok) throw new Error('Failed to add book');
            const addedBook = await response.json();
            setBooks((prevBooks) => [...prevBooks, addedBook]);
            setSuccessMessage({ text: 'Book added successfully!', type: 'success' }); // Переносим сюда
        } catch (error) {
            console.error('Error adding book:', error);
            setSuccessMessage({ text: 'Failed to add book.', type: 'error' });
            throw error;
        }
    };

    const updateBook = async (id: string, book: Partial<Book>) => {
        try {
            const existingBook = books.find((b) => b.id === id);
            if (!existingBook) throw new Error(`Book with ID ${id} not found`);

            const updatedData = {
                ...existingBook,
                ...book,
                modifiedAt: new Date().toISOString(),
            };

            const response = await fetch(`${API_URL}books/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) throw new Error('Failed to update book');
            const updatedBook = await response.json();
            setBooks((prevBooks) =>
                prevBooks.map((b) => (b.id === id ? updatedBook : b))
            );
            setSuccessMessage({
                text: book.isActive !== undefined ? 'Book status updated!' : 'Book updated successfully!',
                type: 'success',
            });
        } catch (error) {
            console.error('Error updating book:', error);
            setSuccessMessage({ text: 'Failed to update book.', type: 'error' });
            throw error; 
        }
    };

    const deleteBook = async (id: string) => {
        try {
            const response = await fetch(`${API_URL}books/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete book');
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
            setSuccessMessage({ text: 'Book deleted successfully!', type: 'success' });
        } catch (error) {
            console.error('Error deleting book:', error);
            setSuccessMessage({ text: 'Failed to delete book.', type: 'error' });
            throw error; 
        }
    };

    useEffect(() => {
        console.log('useEffect: Fetching books on mount');
        if (!books.length) {
            fetchBooks();
        }
    }, []);

    return (
        <BookContext.Provider value={{ books, fetchBooks, addBook, updateBook, deleteBook, successMessage, setSuccessMessage }}>
            {children}
        </BookContext.Provider>
    );
};