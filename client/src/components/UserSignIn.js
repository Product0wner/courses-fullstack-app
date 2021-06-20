import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
                <label>Email Address
                  <input 
                    id="emailAddress" 
                    name="emailAddress" 
                    type="text"
                    value={emailAddress} 
                    onChange={this.change} 
                    placeholder="Email Address" />
                </label>
                <label>Password
                  <input 
                    id="password" 
                    name="password"
                    type="password"
                    value={password} 
                    onChange={this.change} 
                    placeholder="Password" /> 
                </label>               
              </React.Fragment>
            )} />
          <p>
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
          </p>
        </div>
      </div>
    );
  }

  // Update user attributes stored in state
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  // Sign in user with attributes stored in state
  submit = () => {
    const { context } = this.props;
    const { from } = this.props.location.state || { from: { pathname: '/' }};
    const { emailAddress, password } = this.state;
    context.actions.signIn(emailAddress, password)
    .then( user => {
        if (user === null) {
          this.setState(() => {
            return {errors: [ 'Sign-in was unsuccessful' ]};
          })
        } 

        else {
          this.props.history.push(from);
          console.log(`SUCCESS ${emailAddress} is now signed in`);
        }
      })

    .catch( err => {
      if (!emailAddress) {
        this.setState(() => {
          return {errors: [ 'You need to provide an email address' ]};
        })
      } else {
        this.setState(() => {
          return {errors: [ 'Sign-in was unsuccessful' ]};
        })
      }
    })
  }

  // Cancel sign in and return to index page
  cancel = () => {
    this.props.history.push('/');
  }
}