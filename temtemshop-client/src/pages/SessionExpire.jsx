import React,{useEffect} from 'react'
import { connect } from 'react-redux'
import { onLogout } from '../redux/actions/appAction'

function SessionExpire(props) {

    useEffect(() => {
        props.onLogout()
    })

    return (
        <div className="sessionexpire">
            <h2>Your session expired</h2>
            <p>Please <a href="/login">login</a> again</p>
        </div>
    )
}



const mapActionsToProps = {
    onLogout
}

export default connect(null, mapActionsToProps)(SessionExpire)