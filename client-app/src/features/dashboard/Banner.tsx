import React from "react";
import "./dashboard.css";
import MyTextInput from "../../app/common/form/MyTextInput";

export default function Banner() {
  return (
    <div className="welcome-message">
      <div className="banner">
        <div className="banner-content">
          <h1>Welcome to Bumipro</h1>
          <p>Your Hub for Property and Room Rentals</p>

          {/* <MyTextInput label="Address" name="address" /> */}
        </div>
      </div>
    </div>
  );
}
