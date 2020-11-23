import React from 'react';
import { Form, Button, Input, Label, FormGroup } from 'reactstrap';
import '../styles/Register.css'
import APIURL from "../helpers/environment";



class RegisterClass extends React.Component {

  constructor(props) {
    super(props);
    this.registerSubmit = this.registerSubmit.bind(this);

    this.state = {
        username: '',
        userEmail: '',
        password: '',
        passwordConfirm: ''
    }

  };    //  end of constructor


    userDataValidation (username, password) {
        console.log("Entered registration data sent for validation.")
        let userDataIsValid = false;
        
        if ( (username.length > 7) && 
             (password.length > 7) &&
             (
                !(/^[A-Za-z0-9]+$/).test(password) ||
                /([0-9]{1,})/.test(password)
             )
           ) {
            userDataIsValid = true;
        };

        console.log("User registration data is good?", userDataIsValid)
        return userDataIsValid;

    };  //  end of user data validation





    registerSubmit (event) {

        event.preventDefault();

        let username = this.state.username;
        console.log("Username: ", username);
        let userEmail = this.state.userEmail;
        console.log("User email: ", username);
        let password = this.state.password;
        console.log("Password: ", username);
        let passwordConfirm = this.state.passwordConfirm;
        console.log("Password Confirm: ", username);

        console.log("Past assignments for fetch.")

        if (username && password && userEmail) {
            console.log("Has username, user email and password");
            if ( this.userDataValidation(username, password) ) {
                console.log("username and password validated");
                if (password === passwordConfirm) {
                    console.log("Confirm password good... moving to Fetch.");
                    fetch(`${APIURL}/user/register`, {
                        method: 'POST',
                        headers: new Headers ( {
                            "Content-Type": "application/json"
                        } ),
                        body: JSON.stringify({
                            user: {
                                username: username,
                                userEmail: userEmail,
                                password: password
                            }
                        })
                    })
                    .then(response => response.json())
                    .then((data) => {
                        console.log(data);
                        //this.props.updateToken(data.sessionToken);
                        alert ("User has registered successfully; login to begin your journey!");
                    })
                    .catch(error => console.log(error));
                } else {
                    alert("Passwords do not match - please try again.");
                }
            } else { alert("Username must be at least 8 characters in length.  Password must include a special character, number and be at least 8 characters in length.  Email is required."); }
        } else {
            alert("Please fill out all registration fields.");
        };  // end of IF with FETCH

    };  //  end of registerSubmit method


    render() {
    
    return (
        <div className='authForm' id='registerForm'>
            <p></p>
            <Form className="mainLogin" onSubmit={this.registerSubmit}>
                <FormGroup>
                    <Label htmlFor="registerUsername"></Label>
                    <Input  className="Input"
                            id="registerUsername"
                            name="regsterUsername"
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
                    <Label htmlFor="registerUserEmail"></Label>
                    <Input  className="Input"
                            id="registerUserEmail"
                            name="regsterUserEmaile"
                            type="text"
                            placeholder="user email"
                            value={this.state.userEmail}
                            onChange = {
                                (event) => this.setState (
                                    {userEmail: event.target.value}
                                )
                            }
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="registerPassword"></Label>
                    <Input  className="Input" 
                            id="registerPassword"
                            name="registerPassword"
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
                <FormGroup>
                    <Label htmlFor="registerConfirmPassword"></Label>
                    <Input  className="Input"
                            id="registerConfirmPassword"
                            name="registerConfirmPassword"
                            type="password"
                            placeholder="confirm password"
                            value={this.state.passwordConfirm}
                            onChange={
                                (event) => this.setState (
                                    {passwordConfirm: event.target.value}
                                )
                            }
                    />
                </FormGroup>
                <Button className="Button" type="submit">Register</Button>
            </Form>          
        </div>
    );  //  end of return()

  };    //  end of render()

};  //  End of new registration class

export default RegisterClass;