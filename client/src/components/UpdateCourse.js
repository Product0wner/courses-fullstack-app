import React, { Component } from 'react';
import Form from './Form';


export default class UpdateCourse extends Component {
	state = {
		title: '',
		description: '',
		estimatedTime: '',
		materialsNeeded: '',
    userInfo: {},
		errors: [],
	};

  componentDidMount() {
    const { context } = this.props;
    const { match } = this.props;
    const authUser = context.authenticatedUser;

    //store existing course information
    context.data.getCourse(match.params.id)
    .then((course) => {
      this.setState({
        title: course.title, 
        description: course.description, 
        estimatedTime: course.estimatedTime, 
        materialsNeeded: course.materialsNeeded,
        userInfo: course.User,
      });
    })
		.catch(err => {
			this.props.history.push('/notfound');
			console.log(`error fetching individual route: ${err}`);
		});
  }

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userInfo,
      errors
    } = this.state;


    return(
      <div className="wrap">
        <h2>Update Course</h2>
        <Form 
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Update Course"
          elements={() => (
            <React.Fragment>
              <div className="main--flex">
                <div>
                  <label>Course Title
                    <input 
                      id="title" 
                      name="title" 
                      type="text"
                      value={title} 
                      onChange={this.change} />
                  </label>
                  <p>By </p>
                  <label>Course Description
                    <textarea 
                      id="description" 
                      name="description" 
                      type="text"
                      value={description} 
                      onChange={this.change} />
                  </label>
                </div>
                <div>
                  <label>Estimated Time
                    <input 
                      id="estimatedTime" 
                      name="estimatedTime" 
                      type="text"
                      value={estimatedTime || ''} 
                      onChange={this.change} />
                  </label>
                  <label>Materials Needed
                    <textarea 
                      id="materialsNeeded" 
                      name="materialsNeeded"
                      type="materialsNeeded"
                      value={materialsNeeded || ''} 
                      onChange={this.change} />
                  </label>
                </div>
              </div>
            </React.Fragment>
          )} />
        </div>
    );
  }
  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  }

  submit = () => {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    const { match } = this.props;

    const { 
      title, 
      description, 
      estimatedTime, 
      materialsNeeded,
      id
    } = this.state;

    //updated course info object using shorthand syntax
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      id
    };

    //update course
    console.log(match.params.id);
    console.log(authUser.user.emailAddress);
    console.log(authUser.password);
    context.data.updateCourse(course, match.params.id, authUser.user.emailAddress, authUser.password)
    .then(errors => {
      if(errors.length){
        this.setState({ errors });
      } else {
        console.log(`course updated: ${title}`);
        this.props.history.push(`/courses/${match.params.id}`);
      }
    })
    .catch(err => {
      //handle the rejected promise
      console.log(err);
      //redirect to error page by pushing to history stack
      this.props.history.push('/error');
    })
  }

  cancel = () => {
    const { match } = this.props;
    this.props.history.push(`/courses/${match.params.id}`);
  }

}