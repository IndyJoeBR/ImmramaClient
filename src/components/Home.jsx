import React from 'react';
import Arrival from './Arrival';

class Home extends React.Component {

  constructor(props) {
    super(props);
 
  };    //  end of constructor

  render () {

    console.log("**********   THIS IS THE HOME   **********")
    console.log("this.user.isLoggedIn:", this.props.userIsLoggedIn);
    console.log("Username: ", this.props.username);
    console.log("User is admin?", this.props.userIsAdmin)

    return (
      <div className="App">

        <h3>Welcome to Immrama</h3>
        <Arrival />

      </div>

    );  //  end of return

  };  //  end of render


};  //  end of Auth class

export default Home;