import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import RegisterClass from './auth/registerClass';
import LoginClass from './auth/loginClass';

class App extends React.Component {

  constructor (props) {
    super(props);
    
    this.setUserIsLoggedIn = this.setUserIsLoggedIn.bind(this);
    this.setSessionToken = this.setSessionToken.bind(this);
    this.setUserData = this.setUserData.bind(this);

    this.state = {
      sessionToken: null,
      userIsLoggedIn: false,
      username: null,
      userIsAdmin: null
    }
  };


  componentDidMount() {
    if (localStorage.getItem('token')) {
      let temp = localStorage.getItem('token');
      console.log("Component mounted: temp = ", temp);

      if (temp) {
        this.setSessionToken(temp);
        this.setUserIsLoggedIn(true)
      }
    }
  };


  setSessionToken(newSessionTokenValue) {
    console.log("Changing the session token.");
    this.setState( {sessionToken: newSessionTokenValue} );
  };  // method to be passed into props for use in TopNavBar for Logout

  setUserIsLoggedIn(newLoggedInState) {
    console.log("Changing userIsLoggedIn.");
    this.setState( {userIsLoggedIn: newLoggedInState} );
  };  // method to be passed into props for use in TopNavBar for Logout

  setUserData(username, admin) {
    console.log("setUserData username is:", username);
    console.log("setUserData admin is:", admin);
    this.setState( {
      userIsLoggedIn: true,
      username: username,
      userIsAdmin: admin
    })
  }



  render () {



    return (
      <div className="App">
        <Router>
        {this.state.userIsLoggedIn ?
          <div>
          <TopNavBar  token={this.state.sessionToken}
                      userIsLoggedIn={this.state.userIsLoggedIn}
                      setUserIsLoggedIn={this.setUserIsLoggedIn}
                      setSessionToken={this.setSessionToken}
                      username={this.state.username}
                      userIsAdmin={this.state.userIsAdmin}
                      
          />
          </div>
          : 
          <div className="AuthForms">
            <h3>Welcome to Immrama</h3>
            <h4>Registration and login</h4>
            <Container className="auth-container">
              <Row>
                <Col md="6" className="register-col">
                  <RegisterClass />
                </Col>
                <Col md="6" className="login-col">
                <LoginClass setUserData={this.setUserData} />
                </Col>
              </Row>
            </Container>
          </div>
          }
          
          <Footer />
        </Router>
      </div>

    );  //  end of return
  };  //  end of render
};  //  end of App class

export default App;





//   ***** DELETE THIS ONCE ALL IS WORKING *****
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