import React from 'react';
import BookCard from '../BookCard';
import './index.css';

// Component that handles displaying books based on how it's been filtered

const BookList = ({bookList, pageNumber, handleReservation, filter}) => {
    const maxPageNumber = 3 * pageNumber;
    const minPageNumber = 3 * pageNumber - 3;

    return (
        <div className="book-container">
            {
                bookList.map((book, index) => {
                    if (index < maxPageNumber && index >= minPageNumber) {
                        return (
                            <BookCard key={index} book={book} handleReservation={handleReservation} filter={filter} />
                        )
                    }
                    return null;
                })
            }
        </div>
    );
};

export default BookList;