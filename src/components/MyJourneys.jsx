import React from 'react';
import {  Button, Form, Input, Label, FormGroup, Card, CardTitle, CardSubtitle, CardText, CardBody } from 'reactstrap';
import APIURL from "../helpers/environment";
import "../styles/MyJourneys.css"

// *****  View Journeys requires no validation as it
//        is available to all logged in users and
//        only allows a user to read journeys.

class ViewMyJourneys extends React.Component {
  
  constructor(props) {
    super(props);
    this.createJourneySubmit = this.createJourneySubmit.bind(this);
    this.autoFetchUserJourneys = this.autoFetchUserJourneys.bind(this);
    this.editJourneyModal = this.editJourneyModal.bind(this);
    this.deleteMyJourney = this.deleteMyJourney.bind(this);
    this.forceRender = this.forceRender.bind(this);
    this.writeChapterModal = this.writeChapterModal.bind(this);
    


    this.state = {
      journeyTitle: '',
      journeyStartDate: null,
      journeyEndDate: '',
      journeyDesc: '',
      updateJourneyTitle: '',
      updateJourneyStartDate: null,
      updateJourneyEndDate: '',
      updateJourneyDesc: '',
      userJourneys: []
    };

  };    //  end of constructor

  //  *****     ON MOUNT - AUTO DISPLAYS USER'S CARDS      *****
  componentDidMount() {
    console.log("View My Journeys mounted.");
    this.autoFetchUserJourneys();
  };

    // **********   FORCE RE-RENDER   **********
  // This needed when a journey is CRUDed because no
  //    state variables are involved.
  forceRender() {
    this.autoFetchUserJourneys();
    console.log("---===< Re-render after CRUD. >===---")
  };



  // **********   OPEN WRITE CHAPTER MODAL   **********
  writeChapterModal() {
    console.log("Go here to open a modal and write a new chapter.");
  } //  end of writeChapterModal



  // **********   AUTO FETCH USER'S JOURNEYS ON-MOUNT   **********
  autoFetchUserJourneys () {

    let localStorageToken = localStorage.getItem('token');

    fetch(`${APIURL}/journey/getAllUsersJourneys`, {
      method: 'GET',
      headers: new Headers( {'Content-Type': 'application/json', 'Authorization': localStorageToken } )
    })
    .then( (response) => response.json() )
    .then( (journeys) => this.setState( {userJourneys : journeys} ) )
    .catch(err => console.log(err) )

  };  //  end of autoFetch


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
    .then( () => this.forceRender() )
    .catch( (error) => console.log(error) );

  };  //  end of createJourneySubmit



// **********  OPEN EDIT JOURNEY MODAL  **********
  editJourneyModal(event) {
    console.log("Updating user's journey")
  };  //  end of editJourneyModal




  // **********  DELETE USER'S JOURNEYS  **********
  deleteMyJourney(event) {
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

  };  //  end of delete my journey


/* ******************************************************************/
  render () {

    console.log("**********   THIS IS VIEW MY JOURNEYS")
    console.log("this.user.isLoggedIn:", this.props.userIsLoggedIn);
    console.log("Username: ", this.props.username);
    console.log("User is admin?", this.props.userIsAdmin)

    return (
      <div>

        <div> 
          {this.state.userJourneys.map ( (potato) =>
            <div>
              <Card className="journeyCard">
                <CardBody className="journeyCardBody">
                    <CardTitle  tag="h5">{potato.journeyTitle}</CardTitle>
                    <CardSubtitle tag="h6" className="mb-2 text-muted">{potato.JourneyUsername}</CardSubtitle>
                    <CardText>{potato.journeyStartDate.slice(0,9)}</CardText>
                    <CardText>{potato.journeyEndDate}</CardText>
                    <CardText>{potato.journeyDesc}</CardText>

                    <Button color="info" size="sm"
                            type="submit"
                            onClick={this.writeChapterModal} value={potato.id}>
                            Write Chapter
                    </Button>

                    <Button color="warning" size="sm"
                            type="submit"
                            onClick={this.editJourneyModal} value={potato.id}>
                            Edit Journey
                    </Button>

                    <Button color="danger" size="sm"
                            onClick={this.deleteMyJourney} value={potato.id}>
                            Delete Journey
                    </Button>

                </CardBody>
              </Card>
            </div>
          )}
        </div> 






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
                      onChange={ (event) => this.setState (
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
                      placeholder="When did you begin the journey: (yyyy-mm-dd required)?"
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
                      placeholder="When did/will your journey end?"
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
};  //  end of ViewMyJourneys class

export default ViewMyJourneys;



/*     *****   REACTSTRAP CARD    *****
  {this.state.userJourneys.map ( (potato) =>
    <div>
      <Card>
        <CardBody>
          <CardTitle tag="h5">{potato.journeyTitle}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">{potato.JourneyUsername}</CardSubtitle>
          <CardText>{potato.journeyStartDate.slice(0,9)}</CardText>
          <CardText>{potato.journeyEndDate}</CardText>
          <CardText>{potato.journeyDesc}</CardText>
          <Button color="warning" size="sm">Save</Button>
          <Button color="danger" size="sm">Delete</Button>
        </CardBody>
      </Card>
    </div>
  )}
*/
