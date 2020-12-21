import React from 'react';
import '../styles/landing.scss';

export default class Landing extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
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
                            <input
                                type="text" 
                                placeholder="depart"
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