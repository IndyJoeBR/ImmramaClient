import React from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
import APIURL from "../helpers/environment";


class ViewJourneys extends React.Component {
  
  constructor(props) {
    super(props);
    this.fetchJourneys = this.fetchJourneys.bind(this);
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
    .then( (journeyData) => console.log(journeyData) )
    .catch(err => console.log(err))
  };  // end of fetchJourneys


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