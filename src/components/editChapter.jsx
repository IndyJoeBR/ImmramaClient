import React from 'react';
import {Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody} from 'reactstrap';

class EditChapter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };

  };    //  end of constructor


  componentDidMount() {
    console.log("Edit Chapter Mounted");
  };

  render () {

    return (
      <div>
        Modal to edit Chapter
      </div>

    );  //  end of return
  };  //  end of render
};  //  end of Footer class

export default EditChapter;