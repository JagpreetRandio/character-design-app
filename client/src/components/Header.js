import React, { useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import Auth from "../utils/auth";
// import '../assets/index.css'

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
        className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary"
      >
        <div className="bg-primary container-fluid d-flex justify-content-around align-items-baseline">
          <h1 className="bg-primary text-light" href="#">
            Characterize
          </h1>
          <h5 className="bg-primary text-info">
            ONE SITE FOR ALL YOUR CHARACTER'S DETAILS!
          </h5>
          {/* <Navbar.Toggle aria-controls="navbarNav" /> */}
          <Button
           className="btn btn-secondary my-2 my-sm-0"
            onClick={handleCreditsClick}
          >
            Credits
          </Button>
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
        </div>
      </Navbar>

      {showModal && (
        <div
          className="modal"
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
              className="modal-content bg-info border-50px border-dark padding-25px"
              style={{ width: "400px" }}
            >
              <h1 className="modal-title text-light bg-dark margin-25px">
                Characterize Credits
              </h1>
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
                  <p>--insert credits--</p>
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
                  <p>--insert credits--</p>
                </div>
                <a  className="text-light" href="https://github.com/JagpreetRandio" target=".">
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
