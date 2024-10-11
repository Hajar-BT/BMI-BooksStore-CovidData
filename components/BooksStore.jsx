import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBooks } from '../features/booksSlice';
import { FaEye, FaEyeSlash, FaHeart } from 'react-icons/fa'; 
import Swal from 'sweetalert2'; 

const BooksStore = () => {
    const dispatch = useDispatch();
    const books = useSelector((state) => state.books.books);
    const [selectedBook, setSelectedBook] = useState(null);
    const [likedBooks, setLikedBooks] = useState({});
    const [hoveredImage, setHoveredImage] = useState(null); 

    useEffect(() => {
        dispatch(fetchBooks());
    }, [dispatch]);

    // Check if books is defined and is an array
    if (!books || !Array.isArray(books)) {
        return <div className="text-center mt-10">Loading...</div>; // Loading state
    }

    const handleViewDetails = (book) => {
        // Toggle the selected book
        setSelectedBook((prevSelectedBook) => 
            prevSelectedBook && prevSelectedBook.id === book.id ? null : book
        );
    };

    const handleLikeBook = (bookId) => {
        const isLiked = !likedBooks[bookId];
        setLikedBooks((prevLikes) => ({
            ...prevLikes,
            [bookId]: isLiked, // Toggle like state
        }));

        // Show notification
        Swal.fire({
            icon: isLiked ? 'success' : 'info',
            title: isLiked ? 'Liked!' : 'Unliked!',
            text: isLiked ? 'You liked this book.' : 'You unliked this book.',
            showConfirmButton: false,
            timer: 1500,
        });
    };

    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-center">Books Store</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {books.map((book) => (
                <div key={book.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:shadow-xl hover:scale-105">
                    <div 
                        className="relative group"
                        onMouseEnter={() => setHoveredImage(book.imageUrl)} // Set hovered image on mouse enter
                        onMouseLeave={() => setHoveredImage(null)} // Reset on mouse leave
                    >
                        <img
                            src={book.imageUrl}
                            alt={book.title}
                            className="w-full h-60 object-cover transition-transform duration-300"
                        />
                        {/* Full image display on hover */}
                        {hoveredImage === book.imageUrl && (
                            <div className="absolute inset-0 bg-black bg-opacity-75 flex justify-center items-center">
                                <img 
                                    src={book.imageUrl} 
                                    alt={book.title} 
                                    className="max-w-full max-h-full transition-transform duration-300 transform scale-125" // Scale up the full image
                                />
                            </div>
                        )}
                    </div>
                    <div className="p-5">
                        <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
                        <p className="text-gray-700 text-sm mb-4">by {book.author}</p>
                        <div className="flex items-center justify-between mt-4">
                            <button
                                className={`transition-colors duration-300 ${likedBooks[book.id] ? 'text-red-600' : 'text-blue-500'} hover:text-blue-700`}
                                onClick={() => handleLikeBook(book.id)}
                            >
                                <FaHeart className="inline-block mr-1 text-2xl" />
                            </button>
                            <button
                                className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
                                onClick={() => handleViewDetails(book)}
                            >
                                {selectedBook && selectedBook.id === book.id ? (
                                    <FaEyeSlash className="inline-block mr-1 text-2xl" />
                                ) : (
                                    <FaEye className="inline-block mr-1 text-2xl" />
                                )}
                            </button>
                        </div>
                    </div>
                    {selectedBook && selectedBook.id === book.id && ( 
                        <div className="bg-gray-100 p-4">
                            <p className="text-gray-800">{book.details}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    </div>
    );
};

export default BooksStore;
