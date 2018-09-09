import React from "react";
import "./Nav.css";

const Nav = props => {
 
  return (
    <ul class="nav nav-tabs">
      <li
        role="presentation"
        className={props.activeclass==0?'active':null}
      >
        <a href="/Home">Home</a>
      </li>
      <li
        role="presentation"
        className={props.activeclass==1?'active':null}
      >
        <a href="/Saved">Saved</a>
      </li>
    </ul>
  );
};

export default Nav;
