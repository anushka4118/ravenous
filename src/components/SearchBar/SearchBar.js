import React from 'react';
import './SearchBar.css';


class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            term: '', 
            location: '',
            sortBy : 'best_match'
        };
        this.sortByOptions = {
            'Best Match': 'best_match',
            'Highest Rated': 'rating',
            'Most Reviewed': 'review_count',
            'Distance': 'distance'
        }
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleEnterKeyPress = this.handleEnterKeyPress.bind(this);
    }

    renderSortByOptions() {
        return Object.keys(this.sortByOptions).map(sortByOption => {
            let sortByOptionValue = this.sortByOptions[sortByOption];
            return <li key= {sortByOptionValue} className= {this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind(this,sortByOptionValue)}> {sortByOption} </li>
        });
        }

    getSortByClass(sortByOption) {
        if (this.state.sortBy === sortByOption) {
            return 'active'
          } else {
            return ''
          }
    }

    handleSortByChange(sortByOption) {
        this.setState({
            sortBy: sortByOption
        });

        if (this.state.term && this.state.location) {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        }
    }

    handleTermChange(event) {
        this.setState({
            term: event.target.value
        })
    }

    handleLocationChange(event) {
        this.setState({
            location: event.target.value
        })
    }

    handleSearch(event) {
        if (this.state.term && this.state.location) {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
            event.preventDefault();
        }
    }

    handleEnterKeyPress(event) {
        if (event.key === "Enter" && this.state.term && this.state.location) {
            this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
        }
    }

    render() {
        return (
        <div className="SearchBar">
             <div className="SearchBar-sort-options">
                 <ul>
                     {this.renderSortByOptions()}
                </ul>
            </div>
            <div className="SearchBar-fields">
                 <input placeholder="Search Businesses" onChange={this.handleTermChange} onKeyPress={this.handleEnterKeyPress}/>
                 <input placeholder="Where?" onChange={this.handleLocationChange} onKeyPress={this.handleEnterKeyPress}/>
            </div>
            <div className="SearchBar-submit">
                <button onClick={this.handleSearch}>Let's Go</button>
            </div>
        </div>
        )
    }
}

export default SearchBar;