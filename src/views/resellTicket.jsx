import React from 'react';
import '../styles/resellTicket.scss';
import Nav from '../components/nav';

export default class ResellTicket extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            have_return: false,
            return_action: "Add"
        }
        this.toggleReturn = this.toggleReturn.bind(this)
        this.handleChange = this.handleChange.bind(this)
        
    }

    toggleReturn(){
        this.setState({ have_return: !this.state.have_return })
        if (this.state.return_action == "Add"){
            this.setState({ return_action: "Remove" })
        } else {
            this.setState({ return_action: "Add" })
        }
    }

    handleChange(e){
        console.log('here', e.target.value)
    }

    updateReturnAction(){
        this.setState({ return_action: "Remove" })
    }

    render(){

        const { have_return, return_action } = this.state;

        return (
            <div className="resell-ticket">
                <div className="nav">
                    <Nav />
                </div>
                <div className="ticket-info">
                    <div className="wrapper">
                        <div className="transport-type">
                            <label>Transportation Type</label>
                            <select>
                                <option>select</option>
                                <option>flight</option>
                                <option>bus</option>
                            </select>
                        </div>
                        <div className="deadline">
                            <label>Deal expires on</label>
                            <input
                                placeholder="Deadline to sell" 
                                type="date"
                            />
                        </div>
                        <div className="depart-arrive">
                            <div className="details">
                                <h2 className="title">One-way</h2>
                                <div className="place-time">
                                    <div className="depart">
                                        <h3>Depart</h3>
                                        <label>Place</label>
                                        <input
                                            placeholder="San Jose"
                                        />
                                        <label>Day</label>
                                        <input
                                            placeholder="Depart day"
                                            type="date"
                                            onChange={this.handleChange}
                                        />
                                        <label>Time</label>
                                        <input
                                            placeholder="Depart time"
                                            type="time"
                                            onChange={this.handleChange}
                                        />
                                    </div>
                                    <div className="arrive">
                                        <h3>Arrive</h3>
                                        <label>Place</label>
                                        <input
                                            placeholder="Newyork"
                                        />
                                        <label>Day</label>
                                        <input
                                            placeholder="Arrive day"
                                            type="date"
                                        />
                                        <label>Time</label>
                                        <input
                                            placeholder="Arrive time"
                                            type="time"
                                        />
                                    </div>
                                </div>
                                <div className="carrier_name">
                                    <label>Carrier Name</label>
                                    <select>
                                        <option>Select</option>
                                        <option>American Airline</option>
                                        <option>Delta</option>
                                    </select>
                                </div>
                                <div className="reserve_code">
                                    <label>Reservation Code</label>
                                    <input 
                                        placeholder="eg. N95CK"
                                    />
                                </div>
                                <div className="price">
                                    <label>Price</label>
                                    <input 
                                        placeholder="0"
                                        type="number"
                                    />
                                    <span>$</span>
                                </div>
                            </div>
                            <button 
                                onClick={() => this.toggleReturn()}
                                className="add-btn"
                            >{return_action} return</button>
                            {have_return 
                            ? <div className="details">
                                <h2 className="title">Return</h2>
                                <div className="place-time">
                                    <div className="depart">
                                        <h3>Depart</h3>
                                        <label>Place</label>
                                        <input
                                            placeholder="Newyork"
                                        />
                                        <label>Day</label>
                                        <input
                                            placeholder="Depart day"
                                            type="date"
                                        />
                                        <label>Time</label>
                                        <input
                                            placeholder="Depart time"
                                            type="time"
                                        />
                                    </div>
                                    <div className="arrive">
                                        <h3>Arrive</h3>
                                        <label>Place</label>
                                        <input
                                            placeholder="San Jose"
                                        />
                                        <label>Day</label>
                                        <input
                                            placeholder="Arrive day"
                                            type="date"
                                        />
                                        <label>Time</label>
                                        <input
                                            placeholder="Arrive time"
                                            type="time"
                                        />
                                    </div>
                                </div>
                                <div className="carrier_name">
                                    <label>Carrier Name</label>
                                    <select>
                                        <option>Select</option>
                                        <option>American Airline</option>
                                        <option>Delta</option>
                                    </select>
                                </div>
                                <div className="reserve_code">
                                    <label>Reservation Code</label>
                                    <input 
                                        placeholder="N95CK"
                                    />
                                </div>
                                <div className="price">
                                    <label>Price</label>
                                    <input 
                                        placeholder="0"
                                        type="number"
                                    />
                                    <span>$</span>
                                </div>
                            </div>
                            : null}
                        </div>
                        <button className="publish-btn">Publish</button>
                    </div>
                </div>
            </div>
        )
    }
}