import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { onLogout } from '../redux/actions/appAction'

const Header = (props) =>{
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(props.user !== ''){
            setLoading(false)
        }else{
            setLoading(true)
        }
    })

    const onLogoutClick = () => {
        props.onLogout()
        props.history.push('/')
    }
 
    let show = ''
    if(loading){
        show = (
            <nav>
            <a href="/">Home</a>
            <a href="/search">Search</a>
            <a href="/login">Login</a>
            <a href="/login">Signup</a>
        </nav>
        )
    }else{
        show = (
            <nav>
                <a href="/">Home</a>
                <a href="/search">Search</a>
                <a href="/addlisting">Add listing</a>
                <a href="/user">User</a>
                <button onClick={onLogoutClick}>Logout</button>

            </nav>
        )
    }

    return (
        <header>
            {show}
        </header>
    )
}

const mapActionToProps = {
    onLogout
}

const mapStateToProps = (state) => ({
    user: state.user.user
})

export default withRouter(connect(mapStateToProps, mapActionToProps)(Header))