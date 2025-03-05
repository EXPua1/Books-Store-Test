import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { BookContext } from '../../context/BookContext';

interface BookFormData {
    title: string;
    author: string;
    category: string;
    isbn: string;
}

const AddEditBook: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const bookContext = useContext(BookContext);

    if (!bookContext) return null;

    const { books, addBook, updateBook, setSuccessMessage } = bookContext;
    const existingBook = id ? books.find((b) => b.id === id) : null;

    const [formData, setFormData] = useState<BookFormData>({
        title: existingBook?.title || '',
        author: existingBook?.author || '',
        category: existingBook?.category || '',
        isbn: existingBook?.isbn || '',
    });
    const [errors, setErrors] = useState({
        title: '',
        author: '',
        category: '',
        isbn: '',
    });

    useEffect(() => {
        if (existingBook) {
            setFormData({
                title: existingBook.title,
                author: existingBook.author,
                category: existingBook.category,
                isbn: existingBook.isbn,
            });
        }
    }, [existingBook]);

    const validate = () => {
        const newErrors = { title: '', author: '', category: '', isbn: '' };
        if (!formData.title) newErrors.title = 'Title is required';
        if (!formData.author) newErrors.author = 'Author is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.isbn) newErrors.isbn = 'ISBN is required';
        else if (!/^\d+$/.test(formData.isbn)) newErrors.isbn = 'ISBN must contain only numbers';
        setErrors(newErrors);
        return !Object.values(newErrors).some((error) => error);
    };

    const hasChanges = () => {
        if (!existingBook) return true; 
        return (
            formData.title !== existingBook.title ||
            formData.author !== existingBook.author ||
            formData.category !== existingBook.category ||
            formData.isbn !== existingBook.isbn
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            if (id && existingBook) {
                console.log('Updating book with ID:', id, 'Data:', formData);
                if (!hasChanges()) {
                    console.log('No changes detected, navigating back to Dashboard');
                    navigate('/');
                    return;
                }
                await updateBook(id, {
                    ...formData,
                    modifiedAt: new Date().toISOString(),
                });
                setSuccessMessage('Book updated successfully');
            } else {
                console.log('Adding book:', formData);
                await addBook(formData);
                setSuccessMessage('Book added successfully');
            }
            navigate('/');
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ ...errors, title: 'Something went wrong' });
        }
    };

    return (
        <div className="w-full flex justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md min-w-[320px] h-auto space-y-4 bg-white p-6 rounded-lg shadow-md"
            >
                <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Book' : 'Add a Book'}</h1>
                <Link
                    to="/"
                    className="text-blue-600 mb-4 block hover:underline font-bold hover:text-blue-800"
                >
                    Back to Dashboard
                </Link>
                <div>
                    <input
                        type="text"
                        placeholder="Book Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className={`w-full p-2 border rounded ${errors.title ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="Author Name"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className={`w-full p-2 border rounded ${errors.author ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.author && <span className="text-red-500 text-sm">{errors.author}</span>}
                </div>
                <div>
                    <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className={`w-full p-2 border rounded ${errors.category ? 'border-red-500' : 'border-gray-300'
                            }`}
                    >
                        <option value="">Select Category</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Science">Science</option>
                    </select>
                    {errors.category && <span className="text-red-500 text-sm">{errors.category}</span>}
                </div>
                <div>
                    <input
                        type="text"
                        placeholder="ISBN"
                        value={formData.isbn}
                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                        className={`w-full p-2 border rounded ${errors.isbn ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {errors.isbn && <span className="text-red-500 text-sm">{errors.isbn}</span>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    {id ? 'Edit Book' : 'Add a Book'}
                </button>
            </form>
        </div>
    );
};

export default AddEditBook;