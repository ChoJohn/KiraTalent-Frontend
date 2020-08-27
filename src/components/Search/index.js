import React, { Component } from 'react';
import './index.css';

// Component for search bar

class Search extends Component {
    render() {
        return (
            <div className="search-container">
                <input onChange={(e) => this.props.handleSearch(e)} className="search-input" type="text" id="search" name="search" placeholder="Search"></input>
            </div>
        );
    }
};

export default Search;