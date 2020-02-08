import {LOGIN, SET_USER, SET_LOADING, SET_LOADING_TEXT, SET_DISCORD} from '../types'
import axios from 'axios'

import { api } from  '../assets/api'

export const login = (user, history) => (dispatch) => {
    dispatch({
        type: LOGIN,
        payload: true
    })

    axios.post(api + '/login', { email: user.email, password: user.password}, {"Content-Type": "application/json"})
        .then(response => {
            dispatch(setUser(response.data.token))
            dispatch(setDiscord(response.data.token))
            history.push('/')
        })
        .catch(err => {
            dispatch(setError(err))
        })
}

export const setDiscord = (token) => dispatch => {
    axios.defaults.headers.common['Authorization'] = "Bearer " + token
        axios.post(api + '/getUserDetails')
            .then(res => {
                dispatch({
                    type: SET_DISCORD,
                    payload: res.data.user.user.discord
                })
            })
            .catch(err => {
                console.log(err)
                
            })
}

export const updateDiscord = (discord) => dispatch => {
    console.log("test")
    dispatch({
        type: SET_DISCORD,
        payload: discord
    })
}

export const signup = (user, history) => dispatch => {
    dispatch({
        type: SET_LOADING,
        payload: true
    })
    axios.post(api + '/signup', {email: user.email, discord: user.discord, password: user.password, confirmPassword: user.confirmPassword}, {"Content-Type": "application/json"})
        .then(response => {
            dispatch(setUser(response.data.token))
            dispatch(setDiscord(response.data.token))
            history.push('/')
        })
        .catch(err => {
            dispatch(setError(err))
        })
}

export const setUser = (token) => dispatch => {
    dispatch({
        type: SET_USER,
        payload: token
    })

    dispatch({
        type: SET_LOADING,
        payload: false
    })
}



export const setError = (error) => dispatch => {
    console.log("error " + error)

    dispatch({
        type: SET_LOADING,
        payload: false
    })
}