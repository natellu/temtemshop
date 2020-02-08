import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { setDiscord } from '../redux/actions/userAction'
import temtem from '../assets/temtems'
import { api } from  '../assets/api'


class Addlisting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: '',
            loading: true,
            name: 'Oree',
            level: 1,
            userdiscord: '',
            sex: 'male',
            luma: false,
            price: 0,
            lp: 1,
            aus: 1,
            def: 1,
            spdef: 1,
            atk: 1,
            spatk: 1,
            spd: 1,
            fertility: 0
        }
    }

    componentDidMount() {
        if (this.props.user === '') {
            this.props.history.push('/login')
        }
        this.setState({ userdiscord: this.props.discord, loading: false })
    }

    render() {
        const onSubmitHandler = (event) => {
            event.preventDefault()
            this.setState({ loading: true })
            axios.defaults.headers.common['Authorization'] = "Bearer " + this.props.user
            axios.post(api + '/addlisting', this.state, { "Content-Type": "application/json" })
                .then(res => {
                    this.setState({
                        error: 'listing created',
                        loading: false,
                        name: '',
                        level: 1,
                        sex: 'male',
                        luma: false,
                        price: 0,
                        lp: 1,
                        aus: 1,
                        def: 1,
                        spdef: 1,
                        atk: 1,
                        spatk: 1,
                        spd: 1,
                        fertility: 0
                    })
                })
                .catch(err => {
                    console.log(err)
                    this.setState({ error: "" + err, loading: false })
                })
        }

        const onChangeHandler = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            })
        }

        const onCheckedHandler = (event) => {
            if (this.state.luma) {
                this.setState({
                    luma: false
                })
            } else {
                this.setState({
                    luma: true
                })
            }
        }

        let renderdata = 'lädt'
        if (this.state.loading) {
            renderdata = 'lädt'
        } else {
            renderdata = (
                <div className="createlisting">
                    <h2>Create listing</h2>
                    {this.state.error}
                    <form onSubmit={onSubmitHandler}>
                        <div>
                            <div>
                                <select name="name" id="name" onChange={onChangeHandler} disabled={this.state.loading} required>
                                    {temtem.map(tem => <option key={tem} value={tem}>{tem}</option>)}

                                </select>
                                <label>Tem</label>
                            </div>

                            <div>
                                <input type="number" min="1" placeholder="level" name="level" onChange={onChangeHandler} value={this.state.level} />
                                <label>level</label>
                            </div>

                            <div>
                                <input type="text" placeholder="userdiscord" name="userdiscord" onChange={onChangeHandler} value={this.state.userdiscord} disabled />
                                <label>userdiscord</label>
                            </div>

                            <div>
                                <select name="sex" id="sex" onChange={onChangeHandler} disabled={this.state.loading}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>

                                </select> <label>sex</label>
                            </div>

                            <div>
                                <input type="checkbox" name="luma" onChange={onCheckedHandler} value="true" />
                                <label>luma</label>
                            </div>
                            <div>
                                <input type="number" min="0" max="7" name="fertility" onChange={onChangeHandler} value={this.state.fertility} />
                                <label>Fertility</label>
                            </div>
                            <div>
                                <input type="number" placeholder="price" name="price" onChange={onChangeHandler} value={this.state.price} />
                                <label>price</label>
                            </div>
                        </div>
                        <div className="sv">

                            <div>
                                <input type="number" min="1" max="50" placeholder="lp" name="lp" onChange={onChangeHandler} value={this.state.lp} />
                                <label>lp</label>
                            </div>
                            <div>
                                <input type="number" min="1" max="50" placeholder="aus" name="aus" onChange={onChangeHandler} value={this.state.aus} />
                                <label>sta</label>
                            </div>
                            <div>
                                <input type="number" min="1" max="50" placeholder="spd" name="spd" onChange={onChangeHandler} value={this.state.spd} />
                                <label>spd</label>
                            </div>
                            <div>
                                <input type="number" min="1" max="50" placeholder="atk" name="atk" onChange={onChangeHandler} value={this.state.atk} />
                                <label>atk</label>
                            </div>
                            <div>
                                <input type="number" min="1" max="50" placeholder="def" name="def" onChange={onChangeHandler} value={this.state.def} />
                                <label>def</label>
                            </div>
                            <div>
                                <input type="number" min="1" max="50" placeholder="spatk" name="spatk" onChange={onChangeHandler} value={this.state.spatk} />
                                <label>spatk</label>
                            </div>
                            <div>
                                <input type="number" min="1" max="50" placeholder="spdef" name="spdef" onChange={onChangeHandler} value={this.state.spdef} />
                                <label>spdef</label>
                            </div>



                        </div>

                        <button type="submit">Create listing</button>
                    </form>
                </div>
            )
        }
        return (
            <div>
                {renderdata}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user.user,
    discord: state.user.discord
})

const mapActionsToProps = {
    setDiscord
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(Addlisting))