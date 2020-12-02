import React from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import APIURL from "../helpers/environment";

// *****  View Journeys requires no validation as it
//        is available to all logged in users and
//        only allows a user to read journeys.

class ViewJourneys extends React.Component {
  
  constructor(props) {
    super(props);
    this.fetchJourneys = this.fetchJourneys.bind(this);
    this.displayJourneyInCards = this.displayJourneyInCards.bind(this);

  };    //  end of constructor


  componentDidMount() {
    console.log("View Journeys mounted.");
  };



 // https://immramaserver.herokuapp.com/journey/getAllJourneys


  fetchJourneys(e) {
    console.log(e);
    e.preventDefault();

    fetch(`${APIURL}/journey/getAllJourneys`, {
      method: 'GET',
      headers: new Headers( {'Content-Type': 'application/json'} )
    })
    .then( (response) => response.json() )
    .then( (allJourneyData) => console.log(allJourneyData) )
    .then( this.displayJourneyInCards(allJourneyData) )
    .catch(err => console.log(err))
  };  // end of fetchJourneys


  displayJourneyInCards(allJourneys) {
    console.log("Journeys sent for display:", allJourneys);
  }




  render () {

    return (
      <div>
          Here you can view the journeys
          {this.props.journeyEndpoint}
          <Button color="primary" onClick={this.fetchJourneys} >Get Journeys</Button>
      </div>

    );  //  end of return
  };  //  end of render
};  //  end of Auth class

export default ViewJourneys;