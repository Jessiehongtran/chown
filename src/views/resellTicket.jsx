import React from 'react';
import '../styles/resellTicket.scss';
import Nav from '../components/nav';
import { API_URL } from '../apiConfig';
import axios from 'axios';

export default class ResellTicket extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            have_return: false,
            return_action: "Add",
            carriers: [],
            post: {
                transport_type: "",
                deal_expire_date_int: 0,
                oneway_ticketID: 0,
                hasReturn: false,
                
            },
            oneway_ticket: {
                depart_place: "",
                depart_date_int: 0,
                depart_time_int: 0,
                arrive_place: "",
                arrive_date_int: 0,
                arrive_time_int: 0,
                carrierID: 0,
                price: 0,
                reservation_code: "",
                isReturnWay: false,
                isAcceptedByAirline: false,
                isPublished: false,
                isPaymentProcessed: false,
                isSold: false
            },
            return_ticket: {
                depart_place: "",
                depart_date_int: 0,
                depart_time_int: 0,
                arrive_place: "",
                arrive_date_int: 0,
                arrive_time_int: 0,
                carrierID: 0,
                price: 0,
                reservation_code: "",
                isReturnWay: true,
                isAcceptedByAirline: false,
                isPublished: false,
                isPaymentProcessed: false,
                isSold: false
            },
            oneway_bgcolor: "white"

        }
        this.toggleReturn = this.toggleReturn.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangePost = this.handleChangePost.bind(this)
        this.handleChangeTicketOneWay = this.handleChangeTicketOneWay.bind(this)
        this.handleChangeTicketReturn = this.handleChangeTicketReturn.bind(this)
        this.handleSubmitPost = this.handleSubmitPost.bind(this)
        this.getCarriers = this.getCarriers.bind(this)
    }

    async getCarriers(){
       try {
            const res = await axios.get(`${ API_URL }/carrier`)
            if (res.data.length > 0){
                this.setState({carriers: res.data})
            }
       } catch (err){
           console.log(err)
       }
    }

    componentDidMount(){
        this.getCarriers()
    }

    toggleReturn(){
        this.setState({ have_return: !this.state.have_return })
        if (this.state.return_action == "Add"){
            this.setState({ 
                return_action: "Remove",
                post: {
                    ...this.state.post,
                    hasReturn: true
                },
                oneway_bgcolor: "grey"
            })
        } else {
            this.setState({ 
                return_action: "Add",
                post: {
                    ...this.state.post,
                    hasReturn: false
                },
                oneway_bgcolor: "white"
            })
        }
    }

    handleChange(e){
        console.log('here', e.target.value)
    }

    updateReturnAction(){
        this.setState({ return_action: "Remove" })
    }

    handleChangePost(e){
        this.setState({
            post: {
                ...this.state.post,
                [e.target.name]: e.target.value
            }
        })
    }

    turnDateIntoNum(d){
        const month = parseInt(d.split("-")[1])
        const day = parseInt(d.split("-")[2])
        const year = parseInt(d.split("-")[0])

        return month*30*24*3600 + day*24*3600 + (year-1970)*365*24*3600
    }

    turnTimeIntoNum(t){
        const hour = parseInt(t.split(":")[0])  
        const min = parseInt(t.split(":")[1])  

        return hour*3600 + min*60   
    }

    handleChangeTicketOneWay(e){
        this.setState({
            oneway_ticket: {
                ...this.state.oneway_ticket,
                [e.target.name]: e.target.value
            }
        })
    }

    handleChangeTicketReturn(e){
        this.setState({
            return_ticket: {
                ...this.state.return_ticket,
                [e.target.name]: e.target.value
            }
        })
    }

    async handleSubmitPost(){
        const {
            oneway_ticket,
            return_ticket
        } = this.state;

        oneway_ticket.depart_date_int = this.turnDateIntoNum(oneway_ticket.depart_date_int);
        oneway_ticket.arrive_date_int = this.turnDateIntoNum(oneway_ticket.arrive_date_int);
        oneway_ticket.depart_time_int = this.turnTimeIntoNum(oneway_ticket.depart_time_int);
        oneway_ticket.arrive_time_int = this.turnTimeIntoNum(oneway_ticket.arrive_time_int);

        if (this.state.post.hasReturn){
            return_ticket.depart_date_int = this.turnDateIntoNum(return_ticket.depart_date_int);
            return_ticket.arrive_date_int = this.turnDateIntoNum(return_ticket.arrive_date_int);
            return_ticket.depart_time_int = this.turnTimeIntoNum(return_ticket.depart_time_int);
            return_ticket.arrive_time_int = this.turnTimeIntoNum(return_ticket.arrive_time_int);
        }

        try {
            const { post } = this.state;
            const resPostOneWay =  await axios.post(`${ API_URL }/ticket`, oneway_ticket)

            console.log('resPostOneWay', resPostOneWay)

            if (resPostOneWay && resPostOneWay.data.id){
                post.oneway_ticketID = resPostOneWay.data.id;
            }

            if (this.state.post.hasReturn){
                const resPostReturn = await axios.post(`${ API_URL }/ticket`, return_ticket)

                if (resPostReturn && resPostReturn.data.id){
                    post.return_ticketID = resPostReturn.data.id;
                }
            }

            console.log('postttt', post)
        } catch (err){
            console.log(err)
        }
       
    }

    render(){

        const { carriers, have_return, return_action } = this.state;
        console.log("post", this.state.post)
        console.log("oneway_ticket", this.state.oneway_ticket)
        console.log("return_ticket", this.state.return_ticket)

        return (
            <div className="resell-ticket">
                <div className="nav">
                    <Nav />
                </div>
                <div className="ticket-info" >
                    <div className="wrapper">
                        <div className="transport-type">
                            <label>Transportation Type</label>
                            <select onChange={this.handleChangePost} name="transport_type">
                                <option>select</option>
                                <option value="flight">flight</option>
                                <option value="bus">bus</option>
                            </select>
                        </div>
                        <div className="deadline">
                            <label>Deal expires on</label>
                            <input
                                placeholder="Deadline to sell" 
                                type="date"
                                name="deal_expire_date_int"
                                onChange={this.handleChangePost}
                            />
                        </div>
                        <div className="depart-arrive">
                            <div className="details" style={{backgroundColor: this.state.oneway_bgcolor}}>
                                <h2 className="title">One-way</h2>
                                <div className="place-time">
                                    <div className="depart">
                                        <h3>Depart</h3>
                                        <label>Place</label>
                                        <input
                                            placeholder="San Jose"
                                            name="depart_place"
                                            onChange={this.handleChangeTicketOneWay}
                                        />
                                        <label>Day</label>
                                        <input
                                            placeholder="Depart day"
                                            type="date"
                                            name="depart_date_int"
                                            onChange={this.handleChangeTicketOneWay}
                                        />
                                        <label>Time</label>
                                        <input
                                            placeholder="Depart time"
                                            type="time"
                                            name="depart_time_int"
                                            onChange={this.handleChangeTicketOneWay}
                                        />
                                    </div>
                                    <div className="arrive">
                                        <h3>Arrive</h3>
                                        <label>Place</label>
                                        <input
                                            placeholder="Newyork"
                                            name="arrive_place"
                                            onChange={this.handleChangeTicketOneWay}
                                        />
                                        <label>Day</label>
                                        <input
                                            placeholder="Arrive day"
                                            type="date"
                                            name="arrive_date_int"
                                            onChange={this.handleChangeTicketOneWay}
                                        />
                                        <label>Time</label>
                                        <input
                                            placeholder="Arrive time"
                                            type="time"
                                            name="arrive_time_int"
                                            onChange={this.handleChangeTicketOneWay}
                                        />
                                    </div>
                                </div>
                                <div className="carrier_name">
                                    <label>Carrier Name <span style={{ color: "red"}}>*</span></label>
                                    <select name="carrierID" onChange={this.handleChangeTicketOneWay}>
                                        <option>Select</option>
                                        {carriers.length > 0
                                        ? carriers.map(each => <option value={each.id}>{each.carrier_name}</option>)
                                        : null}
                                    </select>
                                </div>
                                <div className="reserve_code">
                                    <label>Reservation Code</label>
                                    <input 
                                        placeholder="eg. N95CK"
                                        name="reservation_code"
                                        onChange={this.handleChangeTicketOneWay}
                                    />
                                </div>
                                <div className="price">
                                    <label>Price</label>
                                    <input 
                                        placeholder="0"
                                        type="number"
                                        value="price"
                                        onChange={this.handleChangeTicketOneWay}
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
                                            name="depart_place"
                                            value={this.state.oneway_ticket.arrive_place}
                                            onChange={this.handleChangeTicketReturn}
                                        />
                                        <label>Day</label>
                                        <input
                                            placeholder="Depart day"
                                            type="date"
                                            name="depart_date_int"
                                            onChange={this.handleChangeTicketReturn}
                                        />
                                        <label>Time</label>
                                        <input
                                            placeholder="Depart time"
                                            type="time"
                                            name="depart_time_int"
                                            onChange={this.handleChangeTicketReturn}
                                        />
                                    </div>
                                    <div className="arrive">
                                        <h3>Arrive</h3>
                                        <label>Place</label>
                                        <input
                                            placeholder="San Jose"
                                            name="arrive_place"
                                            value={this.state.oneway_ticket.return_place}
                                            onChange={this.handleChangeTicketReturn}
                                        />
                                        <label>Day</label>
                                        <input
                                            placeholder="Arrive day"
                                            type="date"
                                            name="arrive_date_int"
                                            onChange={this.handleChangeTicketReturn}
                                        />
                                        <label>Time</label>
                                        <input
                                            placeholder="Arrive time"
                                            type="time"
                                            name="arrive_time_int"
                                            onChange={this.handleChangeTicketReturn}
                                        />
                                    </div>
                                </div>
                                <div className="carrier_name">
                                    <label>Carrier Name <span style={{ color: "red"}}>*</span></label>
                                    <select name="carrierID" onChange={this.handleChangeTicketReturn}>
                                        <option>Select</option>
                                        {carriers.length > 0
                                        ? carriers.map(each => <option value={each.id}>{each.carrier_name}</option>)
                                        : null}
                                    </select>
                                </div>
                                <div className="reserve_code">
                                    <label>Reservation Code</label>
                                    <input 
                                        placeholder="N95CK"
                                        name="reservation_code"
                                        onChange={this.handleChangeTicketReturn}
                                    />
                                </div>
                                <div className="price">
                                    <label>Price</label>
                                    <input 
                                        placeholder="0"
                                        type="number"
                                        name="price"
                                        onChange={this.handleChangeTicketReturn}
                                    />
                                    <span>$</span>
                                </div>
                            </div>
                            : null}
                        </div>
                        <button 
                            className="publish-btn"
                            onClick={this.handleSubmitPost}
                        >Publish</button>
                    </div>
                </div>
            </div>
        )
    }
}