// Import React
import React from "react";

// Import Bootstrap
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
  
// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Import other React Component
import CreateClient from "./Components/create-client.component";
import EditClient from "./Components/edit-client.component";
import ClientList from "./Components/client-list.component";

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
                  <Link to={"/crear-cliente"} 
                    className="nav-link">
                    Inicio
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/crear-cliente"} 
                    className="nav-link">
                    Eventos
                  </Link>
                </Nav>

                <Nav>
                  <Link to={"/crear-cliente"} 
                    className="nav-link">
                    Crear cliente
                  </Link>
                </Nav>
  
                <Nav>
                  <Link to={"/client-list"} 
                    className="nav-link">
                    Lista de clientes
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
                  <Route exact path="/" component={CreateClient} />
                  <Route path="/crear-cliente" component={CreateClient} />
                  <Route path="/edit-client/:id" component={EditClient} />
                  <Route path="/client-list" component={ClientList} />
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