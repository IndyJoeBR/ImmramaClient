import React from 'react';
import { Button, Form, Input, Label, FormGroup } from 'reactstrap';
import APIURL from "../helpers/environment";

// *****  View Journeys requires no validation as it
//        is available to all logged in users and
//        only allows a user to read journeys.

class ViewMyJourneys extends React.Component {
  
  constructor(props) {
    super(props);
    this.fetchMyJourneys = this.fetchMyJourneys.bind(this);
    this.displayJourneyInCards = this.displayJourneyInCards.bind(this);
    this.createJourneySubmit = this.createJourneySubmit.bind(this);

    this.state = {
      journeyTitle: '',
      journeyStartDate: null,
      journeyEndDate: '',
      journeyDesc: ''
    };

  };    //  end of constructor

//  *****     NO CURRENT USE - DELETE IF UNUSED      *****
  componentDidMount() {
    console.log("View My Journeys mounted.");
    console.log(`${APIURL}`);
  };




// **********  GET ALL USER'S JOURNEYS  **********
 fetchMyJourneys(event) {
  event.preventDefault();

    let localStorageToken = localStorage.getItem('token');

    fetch(`${APIURL}/journey/getAllUsersJourneys`, {
      method: 'GET',
      headers: new Headers( {'Content-Type': 'application/json', 'Authorization': localStorageToken } )
    })
    .then( (response) => response.json() )
    .then( (journeys) => this.displayJourneyInCards(journeys) )
    .catch(err => console.log(err) )
  };  //  end of fetchJourneys


// **********  DISPLAY USER'S JOURNEYS ON CARDS  **********
  displayJourneyInCards(journeys) {
    console.log("Starting displayJourneyInCards");
    console.log("Journeys sent for display:", journeys);
    let numberofUsersJourneys = journeys.length;
    console.log("The length is: ", numberofUsersJourneys);

    if(numberofUsersJourneys === 0 ) {
      console.log("You have no Journeys recorded.")
    } else {
      for(let i = 0; i < numberofUsersJourneys; i++) {
        console.log("Journey: ", i);
        console.log("Journey Title: ",journeys[i].journeyTitle);
        console.log("Username: ",journeys[i].JourneyUsername);
        console.log("Dates: " + journeys[i].journeyStartDate + " - " + journeys[i].journeyEndDate);
        console.log("Journey Title: ",journeys[i].journeyDesc);
        console.log("__________________________________________")
      }
    }

  };  //  end of displayJourneyInCards



  // **********  CREATE A NEW JOURNEY  **********
  createJourneySubmit(event) {
    event.preventDefault();

    let journeyTitle = this.state.journeyTitle;
    let journeyStartDate = this.state.journeyStartDate;
    let journeyEndDate = this.state.journeyEndDate;
    let journeyDesc = this.state.journeyDesc;
    let localStorageToken = localStorage.getItem('token');

    console.log("Journey title is: ", journeyTitle);
    console.log("Journey start date is: ", journeyStartDate);
    console.log("Journey end date is: ", journeyEndDate);
    console.log("Journey desc is: ", journeyDesc);

    fetch(`${APIURL}/journey/journeyCreate`, {
      method: 'POST',
      headers: new Headers( {'Content-Type': 'application/json', 'Authorization': localStorageToken } ),
      body: JSON.stringify({ journey: { 
        journeyTitle: journeyTitle,
        journeyStartDate: journeyStartDate,
        journeyEndDate: journeyEndDate,
        journeyDesc: journeyDesc
      }}),
    })
    .then( (response) => response.json() )
    .then( (data) => console.log("New Journey:", data) )
    .catch( (error) => console.log(error) );

  };  //  end of createJourneySubmit



  render () {

    console.log("**********   THIS IS VIEW MY JOURNEYS   **********")
    console.log("this.user.isLoggedIn:", this.props.userIsLoggedIn);
    console.log("Username: ", this.props.username);
    console.log("User is admin?", this.props.userIsAdmin)



    return (
      <div>
          Here you can view YOUR journeys and create them here
          <Button color="primary" onClick={this.fetchMyJourneys} >Get My Journeys</Button>

        <div>
          <h3>Create a new journey here.</h3>
          <Form className="createJourneyForm" onSubmit={this.createJourneySubmit} type="submit">
            <FormGroup>
              <Label className="Label" htmlFor="journeyTitle">*Journey Title</Label>
              <Input  className="Input"
                      id="journeyTitle"
                      name="journeyTitle"
                      type="text"
                      placeholder="What is the title of your journey?"
                      value={this.state.journeyTitle}
                      onChange={
                        (event) => this.setState (
                          {journeyTitle: event.target.value}
                        )
                      }
              />
            </FormGroup>
            <FormGroup>
              <Label className="Label" htmlFor="journeyStartDate">*Start Date (yyyy-mm-dd)</Label>
              <Input  className="Input"
                      id="journeyStartDate"
                      name="journeyStartDate"
                      type="date"
                      placeholder="When did you begin the journey: yyyy-mm-dd (required)"
                      value={this.state.journeyStartDate}
                      onChange={
                        (event) => this.setState (
                          {journeyStartDate: event.target.value}
                        )
                      }
              />
            </FormGroup>
            <FormGroup>
              <Label className="Label" htmlFor="journeyEndDate">End Date (yyyy-mm-dd)</Label>
              <Input  className="Input"
                      id="journeyEndDate"
                      name="journeyEndDate"
                      type="date"
                      placeholder="When did your journey end? (yyyy-mm-dd)"
                      value={this.state.journeyEndDate}
                      onChange={
                        (event) => this.setState (
                          {journeyEndDate: event.target.value}
                        )
                      }
              />
            </FormGroup>
            <FormGroup>
              <Label className="Label" htmlFor="journeyDesc">*Journey Title</Label>
              <textarea rows="6" cols="50"
                      className="Input"
                      id="journeyDesc"
                      name="journeyDesc"
                      type="text"
                      placeholder="In <300 characters, describe the journey.  (You can tell the story itself later... in chapters."
                      value={this.state.journeyDesc}
                      onChange={
                        (event) => this.setState (
                          {journeyDesc: event.target.value}
                        )
                      }
              />
            </FormGroup>
            <p>* Fields are required.</p>
            <Button className="Button" type="submit">Start Journey</Button>

          </Form>
        </div>


      </div>

    );  //  end of return
  };  //  end of render
};  //  end of Auth class

export default ViewMyJourneys;