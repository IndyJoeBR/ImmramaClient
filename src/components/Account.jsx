import React from 'react';
import { Button } from 'reactstrap';
import APIURL from "../helpers/environment";
import ChangePasswordModal from "./ChangePasswordModal";
import '../styles/Account.css'

class Account extends React.Component {

  constructor (props) {
    super(props)
    this.setOpenPasswordModal = this.setOpenPasswordModal.bind(this);

    this.state = {
      openPasswordModal: true
     };

  };  //  end of constructor

  // ********** Open/Close Password Modal **********
  setOpenPasswordModal() {
    console.log("Now I change the password!")
    this.setState( { openPasswordModal : (!this.state.openPasswordModal) } )
  };


  render () {

    console.log("**********   THIS IS THE ACCOUNT   **********")
    console.log("this.user.isLoggedIn:", this.props.userIsLoggedIn);
    console.log("this.props.username: ", this.props.username);
    console.log("this.props.userIsAdmin?", this.props.userIsAdmin);
    console.log("openPasswordModal: ", this.state.openPasswordModal);

    return (
      <div>
          <h2>Hello {this.props.username}!</h2>
          This is where you can review Account information

          <div className="accountHeader">
            <h3 className="myAcc">My Account</h3>
          </div>

          <div>
            <Button color="warning" size="sm" onClick={this.setOpenPasswordModal}>Change Password</Button>
          </div>

          <div className="changePassword">{
            this.state.openPasswordModal ?
            <ChangePasswordModal username={this.props.username} /> :
             <></>
            }
          </div>









      </div>
    );  //  end of return
  };  //  end of render
};  //  end of Account class

export default Account;