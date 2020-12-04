import React from 'react';
import {  Button, Card, CardTitle, CardSubtitle, 
          CardText, CardBody } from 'reactstrap';
import APIURL from "../helpers/environment";
import "../styles/MyJourneys.css"

// *****  View Journeys requires no validation as it
//        is available to all logged in users and
//        only allows a user to read journeys.

class ViewJourneys extends React.Component {
  
  constructor(props) {
    super(props);
      this.autoFetchAllJourneys = this.autoFetchAllJourneys.bind(this);
      this.deleteThisJourney = this.deleteThisJourney.bind(this);
      this.forceRender = this.forceRender.bind(this);

    this.state = {
      deleteBtnStyle: false,
      allJourneys: []
    };

  };    //  end of constructor


  componentDidMount() {
    console.log("View All Journeys mounted.");
    this.autoFetchAllJourneys();  // fetches all Journeys when page opens
  };


  // **********   AUTO FETCH ALL JOURNEYS ON-MOUNT   **********
  autoFetchAllJourneys () {

    fetch(`${APIURL}/journey/getAllJourneys`, {
      method: 'GET',
      headers: new Headers( {'Content-Type': 'application/json'} )
      })
    .then( (response) => response.json() )
    .then( (journeys) => this.setState( {allJourneys : journeys} ) )
    .catch(err => console.log(err) )

  };  //  end of autoFetch for all journeys


  // **********   FORCE RE-RENDER   **********
  // This needed when a journey is CRUDed because no
  //    state variables are involved.
  forceRender() {
    this.autoFetchAllJourneys();
    console.log("Re-render after journey delete.")
  };


  // **********   DELETE JOURNEY   **********
  // ONLY available if userIsAdmin = true
  deleteThisJourney(event) {
    event.preventDefault();

    alert("You are about to Delete this journey.");

    let localStorageToken = localStorage.getItem('token');
    let journeyID = event.target.value;

    fetch(`${APIURL}/journey/smiteJourney/${journeyID}`, {
      method: 'DELETE',
      headers: new Headers( { 'Content-Type': 'application/json',
                              'Authorization': localStorageToken
      }),
    })
    .then( () => this.forceRender() )
  };

/* ******************************************************************/
  render () {

    console.log("**********   THIS IS VIEW ALL JOURNEYS   **********")
    console.log("this.user.isLoggedIn:", this.props.userIsLoggedIn);
    console.log("Username: ", this.props.username);
    console.log("User is admin?", this.props.userIsAdmin)


    return (
      <div>
          { this.state.allJourneys.map ( (potato) =>
            <div>
              <Card className="journeyCard">
                <CardBody className="journeyCardBody">
                  <CardTitle tag="h5">{potato.journeyTitle}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted">{potato.JourneyUsername}</CardSubtitle>
                  <CardText>{potato.journeyStartDate.slice(0,9)}</CardText>
                  <CardText>{potato.journeyEndDate}</CardText>
                  <CardText>{potato.journeyDesc}</CardText>
                  {
                    this.props.userIsAdmin ?
                    <Button color="danger" size="sm" onClick={this.deleteThisJourney} value={potato.id}>Delete</Button> :
                    <></>
                  }
                </CardBody>
              </Card>
            </div>
          )}
      </div>

    );  //  end of return
  };  //  end of render
};  //  end of ViewJourneys class

export default ViewJourneys;


/*
  
*/