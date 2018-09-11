import React from "react";
import "./Nav.css";

const Nav = props => {
  // console.log(props.saved);
  return (
    <ul className="nav nav-tabs">
      <li
        role="presentation"
        className={props.activeclass == 0 ? "active" : null}
      >
        <a href="/Home">Home</a>
      </li>
      <li
        role="presentation"
        className={props.activeclass == 1 ? "active" : null}
      >
        <a href="/Saved">Saved</a>
      </li>

      {/* <li role="presentation">
      
          <a
            type="button"
            class="btn btn-primary dropdown-toggle"
            id="dropdownMenuButton"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Notification <span class="badge badge-light">0</span>
          </a>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item" href="#">
              {props.saved}
            </a>
            <a class="dropdown-item" href="#">
              Another action
            </a>
            <a class="dropdown-item" href="#">
              Something else here
            </a>
          </div>
        
      </li> */}
      
    </ul>
  );
};

export default Nav;
