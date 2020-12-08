import React from 'react';
import { Row } from "reactstrap";
import '../styles/Footer.css';

class Footer extends React.Component {

  render () {

    const footerStyles={
        marginLeft: "40vw"
    }

    return (
      <div>

        <Row>
          <h5 className="centerFooter" style={footerStyles} >&nbsp; &copy; 2020 Joseph Benson</h5>
        </Row>
      </div>

    );  //  end of return
  };  //  end of render
};  //  end of Footer class

export default Footer;