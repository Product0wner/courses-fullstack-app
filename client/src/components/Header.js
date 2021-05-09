import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends React.PureComponent {
    render() {
      return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo"><a>Courses</a></h1>
          <nav>
            <React.Fragment>
              <ul className="header--signedout">
                <li><NavLink to="/signup">Sign Up</NavLink></li>
                <li><NavLink to="/signin">Sign In</NavLink></li>
              </ul>
            </React.Fragment>
          </nav>
        </div>
      </header>
      );
    }
  };