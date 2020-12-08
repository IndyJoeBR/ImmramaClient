import React from 'react';
import Arrival from './Arrival';

class Home extends React.Component {

  constructor(props) {
    super(props);
 
  };    //  end of constructor

  render () {

    console.log("**********   THIS IS THE HOME   **********")
    console.log("this.user.isLoggedIn:", this.props.userIsLoggedIn);
    console.log("this.props.username: ", this.props.username);
    console.log("this.props.userIsAdmin?", this.props.userIsAdmin)

    return (
      <div className="App">

        <h1 className="homeWelcome">Welcome to Immrama</h1>
        <Arrival />

      </div>

    );  //  end of return

  };  //  end of render


};  //  end of Auth class

export default Home;