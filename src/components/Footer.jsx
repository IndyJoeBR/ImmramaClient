import React from 'react';
import { Row } from "reactstrap";
import '../styles/Footer.css';

class Footer extends React.Component {

  render () {

    return (
      <div>

        <Row>
          <p>&nbsp; &copy; 2020 Joseph Benson</p>
        </Row>
      </div>

    );  //  end of return
  };  //  end of render
};  //  end of Auth class

export default Footer;