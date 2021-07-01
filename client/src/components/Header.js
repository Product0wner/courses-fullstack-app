import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends React.PureComponent {

    render() {
      const { context } = this.props;
      const authUser = context.authenticatedUser;
      return (
      <header>
        <div className="wrap header--flex">
          <h1 className="header--logo"><a href="/">Courses</a></h1>
          <nav>
            <React.Fragment>
              
              {(authUser
                ) ? (
                <ul className="header--signedin">
                  <li>{authUser.user.firstName}  <NavLink to="/signout">Log out</NavLink></li>
                </ul>
              ) : (
                <ul className="header--signedout">
                  <li><NavLink to="/signup">Sign Up</NavLink></li>
                  <li><NavLink to="/signin">Sign In</NavLink></li>
                </ul>
              )
              }

            </React.Fragment>
          </nav>
        </div>
      </header>
      );
    }
  };