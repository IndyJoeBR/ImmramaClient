import React from 'react';
import {  Button, Card, CardTitle, CardSubtitle, 
          CardText, CardBody } from 'reactstrap';
import APIURL from "../helpers/environment";
import "../styles/MyJourneys.css"


class ViewChapters extends React.Component {

  constructor(props) {
    super(props);
  };    //  end of constructor

  componentDidMount() {
    console.log("View Chapters mounted.")
  };







  render () {

    console.log("**********   THIS IS THE VIEW CHAPTERS")
    console.log("this.user.isLoggedIn:", this.props.userIsLoggedIn);
    console.log("this.props.username: ", this.props.username);
    console.log("this.props.userIsAdmin?", this.props.userIsAdmin)

    return (
      <div>
          Here you can view all the chapters in a journey
      </div>

    );  //  end of return

  };  //  end of render


};  //  end of Auth class

export default ViewChapters;