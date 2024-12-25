import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="f-wrapper"style={{ background: '#0D091B' }}>
      <div className="paddings innerWidth flexCenter f-container">
        {/* left side */}
        <div className="flexColStart f-left">
          <img src="./Estlogo.png" alt="" width={120} />
          <span className="secondaryText">
            Our vision is to make all people <br />
            the best place to live for them.
          </span>
        </div>

        <div className="flexColStart f-right">
          <span className="primaryText">Information</span>
          <span className="secondaryText">SP-40, Arya Main Campus, ACE, Kukas, Jaipur 302038</span>
          <div className="flexCenter f-menu secondaryText">
            <span >Property</span>
            <span>Services</span>
            <span>Product</span>
            <span>About Us</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
