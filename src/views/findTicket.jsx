import React from 'react';
import Nav from '../components/nav';
import '../styles/findTicket.scss';
import Ticket from '../components/ticket';
import { tickets } from '../data/tickets';

export default class FindTicket extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            depart_place: "Depart place",
            arrive_place: "Arrive place",
            depart_time: "Depart time",
            return_time: "Return time"
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        console.log(e.target.name, e.target.value)
        this.setState({ [e.target.name]: e.target.value })
    }

    render(){
        const { depart_place, arrive_place, depart_time, return_time } = this.state

        return (
            <div className="find-ticket">
                <Nav />
                <div className="place-time">
                    <div className="input-wrapper">
                        <input
                            type="text"
                            value={this.state.depart_place}
                            onChange={this.handleChange}
                            name="depart_place"
                        />
                    </div>
                    <div className="input-wrapper">
                        <input
                            value = {arrive_place}
                            onChange={this.handleChange}
                            name = "arrive_place"
                        />
                    </div>
                    <div className="input-wrapper">
                        <input
                            value = {depart_time}
                            onChange={this.handleChange}
                            name = "depart_time"
                        />
                    </div>
                    <div className="input-wrapper">
                        <input
                            value = {return_time}
                            onChange={this.handleChange}
                            name = "return_time"
                        />
                    </div>
                </div>
                <div className="tickets-wrapper">
                    <div className="tickets">
                        {tickets.map(ticket => <Ticket ticket={ticket} />)}
                    </div>
                </div>
            </div>
        )
    }
}