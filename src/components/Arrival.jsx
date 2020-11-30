import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import arrivalImage from '../styles/assets/arrivalNavagatio.png';



class Arrival extends React.Component {


  render () {

    return (
      <div className="arrivalView">
          <img className="arrivalImage" src={arrivalImage} alt="medieval monks on an airplane"/>
      </div>

    );  //  end of return

  };  //  end of render


};  //  end of Auth class

export default Arrival;