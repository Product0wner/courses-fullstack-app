import React, { Component } from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
  }

  render() {
    const {
        title,
        description,
        estimatedTime,
        materialsNeeded,
        errors,
    } = this.state;

    const { context } = this.props;
    const authUser = context.authenticatedUser;

    return (
      <div id="root">
        <div>
            <hr />
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                <div>
                    <Form
                        cancel={this.cancel}
                        errors={errors}
                        submit={this.submit}
                        submitButtonText="Create Course"
                        elements={() => (
                        <React.Fragment>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <input 
                                            id="title" 
                                            name="title" 
                                            type="text" 
                                            className="input-title course--title--input" 
                                            onChange={this.change} 
                                            placeholder="Course title..."
                                            value={title} />
                                    </div>
                                    <p>By {authUser.user.firstName} {authUser.user.lastName}</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <textarea 
                                            id="description" 
                                            name="description" 
                                            className="" 
                                            onChange={this.change} 
                                            placeholder="Course description..."
                                            value={description}>
                                        </textarea>
                                    </div>
                                </div>
                                </div>
                                <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <div>
                                            <input 
                                                id="estimatedTime" 
                                                name="estimatedTime" 
                                                type="text" 
                                                className="course--time--input"
                                                onChange={this.change} 
                                                placeholder="Hours" 
                                                value={estimatedTime} />
                                        </div>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        <div>
                                            <textarea 
                                                id="materialsNeeded" 
                                                name="materialsNeeded" 
                                                className="" 
                                                onChange={this.change} 
                                                placeholder="List materials..."
                                                value={materialsNeeded}>
                                            </textarea>
                                        </div>
                                    </li>
                                    </ul>
                                </div>
                            </div>         
                        </React.Fragment>
                    )} />
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

    // Send the course information to the API to create a course
    submit = () => {
        const { context } = this.props;
        const authUser = context.authenticatedUser;
        const userId = authUser.user.id;

        const {
            title,
            description,
            estimatedTime,
            materialsNeeded
        } = this.state;


        const course = {
            title,
            description,
            estimatedTime,
            materialsNeeded,
            userId
        };

         
        context.data.createCourse(course, authUser.user.emailAddress, authUser.password)
            .then( errors => {
                if (errors.length) {
                    this.setState({ errors });
                }
                else {
                    this.setState({ errors: [] });
                    this.props.history.push('/');
                }
            })
            .catch( err => {
                this.props.history.push('/error');
            });
    }

    // Cancel course creation and return user to the class index
    cancel = () => {
        this.props.history.push('/');
    }

    // Update state with course attributes
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

    this.setState(() => {
        return {
        [name]: value
        };
    });
  }
}