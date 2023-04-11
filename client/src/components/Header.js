import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";


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
        className="navbar navbar-expand-lg text-dark bg-light"
      >
        <div className="bg-light container-fluid">
          <h1 className="bg-light" href="#">
            Characterize
          </h1>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse className="bg-light" id="navbarNav">
            <Nav className="bg-light mr-auto">
              <Nav.Link className="bg-light text-dark nav-link-expand" href="#">
                CREATE!
              </Nav.Link>
              <Nav.Link
                className="bg-light nav-link-expand"
                onClick={handleCreditsClick}
              >
                Credits
              </Nav.Link>
              <Button
                id="logoutBtn"
                className="btn btn-secondary my-2 my-sm-0" 
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
            <div className="modal-content">
              <div className="modal-header text-dark bg-light">
                <h5 className="modal-title bg-light">Characterize Credits</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                >
                  <span aria-hidden="true"></span>
                </button>
              </div>
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
              <div className="modal-footer text-dark bg-light">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;