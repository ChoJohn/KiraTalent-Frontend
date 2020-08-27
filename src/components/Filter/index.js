import React, { Component } from 'react';
import './index.css';

// Component for switching between showing all books and reserved books.

class Filter extends Component {
    render() {
        return (
            <div id="filter">
                <button onClick={() => this.props.getFilter(0)} 
                        className={this.props.filter !== 0 ? "text" : "selected-text"}>
                    All
                </button>
                <button onClick={() => this.props.getFilter(1)} 
                        className={this.props.filter === 0 ? "text" : "selected-text"}>
                    Reserved
                </button>
            </div>
        );
    };
};

export default Filter;