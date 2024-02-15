import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Container, Nav, Navbar } from "react-bootstrap";

//api.weatherapi.com/v1/forecast.json?key=895fb287bbeb4893b53113710231002&q=Cairo&days=8

const logo =
  "https://openweathermap.org/themes/openweathermap/assets/img/logo_white_cropped.png";

export default function NavBar() {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#202020" }}>
      <Container fluid>
        <Navbar.Brand href="#">
          <div className="Nav-logo">
            <img src={logo} alt="logo" />
          </div>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbarScroll"
          className="custom-toggler"
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <div className="a-container">
              <Nav.Link href="/#" style={{ color: "white" }}>
                Home
              </Nav.Link>
              <Nav.Link href="/#" style={{ color: "white" }}>
                News
              </Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
