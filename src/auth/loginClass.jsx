import React from 'react';
import { Form, Button, Input, Label, FormGroup } from 'reactstrap';
import '../styles/Login.css'
import APIURL from "../helpers/environment";



class LoginClass extends React.Component {

  constructor(props) {
    super(props);
    this.loginSubmit = this.loginSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      userIsAdmin: false,
      sessionToken: ''
    }
  };    //  end of constructor


  updateUserState (adminStatus, username, token) {
    this.setState( {
        userIsAdmin: adminStatus,
        username: username,
        sessionToken: token
    });
    console.log("The updated state variables are: ")
    console.log("Username:",this.state.username);
    console.log("SessionToken:",this.state.sessionToken);
    console.log("userIsAdmin:",this.state.userIsAdmin);
    console.log("User is logged in!");
  };


  loginSubmit (event) {
    event.preventDefault();

    let username = this.state.username;
    console.log("Username: ", username);;
    let password = this.state.password;
    console.log("Password: ", username);


    fetch(`${APIURL}/user/login`, {
        method: 'POST',
        headers: new Headers ({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ user: { 
            username: username,
            password: password
        }}),
    })
    .then( (response) => response.json() )
    .then( (data) => { 
        console.log(data);
        console.log("Data returned");
        this.updateUserState(data.user.userAdmin, data.user.username, data.sessionToken);
        localStorage.setItem('token', data.sessionToken); // puts in local storage for App and Authorization Header
    }, )
    .catch( (error) => console.log(error) );
};



  render () {
    return (
    
      <div className='authForm' id='loginForm'>
            <Form className="mainLogin" onSubmit={this.loginSubmit}>
                <FormGroup>
                  <Label className="Label" htmlFor="loginUsername"></Label>
                  <Input  className="Input"
                          id="loginUsername"
                          name="loginUsername"
                          type="text"
                          placeholder="username" 
                          value={this.state.username}
                          onChange={
                            (event) => this.setState (
                              {username: event.target.value}
                            )
                          }     
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="loginPassword"></Label>
                  <Input  className="Input"
                          id="loginPassword"
                          name="loginPassword"
                          type="password"
                          placeholder="password"
                          value={this.state.password}
                          onChange={
                            (event) => this.setState (
                                {password: event.target.value}
                            )
                          } 
                  />
                </FormGroup>
                <Button className="Button" type="submit">Login</Button>
            </Form> 
         </div>

    ) // end of return()
  };  // end of render()
};  //  end of LoginClass

export default LoginClass;