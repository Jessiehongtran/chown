import Landing from './views/landing_page';
import { Route } from 'react-router-dom';
import FindTicket from './views/findTicket';
import ResellTicket from './views/resellTicket';
import './App.css';

function App() {
  return (
    <div className="App">
      <Route
        exact path = "/"
        render={
          props => {
            return (
              <Landing />
            )
          }
        } 
      />
      <Route
        exact path = "/ticket/find"
        render={
          props => {
            return (
              <FindTicket />
            )
          }
        } 
      />
      <Route
        exact path = "/ticket/resell"
        render={
          props => {
            return (
              <ResellTicket />
            )
          }
        } 
      />
    </div>
  );
}

export default App;
