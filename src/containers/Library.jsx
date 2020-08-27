import React, { Component } from 'react';
import Filter from '../components/Filter';
import BookList from '../components/BookList';
import Paginate from '../components/Paginate';
import Search from '../components/Search';
import './index.css';

class Library extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookList: [], // This is the master list of the library
            newList: [], // This is the list we will be updating to display to the users
            pageNumber: 1, // Current page number of the users
            pageLimit: 0, // Max page number to be displayed for the pagination
            filter: 0, // 0 = all books, 1 = reserved books
            form: {
                search: '' // what the user searches.
            }
        };
        this.getBooks = this.getBooks.bind(this);
    }

    componentWillMount() {
        this.getBooks();
    }

    getBooks() {
        // API fetch to get the data from the database
        fetch('http://127.0.0.1:8000/library/')
        .then(response => response.json())
        .then(data => {
            this.setState({
                bookList: data,
                newList: data,
                pageLimit: Math.ceil(data.length/3)
            });
        }).catch(err => {
            console.log(err);
        });
    }

    changePage(number, bookList) {
        // Changing the current page number
        this.setState({
            pageNumber: number,
            pageLimit: Math.ceil(bookList.length/3)
        })
    }

    getReservedBooks(number) {
        // Choosing a list based on reservations or not
        const filteredList = number ? this.state.bookList.filter(book => book.is_reserved) : this.state.bookList ;
        // Updating the page number of the pagination based on filter choice above
        const newPageNumber = this.state.pageNumber > Math.ceil(filteredList.length/3) ? Math.ceil(filteredList.length/3) : this.state.pageNumber;

        this.setState({
            filter: number,
            newList: filteredList,
            pageLimit: Math.ceil(filteredList.length/3),
            pageNumber: newPageNumber
        })
    }

    handleSearch(e) {
        const name = e.target.name;
        const value = e.target.value;

        // Checking if the searched book exists
        let searchedList = this.state.bookList.filter(book => book.title.toLowerCase().indexOf(value.toLowerCase()) !== -1);
        // Updating page number for pagination based on searched books
        const newPageNumber = this.state.pageNumber > Math.ceil(searchedList.length/3) ? Math.ceil(searchedList.length/3) : this.state.pageNumber;

        this.setState({
            form: {
                ...this.state.form,
                [name]: value
            },
            newList: searchedList,
            pageLimit: Math.ceil(searchedList.length/3),
            pageNumber: newPageNumber
        })
    }

    handleReservation(book) {
        let bookList = this.state.bookList;
        let newList = this.state.newList;
        // API call to change it in the database

        // Changing the reserved to unreserved, vice versa.
        // Only possible to reserve when there are more than 0 copy left.
        // Increase/decrease quantity number
        if (!book.is_reserved && book.quantity > 0) {
            book.is_reserved = !book.is_reserved
            book.quantity = book.quantity - 1;
        } else if (book.is_reserved && book.quantity >= 0) {
            book.is_reserved = !book.is_reserved
            book.quantity = book.quantity + 1;
        }

        // Replacing with the updated status
        bookList[book.id - 1] = book;
        newList[book.id - 1] = book;

        // Updating the state
        this.setState({
            bookList: bookList,
            newList: newList
        })

    }

    render() {
        return (
            <div id="home">
                <h1>Saasvile Public Library</h1>
                <Search handleSearch={this.handleSearch.bind(this)} />
                <Filter filter={this.state.filter} getFilter={this.getReservedBooks.bind(this)} />
                <BookList   bookList={this.state.newList} 
                            pageNumber={this.state.pageNumber}
                            filter={this.state.filter}
                            search={this.state.form}
                            handleReservation={this.handleReservation.bind(this)} />
                {
                    this.state.bookList.length
                    ? <Paginate bookList={this.state.newList} 
                                pageNumber={this.state.pageNumber} 
                                changePage={this.changePage.bind(this)}
                                pageLimit={this.state.pageLimit} />
                    : null
                }
            </div>
        );
    };
};

export default Library;