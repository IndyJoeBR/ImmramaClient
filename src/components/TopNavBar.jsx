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
import { Link, Route, Switch, Redirect } from "react-router-dom";
import navbarLogo from '../styles/assets/ImmramaLogo.png';
import '../styles/TopNavBar.css'
import Auth from  '../auth/Auth';
import Home from "./Home";
import ViewJourneys from "./ViewJourneys";
import ViewMyJourneys from "./MyJourneys";
import About from '../sections/about';
import ContactUs from '../sections/contactUs';
import ViewChapters from "./ViewChapters";
import Account from "./Account";
import ChangePasswordModal from "./ChangePasswordModal";


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

    console.log("**********   THIS IS THE NAVBAR   **********")
    console.log("this.user.isLoggedIn:", this.props.userIsLoggedIn);
    console.log("this.props.username: ", this.props.username);
    console.log("this.props.userIsAdmin?", this.props.userIsAdmin)



    return (
      <div>
        <Navbar light expand="md" className="navbarBackground" >

        <NavbarBrand className="navbarBrandText">
          <img className="navbarLogo" src={navbarLogo} alt="lion rampant from illuminated manuscript" />
          Immrama</NavbarBrand>

          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={this.state.navbarIsOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <Button color="dark"><Link to="/">Home</Link></Button>{' '}
              </NavItem>
              <NavItem>
                <Button color="primary"><Link to="/ViewJourneys">Journeys</Link></Button>{' '}
              </NavItem>
              <NavItem>
                <Button color="primary"><Link to="/ViewMyJourneys">My Journeys</Link></Button>{' '}
              </NavItem>
              <NavItem>
                  <Button color="info"><Link to="/Sections/About">About</Link></Button>{' '}
              </NavItem>
              <NavItem>
                <Button color="info"><Link to="/Sections/ContactUs">Contact Us</Link></Button>{' '}
              </NavItem>
            </Nav>
            <UncontrolledDropdown inNavbar>

                  <DropdownToggle nav caret className="accountContainer" >
                    Account
                  </DropdownToggle>

                <DropdownMenu right>
                  <DropdownItem>
                    <Button color="danger" size="sm" onClick={this.immramaLogout} >Logout</Button>
                  </DropdownItem>
                  <DropdownItem>
                    <Button color="warning" size="sm" onClick={this.changeUserPassword} >Change Password</Button>
                  </DropdownItem>
                  <DropdownItem>
                  <Button color="warning" size="sm" ><Link to="/Account">Account Details</Link></Button>{' '}
                  </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
          </Collapse>
        </Navbar>


          <Redirect to="/" />
          <Switch>
            <Route exact path="/ViewJourneys">
              <ViewJourneys 
                userIsLoggedIn={this.props.userIsLoggedIn}
                username={this.props.username}
                userIsAdmin={this.props.userIsAdmin}
              />
            </Route>
            <Route exact path="/ViewMyJourneys">
              <ViewMyJourneys 
                userIsLoggedIn={this.props.userIsLoggedIn}
                username={this.props.username}
                userIsAdmin={this.props.userIsAdmin}
              />
            </Route>
            <Route exact path="/ViewChapters">
              <ViewChapters 
                userIsLoggedIn={this.props.userIsLoggedIn}
                username={this.props.username}
                userIsAdmin={this.props.userIsAdmin}
              />
            </Route>
            <Route exact path="/Sections/About">
              <About />
            </Route>
            <Route exact path="/Sections/ContactUs">
              <ContactUs />
            </Route>
            <Route exact path="/Account">
              <Account 
                userIsLoggedIn={this.props.userIsLoggedIn}
                username={this.props.username}
                userIsAdmin={this.props.userIsAdmin}
              />
            </Route>
            <Route exact path="/ChangePassword">
              <ChangePasswordModal 
                userIsLoggedIn={this.props.userIsLoggedIn}
                username={this.props.username}
                userIsAdmin={this.props.userIsAdmin}
              />
            </Route>
            <Route exact path="/">
              <Home 
                userIsLoggedIn={this.props.userIsLoggedIn}
                username={this.props.username}
                userIsAdmin={this.props.userIsAdmin}
              />
            </Route>
          </Switch>









      </div>

    );  //  end of return

  };  //  end of render


};  //  end of Auth class

export default TopNavBar;