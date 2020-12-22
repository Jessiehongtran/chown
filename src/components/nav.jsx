import React from 'react';
import '../styles/nav.scss'

export default class Nav extends React.Component {
    

    render(){
        return (
            <div className="nav">
                <div className="logo-wrapper">
                    <div className="logo">
                        Chown
                    </div>
                    <div className="tagline">
                        - Change owner of your ticket
                    </div>
                </div>
            </div>
        )
    }
}