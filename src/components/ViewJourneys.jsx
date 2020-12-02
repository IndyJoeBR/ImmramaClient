import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import APIURL from "../helpers/environment";


class ViewJourneys extends React.Component {
  
  constructor(props) {
    super(props);
    this.fetchJourneys = this.fetchJourneys.bind(this);
  };    //  end of constructor


  componentDidMount() {
    console.log("View Journeys mounted.")
    this.fetchJourneys();
    
  };



 // https://immramaserver.herokuapp.com/journey/getAllJourneys


//fetchJourneys(e) {
// console.log(e);
// e.preventDefault();

fetchJourneys() {


 fetch(`${APIURL}}/journey/getAllJourneys`, {
   method: 'GET',
   headers: new Headers({
     'Content-Type': 'application/json'
   }).then(response => response.json())
   .then(response => console.log(response))
   .catch(err => console.log(err))
 })
}


  render () {

    return (
      <div>
          Here you can view the journeys
          {this.props.journeyEndpoint}
      </div>

    );  //  end of return
  };  //  end of render
};  //  end of Auth class

export default ViewJourneys;