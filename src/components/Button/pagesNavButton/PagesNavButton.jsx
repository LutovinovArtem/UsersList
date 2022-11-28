import React from "react";
import { Link } from "react-router-dom";

export const PagesNavButton = ({ buttonText, goTo }) => {
  return (
    <Link to={goTo}>
      <button type="button"> {buttonText} </button> 
    </Link>
  );
};
