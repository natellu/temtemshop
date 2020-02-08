import React from 'react'
import LoginComponent from '../components/login.component'
import SignupComponent from '../components/signup.component'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

function Login(props) {
    if(props.user !== ''){
        props.history.push('/user')
    }
    return(
        <div className="logincontainer">
            <LoginComponent />

            <SignupComponent />
        </div>
    )
}

const mapStateToProps = (state) => ({
    user: state.user.user
})

const mapActionsToProps = {

}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Login))