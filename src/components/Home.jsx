import React from 'react';
import Arrival from './Arrival';

class Home extends React.Component {


  render () {

    return (
      <div className="App">

        <h3>Welcome to Immrama</h3>
        <Arrival />

      </div>

    );  //  end of return

  };  //  end of render


};  //  end of Auth class

export default Home;