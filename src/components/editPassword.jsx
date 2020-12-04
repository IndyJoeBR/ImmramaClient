import React from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

class EditPassword extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };

  };    //  end of constructor


  componentDidMount() {
    console.log("Edit Password Mounted");
  };

  render () {

    return (
      <div>
        Modal to change password
      </div>

    );  //  end of return
  };  //  end of render
};  //  end of Footer class

export default EditPassword;