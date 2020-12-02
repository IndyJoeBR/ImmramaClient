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
  };    //  end of constructor


  componentDidMount() {
    console.log("View MyJourneys mounted.");
  };




  render () {

    return (
      <div>
          Here you a user can view their own journeys, create and add to them
          {this.props.journeyEndpoint}
          <Button color="primary" onClick={this.fetchJourneys} >Get My Journeys</Button>
      </div>

    );  //  end of return
  };  //  end of render
};  //  end of Auth class

export default ViewJourneys;