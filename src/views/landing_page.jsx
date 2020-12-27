import React from 'react';
import '../styles/landing.scss';
import { geolocated } from 'react-geolocated';
import Geosuggest from 'react-geosuggest';

class Landing extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }

        this.updateBlurDepart = this.updateBlurDepart.bind(this);
        this.updateBlurArrive = this.updateBlurArrive.bind(this);
    }

    onSuggestSelect(suggest){
        console.log('suggest', suggest)
    }

    updateBlurDepart(e){
        this.props.updateDepartPlace(e.target.value)
    }

    updateBlurArrive(e){
        this.props.updateArrivePlace(e.target.value)
    }


    render(){
        console.log('props in landing page', this.props)

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
                            <input
                                placeholder="Depart"
                                type="text"
                                onBlur={this.updateBlurDepart}
                            />
                        </div>
                        <img className="arrow-right" src="arrowright.png"/>
                        <div className="place">
                            <input
                                placeholder="Arrive"
                                type="text"
                                onBlur={this.updateBlurArrive}
                            />
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <button 
                        className="find"
                        onClick={() => this.props.history.push('/ticket/find')}
                    >Find Ticket</button>
                    <button 
                        className="resell"
                        onClick={() => this.props.history.push('/ticket/resell')}
                    >Resell Ticket</button>
                </div>
            </div>
        )
    }
}

export default Landing;