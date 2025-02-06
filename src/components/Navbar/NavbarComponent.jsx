import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavbarComponent.css'

function NavbarComponent ({resetView, onSearch}) {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
      setQuery(e.target.value);
      onSearch(e.target.value);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          if (query.trim()) { 
              onSearch(query);
          }
      }
    };

    const handleSearchClick = () => {
      if (query.trim()) { 
          onSearch(query);
      }
    };  

    return (
      <Navbar sticky="top" expand="lg" className="bg-dark navbar-dark ">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img
              src="/GameWeb.png"
              className="d-inline-block align-top custom-logo border-logo"
              alt="GameWeb Logo"
            />
          </Navbar.Brand>
          <Navbar.Brand href="#">GameWeb</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link className="menu-navbar" href="#home" onClick={resetView}>Home</Nav.Link>
              {/* <Nav.Link className="menu-navbar" href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link className="menu-navbar" href="#" disabled>
                Link
              </Nav.Link> */}
            </Nav>
            <Form className="search d-flex" onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                  type="text"
                  placeholder="Search..."
                  className="searchinput me-2"
                  aria-label="Search"
                  value={query}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
              />
              <Button type="button" className="searchbutton" onClick={handleSearchClick}></Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

export default NavbarComponent;

