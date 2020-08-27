import React, { Component } from 'react';
import './index.css';

// Component for the card that holds the book information.

class BookCard extends Component {
    render() {
        return (
            <div className="book-card">
                <div className="book-information">
                    <div className="title">
                        {this.props.book.title}
                    </div>
                    <div className="author">
                        {this.props.book.author}
                    </div>
                </div>
    
                <div className="library-information">
                    <div className="copies">
                        <span className={this.props.book.quantity < 6 ? "low-quantity" : "quantity"}>{this.props.book.quantity} </span>
                        copies left
                    </div>
                    {
                        this.props.book.is_reserved
                        ? <button onClick={() => this.props.handleReservation(this.props.book)} className="unreserve">Unreserve</button>
                        : <button onClick={() => this.props.handleReservation(this.props.book)} className="reserve">Reserve</button>
                    }
                </div>
            </div>
        );
    };
};

export default BookCard;