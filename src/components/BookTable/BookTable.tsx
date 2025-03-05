import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookContext } from '../../context/BookContext';
import { Book } from '../../types';
import { format } from 'date-fns';

const BookTable: React.FC<{ books: Book[] }> = ({ books }) => {
    const bookContext = useContext(BookContext);
    const navigate = useNavigate();

    if (!bookContext) return null;

    const { updateBook, deleteBook } = bookContext;

    const formatDate = (date: string | null) =>
        date ? format(new Date(date), 'dd MMMM yyyy, h:mm a') : '--';

    const handleEdit = (e: React.MouseEvent<HTMLButtonElement>, bookId: string) => { // Исправляем тип
        e.preventDefault();
        e.stopPropagation();
        console.log('Navigating to edit:', `/edit/${bookId}`);
        navigate(`/edit/${bookId}`);
    };

    const handleToggleActive = (e: React.MouseEvent<HTMLButtonElement>, bookId: string, isActive: boolean) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Toggling active status for book:', bookId, 'New status:', !isActive);
        updateBook(bookId, {
            isActive: !isActive,
            modifiedAt: new Date().toISOString(), 
        });
       
    };

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, bookId: string) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Deleting book:', bookId);
        deleteBook(bookId);
       
    };

    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full border-collapse min-w-[320px] table-fixed border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 text-left text-sm sm:text-base w-[20%] border-r border-gray-300">Title</th>
                        <th className="p-2 text-left text-sm sm:text-base w-[15%] hidden sm:table-cell border-r border-gray-300">Author</th>
                        <th className="p-2 text-left text-sm sm:text-base w-[10%] hidden sm:table-cell border-r border-gray-300">Category</th>
                        <th className="p-2 text-left text-sm sm:text-base w-[10%] hidden md:table-cell border-r border-gray-300">ISBN</th>
                        <th className="p-2 text-left text-sm sm:text-base w-[15%] hidden lg:table-cell border-r border-gray-300">Created At</th>
                        <th className="p-2 text-left text-sm sm:text-base w-[15%] hidden xl:table-cell border-r border-gray-300">Modified At</th>
                        <th className="p-2 text-left text-sm sm:text-base w-[15%]">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr
                            key={book.id}
                            className={`${!book.isActive ? 'bg-gray-300 opacity-50' : 'bg-white'} border-b border-gray-300`}
                        >
                            <td className="p-2 text-sm sm:text-base border-r border-gray-300">{book.title}</td>
                            <td className="p-2 text-sm sm:text-base hidden sm:table-cell border-r border-gray-300">{book.author}</td>
                            <td className="p-2 text-sm sm:text-base hidden sm:table-cell border-r border-gray-300">{book.category}</td>
                            <td className="p-2 text-sm sm:text-base hidden md:table-cell border-r border-gray-300">{book.isbn}</td>
                            <td className="p-2 text-sm sm:text-base hidden lg:table-cell whitespace-nowrap border-r border-gray-300">{formatDate(book.createdAt)}</td>
                            <td className="p-2 text-sm sm:text-base hidden xl:table-cell whitespace-nowrap border-r border-gray-300">{formatDate(book.modifiedAt)}</td>
                            <td className="p-2 flex gap-2 flex-wrap">
                                <button
                                    type="button"
                                    onClick={(e) => handleEdit(e, book.id)}
                                    className="bg-yellow-500 text-black p-1 rounded-[10px] w-[50px] font-bold hover:bg-yellow-600 text-xs sm:text-sm"
                                >
                                    Edit
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => handleToggleActive(e, book.id, book.isActive)}
                                    className={`p-1 rounded-[10px] font-bold ${book.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                                        } text-black text-xs sm:text-sm`}
                                >
                                    {book.isActive ? 'Deactivate' : 'Re-Activate'}
                                </button>
                                {!book.isActive && (
                                    <button
                                        type="button"
                                        onClick={(e) => handleDelete(e, book.id)}
                                        disabled={book.isActive}
                                        className={`p-1 rounded-[10px] font-bold ${book.isActive ? 'bg-gray-300 cursor-not-allowed' : 'bg-red-600 text-black hover:bg-red-700'
                                            } text-xs sm:text-sm`}
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                    {books.length === 0 && (
                        <tr>
                            <td colSpan={7} className="p-4 text-center text-gray-500">
                                No books found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BookTable;