import React from 'react';
import {  Button, Form, Input, Label, FormGroup,
          Card, CardTitle, CardSubtitle, CardText, CardBody, 
          Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import APIURL from "../helpers/environment";
import "../styles/MyJourneys.css"
import { Link, Route, Switch } from "react-router-dom";
import ViewMyChapters from "./MyChapters";

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
    this.toggleModal = this.toggleModal.bind(this);
    this.saveJourneyUpdate = this.saveJourneyUpdate.bind(this);
    this.collectDataForMyJourneys = this.collectDataForMyJourneys.bind(this);


    this.state = {
      journeyTitle: '',                       // Journey data for CREATE
      journeyStartDate: null,                     //
      journeyEndDate: '',                         //
      journeyDesc: '',                            //
      journeyIdToUpdate: '',                  // Journey data to display for update
      journeyTitleToUpdate: '',                   //
      journeyStartDateToUpdate: '',               //
      journeyEndDateToUpdate: '',                 //
      journeyJourneyDescToUpdate: '',             //
      modalClosed: false,                     // open/close edit journey modal
      updatedJourneyTitle: '',                 // Journey data for use in updating in modal
      updatedJourneyStartDate: null,               //
      updatedJourneyEndDate: '',                   //
      updatedJourneyDesc: '',                      // - not currently used -
      journeyUsernameForMyJourneys: '',       // Journey data to send to My Chapters
      journeyTitleForMyJourneys: '',              //  
      journeyIdForMyJourneys: '',                 //
      journeyStartDateForMyJourneys: '',          //  
      journeyEndDateForMyJourneys: '',            //
      userJourneys: []                        // for the cards .map method
    };

  };    //  end of constructor

  //  *****     ON MOUNT - AUTO DISPLAYS USER'S CARDS      *****   -=> COMPLETE <=-
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


  // **********   AUTO FETCH USER'S JOURNEYS ON-MOUNT   **********   -=> COMPLETE <=-
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


  // **********  CREATE A NEW JOURNEY  **********   -=> COMPLETE <=-
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


    // Clears fields in Create Journey form after use
    this.setState( { journeyTitle: '' } );
    this.setState( { journeyStartDate: '' } );
    this.setState( { journeyEndDate: '' } );
    this.setState( { journeyDesc: '' } );



  };  //  end of createJourneySubmit





  //      **********  OPEN EDIT JOURNEY MODAL  **********
  // Extracts current values for a Journey's card and puts
  // them in a state variable to display in the edit modal
  // as a reference for the user of the current value
  editJourneyModal(potato) {

    console.log("___editJourneyModal: extract current values to display in modal.___")

    //               DELETE THESE ONCE WORKING
    console.log("Journey ID to update:", potato.id);
    console.log("Journey title to update:", potato.journeyTitle);
    console.log("Journey start to update:", potato.journeyStartDate);
    console.log("Journey end to update:", potato.journeyEndDate);
    console.log("Journey end to update:", potato.journeyDesc);
    //


    this.setState( { journeyIdToUpdate: potato.id } );
    this.setState( { journeyTitleToUpdate: potato.journeyTitle } );
    this.setState( { journeyStartDateToUpdate: potato.journeyStartDate } );
    this.setState( { journeyEndDateToUpdate: potato.journeyEndDate } );
    this.setState( { journeyJourneyDescToUpdate: potato.journeyDesc } );


    //               DELETE THESE ONCE WORKING
    console.log("These are probably blank because of being SLOW!!!!")
    console.log("Journey ID state update:", this.state.journeyIdToUpdate);
    console.log("Journey Title state update:", this.state.journeyTitleToUpdate);
    console.log("Journey Start state update:", this.state.journeyStartDateToUpdate);
    console.log("Journey End state update:", this.state.journeyEndDateToUpdate);
    console.log("Journey Desc state update:", this.state.journeyJourneyDescToUpdate);
    //


    this.toggleModal(); // toggles modal open
    console.log("The value of modal toggle is: ", this.state.modalClosed);

  };  //  end of editJourneyModal




  // **********  TOGGLES modalClosed true/false  **********   -=> COMPLETE <=-
  toggleModal() {
    console.log("Toggling modal!");
    this.setState( { modalClosed: (!this.state.modalClosed) } );
    console.log("Modal is closed?:", this.state.modalClosed);
  };


  //      **********  UPDATE USER'S JOURNEYS  **********
  saveJourneyUpdate(event) {
    event.preventDefault();
    console.log("___ saveJourneyUpdate: Updating user's journey___");

    let journeyEndDate = '';  // declare for use in IF
    let localStorageToken = localStorage.getItem('token');

    let journeyId = this.state.journeyIdToUpdate;
    let journeyTitle = this.state.updatedJourneyTitle;
    let journeyStartDate = this.state.updatedJourneyStartDate;

    if (this.state.updatedJourneyEndDate) {
      journeyEndDate = this.state.updatedJourneyEndDate;
    } else {
      journeyEndDate = "tbd";
    }

    //  NOTE: journeyDesc updates using ONLY the original data - no edits
    let journeyDesc = this.state.journeyJourneyDescToUpdate;

    //    ***   DELETE THESE ONCE UPDATE IS FUNCTIONING   ***
    console.log("Journey ID for update:", journeyId);
    console.log("Journey Title for update:", journeyTitle);
    console.log("Journey Start for update:", journeyStartDate);
    console.log("Journey End for update:", journeyEndDate);
    console.log("Journey Desc for update:", journeyDesc);


    fetch(`${APIURL}/journey/journeyUpdate/${journeyId}`, {
      method: 'PUT',
      headers: new Headers( { 'Content-Type': 'application/json',
                              'Authorization': localStorageToken } ),
      body: JSON.stringify({ journey: { 
        journeyTitle: journeyTitle,
        journeyStartDate: journeyStartDate,
        journeyEndDate: journeyEndDate,
        journeyDesc: journeyDesc
      }}),
    })
    .then( (response) => response.json() )
    .then( (data) => console.log("Updated Journey:", data) )
    .then( () => this.toggleModal() )
    .then( () => this.forceRender() )
    .catch( (error) => console.log(error) );

    // Clears current and updated fields in modal
    this.setState( { journeyIdToUpdate: '' } );
    this.setState( { journeyTitleToUpdate: '' } );
    this.setState( { journeyStartDateToUpdate: '' } );
    this.setState( { journeyEndDateToUpdate: '' } );
    this.setState( { journeyJourneyDescToUpdate: '' } );

    this.setState( { updatedJourneyTitle: '' } );
    this.setState( { updatedJourneyStartDate: '' } );
    this.setState( { updatedJourneyEndDate: '' } );
    this.setState( { updatedJourneyDesc: '' } );




    // TODO .then( () => this.toggleModal() );
    //this.toggleModal(); // toggles modal open
    console.log("The value of modal toggle is: ", this.state.modalClosed);

    // TODO .then( () => this.forceRender() );
    //this.autoFetchUserJourneys();


  };  //  end of this.saveJourneyUpdate


  //     **********  DATA TO PASS TO VIEW JOURNEY'S CHAPTERS  **********
  collectDataForMyJourneys(journeyData) {
    console.log("Attaching journey data to state variables for My Chapters");

    let id = journeyData.id;
    let title = journeyData.journeyTitle;
    let username = journeyData.JourneyUsername;
    let startDate = journeyData.journeyStartDate.slice(0,9);
    let endDate = journeyData.journeyEndDate;
    
    this.setState( {journeyIdForMyJourneys: id } );
    this.setState( {journeyTitleForMyJourneys: title } );
    this.setState( {journeyUsernameForMyJourneys: username } );
    this.setState( {journeyStartDateForMyJourneys: startDate } );
    this.setState( {journeyEndDateForMyJourneys: endDate } );
  } //  end of collectDataForMyJourneys




  // **********  DELETE USER'S JOURNEYS  **********   -=> COMPLETE <=-
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

    // ANY/ALL OF THIS CAN BE DELETED WHEN NO LONGER IN USE
    console.log("**********   THIS IS VIEW MY JOURNEYS")
    console.log("this.user.isLoggedIn:", this.props.userIsLoggedIn);
    console.log("this.props.username: ", this.props.username);
    console.log("this.props.userIsAdmin?", this.props.userIsAdmin)

    console.log("Journey data to send to My Chapters")
    console.log(this.state.journeyData);
    console.log(this.state.journeyIdForMyJourneys);
    console.log(this.state.journeyTitleForMyJourneys);
    console.log(this.state.journeyUsernameForMyJourneys);
    console.log(this.state.journeyStartDateForMyJourneys);
    console.log(this.state.journeyEndDateForMyJourneys);

    console.log("Journey data from the modal to update FINALLY UPDATED!!!:")
    console.log("Journey ID state update:", this.state.journeyIdToUpdate);
    console.log("Journey Title state update:", this.state.journeyTitleToUpdate);
    console.log("Journey Start state update:", this.state.journeyStartDateToUpdate);
    console.log("Journey End state update:", this.state.journeyEndDateToUpdate);
    console.log("Journey Desc state update:", this.state.journeyJourneyDescToUpdate);

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
                            value={potato.id}
                            onClick={() => this.collectDataForMyJourneys(potato)}
                    >
                      <Link to="/ViewMyChapters">
                          View Chapters
                      </Link>
                    </Button>

                    <Button color="warning" size="sm"
                            onClick={() => this.editJourneyModal(potato)}
                    >       Edit Journey
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
              <Label className="Label" htmlFor="journeyDesc">*Journey Description</Label>
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


        <div>
          <Modal isOpen={this.state.modalClosed} toggle={this.state.toggleModal} className="editJourneyModal">
            <ModalHeader toggle={this.toggleModal}>Edit Journey</ModalHeader>
            <ModalBody>
              <Form className="editJourneyForm" onSubmit={this.saveJourneyUpdate} type="submit">
                
                <FormGroup>
                  <Label  className="modalLabel"
                          htmlFor="editJourneyTitle">
                          *Journey Title
                  </Label>
                  <p className="editModalCurrentValue">Current: {this.state.journeyTitleToUpdate}</p>
                  <Input  className="Input"
                          id="editJourneyTitle"
                          name="editJourneyTitle"
                          type="text"
                          value={this.state.updatedJourneyTitle}
                          onChange={ (event) => this.setState (
                              {updatedJourneyTitle: event.target.value}
                            )
                          }
                  />
                </FormGroup>

                <FormGroup>
                  <Label  className="modalLabel"
                          htmlFor="editJourneyStartDate">
                          *Journey Start Date
                  </Label>
                  <p className="editModalCurrentValue">Current: {this.state.journeyStartDateToUpdate}</p>
                  <Input  className="Input"
                          id="editJourneyStartDate"
                          name="editJourneyStartDate"
                          type="date"
                          value={this.state.updatedJourneyStartDate}
                          onChange={ (event) => this.setState (
                              {updatedJourneyStartDate: event.target.value}
                            )
                          }
                  />
                </FormGroup>

                <FormGroup>
                  <Label  className="modalLabel"
                          htmlFor="editJourneyEndDate">
                          Journey End Date
                  </Label>
                  <p className="editModalCurrentValue">Current: {this.state.journeyEndDateToUpdate}</p>
                  <Input  className="Input"
                          id="editJourneyEndDate"
                          name="editJourneyEndDate"
                          type="date"
                          value={this.state.updatedJourneyEndDate}
                          onChange={ (event) => this.setState (
                              {updatedJourneyEndDate: event.target.value}
                            )
                          }
                  />
                </FormGroup>

                <FormGroup>
                  <Label  className="modalLabel"
                          htmlFor="editJourneyDesc">
                          Journey Description
                  </Label>
                  <p className="editModalCurrentValue">Current: {this.state.journeyJourneyDescToUpdate}</p>
                  <textarea rows="3" cols="50"  
                          className="Input"
                          id="editJourneyDesc"
                          name="editJourneyDesc"
                          type="text"
                          placeholder="Edit Journey Description is not currently available."
                  />
                </FormGroup>

                <Button className="Button" color="primary" type="submit">Save Updates</Button>{' '}

              </Form>
            </ModalBody>

            <ModalFooter>
              <p className="modalFooterText">* Fields are required - may not be updated to blank.</p>
            </ModalFooter>


          </Modal>
        </div>


        <Switch>
            <Route exact path="/ViewMyChapters">
              <ViewMyChapters 
                userIsLoggedIn={this.props.userIsLoggedIn}
                username={this.props.username}
                userIsAdmin={this.props.userIsAdmin}
                journeyToView={this.state.journeyToView}
              />
            </Route>
          </Switch>




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
