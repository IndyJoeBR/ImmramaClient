import React from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import APIURL from "../helpers/environment";

// *****  View Journeys requires no validation as it
//        is available to all logged in users and
//        only allows a user to read journeys.

class ViewJourneys extends React.Component {
  
  constructor(props) {
    super(props);
    this.fetchAllJourneys = this.fetchAllJourneys.bind(this);
    this.displayJourneyInCards = this.displayJourneyInCards.bind(this);

    this.state = {

    };

  };    //  end of constructor


  componentDidMount() {
    console.log("View Journeys mounted.");
    console.log(`${APIURL}`);
  };



 // https://immramaserver.herokuapp.com/journey/getAllJourneys


 fetchAllJourneys(e) {
    e.preventDefault();

    fetch(`${APIURL}/journey/getAllJourneys`, {
      method: 'GET',
      headers: new Headers( {'Content-Type': 'application/json'} )
    })
    .then( (response) => response.json() )
    .then( (allJourneyData) => console.log(allJourneyData) )
    .catch(err => console.log(err))
  };  // end of fetchJourneys


  displayJourneyInCards(allJourneys) {
    console.log("Journeys sent for display:", allJourneys);
  }




  render () {

    console.log("**********   THIS IS VIEW ALL JOURNEYS   **********")
    console.log("this.user.isLoggedIn:", this.props.userIsLoggedIn);
    console.log("Username: ", this.props.username);
    console.log("User is admin?", this.props.userIsAdmin)


    return (
      <div>
          Here you can view ALL journeys
          <Button color="primary" onClick={this.fetchAllJourneys} >Get All Journeys</Button>
      </div>

    );  //  end of return
  };  //  end of render
};  //  end of Auth class

export default ViewJourneys;