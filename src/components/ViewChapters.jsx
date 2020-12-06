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
      journeyToView: 34,      // hard coded for functionality
      deleteBtnStyle: false,
      allChapters: []
    };

  };    //  end of constructor

  // fetches all Chapters when page opens
  componentDidMount() {
    console.log("View Chapters mounted.")
    this.autoFetchJourneysChapters(this.state.journeyToView);
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

        <h2>Journey Title Here</h2>
        <h4>(Journey Author Here)</h4>

          { this.state.allChapters.map ( (pawpaw) =>
            <div>
              <Card className="chapterCard">
                <CardBody className="chapterCardBody">
                  <CardTitle tag="h5">{pawpaw.chapterTitle}</CardTitle>
                  <CardSubtitle tag="h6" className="mb-2 text-muted" >{pawpaw.chapterShortDesc}</CardSubtitle>
                  <CardText>{pawpaw.chapterDate.slice(0,9)}</CardText>
                  <CardText>{pawpaw.chapterImage}</CardText>
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



      </div>

    );  //  end of return

  };  //  end of render


};  //  end of Auth class

export default ViewChapters;