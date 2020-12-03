import React from 'react';
import arrivalImage from '../styles/assets/arrivalNavagatio.png';

// Arrival's sole purpose is to display the image on the Home component
// when no other component is being used.

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