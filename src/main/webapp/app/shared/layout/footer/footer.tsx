import './footer.scss';

import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';

const Footer = () => (
  // <div className="footer page-content">
  //   <Row>
  //     <Col md="12">
  //       <p>
  //         <Translate contentKey="footer">Your footer</Translate>
  //       </p>
  //     </Col>
  //   </Row>
  // </div>

  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <p className="col-md-4 mb-0 text-muted">Copyright © {new Date().getFullYear()} FlankX</p>

    <a
      href="/"
      className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
    >
      <svg className="bi me-2" width="40" height="32">
        <use href="#bootstrap"></use>
      </svg>
    </a>

    <ul className="nav col-md-4 justify-content-end">
      <li className="nav-item">
        <a href="#" className="nav-link px-2 text-muted">
          Home
        </a>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link px-2 text-muted">
          Features
        </a>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link px-2 text-muted">
          Pricing
        </a>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link px-2 text-muted">
          FAQs
        </a>
      </li>
      <li className="nav-item">
        <a href="#" className="nav-link px-2 text-muted">
          About
        </a>
      </li>
    </ul>
  </footer>
);

export default Footer;
