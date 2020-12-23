import React from 'react';
import { tickets } from '../data/tickets';
import '../styles/ticket.scss'

export default class Ticket extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    convertNumToAmPm(t){
        const timeArr = t.split(":")
        let hour = parseInt(timeArr[0])
        let min = timeArr[1]
        let sec = timeArr[2]
        if (hour == 12){
          sec = "pm"
        } else if (hour > 12 && hour < 24){
          hour = hour - 12
          sec = "pm"
        } else if (hour == 24){
          hour = hour - 12
          sec = "am"
        } else {
          sec = "am"
        }
      
        return hour.toString() + ":" + min + " " + sec
      }

    getDuration(t_start, t_end){
        let hour = parseInt(t_end.split(":")[0]) - parseInt(t_end.split(":")[0]) 
         
    }

    turnDayTimeToNum(t, d){
        let month = parseInt(d.split("/")[0])
        let day = parseInt(d.split("/")[1])
        let year = parseInt(d.split("/")[2])
        let hour = parseInt(t.split(":")[0])
        let min = parseInt(t.split(":")[1])
        let sec = parseInt(t.split(":")[2])
      
        let n = (year - 1970)*3600*24*365 + month*3600*24*30 + day*3600*24 + hour*3600 + min*60 + sec
      
        return n
    }

    turnNumToHourMin(n){
        console.log('n', n)
        let hour = Math.floor(n/3600)
        let min = Math.floor((n - hour*3600)/60)
      
        if (hour.toString().length < 2){
          hour = "0" + hour.toString() 
        }
      
        if (min.toString().length < 2){
          min = min.toString() + "0"
        }
        return hour + "h " + min + "m"
    }

    render(){
        const { ticket } = this.props;

        return (
            <div className="ticket">
                <div className="info">
                    <div className="each-way">
                        <div className="carrier-logo">
                            <img src={ticket.one_way.carrier_logo} />
                        </div>
                        <div className="text">
                            <p className="time">
                                {this.convertNumToAmPm(ticket.one_way.depart_time)} -  {this.convertNumToAmPm(ticket.one_way.arrive_time)} 
                            </p>
                            <p className="carrier_name">
                                {ticket.one_way.carrier_name}
                            </p>
                        </div>
                        <div className="duration-wrapper">
                            <div className="number">
                                {this.turnNumToHourMin(this.turnDayTimeToNum(ticket.one_way.arrive_time, ticket.one_way.arrive_day) - this.turnDayTimeToNum(ticket.one_way.depart_time, ticket.one_way.depart_day))}
                            </div>
                        </div>
                    </div>
                    {ticket.return
                    ? <div className="each-way">
                        <div className="carrier-logo">
                            <img src={ticket.return.carrier_logo}/>
                        </div>
                        <div className="text">
                            <p className="time">
                                {this.convertNumToAmPm(ticket.return.depart_time)} -  {this.convertNumToAmPm(ticket.return.arrive_time)} 
                            </p>
                            <p className="carrier">
                                {ticket.return.carrier_name}
                            </p>
                        </div>
                        <div className="duration-wrapper">
                            <div className="number">
                            {this.turnNumToHourMin(this.turnDayTimeToNum(ticket.return.arrive_time, ticket.return.arrive_day) - this.turnDayTimeToNum(ticket.return.depart_time, ticket.return.depart_day))}
                            </div>
                        </div>
                      </div>
                    : null
                    }
                </div>
                <div className="price">
                    <p className="tag">
                    ${ticket.return ? ticket.one_way.price + ticket.return.price : ticket.one_way.price}
                    </p>
                    <div className="post-long">
                        Posted for 3 days
                    </div>
                    <div className="status">
                        Active
                    </div>
                    <button className="view-action">View deal</button>
                </div>
            </div>
        )
    }
}