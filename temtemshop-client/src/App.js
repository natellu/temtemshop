import React, {useEffect} from 'react';
import './style.scss';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

import { Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import Addlisting from './pages/Addlisting'
import Search from './pages/Search'
import Login from './pages/Login'
import Header from './components/header.component'
import User from './pages/User'
import SessionExpire from './pages/SessionExpire'

import { onLogout } from './redux/actions/appAction'

function App(props) {

  const checkUserSession = () => {
    const userAuth = props.user
    if(userAuth){
      const decodedToken = jwtDecode(userAuth)
      if(decodedToken.exp * 1000 < Date.now()){
        props.onLogout()
        props.history.push('/sessionexpire')
      }
    }
  }

  useEffect(() => {
    checkUserSession()
  },[checkUserSession])



  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/addlisting" component={Addlisting} />
        <Route exact path="/login" component={Login}/>
        <Route exact path="/user" component={User} />
        <Route exact path="/sessionexpire" component={SessionExpire} />
      </Switch>
    </div>

  )
}

const mapStateToProps = (state) => ({
  user: state.user.user
})

const mapActionsToProps = {
  onLogout
}

export default withRouter(connect(mapStateToProps, mapActionsToProps)(App))
