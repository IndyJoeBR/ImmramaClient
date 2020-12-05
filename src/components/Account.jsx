import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import APIURL from "../helpers/environment";
//import ChangePasswordModal from "./ChangePasswordModal";
import '../styles/Account.css'

class Account extends React.Component {

  constructor (props) {
    super(props)
  //  this.setOpenPasswordModal = this.setOpenPasswordModal.bind(this);
    this.triggerPasswordInputChange = this.triggerPasswordInputChange.bind(this);
    this.triggerNewPasswordInputChange = this.triggerNewPasswordInputChange.bind(this);
    this.triggerNewPasswordConfirmInputChange = this.triggerNewPasswordConfirmInputChange.bind(this);
    this.changePasswordSubmit = this.changePasswordSubmit.bind(this);


    this.state = {
      oldPassword: '',
      newPassword: '',
      newPasswordConfirm: ''
      //openPasswordModal: true
     };

  };  //  end of constructor

  triggerPasswordInputChange(event) {
    this.setState( { oldPassword: event.target.value });
  };

  triggerNewPasswordInputChange(event) {
    this.setState( { newPassword: event.target.value });
  };

  triggerNewPasswordConfirmInputChange(event) {
    this.setState( { newPasswordConfirm: event.target.value });
  };

  changePasswordSubmit(event) {
    event.preventDefault();

    let username = this.props.username;
    let oldPassword = this.state.oldPassword;
    let newPassword = this.state.newPassword;
    let newPasswordConfirm = this.state.newPasswordConfirm;

    if (oldPassword && newPassword) {
      if(newPassword === newPasswordConfirm) {


        fetch(`${APIURL}/user/changepassword`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            {user: {
              username: username,
              oldPassword: oldPassword,
              newPassword: newPassword
            }}
          )
        })
        .then(response => response.json())
        .then((msg) => {
          console.log(msg)
          alert("Password change successful.")
        })
        .catch(error => console.log(error));



      } else {
        alert("The new password and confirmation must match.");
      } //  end of new password comparison check
    } else {
      alert("You are missing a password.");
    } //  end of passwords entered check

  } //  end of changePasswordSubmit


  // ********** Open/Close Password Modal **********
  // FOR FUTURE FUNCTIONALITY
  //setOpenPasswordModal() {
  //  console.log("Now I change the password!")
  //  this.setState( { openPasswordModal : (!this.state.openPasswordModal) //} )
  //};


  render () {

    console.log("**********   THIS IS THE ACCOUNT   **********")
    console.log("this.user.isLoggedIn:", this.props.userIsLoggedIn);
    console.log("this.props.username: ", this.props.username);
    console.log("this.props.userIsAdmin?", this.props.userIsAdmin);
    //console.log("openPasswordModal: ", this.state.openPasswordModal);

    console.log("this.state.oldPassword", this.state.oldPassword);
    console.log("this.state.newPassword", this.state.newPassword);
    console.log("this.state.newPasswordConfirm", this.state.newPasswordConfirm);

    return (
      <div>
          <h2>Hello {this.props.username}!</h2>


          <div className="accountHeader">
            <h3 className="myAcc">My Account</h3>
          </div>
          <br/>

          <h4>Change Password</h4>
          <div className="changePasswordContainer">
            <Form className="changePasswordForm"
                  onSubmit={this.changePasswordSubmit}
                  type="submit">
            <FormGroup>
                <Label htmlFor="oldPassword">Old Password: </Label>
                <Input  className="Input"
                        id="oldPassword"
                        name="oldPassword"
                        type="password"
                        value={this.state.oldPassword}
                        onChange={this.triggerPasswordInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="newPassword">New Password: </Label>
                <Input  className="Input"
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={this.state.newPassword}
                        onChange={this.triggerNewPasswordInputChange}
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="newPasswordConfirm">Confirm New Password: </Label>
                <Input  className="Input"
                        id="newPasswordConfirm"
                        name="newPasswordConfirm"
                        type="password"
                        value={this.state.newPasswordConfirm}
                        onChange={this.triggerNewPasswordConfirmInputChange}
                />
              </FormGroup>

              <Button color="warning" size="sm"
                      type="submit">
                      Change Password
              </Button>

            </Form>
          </div>



      </div>
    );  //  end of return
  };  //  end of render
};  //  end of Account class

export default Account;

// Modal switch for future functionality
    // <div className="changePassword">{
    //         this.state.openPasswordModal ?
    //         <ChangePasswordModal username={this.props.username} /> :
    //          <></>
    //         }
    // </div>