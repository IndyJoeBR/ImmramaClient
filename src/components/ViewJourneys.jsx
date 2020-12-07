import React from 'react';
import {  Button, Card, CardTitle, CardSubtitle, 
          CardText, CardBody } from 'reactstrap';
import APIURL from "../helpers/environment";
import "../styles/MyJourneys.css"
import { Link, Route, Switch } from "react-router-dom";
import ViewChapters from "./ViewChapters";

// *****  View Journeys requires no validation as it
//        is available to all logged in users and
//        only allows a user to read journeys.

class ViewJourneys extends React.Component {
  
  constructor(props) {
    super(props);
      this.autoFetchAllJourneys = this.autoFetchAllJourneys.bind(this);
      this.deleteThisJourney = this.deleteThisJourney.bind(this);
      this.forceRender = this.forceRender.bind(this);
      this.collectDataForViewChapters = this.collectDataForViewChapters.bind(this);
      this.turnOFFViewChapters = this.turnOFFViewChapters.bind(this);


    this.state = {
      deleteBtnStyle: false,
      journeyToView: 9,     // FIX THIS - SHOULD BE SET from potato.id
      journeyIdForViewChapters: '',           // Journey data to send to My Chapters
      journeyTitleForViewChapters: '',          //  
      journeyUsernameForViewChapters: '',       // 
      journeyStartDateForViewChapters: '',      //  
      journeyEndDateForViewChapters: '',        //
      allJourneys: []
    };

  };    //  end of constructor

  // fetches all Journeys when page opens
  componentDidMount() {
    console.log("View All Journeys mounted.");
    this.autoFetchAllJourneys();  
  };


  // **********   FORCE RE-RENDER   **********
  // This needed when a journey is CRUDed because no
  //    state variables are involved.
  forceRender() {
    this.autoFetchAllJourneys();
    console.log("Re-render after journey delete.")
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





  

//     **********  DATA TO PASS TO VIEW CHAPTERS  **********
collectDataForViewChapters(journeyData) {
  console.log("Attaching journey data to state variables for My Chapters");

  this.setState( {switchViewChaptersOnOff: true } );

  let id = journeyData.id;
  let title = journeyData.journeyTitle;
  let username = journeyData.JourneyUsername;
  let startDate = journeyData.journeyStartDate.slice(0,9);
  let endDate = journeyData.journeyEndDate;

  console.log("collectDataForViewChapters: id for My Chapters", id);
  
  this.setState( {journeyIdForViewChapters: id } );
  this.setState( {journeyTitleForViewChapters: title } );
  this.setState( {journeyUsernameForViewChapters: username } );
  this.setState( {journeyStartDateForViewChapters: startDate } );
  this.setState( {journeyEndDateForViewChapters: endDate } );
} //  end of collectDataForViewChapters


// **** MyChapters OFF Switch to pass to MyChapters
turnOFFViewChapters() {
  this.setState( {switchViewChaptersOnOff: false } );
};









//  BROKEN... need to pass journeyToView as PROPS
  // **********   READ JOURNEY'S CHAPTERS   **********
  readChapters(event) {
    this.setState( { journeyToView: event.target.value } );
  } //  end of readChapters












  

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
    console.log("this.props.username: ", this.props.username);
    console.log("this.props.userIsAdmin?", this.props.userIsAdmin);
    console.log("this.state.journeyToView:", this.state.journeyToView);

    console.log("Journey data to send to My Chapters")
    console.log(this.state.journeyIdForViewChapters);
    console.log(this.state.journeyTitleForViewChapters);
    console.log(this.state.journeyUsernameForViewChapters);
    console.log(this.state.journeyStartDateForViewChapters);
    console.log(this.state.journeyEndDateForViewChapters);


    return this.state.switchViewChaptersOnOff ?
    
    <ViewChapters 
                userIsLoggedIn={this.props.userIsLoggedIn}
                username={this.props.username}
                userIsAdmin={this.props.userIsAdmin}

                journeyToViewId={this.state.journeyIdForViewChapters}
                journeyToViewTitle={this.state.journeyTitleForViewChapters}
                journeyToViewUsername={this.state.journeyUsernameForViewChapters}
                journeyToViewStart={this.state.journeyStartDateForViewChapters}
                journeyToViewEnd={this.state.journeyEndDateForViewChapters}
                turnOFFViewChapters={this.turnOFFViewChapters}
              /> :

    
    (
      <div>
          { this.state.allJourneys.map ( (potato) =>
            <div>
              <Card className="journeyCard">
                <CardBody className="journeyCardBody">
                  <CardTitle tag="h5">{potato.journeyTitle}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted" >{potato.JourneyUsername}</CardSubtitle>
                  <CardText>{potato.journeyStartDate.slice(0,9)}</CardText>
                  <CardText>{potato.journeyEndDate}</CardText>
                  <CardText>{potato.journeyDesc}</CardText>

                  <Button color="info" size="sm"
                            value={potato.id}
                            onClick={() => this.collectDataForViewChapters(potato)}
                    > View Chapters
                    </Button>

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



//  Original routing switch for ViewChapters
/*
          <Switch>
            <Route exact path="/ViewChapters">
              <ViewChapters 
                userIsLoggedIn={this.props.userIsLoggedIn}
                username={this.props.username}
                userIsAdmin={this.props.userIsAdmin}
                journeyToView={this.state.journeyToView}
              />
            </Route>
          </Switch>
*/