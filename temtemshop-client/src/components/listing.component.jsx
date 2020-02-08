import React from 'react'
import Logo from '../logo.svg'
import temtem from '../assets/temtems'

const Listing = (props) => {
    const getColor = (value) => {
        let style = {
            color: '#777'
        }

        if(value == 50){
            style = {
                        color: '#eb2f64'
                    }
        }

        return style
    }

    return (
        <div className="listing">
            <img src={"https://temtemstrat.com/images/miniatures/" + props.name.toLowerCase() + ".png"} className="listing--image" />
            <div className="listing--name">
                {props.name}
            </div>
            <div className="listing--stats">
                <div className="stats-container">
                    <span style={getColor(props.lp)}>LP: {props.lp}</span>
                    <span style={getColor(props.aus)}>STA: {props.aus}</span>
                    <span style={getColor(props.spd)}>SPD: {props.spd}</span>
                </div>
                <div className="stats-container">
                <span style={getColor(props.atk)}>ATK: {props.atk}</span>
                    <span style={getColor(props.def)}>DEF: {props.def}</span>
                    
                    <span style={getColor(props.spatk)}>SPATK: {props.spatk}</span>
                    <span style={getColor(props.spdef)}>SPDEF: {props.spdef}</span>
                    
                </div>

            </div>
            <div className="listing--sex">
                SEX: {props.sex}
            </div>
            <div className="listing--luma">
                is Luma: {props.luma ? "Yes" : "No"}
            </div>
            <div className="listing--level">
                LVL: {props.level}
            </div>
            <div className="listing-fertility">
                fertility: {props.fertility}
            </div>
            <div className="listing--discord">
                Discord: <br/>
                {props.userDiscord}
            </div>
            <div className="listing--price">
                Price: <br />
                {props.price} Pansuns
            </div>


        </div>
    )
}

export default Listing