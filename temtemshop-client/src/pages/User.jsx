import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import Listing from '../components/listing.component'

import { updateDiscord } from '../redux/actions/userAction'

import { api } from  '../assets/api'

function User(props) {
    const [loading, setLoading] = useState(true)
    const [discordName, setDiscordName] = useState('')
    const originalDiscordName = props.discord
    const [listings, setListings] = useState([])
    const [discordErr, setDiscordErr] = useState('')

    useEffect(() => {
        if (props.user === '') {
            props.history.push('/login')
        } else {
            axios.defaults.headers.common['Authorization'] = "Bearer " + props.user
            axios.post(api + '/getuserlistings')
                .then(res => {

                    setListings(res.data.message)
                    setLoading(false)
                })
                .catch(err => console.error(err))
        }
    }, [props.user])

    useEffect(() => {
        setDiscordName(props.discord)
    }, [props.discord])

    const onDelete = (id) => {
        setLoading(true)
        axios.defaults.headers.common['Authorization'] = "Bearer " + props.user
        axios.post(api + '/deletelisting', { id: id }, { "Content-Type": "application/json" })
            .then(res => {
                setLoading(false)
                let newList = []
                listings.forEach(list => {
                    if (list.id !== id) {
                        newList.push(list)
                    }
                })
                setListings(newList)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onDiscordChange = (event) => {
        setDiscordName(event.target.value)
    }

    const onDiscordButton = () => {
        if (!discordName.match(/.*\w+\#\d{4}/g)) {
            setDiscordErr('must be a valid discord id')
        } else {
            axios.defaults.headers.common['Authorization'] = "Bearer " + props.user
            axios.post(api + '/updatediscord', { discord: discordName }, { "Content-Type": "application/json" })
                .then(res => {
                    props.updateDiscord(discordName)
                    setDiscordErr('discord id changed')

                })
                .catch(err => {
                    setDiscordErr(err)
                })
        }
    }

    return (
        <div>
            <div className="discordname">
                <p>{discordErr}</p>
                <label>Edit Discord ID: </label>
                <input type="text" value={discordName} onChange={onDiscordChange} />
                <button onClick={onDiscordButton} disabled={originalDiscordName === discordName ? true: false}>Change</button>
            </div>
            <div className="user">

                {loading ? 'loading ...' : listings.length === 0 ? (
                    <h2>
                        No listings yet, create <a href="/addlisting">now</a>
                    </h2>
                ) : listings.map(list => (
                    <div key={list.id} className="listings">
                        <Listing key={list.id} {...list} />
                        {<button onClick={() => onDelete(list.id)}>Delete</button>}
                    </div>
                ))}

            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    discord: state.user.discord
})

const mapActionsToProps = {
    updateDiscord
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(User))