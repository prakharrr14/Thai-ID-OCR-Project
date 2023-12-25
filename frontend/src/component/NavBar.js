import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Thai OCR App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/logs">Logs</Nav.Link>
            <NavDropdown title="Citizens Details" id="basic-nav-dropdown">
              <NavDropdown.Item href="/citizens/show">Show</NavDropdown.Item>
              <NavDropdown.Item href="/citizens/update">
                Update
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/citizens/delete">
                Delete
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;