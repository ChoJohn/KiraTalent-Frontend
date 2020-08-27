import React, { Component } from 'react';
import './index.css';

// Component that deals with pagination based on what the user is looking for

class Paginate extends Component {
    render() {
        let pageIndex = [];

        for (let page=1; page <= this.props.pageLimit; page++) {
            pageIndex.push(page);
        }
        return (
            <div className="paginate-container">
                {
                    pageIndex.map((number) => {
                        return  <button key={number}
                                        type="button"
                                        className={this.props.pageNumber === number ? "current-page" : "page"}
                                        onClick={() => this.props.changePage(number, this.props.bookList)}
                                >
                                    {number}
                                </button>
                    })
                }
            </div>
        )
    }
    
}

export default Paginate;