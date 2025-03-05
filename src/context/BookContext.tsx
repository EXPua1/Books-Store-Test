import React, { createContext, useState, useEffect } from 'react';
import { Book } from '../types';
import { API_URL } from '../lib/api';

interface BookContextType {
    books: Book[];
    fetchBooks: () => void;
    addBook: (book: Omit<Book, 'id' | 'createdAt' | 'modifiedAt' | 'isActive'>) => void;
    updateBook: (id: string, book: Partial<Book>) => void; // Исправляем тип id
    deleteBook: (id: string) => void; // Исправляем тип id
    successMessage: string | null;
    setSuccessMessage: (message: string | null) => void;
}

export const BookContext = createContext<BookContextType | undefined>(undefined);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [books, setBooks] = useState<Book[]>([]);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const fetchBooks = async () => {
        try {
            const response = await fetch(`${API_URL}books`);
            if (!response.ok) throw new Error('Failed to fetch books');
            const data = await response.json();
            setBooks(data || []);
        } catch (error) {
            console.error('Error fetching books:', error);
            setBooks([]);
            setSuccessMessage('Failed to fetch books.');
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
            setSuccessMessage('Book added successfully!');
        } catch (error) {
            console.error('Error adding book:', error);
            setSuccessMessage('Failed to add book.');
        }
    };

    const updateBook = async (id: string, book: Partial<Book>) => {
        try {
            const existingBook = books.find((b) => b.id === id);
            if (!existingBook) throw new Error(`Book with ID ${id} not found`);

            const updatedData = {
                ...existingBook, // Берем текущую книгу
                ...book, // Перезаписываем переданные поля
                modifiedAt: new Date().toISOString(), // Обновляем modifiedAt
            };

            console.log('Updating book with ID:', id, 'Data:', updatedData);

            const response = await fetch(`${API_URL}books/${id}`, {
                method: 'PUT', // Используем PUT для полного обновления
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData),
            });
            if (!response.ok) throw new Error('Failed to update book');
            const updatedBook = await response.json();
            setBooks((prevBooks) =>
                prevBooks.map((b) => (b.id === id ? updatedBook : b))
            );
            setSuccessMessage(book.isActive !== undefined ? 'Book status updated!' : 'Book updated successfully!');
        } catch (error) {
            console.error('Error updating book:', error);
            setSuccessMessage('Failed to update book.');
        }
    };

    const deleteBook = async (id: string) => {
        try {
            const response = await fetch(`${API_URL}books/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete book');
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
            setSuccessMessage('Book deleted successfully!');
        } catch (error) {
            console.error('Error deleting book:', error);
            setSuccessMessage('Failed to delete book.');
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