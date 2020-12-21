import React from 'react';
import '../styles/landing.scss';
import { geolocated } from 'react-geolocated';
import Geosuggest from 'react-geosuggest';

class Landing extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    onSuggestSelect(suggest){
        
    }


    render(){
        return (
            <div className="landing">
                <div className="logo">
                    <div className="name">
                        Chown
                    </div>
                    <div className="tagline">
                        - Change owner of your ticket 
                    </div>
                </div>
                <div className="depart-arrive">
                    <div className="wrapper">
                        <div className="place">
                            <Geosuggest 
                                onSuggestSelect={suggest => this.onSuggestSelect(suggest)}
                                location={window.google ? new window.google.maps.LatLng(53.558572, 9.9278215): {lat: 53.558572, lng: 9.9278215}}
                                radius="20"
                            />
                        </div>
                        <img className="arrow-right" src="arrowright.png"/>
                        <div className="place">
                            <input
                                type="text" 
                                placeholder="arrive"
                            />
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button className="find">Find Ticket</button>
                    <button className="resell">Resell Ticket</button>
                </div>
            </div>
        )
    }
}

export default geolocated(
    {
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000
    }
)(Landing)