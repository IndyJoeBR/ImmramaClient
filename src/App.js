import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';
import Auth from  './auth/Auth';
import Home from  './components/Home';
import { BrowserRouter as Router, } from 'react-router-dom';

class App extends React.Component {

  constructor (props) {
    super(props);
    
    this.userIsLoggedIn = this.userIsLoggedIn.bind(this);

    this.state = {
      sessionToken: null,
      userIsLoggedIn: false
    }
  };


componentDidMount() {
  if (localStorage.getItem('token')) {
    let temp = localStorage.getItem('token');
    console.log("Component mounted: temp = ", temp);

    if (temp) {
      this.setState({
        sessionToken: temp,
        userIsLoggedIn: true
      });
      console.log("The session token has been set to: ", temp);
    }
   }
};


// userIsLoggedIn() {  // method checks for a session token
//   console.log("This is the sessionToken:", this.state.sessionToken);
//   //if (this.state.sessionToken === localStorage.getItem('token')) { 
//   if (this.state.sessionToken === null) {
//     console.log("The session token = null.  We go Auth.");
//     return <Auth token={this.state.sessionToken} />
//   } else {
//     console.log("The session token != null.  We go Home.", this.state.sessionToken);
//     return <Home token={this.state.sessionToken} /> 
//   };
// };


  render () {

    return (
      <div className="App">
        <Router>
          <TopNavBar token={this.state.sessionToken} userIsLoggedIn={this.state.userIsLoggedIn} />

          <Footer token={this.state.sessionToken} />
        </Router>
      </div>

    );  //  end of return

  };  //  end of render


};  //  end of App class

export default App;