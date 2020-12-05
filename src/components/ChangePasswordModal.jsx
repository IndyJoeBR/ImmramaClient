import React from 'react';
//import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
//import APIURL from "../helpers/environment";

// **********************************************************
// This is currently set aside for future functionality

class ChangePasswordModal extends React.Component {

  constructor (props) {
    super(props)

    this.state = { 

     };

  };  //  end of constructor




  render () {

    console.log("**********   THIS IS THE ACCOUNT   **********")
    console.log("this.user.isLoggedIn:", this.props.userIsLoggedIn);
    console.log("this.props.username: ", this.props.username);
    console.log("this.props.userIsAdmin?", this.props.userIsAdmin)

    return (
      <div>
          <h3>Password Modal Opens</h3>


          


      </div>
    );  //  end of return
  };  //  end of render
};  //  end of ChangePasswordModal class

export default ChangePasswordModal;