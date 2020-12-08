import React from 'react';
import { Button, Form, Input, Label, FormGroup,
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
    this.handleChange = this.handleChange.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);

    this.editChapterModal = this.editChapterModal.bind(this);
    this.toggleChapterModal = this.toggleChapterModal.bind(this);
    this.saveChapterUpdate = this.saveChapterUpdate.bind(this);
    

  // **********>>>>>   FIX journeyToView   <<<<<******************  
    this.state = {
      journeyToView: '',
      journeyToViewTitle: '',
      journeyToViewUsername: '',
      journeyToViewStart: '',
      journeyToViewEnd: '',
      deleteBtnStyle: false,
      allChapters: [],

      chapterTitle: '',             // for creating a new chapter
      chapterDate: '',              //
      chapterShortDesc: '',         //
      chapterStory: '',             //
      imageForUpload: null,         //    for firebase upload
      chapterImage: '',             //    firebase url
      videoForUpload: null,         //    for firebase upload
      chapterVideo: '',             //    firebase url * not currently used * 
      switchMyChaptersOnOff: false, // Used to open/close MyChapters

      chapterIdToUpdate: '',        // Chapter data to display for update
      chapterTitleToUpdate: '',         //
      chapterDateToUpdate: '',          //
      chapterStoryToUpdate: '',         //
      chapterShortDescToUpdate: '',     //
      chapterImageToUpdate: '',         //
      chapterVideoToUpdate: '',         //
      // journeyId is taken from this.state.journeyToView
      // userId is taken from session validation
      chapterModalIsOpen: false,    // open/close edit chapter modal
      updatedChapterTitle: '',      // Chapter data for use in updating in modal
      updatedChapterDate: null,         //
      updatedChapterStory: '',          //
      updatedChapterShortDesc: '',      //           
      updatedChapterImage: null,        //
      updatedChapterVideo: ''           //    * not currently used *


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
  // Extracts current values for a Chapter's card and puts
  // them in a state variable to display in the edit modal
  // as a reference for the user of the current value
  editChapterModal(pawpawData) {
    console.log("___editChapterModal: extract current values to display in modal.___")

    //          DELETE THESE ONCE WORKING
    console.log("Chapter ID to update:", pawpawData.id);
    console.log("Chapter Title to update:", pawpawData.chapterTitle);
    console.log("Chapter Date to update:", pawpawData.chapterDate);
    console.log("Chapter Story to update:", pawpawData.chapterStory);
    console.log("Chapter ShortDesc to update:", pawpawData.chapterShortDesc);
    console.log("Chapter Image to update:", pawpawData.chapterImage);
    console.log("Chapter Video to update:", pawpawData.chapterVideo);
    console.log("Chapter journeyId to update:", pawpawData.journeyId);
    console.log("Chapter userId to update:", pawpawData.userId);
    //

    this.setState( { chapterIdToUpdate : pawpawData.id } );
    this.setState( { chapterTitleToUpdate : pawpawData.chapterTitle } );
    this.setState( { chapterDateToUpdate : pawpawData.chapterDate } );
    this.setState( { chapterStoryToUpdate : pawpawData.chapterStory } );
    this.setState( { chapterShortDescToUpdate : pawpawData.chapterShortDesc } );
    this.setState( { chapterImageToUpdate : pawpawData.chapterImage } );
    this.setState( { chapterVideoToUpdate : pawpawData.chapterVideo } );

    //          DELETE THESE ONCE WORKING
    console.log("This is the chapter data for the edit modal:  NO SHOW");
    console.log("Chapter ID:", this.state.chapterIdToUpdate);
    console.log("Chapter Title:", this.state.chapterTitleToUpdate);
    console.log("Chapter Date:", this.state.chapterDateToUpdate);
    console.log("Chapter Story:", this.state.chapterStoryToUpdate);
    console.log("Chapter ShortDesc:", this.state.chapterShortDescToUpdate);
    console.log("Chapter Image:", this.state.chapterImageToUpdate);
    console.log("Chapter Video:", this.state.chapterVideoToUpdate);
    //

    this.toggleChapterModal(); // toggles modal open
    console.log("The value of modal toggle is: ", this.state.chapterModalIsOpen);

  };  //  end of editChapterModal
    

// **********  TOGGLES chapterModalIsOpen true/false  **********
toggleChapterModal() {
  console.log("Toggling modal!");
  this.setState( { chapterModalIsOpen: (!this.state.chapterModalIsOpen) } );
  console.log("Modal is closed?:", this.state.chapterModalIsOpen);
};



//      **********  UPDATE USER'S JOURNEYS  **********
saveChapterUpdate(event) {
  event.preventDefault();
  console.log("___ saveChapterUpdate: Updating this chapter___");
  console.log(" * * * * *   NOT YET FUNCTIONAL  * * * * *");

  let chapterDate = '';  // declare for use in IF
  let chapterTitle = ''; // declare for use in IF
  let chapterImage = ''; // declare for use in IF
  let chapterVideo = ''; // declare for use in IF
  let localStorageToken = localStorage.getItem('token');

  let chapterId = this.state.updatedChapterVideo;
  
  // Chapter Title - (if blank, uses previous)
  if(this.state.updatedChapterTitle === '') {
    chapterTitle = this.state.chapterTitleToUpdate;
  } else {
    chapterTitle = this.state.updatedChapterTitle;
  };

  // Chapter Date - (if blank, inserts 'tbd')
  if (this.state.updatedChapterDate === '') {
    chapterDate = "tbd";
  } else {
    chapterDate = this.state.updatedChapterDate;
  };

  // Chapter Story - edit no currently supported (uses previous)
  let chapterStory = this.state.chapterStoryToUpdate;

  // Chapter Short Desc - edit no currently supported (uses previous)
  let chapterShortDesc = this.state.chapterShortDescToUpdate;

  // Chapter Image - uses URL from recently updated image
  if (this.state.updatedChapterImage === '') {
    chapterImage = this.state.chapterImageToUpdate;
  } else {
    chapterImage = this.state.updatedChapterImage;
  };

  // Chapter Video - uses previous if left
  if (this.state.updatedChapterVideo === '') {
    chapterVideo = this.state.chapterVideoToUpdate;
  } else {
    chapterVideo = this.state.updatedChapterVideo;
  };

  // uses journey ID from page; all chapters on page belong to it
  let journeyId = this.state.journeyToView;

  console.log("Chapter Update Data:")
  console.log("Chapter Id:", chapterId);
  console.log("Chapter Title:", chapterTitle);
  console.log("Chapter Date:", chapterDate);
  console.log("Chapter Story:", chapterStory);
  console.log("Chapter Short Desc:", chapterShortDesc);
  console.log("Chapter Image URL:", chapterImage);
  console.log("Chapter Video:", chapterVideo);
  console.log("Chapter's Journey ID:", journeyId);



  fetch(`${APIURL}/chapter/chapterUpdate/${chapterId}`, {
    method: 'PUT',
    headers: new Headers( { 'Content-Type': 'application/json',
                            'Authorization': localStorageToken } ),
    body: JSON.stringify({ chapter: { 
    chapterTitle: chapterTitle,
    chapterDate: chapterDate,
    chapterShortDesc: chapterShortDesc,
    chapterStory: chapterStory,
    chapterImage: chapterImage,
    chapterVideo: chapterVideo,
    journeyId: journeyId
    }}),
  })
  .then( (response) => response.json() )
  .then( (data) => console.log("Updated Chapter:", data) )
  .then( () => this.toggleChapterModal() )
  .then( () => this.forceRender() )
  .catch( (error) => console.log(error) );










};  //  end of saveChapterUpdate





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

    // IF modal is open, and image is uploaded, assumes new image
    // has been uploaded to update the image used in the chapter
    // and sets value to be used in the update to the chapterImage
    if (this.state.chapterModalIsOpen) {
      this.setState( { updatedChapterImage: this.state.chapterImage } );
    };

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

    console.log("This is the chapter data for the edit modal:  IS HERE?");
    console.log("Chapter ID:", this.state.chapterIdToUpdate);
    console.log("Chapter Title:", this.state.chapterTitleToUpdate);
    console.log("Chapter Date:", this.state.chapterDateToUpdate);
    console.log("Chapter Story:", this.state.chapterStoryToUpdate);
    console.log("Chapter ShortDesc:", this.state.chapterShortDescToUpdate);
    console.log("Chapter Image:", this.state.chapterImageToUpdate);
    console.log("Chapter Video:", this.state.chapterVideoToUpdate);


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
                  <CardText>{pawpaw.chapterStory}</CardText>
                  <div className="chapterImageContainer">
                    <img  className="chapterImage"
                          src={pawpaw.chapterImage}
                          alt="user upload image for chapter"
                          >
                          </img>
                  </div>
                  <CardText>{pawpaw.chapterVideo}</CardText>

                  <Button color="warning" size="sm"
                          onClick={() => this.editChapterModal(pawpaw)}
                  >       Edit Chapter
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
                        onChange={this.handleChange}
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






        <div className="chapterEditModal">
          <Modal  className="editChapteryModal"
                  isOpen={this.state.chapterModalIsOpen}
                  toggle={this.state.toggleChapterModal}
          >
            <ModalHeader toggle={this.toggleChapterModal}>
              Edit Chapter
            </ModalHeader>

            <ModalBody>
            <Form className="editJourneyForm"
                  onSubmit={this.saveChapterUpdate}
                  type="submit">

              <FormGroup>
                <Label  className="modalLabel"
                        htmlFor="editChapterTitle">
                        *Chapter Title
                </Label>
                <p className="editModalCurrentValue">Current: {this.state.chapterTitleToUpdate}</p>
                <Input  className="Input"
                        id="editChapterTitle"
                        name="editChapterTitle"
                        type="text"
                        value={this.state.updatedChapterTitle}
                        onChange={ (event) => this.setState (
                          {updatedChapterTitle: event.target.value}
                        )}
                />
              </FormGroup>

              <FormGroup>
                <Label  className="modalLabel"
                        htmlFor="editChapterDate">
                        *Chapter Date
                </Label>
                <p className="editModalCurrentValue">Current: {this.state.chapterDateToUpdate}</p>
                <Input  className="Input"
                          id="editChapterDate"
                          name="editChapterDate"
                          type="date"
                          value={this.state.updatedChapterDate}
                          onChange={ (event) => this.setState (
                              {updatedChapterDate: event.target.value}
                          )}
                />
                </FormGroup>


                <FormGroup>
                  <Label  className="modalLabel"
                          htmlFor="editChapterShortDesc">
                          Chapter Short Description
                  </Label>
                  <p className="editModalCurrentValue">Current: {this.state.chapterShortDescToUpdate}</p>
                  <textarea rows="2" cols="50"  
                          className="Input"
                          id="editChapterShortDesc"
                          name="editChapterShortDesc"
                          type="text"
                          placeholder="Edit Chapter Short Description is not currently available; planned for future implementation."
                  />
                </FormGroup>



                <FormGroup>
                  <Label  className="modalLabel"
                          htmlFor="editChapterStory">
                          Chapter Story
                  </Label>
                  <p className="editModalCurrentValue">Current: too long for display</p>
                  <textarea rows="2" cols="50"  
                          className="Input"
                          id="editChapterStor"
                          name="editChapterStor"
                          type="text"
                          placeholder="Edit Chapter Story is not currently available; planned for future implementation."
                  />
                </FormGroup>

                <FormGroup>
                  <Label  className="modalLabel"
                          htmlFor="editChapterImage">
                          Chapter Image
                  </Label>
                    <div className="editChapterImageContainer">
                      <img  className="chapterImageForEditing"
                            src={this.state.chapterImageToUpdate}
                            alt="previously uploaded image for chapter"
                            >
                            </img>
                    </div>
                  <Input  className="Input"
                          id="editChapterImage"
                          name="editChapterImage"
                          type="file"
                          onChange={ this.handleChange}
                  />
                  <Button onClick={this.handleImageUpload}>Upload Image</Button>
                  <p className="updateChapterImageNote">You still need to 'Save Updates' for the image URL to be updated.</p>

                </FormGroup>


                <FormGroup>
                  <Label  className="modalLabel"
                          htmlFor="editChapterVideo">
                          Chapter Video
                  </Label>
                  <Input  className="Input"
                        id="editChapterVideo"
                        name="editChapterVideo"
                        type="text"
                        placeholder="Edit Chapter Video is planned for future implementation."
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