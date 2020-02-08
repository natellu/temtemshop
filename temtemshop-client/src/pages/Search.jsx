import React from 'react'

import SearchComponent from '../components/search.component'
import Listing from '../components/listing.component'

class Search extends React.Component {
    constructor(){
        super()
        this.state = {
            results: []
        }
    }
    
    render(){
        const displaySearchResult = (results) => {
            this.setState({results: results})
            
        }

        return(
            <div className="">
                <SearchComponent searchResults={displaySearchResult}/>
                <div className="searchresultcontainer">

                {this.state.results.map(listing => <Listing key={listing.id} {...listing} />)}
                </div>
            </div>
        )
    }
}

export default Search