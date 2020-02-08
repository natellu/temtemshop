import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { signup } from '../redux/actions/userAction'

class SignupComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: '',
            email: '',
            discord: '',
            password: '',
            confirmPassword: ''
        }
    }

    render() {

        const onSubmitHandler = (event) => {
            event.preventDefault()
            this.setState({ error: '' })
            if (this.state.discord === '' || this.state.password === '' || this.state.confirmPassword === '') {
                this.setState({ error: 'no empty fields allowed' })
            } else
                if (this.state.password !== this.state.confirmPassword) {
                    this.setState({ error: 'passwords must match' })
                } else
                    if (this.state.password.length < 8) {
                        this.setState({ error: 'passwords must be atleast 8 chars' })
                    } else
                        if (!this.state.discord.match(/.*\w+\#\d{4}/g)) {
                            this.setState({ error: 'discord name must be a valid discord id' })
                        } else {
                            this.props.signup({ email: this.state.email, discord: this.state.discord, password: this.state.password, confirmPassword: this.state.confirmPassword }, this.props.history)
                        }
        }

        const onChangeHandler = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }

        return (
            <div className="signup">
                <h2>Signup</h2>
                <form onSubmit={onSubmitHandler}>
                    <p>{this.state.error}</p>
                    <div>
                        <input type="email" placeholder="email" name="email" onChange={onChangeHandler} value={this.state.email} />
                        <label>Email</label>
                    </div>
                    <div>
                        <input type="text" placeholder="discord" name="discord" onChange={onChangeHandler} value={this.state.discord} />
                        <label>discord</label>
                    </div>
                    <div>
                        <input type="password" placeholder="password" name="password" onChange={onChangeHandler} value={this.state.password} />
                        <label>password</label>
                    </div>
                    <div>
                        <input type="password" placeholder="Confirm password" name="confirmPassword" onChange={onChangeHandler} value={this.state.confirmPassword} />
                        <label>Confirm password</label>
                    </div>
                    <button type="submit">Sign up</button>
                </form>
            </div>
        )
    }
}

const mapActionsToProps = {
    signup
}

export default withRouter(connect(null, mapActionsToProps)(SignupComponent))