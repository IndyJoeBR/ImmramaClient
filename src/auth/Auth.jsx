//  ****************   NO LONGER USED   ******************
//  Functionality moved to App.js ----  Delete this and 
//  Auth.css when definitely no longer needed.

import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import RegisterClass from './registerClass';
import LoginClass from './loginClass';
import '../styles/auth.css';

class Auth extends React.Component {

  constructor(props) {
    super(props);

  };

  render () {

    return (
      <div className="AuthForms">
        <h3>Welcome to Immrama</h3>
        <h4>Registration and login</h4>
        <Container className="auth-container">
          <Row>
            <Col md="6" className="register-col">
              <RegisterClass setUserIsLoggedIn={this.props.setUserIsLoggedIn} />
            </Col>
            <Col md="6" className="login-col">
             <LoginClass setUserIsLoggedIn={this.props.setUserIsLoggedIn} />
            </Col>
          </Row>
       </Container>
      </div>

    );  //  end of return

  };  //  end of render

};  //  end of Auth class


export default Auth;