import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import axios from 'axios'

import temtem from '../assets/temtems'

import { api } from  '../assets/api'

class SearchComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: '',
            loading: false,
            name: 'Oree',
            level: 0,
            sex: 'dontcare',
            luma: false,
            price: 0,
            lp: 0,
            aus: 0,
            def: 0,
            spdef: 0,
            atk: 0,
            spatk: 0,
            spd: 0,
            fertility: 0
        }
    }

    render() {
        const onSubmitHandler = (event) => {
            event.preventDefault()
            this.setState({ loading: true, error: '' })
            axios.post(api + '/search', { "searchQuery": this.state.name }, { "Content-Type": "application/json" })
                .then(res => {
                    let search = res.data.message
                    let finish = []
                    search.forEach(result => {

                        if (result.level == this.state.level || this.state.level == 0) {
                            if (result.sex == this.state.sex || this.state.sex == "dontcare") {
                                if (result.luma == this.state.luma) {
                                    if (result.lp == this.state.lp || this.state.lp == 0) {
                                        if (result.aus == this.state.aus || this.state.aus == 0) {
                                            if (result.def == this.state.def || this.state.def == 0) {
                                                if (result.spdef == this.state.spdef || this.state.spdef == 0) {
                                                    if (result.atk == this.state.atk || this.state.atk == 0) {
                                                        if (result.spatk == this.state.spatk || this.state.spatk == 0) {
                                                            if (result.spd == this.state.spd || this.state.spd == 0) {
                                                                if(result.fertility == this.state.fertility || this.state.fertility == 0){
                                                                    finish.push(result)
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                        }

                    })
                    this.setState({ loading: false })
                    this.props.searchResults(finish)
                })
                .catch(err => {
                    this.setState({ loading: false, error: 'no listings found, try a different search query' })
                })
        }

        const onChangeHandler = (event) => {
            this.setState({
                [event.target.name]: event.target.value
            }, () => {

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

        return (
            <div className="searchcontainer">
                <h2>Search</h2>
                <p>use 0 if you dont want a specific value</p>
                <form onSubmit={onSubmitHandler}>
                    <div>
                        <div>

                            <select name="name" id="name" onChange={onChangeHandler} disabled={this.state.loading} required>
                                {temtem.map(tem => <option key={tem} value={tem}>{tem}</option>)}

                            </select>
                            {/*  <input type="text" placeholder="name" name="name" onChange={onChangeHandler} value={this.state.name}  disabled={this.state.loading} required/> */}
                            <label>Tem</label>
                        </div>

                        <div>
                            <input type="number" min="0" placeholder="level" name="level" onChange={onChangeHandler} value={this.state.level} disabled={this.state.loading} />
                            <label>level</label>
                        </div>

                        <div>
                            <select name="sex" id="sex" onChange={onChangeHandler} disabled={this.state.loading}>
                                <option value="dontcare">doesnt matter</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>

                            </select>
                            {/* <input type="text" placeholder="sex" name="sex" onChange={onChangeHandler} value={this.state.sex} disabled={this.state.loading}/> */}
                            <label>sex</label>
                        </div>

                        <div>
                            <input type="checkbox" name="luma" onChange={onCheckedHandler} value="true" disabled={this.state.loading} />
                            <label>is Luma?</label>
                        </div>
                        <div>
                            <input type="number" min="0" max="7" name="fertility" onChange={onChangeHandler} value={this.state.fertility} />
                            <label>Fertility</label>
                        </div>
                    </div>
                    <div className="sv">

                        <div>
                            <input type="number" min="0" max="50" placeholder="lp" name="lp" onChange={onChangeHandler} value={this.state.lp} disabled={this.state.loading} />
                            <label>lp</label>
                        </div>
                        <div>
                            <input type="number" min="0" max="50" placeholder="aus" name="aus" onChange={onChangeHandler} value={this.state.aus} disabled={this.state.loading} />
                            <label>sta</label>
                        </div>
                        <div>
                            <input type="number" min="0" max="50" placeholder="spd" name="spd" onChange={onChangeHandler} value={this.state.spd} disabled={this.state.loading} />
                            <label>spd</label>
                        </div>
                        <div>
                            <input type="number" min="0" max="50" placeholder="atk" name="atk" onChange={onChangeHandler} value={this.state.atk} disabled={this.state.loading} />
                            <label>atk</label>
                        </div>
                        <div>
                            <input type="number" min="0" max="50" placeholder="def" name="def" onChange={onChangeHandler} value={this.state.def} disabled={this.state.loading} />
                            <label>def</label>
                        </div>
                        <div>
                            <input type="number" min="0" max="50" placeholder="spatk" name="spatk" onChange={onChangeHandler} value={this.state.spatk} disabled={this.state.loading} />
                            <label>spatk</label>
                        </div>
                        <div>
                            <input type="number" min="0" max="50" placeholder="spdef" name="spdef" onChange={onChangeHandler} value={this.state.spdef} disabled={this.state.loading} />
                            <label>spdef</label>
                        </div>



                    </div>
                    <button type="submit" disabled={this.state.loading}>Search</button>
                </form>
                {this.state.error}
                {this.state.loading ? "loading...." : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapActionsToProps = {

}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(SearchComponent))