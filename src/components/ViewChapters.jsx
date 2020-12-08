import React from 'react';
import {  Button, Card, CardTitle, CardSubtitle, 
          CardText, CardBody } from 'reactstrap';
import APIURL from "../helpers/environment";
import "../styles/ViewChapters.css"


class ViewChapters extends React.Component {

  constructor(props) {
    super(props);
    this.autoFetchJourneysChapters = this.autoFetchJourneysChapters.bind(this);
    this.deleteThisChapter = this.deleteThisChapter.bind(this);
    this.forceRender = this.forceRender.bind(this);

    // TODO - also get the Journey Title & username for the headline
    this.state = {
      journeyToView: '',
      journeyToViewTitle: '',
      journeyToViewUsername: '',
      journeyToViewStart: '',
      journeyToViewEnd: '',
      deleteBtnStyle: false,
      switchViewChaptersOnOff: false,  // Used to open/close ViewChapters,
      allChapters: []
    };

  };    //  end of constructor

  // fetches all Chapters when page opens
  componentDidMount() {
    console.log("___ ViewChapters mounted ___")

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
    console.log("Re-render after chapter delete.")
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

    return (
      <div>

<h2>{this.state.journeyToViewTitle}</h2>
        <h4> {this.state.journeyToViewUsername} </h4>
        <h5>( {this.state.journeyToViewStart} to {this.state.journeyToViewEnd} )</h5>
        <Button color="warning" size="sm"
                onClick={ () => this.props.turnOFFViewChapters() }>
                Return to Journeys
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

                  {
                    this.props.userIsAdmin ?
                    <Button color="danger" size="sm" onClick={this.deleteThisChapter} value={pawpaw.id}>Delete</Button> :
                    <></>
                  }
                </CardBody>
              </Card>
            </div>
          )}


        <Button color="warning" size="sm"
                onClick={ () => this.props.turnOFFViewChapters() }>
                Return to Journeys
        </Button>


      </div>

    );  //  end of return

  };  //  end of render


};  //  end of Auth class

export default ViewChapters;