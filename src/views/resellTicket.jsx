import React from 'react';
import '../styles/resellTicket.scss';
import Nav from '../components/nav';

export default class ResellTicket extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            have_return: false
        }
        this.addReturn = this.addReturn.bind(this)
    }

    addReturn(){
        this.setState({ have_return: true })
    }

    render(){

        const { have_return } = this.state;

        return (
            <div className="resell-ticket">
                <div className="nav">
                    <Nav />
                </div>
                <div className="ticket-info">
                    <div className="transport-type">
                        <label>Transportation Type</label>
                        <select>
                            <option>select</option>
                            <option>flight</option>
                            <option>bus</option>
                        </select>
                    </div>
                    <div className="deadline">
                        <label>Sell expires on</label>
                        <input
                            placeholder="Deadline to sell" 
                            type="date"
                        />
                    </div>
                    <div className="details">
                        <label className="title">One-way</label>
                        <div className="depart">
                            <label>Depart Place</label>
                            <input
                                placeholder="San Jose"
                            />
                            <label>Depart Day</label>
                            <input
                                placeholder="Depart day"
                                type="date"
                            />
                            <label>Depart Time</label>
                            <input
                                placeholder="Depart time"
                                type="time"
                            />
                        </div>
                        <div className="arrive">
                            <label>Arrive Place</label>
                            <input
                                placeholder="Newyork"
                            />
                            <label>Arrive Day</label>
                            <input
                                placeholder="Arrive day"
                                type="date"
                            />
                            <label>Arrive Time</label>
                            <input
                                placeholder="Arrive time"
                                type="time"
                            />
                        </div>
                        <div className="carrier_name">
                            <label>Carrier Name</label>
                            <input 
                                placeholder="American Airline"
                            />
                        </div>
                        <div className="price">
                            <label>Price</label>
                            <input 
                                placeholder="0"
                                type="number"
                            />
                        </div>
                    </div>
                    <button 
                        onClick={() => this.addReturn()}
                        className="add-btn"
                    >Add return</button>
                    {have_return 
                    ? <div className="details">
                        <label className="title">Return</label>
                        <div className="depart">
                            <label>Depart Place</label>
                            <input
                                placeholder="Newyork"
                            />
                            <label>Depart Day</label>
                            <input
                                placeholder="Depart day"
                                type="date"
                            />
                            <label>Depart Time</label>
                            <input
                                placeholder="Depart time"
                                type="time"
                            />
                        </div>
                        <div className="arrive">
                            <label>Arrive Place</label>
                            <input
                                placeholder="San Jose"
                            />
                            <label>Arrive Day</label>
                            <input
                                placeholder="Arrive day"
                                type="date"
                            />
                            <label>Arrive Time</label>
                            <input
                                placeholder="Arrive time"
                                type="time"
                            />
                        </div>
                        <div className="carrier_name">
                            <label>Carrier Name</label>
                            <input 
                                placeholder="Delta"
                            />
                        </div>
                        <div className="price">
                            <label>Price</label>
                            <input 
                                placeholder="0"
                                type="number"
                            />
                        </div>
                    </div>
                    : null}
                    <button>Publish</button>
                </div>
            </div>
        )
    }
}