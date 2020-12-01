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
import '../styles/TopNavBar.css'
import { Link } from "react-router-dom";
import navbarLogo from '../styles/assets/ImmramaLogo.png';
import navbarTiling from '../styles/assets/tile01.jpg';



class TopNavBar extends React.Component {

  constructor (props) {
    super(props)
    this.toggleNavbar = this.toggleNavbar.bind(this);
  //  this.immramaLogout = this.immramaLogout.bind(this);

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



  // immramaLogout() {
  //   localStorage.clear();
  //   // TODO -- clear the sessionToken from props (get it there first)
  //   console.log("User is logged out.")
  // };


  render (props) {

    return (
      <div>
        <Navbar light expand="md" className="navbarBackground" >

        <NavbarBrand href="/">
          <img className="navbarLogo" src={navbarLogo} alt="lion rampant from illuminated manuscript" />
          Immrama</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
        <Collapse isOpen={!this.state.navbarIsOpen} navbar>
          <Nav className="mr-auto" navbar>
          <NavItem>
              <Button color="dark">Home</Button>{' '}
            </NavItem>
            <NavItem>
              <Button color="primary">Journeys</Button>{' '}
            </NavItem>
            <NavItem>
              <Button color="primary">My Journeys</Button>{' '}
            </NavItem>
            <NavItem>

                <Button color="primary">My Journeys</Button>{' '}

            </NavItem>
            <NavItem>
              <Button color="info">About</Button>{' '}
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
                  <Button color="danger" size="sm" >Logout</Button>
                </DropdownItem>
                <DropdownItem>
                  Change Password
                </DropdownItem>
              </DropdownMenu>
          </UncontrolledDropdown>
        </Collapse>
        </Navbar>
      </div>

    );  //  end of return

  };  //  end of render


};  //  end of Auth class

export default TopNavBar;