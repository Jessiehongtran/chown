import React from 'react';
import Landing from './views/landing_page';
import { Route } from 'react-router-dom';
import FindTicket from './views/findTicket';
import ResellTicket from './views/resellTicket';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      depart_place: "Depart place",
      arrive_place: "Arrive place"
    }

    this.updateDepartPlace = this.updateDepartPlace.bind(this);
    this.updateArrivePlace = this.updateArrivePlace.bind(this);
  }

  updateDepartPlace(place){
    this.setState({depart_place: place})
  }

  updateArrivePlace(place){
    this.setState({arrive_place: place})
  }

  render(){
    return (
      <div className="App">
        <Route
          exact path = "/"
          render={
            props => {
              return (
                <Landing  
                  {...props} 
                  updateDepartPlace={this.updateDepartPlace}
                  updateArrivePlace={this.updateArrivePlace}
                />
              )
            }
          } 
        />
        <Route
          exact path = "/ticket/find"
          render={
            props => {
              return (
                <FindTicket  
                  {...props}
                  depart_place = {this.state.depart_place}
                  arrive_place = {this.state.arrive_place}
                />
              )
            }
          } 
        />
        <Route
          exact path = "/ticket/resell"
          render={
            props => {
              return (
                <ResellTicket  {...props}/>
              )
            }
          } 
        />
      </div>
    );
  }
}

export default App;
