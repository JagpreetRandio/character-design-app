import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import Auth from "../utils/auth";
import "../assets/css/header.css";

const Header = () => {
  // Define a state variable called showModal and initialize it to false
  const [showModal, setShowModal] = useState(false);

  // Function that sets the showModal state variable to true when called
  const handleCreditsClick = () => {
    setShowModal(true);
  };

  // Function that sets the showModal state variable to false when called
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to refresh the current page
  function refreshPage() {
    window.location.reload(false);
  }

  return (
    <>
      <Navbar className="navbar navbar-expand-lg justify-content-space-between fixed-top navbar-dark bg-primary">
        <div
          id="header"
          className="bg-primary container-fluid align-items-baseline justify-content-space-around"
        >
          <Navbar.Brand>
            <h1 className="bg-primary text-light" href="#">
              Characterize
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto justify-content-space-around">
              <h5 className="bg-primary text-info">
                ONE SITE FOR ALL YOUR CHARACTER'S DETAILS!
              </h5>
              {/* Button that calls handleCreditsClick function when clicked */}
              <Button
                className="btn btn-secondary my-2 my-sm-0"
                onClick={handleCreditsClick}
              >
                Credits
              </Button>

              {/* Button that calls Auth.logout function and refreshPage function when clicked */}
              <Button
                id="logoutBtn"
                className="btn btn-danger my-2 my-sm-0"
                onClick={() => {
                  Auth.logout();
                  refreshPage();
                }}
              >
                Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>

      {/* The modal that appears when showModal is true */}
      {showModal && (
        <div
          className="modal bg-info"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div
            className="modal-dialog"
            role="document"
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="modal-content bg-success border-50px border-dark padding-25px"
              style={{ width: "400px" }}
            >
              <h1 className="modal-title text-light bg-dark margin-25px">
                Characterize Credits
              </h1>

              {/* Button to close the modal that calls handleCloseModal function when clicked */}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              >
                <span aria-hidden="true"></span>
              </button>

              <div className="modal-body text-light justify-content-center">
                <div>
                  <h2 className="text-light">Rose Cassidy</h2>
                  <p>QUERIES, AUTHENTICATION, FRONT-END STYLE AND DESIGN, NEW CHARACTER FORM AND EDIT FORMS, LINKING FRONT AND BACK END</p>
                  <div>
                    <a
                      className="text-light"
                      href="https://github.com/rcass13"
                      target="."
                    >
                      Github
                    </a>
                  </div>
                  <div>
                    <a
                      className="text-light"
                      href="https://rose-cassidy-react-portfolio.herokuapp.com/"
                      target="."
                    >
                      Portfolio
                    </a>
                  </div>
                </div>
                <div>
                  <h2 className="text-light">Jagpreet Randio</h2>
                  <p>GRAPHQL BACK-END SETUP WITH RESOLVERS AND MODELS, CUSTOM FORM</p>
                </div>
                <a
                  className="text-light"
                  href="https://github.com/JagpreetRandio"
                  target="."
                >
                  Github
                </a>
                <div></div>
                <a className="text-light" href="--insert--" target=".">
                  Portfolio
                </a>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
