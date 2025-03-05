import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookContext } from '../../context/BookContext';
import BookTable from '../../components/BookTable/BookTable';
import { FaPlus } from 'react-icons/fa';
import Toast from '../../components/Toast/Toast';

const Dashboard: React.FC = () => {
    const bookContext = useContext(BookContext);
    const [filter, setFilter] = useState<'all' | 'active' | 'deactivated'>('active');

    if (!bookContext) return null;

    const { books, successMessage, setSuccessMessage } = bookContext;

    const filteredBooks = books.filter((book) => {
        if (filter === 'all') return true;
        if (filter === 'active') return book.isActive;
        return !book.isActive;
    });

    useEffect(() => {
        console.log('Dashboard useEffect: successMessage changed', successMessage);
        if (successMessage) {
            const timer = setTimeout(() => {
                console.log('Clearing successMessage');
                setSuccessMessage(null);
            }, 3000);
            return () => {
                console.log('Cleaning up timer');
                clearTimeout(timer);
            };
        }
    }, [successMessage]);

    console.log('Rendering Dashboard, books:', books.length, 'filteredBooks:', filteredBooks.length);

    return (
        <div className="w-full p-4">
            {successMessage && (
                <Toast message={successMessage} onClose={() => setSuccessMessage(null)} />
            )}
            <div className="max-w-[1024px] mx-auto mb-15 ">


                <div className="flex gap-4 items-center mb-4 justify-between">
                    <div className="flex items-center  gap-25">
                        <select
                            value={filter}
                            onChange={(e) => {

                                setFilter(e.target.value as typeof filter);
                            }}
                            className="p-2 border rounded"
                        >
                            <option value="all">Show All</option>
                            <option value="active">Show Active</option>
                            <option value="deactivated">Show Deactivated</option>
                        </select>
                        <span>Showing {filteredBooks.length} of {books.length}</span>
                    </div>
                    <Link to="/add" className="bg-blue-600 text text-white! p-2 hover:bg-blue-700 rounded-[12px] flex items-center gap-2">
                        {/* @ts-ignore */}
                        <FaPlus size={12} /> Add a Book
                    </Link>
                </div>
            </div>

            <div className="w-full px-4">
                <BookTable books={filteredBooks} />
            </div>
        </div>
    );
};

export default Dashboard;