import React from 'react';
import { Container, Row, Col } from 'reactstrap';



class ViewJourneys extends React.Component {
  
  constructor(props) {
    super(props);
  };    //  end of constructor


  // fetchJourneys(e) {
  //   console.log(e);                 // logs event

  //   e.preventDefault();


  //  // https://immramaserver.herokuapp.com/journey/getAllJourneys

  
  //   fetch(`${APIURL}/journey/getAllJourneys`, {
  //     method: 'GET',
  //     headers: new Headers ({ 'Content-Type': 'application/json' })

  //   });  //  End of Fetch results

  // }}

fetchJourneys(e) {
 console.log(e);
 e.preventDefault();

 fetch(`${APIURL}}/journey/getAllJourneys`, {
   method: 'GET',
   headers: new Headers({
     'Content-Type': 'application/json'
   }).then(res => res.json())
   .then(res => console.log(res))
   .catch(err => console.log(err))
 })
}


  render () {

    return (
      <div>
          Here you can view the journeys
      </div>

    );  //  end of return

  };  //  end of render


};  //  end of Auth class

export default ViewJourneys;