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
    <div className="wrap">
        <h2>Create Course</h2>
        <Form
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Create Course"
            elements={() => (
                <React.Fragment>
                    <div className="main--flex">
                        <div>
                            <label>Course Title
                                <input 
                                    id="title" 
                                    name="title" 
                                    type="text" 
                                    onChange={this.change} 
                                    placeholder="Course title..."
                                    value={title} 
                                />
                            </label>
                            <p>By {authUser.user.firstName} {authUser.user.lastName}</p>
                            <label>Course Description
                                <textarea 
                                    id="description" 
                                    name="description" 
                                    className="" 
                                    onChange={this.change} 
                                    placeholder="Course description..."
                                    value={description}>
                                </textarea>
                            </label>
                        </div>
                        <div>
                            <label> Estimated Time
                                <input 
                                    id="estimatedTime" 
                                    name="estimatedTime" 
                                    type="text" 
                                    onChange={this.change} 
                                    placeholder="Hours" 
                                    value={estimatedTime} 
                                />
                            </label>
                        
                            <label> Materials Needed
                            <textarea 
                                    id="materialsNeeded" 
                                    name="materialsNeeded" 
                                    onChange={this.change} 
                                    placeholder="List materials..."
                                    value={materialsNeeded}>
                            </textarea>
                            </label>   
                        </div> 
                    </div>      
                </React.Fragment>                
                )} />
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