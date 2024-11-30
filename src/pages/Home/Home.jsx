
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import DarkMode from '../../Components/DarkMode/DarkMode';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../../Assets/avatars-U3ZEdhzmQ9KOlzVe-C0j7VA-t1080x1080.jpg';  

export default function Home({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();  
    navigate('/'); 
  };

  return (
    <div>
     
      <Navbar style={{ backgroundColor: 'grey' }} variant="dark" expand="lg" className="mb-4">
        <Container>
          
            <img
              src={logo} 
              alt="MyApp Logo"
              style={{ height: '50px',width:'90px' }}  
            />
          
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-center">
            <Nav className="d-flex justify-content-center w-100">
              <Nav.Link onClick={() => navigate('/home/upload')}>Upload</Nav.Link>
              <Nav.Link onClick={() => navigate('/home/show')}>Show</Nav.Link>
              <Nav.Link onClick={() => navigate('/home/map')}>map</Nav.Link>
          
            </Nav>
          </Navbar.Collapse>
          <div className="d-flex align-items-center">
            
            <div className="me-3">
              <DarkMode />
            </div>
            
            <Nav.Link
              onClick={handleLogout}
              style={{
                cursor: 'pointer',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              Logout
            </Nav.Link>
          </div>
        </Container>
      </Navbar>

      
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
