import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Listing from '../components/listing.component'

import { api } from  '../assets/api'

function Home() {
    const [lastten, setLastten] = useState([])
    useEffect(() => {
        axios.post(api + '/getlastten')
        .then(res => {
            setLastten(res.data.message)
        })
        .catch(err => console.error(err))
    })
    return(
        <div className="home">
            <div className="welcome">
            <h1>Temtem Shop</h1>
            <p>Start selling your temtems <a href='/login'>now</a></p>
            <p>or start <a href='/search'>buying</a></p>
            </div>
           
            <div className="lastten">
                <h2>Last created listings</h2>
                {lastten.map(listing => <Listing key={listing.id} {...listing} />)}
            </div>
        </div>
    )
}

export default Home