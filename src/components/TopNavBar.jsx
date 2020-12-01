import React from 'react';
import {   Collapse,
  Button,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText } from 'reactstrap';
import About from '../sections/about';
import ContactUs from '../sections/contactUs';
import '../styles/TopNavBar.css'
import { Link, Route, Switch } from "react-router-dom";
import navbarLogo from '../styles/assets/ImmramaLogo.png';
import Auth from  '../auth/Auth';
import Home from "./Home";
import ViewJourneys from "./ViewJourneys";


class TopNavBar extends React.Component {

  constructor (props) {
    super(props)
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.immramaLogout = this.immramaLogout.bind(this);
    this.changeUserPassword = this.changeUserPassword.bind(this);

    this.state = { navbarIsOpen: true };

  };  //  end of constructor



  toggleNavbar () {
    this.setState( {navbarIsOpen: (!this.state.navbarIsOpen)} )

/*    if(this.navbarIsOpen === true) {
      console.log("closing navbar");
      this.setState( {navbarIsOpen: false} );
    } else {
      this.setState( {navbarIsOpen: true} );
      console.log("opening navbar");
    }
*/
  };


  immramaLogout() {
    console.log("Starting logout");
    localStorage.clear();
    this.props.setSessionToken(null);
    this.props.setUserIsLoggedIn(false);
    console.log("The state of sessionToken is now:", this.props.token);
    console.log("The state of userIsLoggedIn has been set to:", this.props.userIsLoggedIn);
    console.log("User is logged out.")
  };

  changeUserPassword() {
    console.log("Change password goes here - NO CODE - NOT FUNCTIONAL");
    // TODO  ---------  insert change password modal  ---------
  };

//  <Link to="/account"><NavLink className="NavLink" to="/account">Account</NavLink></Link>
//    or
//  
// Display component section
/*
  <Router>
  anything you want to show up (all your components and all)

    <Switch>
      <Route>
        <component props={props} />
      </Route>
      <Route>
        <component props={props} />
      </Route>
    </Switch>
  </Router>
*/

  render () {

    console.log("this.user.isLoggedIn:", this.props.userIsLoggedIn);
    console.log("Entering TopNavBar ternary.");

    return (
      <div>
        <Navbar light expand="md" className="navbarBackground" >

        <NavbarBrand href="/">
          <img className="navbarLogo" src={navbarLogo} alt="lion rampant from illuminated manuscript" />
          Immrama</NavbarBrand>
        {this.props.userIsLoggedIn ?
        <div>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.navbarIsOpen} navbar>
            <Nav className="mr-auto" navbar>
            <NavItem>
                <Button color="dark">Home</Button>{' '}
              </NavItem>
              <NavItem>
                <Link to="/Home">About</Link>
              </NavItem>
              <NavItem>
                <Button color="primary">Journeys</Button>{' '}
              </NavItem>
              <NavItem>
                <Link to="/ViewJourneys">About</Link>
              </NavItem>
              <NavItem>
                <Button color="primary">My Journeys</Button>{' '}
              </NavItem>
              <NavItem>
                <Link to="/ViewJourneys">My Journeys</Link>
              </NavItem>
              <NavItem>
                  <Button color="info">About</Button>{' '}
              </NavItem>
              <NavItem>
                <Link to="../sections/about">About</Link>
              </NavItem>
              <NavItem>
                <Button color="info">Contact Us</Button>{' '}
              </NavItem>
              <NavItem>
                <Link to="../sections/contactUs">Contact Us</Link>
              </NavItem>
            </Nav>
            <UncontrolledDropdown inNavbar>
                <Button color="success" size="sm" classname="btnAccount">
                  <DropdownToggle nav caret>
                    Account
                  </DropdownToggle>
                </Button>
                <DropdownMenu right>
                  <DropdownItem>
                    <Button color="danger" size="sm" onClick={this.immramaLogout} >Logout</Button>
                  </DropdownItem>
                  <DropdownItem>
                    <Button color="warning" size="sm" onClick={this.changeUserPassword} >Change Password</Button>
                  </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
          </Collapse>
        </div>
        : <Auth /> }
        </Navbar>

        <Switch>
          <Route exact path="/Home">
            <Home />
          </Route>
          <Route exact path="/ViewJourneys">
            <ViewJourneys journeyEndpoint={"/getAllJourneys"} />
          </Route>
          <Route exact path="/ViewJourneys">
            <ViewJourneys journeyEndpoint={"/getAllUsersJourneys/"+this.props.username} />
          </Route>
          <Route exact path="../sections/about">
            <About />
          </Route>
          <Route exact path="../sections/contactUs">
            <ContactUs />
          </Route>
        </Switch>



      </div>

    );  //  end of return

  };  //  end of render


};  //  end of Auth class

export default TopNavBar;