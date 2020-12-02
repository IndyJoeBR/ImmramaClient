import React from 'react';
import Arrival from './Arrival';

class Home extends React.Component {


  render () {

    console.log("this.user.isLoggedIn:", this.props.userIsLoggedIn);
    console.log("Entering TopNavBar ternary.");
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