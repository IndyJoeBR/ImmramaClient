import React from 'react';
import { Container, Row, Col, Button, Form, Input, Label, FormGroup,
  Card, CardTitle, CardSubtitle, CardText, CardBody, 
  Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import APIURL from "../helpers/environment";
import { storage } from "../Firebase";
import "../styles/MyChapters.css"


class ViewMyChapters extends React.Component {

  constructor(props) {
    super(props);

    this.forceRender = this.forceRender.bind(this);
    this.autoFetchJourneysChapters = this.autoFetchJourneysChapters.bind(this);
    this.deleteThisChapter = this.deleteThisChapter.bind(this);
    this.createChapterSubmit = this.createChapterSubmit.bind(this);
    this.editChapterModal = this.editChapterModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    

  // **********>>>>>   FIX journeyToView   <<<<<******************  
  // TODO - also get the Journey Title & username for the headline
    this.state = {
      journeyToView: '',
      journeyToViewTitle: '',
      journeyToViewUsername: '',
      journeyToViewStart: '',
      journeyToViewEnd: '',
      deleteBtnStyle: false,
      modalClosed: false,
      allChapters: [],
      chapterTitle: '',             // for creating a new chapter
      chapterDate: '',              //
      chapterShortDesc: '',         //
      chapterStory: '',             //
      imageForUpload: null,         //    for firebase upload
      chapterImage: '',             //    firebase url
      videoForUpload: null,         //    for firebase upload
      chapterVideo: '',             //    firebase url
      switchMyChaptersOnOff: false  // Used to open/close MyChapters
    };


  } //  end of constructor

  //  *****     ON MOUNT - AUTO DISPLAYS USER'S CARDS      *****
  componentDidMount() {
    console.log("___ MyChapters Mounted ___");
    console.log("userIsLoggedIn:", this.props.userIsLoggedIn);
    console.log("username:", this.props.username);
    console.log("userIsAdmin:", this.props.userIsAdmin);
    console.log("This is the journeyToView:", this.state.journeyToView);
    console.log("This is journeyToView props: ", this.props.journeyToViewId);

    this.setState( { journeyToView : this.props.journeyToViewId });
    this.setState( { journeyToViewTitle : this.props.journeyToViewTitle });
    this.setState( { journeyToViewUsername : this.props.journeyToViewUsername });
    this.setState( { journeyToViewStart : this.props.journeyToViewStart });
    this.setState( { journeyToViewEnd : this.props.journeyToViewEnd });
    
    this.autoFetchJourneysChapters(this.props.journeyToViewId);
  };

    // **********   FORCE RE-RENDER   **********
  // This needed when a journey is CRUDed because no
  //    state variables are involved.
  forceRender() {
    this.autoFetchJourneysChapters(this.state.journeyToView);
    console.log("---===< Re-render after CRUD. >===---")
  };

  // **********   AUTO FETCH ALL JOURNEYS CHAPTERS On-MOUNT   **********
  autoFetchJourneysChapters(journeyID) {

    let localStorageToken = localStorage.getItem('token');

    fetch(`${APIURL}/chapter/getAllJourneysChapters/${journeyID}`, {
      method: 'GET',
      headers: new Headers( {'Content-Type': 'application/json',
                             'Authorization': localStorageToken
      }),
    })
    .then( (response) => response.json() )
    .then( (chapters) => this.setState( {allChapters : chapters} ) )
    .catch(err => console.log(err) )
  };  //  end of autoFetchJourneysChapters


  // **********  CREATE NEW CHAPTER FOR THIS JOURNEY  **********
  createChapterSubmit(event) {
    event.preventDefault();

    // userId is taken from validate session
    let journeyId = this.state.journeyToView;
    let chapterTitle = this.state.chapterTitle;
    let chapterDate = this.state.chapterDate;
    let chapterShortDesc = this.state.chapterShortDesc;
    let chapterStory = this.state.chapterStory;
    let chapterImage = this.state.chapterImage;
    let chapterVideo = this.state.chapterVideo;
    let localStorageToken = localStorage.getItem('token');  // token from localstorage
    
    console.log("Ready to create a new chapter.");
    console.log("journeyId:", journeyId);
    console.log("chapterTitle:", chapterTitle);
    console.log("chapterDate:", chapterDate);
    console.log("chapterShortDesc:", chapterShortDesc);
    console.log("chapterStory:", chapterStory);
    console.log("chapterImage:", chapterImage);
    console.log("chapterVideo:", chapterVideo);


    fetch(`${APIURL}/chapter/chapterCreate`, {
      method: 'POST',
      headers: new Headers( {'Content-Type': 'application/json', 'Authorization': localStorageToken } ),
      body: JSON.stringify({ chapter: { 
        journeyId: journeyId,
        chapterTitle: chapterTitle,
        chapterDate: chapterDate,
        chapterShortDesc: chapterShortDesc,
        chapterStory: chapterStory,
        chapterImage: chapterImage,
        chapterVideo: chapterVideo
      }}),
    })
    .then( (response) => response.json() )
    .then( (data) => console.log("New Chapter:", data) )
    .then( () => this.forceRender() )
    .catch( (error) => console.log(error) );
  
  };  //  end of createChapterSubmit


  // **********  OPEN EDIT CHAPTER MODAL  **********
  editChapterModal(data) {
    console.log("Updating user's journey");

    // let editDataJourneyID = data.id;
    // let editDataJourneyTitle = data.journeyTitle;
    // let editDataJourneyStartDate = data.journeyStartDate;
    // let editDataJourneyEndDate = data.journeyEndDate;
    // let editDataJourneyDesc = data.journeyDesc;
    
    // console.log(data);
    // console.log(editDataJourneyID);
    // console.log(editDataJourneyTitle);
    // console.log(editDataJourneyStartDate);
    // console.log(editDataJourneyEndDate);
    // console.log(editDataJourneyDesc);

    // this.setState( {journeyIdToUpdate: editDataJourneyID} );
    // this.setState( {journeyTitleToUpdate: editDataJourneyTitle} );
    // this.setState( {journeyStartDateToUpdate: editDataJourneyStartDate} );
    // this.setState( {journeyEndDateToUpdate: editDataJourneyEndDate} );
    // this.setState( {journeyJourneyDescToUpdate: editDataJourneyDesc} );

    // console.log("This is in the object to use for data to update:")
    // console.log("This is updateJourneyDate.journeyIdToUpdate:", this.state.journeyIdToUpdate);
    // console.log("This is updateJourneyData.journeyTitleToUpdate:", this.state.journeyTitleToUpdate);
    // console.log("This is updateJourneyData.journeyStartDateToUpdate:", this.state.journeyStartDateToUpdate);
    // console.log("This is updateJourneyData.journeyEndDateToUpdate:", this.state.journeyEndDateToUpdate);
    // console.log("This is updateJourneyData.journeyJourneyDescToUpdate:", this.state.journeyJourneyDescToUpdate);




    this.toggleModal(); // toggles modal open
    console.log("The value of modal toggle is: ", this.state.modalClosed);

  };  //  end of editChapterModal
    

  // **********  TOGGLES modalClosed true/false  **********
  toggleModal() {
    console.log("Toggling modal!");
    this.setState( { modalClosed: (!this.state.modalClosed) } );
    console.log("Modal is closed?:", this.state.modalClosed);
  };


  // handles change in image state for image upload
  handleChange(event) {
    if (event.target.files[0]) {      // only chooses the first file of mutliple attempts
      console.log("-----------Image handleChange engaged!--------------");
      this.setState( { imageForUpload: event.target.files[0] } );
    }
  };

  // handles image upload to firebase
  handleImageUpload() {
    let image = this.state.imageForUpload;
    console.log("-------------handleImageUpload engaged!--------------");
    console.log("--------image:", image);

    // in upload task; using 'storage' from firebase, creates new folder (images) and uses
    //   the image.name as the base of the URL, then will then PUT (upload) the image (data)
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",                  // a required note
      snapshot => {},                   // upload progress (used for progress bar)
      error => { console.log(error) },  // catches any error
      () => {                           // IF successful,
        storage                         // storing
          .ref("images")                // references back to /images on firebase
          .child(image.name)            // it looks for the name on the image
          .getDownloadURL()             // it gets the download URL
          .then(url => {                // THEN... takes the URL it just acquired
            console.log(url);           // and logs it to the console
            this.setState( { chapterImage: url } );
          });
      }
    )

  };  //  end of handleImageUpload





  // **********   DELETE CHAPTER   **********
  deleteThisChapter(event) {
    event.preventDefault();

    alert("You are about to Delete this chapter.");

    let localStorageToken = localStorage.getItem('token');
    let chapterID = event.target.value;

    fetch(`${APIURL}/chapter/smitechapter/${chapterID}`, {
      method: 'DELETE',
      headers: new Headers( { 'Content-Type': 'application/json',
                              'Authorization': localStorageToken
      }),
    })
    .then( () => this.forceRender() )
  };


/* ******************************************************************/
  render () {

    console.log("**********   THIS IS THE VIEW CHAPTERS")
    console.log("this.user.isLoggedIn:", this.props.userIsLoggedIn);
    console.log("this.props.username: ", this.props.username);
    console.log("this.props.userIsAdmin?", this.props.userIsAdmin);
    console.log("this.state.journeyToView:", this.state.journeyToView);
    console.log("this.props.journeyToView?", this.props.journeyToView);
    console.log("These are the chapters:", this.state.allChapters);
    console.log("This is all of state from MyJourneys:", this.props.state);
    console.log("This is all props:", this.props);


    return (
      <div>

        <h2>{this.state.journeyToViewTitle}</h2>
        <h4> {this.state.journeyToViewUsername} </h4>
        <h5>( {this.state.journeyToViewStart} to {this.state.journeyToViewEnd} )</h5>
        <Button color="warning" size="sm"
                onClick={ () => this.props.turnOFFMyChapters() }>
                Return to My Journeys
        </Button>

          { this.state.allChapters.map ( (pawpaw) =>
            <div>
              <Card className="chapterCard">
                <CardBody className="chapterCardBody">
                  <CardTitle tag="h5">{pawpaw.chapterTitle}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted" >{pawpaw.chapterShortDesc}</CardSubtitle>
                  <CardText>{pawpaw.chapterDate.slice(0,9)}</CardText>
                  <div className="chapterImageContainer">
                    <img  className="chapterImage"
                          src={pawpaw.chapterImage}
                          alt="user upload image for chapter"
                          >
                          
                          </img>
                  </div>
                  <CardText>{pawpaw.chapterStory}</CardText>
                  <CardText>{pawpaw.chapterVideo}</CardText>

                  <Button color="warning" size="sm"
                          onClick={() => this.editChapterModal(pawpaw)}
                  >       Edit Journey
                  </Button>

                  <Button color="danger" size="sm" onClick={this.deleteThisChapter} value={pawpaw.id}>Delete</Button>

                </CardBody>
              </Card>
            </div>
          )}


          <h3>Create a new chapter here.</h3>
          <div className="createJourneyBody">
            
            <Form className="createChapterForm" onSubmit={this.createChapterSubmit} type="submit">

              <FormGroup>
                <Label className="Label" htmlFor="chapterTitle">*Chapter Title</Label>
                <Input  className="Input"
                        id="chapterTitle"
                        name="chapterTitle"
                        type="text"
                        placeholder="What is the title of this chapter?"
                        value={this.state.chapterTitle}
                        onChange={ (event) => this.setState (
                            {chapterTitle: event.target.value}
                          )
                        }
                />
              </FormGroup>

              <FormGroup>
                <Label className="Label" htmlFor="chapterDate">*Chapter Date</Label>
                <Input  className="Input"
                        id="chapterDate"
                        name="chapterDate"
                        type="date"
                        placeholder="On what day did this chapter take place? (yyyy-mm-dd required)"
                        value={this.state.chapterDate}
                        onChange={
                          (event) => this.setState (
                            {chapterDate: event.target.value}
                          )
                        }
                />
              </FormGroup>

              <FormGroup>
                <Label className="Label" htmlFor="chapterShortDesc">*Chapter Short Description</Label>
                <textarea rows="6" cols="50"
                        className="Input"
                        id="chapterShortDesc"
                        name="chapterShortDesc"
                        type="text"
                        placeholder="In <300 characters, describe the chapter.  (This can be a short summary or even just be a chapter number.)"
                        value={this.state.chapterShortDesc}
                        onChange={
                          (event) => this.setState (
                            {chapterShortDesc: event.target.value}
                          )
                        }
                />
              </FormGroup>

              <FormGroup>
                <Label className="Label" htmlFor="chapterStory">*Chapter Story</Label>
                <textarea rows="10" cols="120"
                        className="Input"
                        id="chapterStory"
                        name="chapterStory"
                        type="text"
                        placeholder="Relate the story here in under 3000 characters.  (On average that is about 500 words or one page.)"
                        value={this.state.chapterStory}
                        onChange={
                          (event) => this.setState (
                            {chapterStory: event.target.value}
                          )
                        }
                />
              </FormGroup>

              <FormGroup>
                <Label className="Label" htmlFor="chapterImage">Chapter Image</Label>
                <Input  className="Input"
                        id="chapterImage"
                        name="chapterImage"
                        type="file"
                        onChange={ this.handleChange}
                />
                <Button onClick={this.handleImageUpload}>Upload Image</Button>

              </FormGroup>

              <FormGroup>
                <Label className="Label" htmlFor="chapterVideo">Chapter Video</Label>
                <Input  className="Input"
                        id="chapterVideo"
                        name="chapterVideo"
                        type="text"
                        placeholder="Video Not Currently Supported - But feel free use it for URL for storage."
                        value={this.state.chapterVideo}
                        onChange={ (event) => this.setState (
                            {chapterVideo: event.target.value}
                          )
                        }
                />
              </FormGroup>



              <p>* Fields are required.</p>
              <Button className="Button" type="submit">Record Chapter</Button>

            </Form>

          </div>

        <Button color="warning" size="sm"
                onClick={ () => this.props.turnOFFMyChapters() }>
                Return to My Journeys
        </Button>



      </div>


    );  //  end of return
  };  //  end of render
};  //  end of Auth class

export default ViewMyChapters;




// ************   OLD CODE STORAGE   ****************

// Original image input field
{/* <Input  className="Input"
                        id="chapterImage"
                        name="chapterImage"
                        type="file"
                        placeholder="An image uploaded for this chapter."
                        value={this.state.chapterImage}
                        onChange={ (event) => this.setState (
                            {chapterImage: event.target.value}
                          )
                        }
                />
                 */}