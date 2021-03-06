
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

//...rest is a collection of any props that get passed to component
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props => context.authenticatedUser? (
            <Component {...props} />
          ):
          (
            <Redirect to={{
              pathname: '/signin',
              state: { from: props.location }/**location prior to redirect */
            }} />
          )}
        />
      )}
    </Consumer>
  );
};
export default PrivateRoute;