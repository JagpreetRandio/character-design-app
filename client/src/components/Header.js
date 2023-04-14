import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import Auth from "../utils/auth";


const Header = () => {

  const [showModal, setShowModal] = useState(false);

  const handleCreditsClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

function refreshPage() {
  window.location.reload(false);
  
}

// return(
//   <>
//   <Nav className="navbar navbar-expand-lg text-dark bg-light">
//   <h1>Hi</h1>
//   </Nav>
//   </>
// )

  
  return (
    <>
    
      <Navbar
        id="homepageNavbar"
        className="navbar navbar-expand-lg navbar-dark bg-primary"
      >
        <div className="bg-primary container-fluid">
          <h1 className="bg-primary text-light" href="#">
            Characterize
          </h1>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse className="bg-primary" id="navbarNav">
            <Nav className="mr-auto">
              <Nav.Link className="text-light bg-primary nav-link-expand" href="#">
                CREATE!
              </Nav.Link>
              <Nav.Link
                className=" nav-link-expand text-light bg-primary"
                onClick={handleCreditsClick}
              >
                Credits
              </Nav.Link>
              <Button
                id="logoutBtn"

                className="btn btn-secondary my-2 my-sm-0" 
                onClick={() => Auth.logout()}>

                className="btn btn-primary" 
                onClick={refreshPage}>

              
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      {showModal && (
        <div
          className="modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content padding-10px">
             
                <h1 className="modal-title text-light bg-dark padding-10px">Characterize Credits</h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                >
                  <span aria-hidden="true"></span>
                </button>
             
              <div className="modal-body ">
                <div>
                  <h2 className="text-dark">Rose Cassidy</h2>
                  <p>--insert credits--</p>
                  <div>
                  <a  href="https://github.com/rcass13" target=".">Github</a>
                  </div>
                  <div>
                  <a  href="https://rose-cassidy-react-portfolio.herokuapp.com/" target=".">Portfolio</a>
                  </div>
                </div>
                <div>
                  <h2 className="text-dark">Jagpreet Randio</h2>
                  <p>--insert credits--</p>
                    </div>
                    <a  href="https://github.com/JagpreetRandio" target=".">Github</a>
                  <div>
                  </div>
                    <a  href="--insert--" target=".">Portfolio</a>
                  <div>
                </div>
              </div>
                <button
                  type="button"
                  className="btn btn-secondary margin-10px"
                  data-bs-dismiss="modal"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;