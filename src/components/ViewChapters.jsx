import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import APIURL from "../helpers/environment";


class ViewChapters extends React.Component {

  constructor(props) {
    super(props);
  };    //  end of constructor


  componentDidMount() {
    console.log("View Chapters mounted.")
  };

  render () {

    return (
      <div>
          Here you can view all the chapters in a journey
      </div>

    );  //  end of return

  };  //  end of render


};  //  end of Auth class

export default ViewChapters;