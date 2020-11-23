import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import RegisterClass from './registerClass';
import LoginClass from './loginClass';
import '../styles/auth.css';


class Auth extends React.Component {


  render () {

    return (
      <div className="AuthForms">
        <h4>Registration and login</h4>
        <Container className="auth-container">
          <Row>
            <Col md="6" className="register-col">
              <RegisterClass />
            </Col>
            <Col md="6" className="login-col">
             <LoginClass />
            </Col>
          </Row>
       </Container>
      </div>

    );  //  end of return

  };  //  end of render

};  //  end of Auth class


export default Auth;