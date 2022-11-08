// Import React
import React from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
  
// Import Custom CSS
import "./App.css";
import 'react-calendar/dist/Calendar.css';

// Import from react-router-dom
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Import other React Component
import CreateClient from "./Components/create-client.component";
import ClientList from "./Components/client-list.component";
import CreateAdmin from "./Components/create-administrator.component";
import AdminList from "./Components/admin-list.component";
import CreateEvent from "./Components/create-event.component";
import EventList from "./Components/event-list.component";

// App Component
const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand>
                i-Ticket
              </Navbar.Brand>
  
              <Nav className="justify-content-end">

                <Nav>
                  <Link to={"/"} 
                    className="nav-link">
                    Inicio
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/crear-cliente"} 
                    className="nav-link">
                    Registro (Cliente)
                  </Link>
                </Nav>
  
                <Nav>
                  <Link to={"/client-list"} 
                    className="nav-link">
                    Clientes
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/crear-admin"} 
                    className="nav-link">
                    Registro (Administrador)
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/admin-list"} 
                    className="nav-link">
                    Administradores
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/crear-evento"} 
                    className="nav-link">
                    Crear evento
                  </Link>
                </Nav>
                <Nav>
                  <Link to={"/listar-eventos"} 
                    className="nav-link">
                    Eventos
                  </Link>
                </Nav>
              </Nav>
            </Container>
          </Navbar>
        </header>
  
        <Container>
          <Row>
            <Col md={12}>
              <div className="wrapper">
                <Switch>
                  <Route exact path="/"/>
                  <Route path="/crear-cliente" component={CreateClient} />
                  <Route path="/client-list" component={ClientList} />
                  <Route path="/crear-admin" component={CreateAdmin} />
                  <Route path="/admin-list" component={AdminList} />
                  <Route path="/crear-evento" component={CreateEvent} />
                  <Route path="/listar-eventos" component={EventList} />
                </Switch>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </Router>
  );
};
  
export default App;