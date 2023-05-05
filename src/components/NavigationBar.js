import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const NavigationBar = () => {
    return (
        <Navbar fixed="top" style={{ backgroundColor: '#fafcfe' }}>
        <Container>
          <Navbar.Brand href="/">Crosswords</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">List</Nav.Link>
            <Nav.Link href="/create">Create</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    );
}

export default NavigationBar;