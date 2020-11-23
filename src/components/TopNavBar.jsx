import React from 'react';
import {   Collapse,
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



class TopNavBar extends React.Component {

  constructor (props) {
    super(props)
    this.toggleNavbar = this.toggleNavbar.bind(this);

    this.state = { navbarIsOpen: true };

  };  //  end of constructor


  toggleNavbar () {
    if(this.navbarIsOpen === true) {
      console.log("closing navbar");
      this.setState( {navbarIsOpen: false} );
    } else {
      this.setState( {navbarIsOpen: true} );
      console.log("opening navbar");
    }
  };


  render () {

    return (
      <div>
        <Navbar color="light" light expand="md" className="navbarBackground">
        <NavbarBrand href="/">Immrama</NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={this.state.navbarIsOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Journeys</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">My Journeys</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">Contact Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">About</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Account
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  Logout
                </DropdownItem>
                <DropdownItem>
                  Change Password
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
        </Navbar>
      </div>

    );  //  end of return

  };  //  end of render


};  //  end of Auth class

export default TopNavBar;