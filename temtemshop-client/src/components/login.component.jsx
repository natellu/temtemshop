import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { login } from '../redux/actions/userAction'

class LoginComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    render(){
        const onSubmitHandler = (event) => {
            event.preventDefault()
            this.props.login({email: this.state.email, password: this.state.password}, this.props.history)
        }
    
        const onChangeHandler = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }

        return(
            <div className="login"> 
                <h2>Login</h2>
                <form onSubmit={onSubmitHandler}>
                <input type="text" placeholder="email" name="email" onChange={onChangeHandler} value={this.state.email}/> 
                <label>email</label>
                <br />
                <input type="password" placeholder="password" name="password" onChange={onChangeHandler} value={this.state.password}/> 
                <label>password</label>
                <br />
                <button type="submit" className="btn btn--login">Login</button>
                </form>
            </div>
        )
    }
}

const mapActionsToProps = {
    login
}

export default withRouter(connect(null, mapActionsToProps)(LoginComponent))