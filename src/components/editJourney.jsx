import React from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

class EditJourney extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };

  };    //  end of constructor


  componentDidMount() {
    console.log("Edit Journey Mounted");
  };

  render () {

    return (
      <div>
        Modal to edit Journey
      </div>

    );  //  end of return
  };  //  end of render
};  //  end of Footer class

export default EditJourney;