import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Redirect } from 'react-router-dom';



export default class CourseDetail extends Component {
	state = {
		title: '',
        estimatedTime: '',
        description: '',
        materialsNeeded: '',
        id: '',
        userId: '',
        firstName: '',
        lastName: ''
	};
    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(`http://localhost:5000/api/courses/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data) {
                this.setState({
                    title: data.title,
                    estimatedTime: data.estimatedTime,
                    description: data.description,
                    materialsNeeded: data.materialsNeeded,
                    id: data.id,
                    userId: data.userId,
                }) }
                // redirect to notfound page if the requested course isn't returned from the REST API
                else {
                    this.props.history.push('/notfound')
                };
        	})
            .catch(err => { 
                console.log('Error fetching and parsing data', err);
        	});
    };  
	render() {
		const {
            title,
            estimatedTime,
            description,
            materialsNeeded,
            id,
            userId
            } = this.state;
        const { context } = this.props;
        const authUser = context.authenticatedUser;


		return (
			<main>
            <div className="actions--bar">
                <div className="wrap"> 
                {(authUser && authUser.user.id === userId
                ) ? (
                    <React.Fragment>
                        <Link className="button button-secondary" to="/">Return to List</Link>
                        <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                        <Link className="button" onClick={this.deleteCourse} to="/">Delete Course</Link>
                    </React.Fragment>
                ) : (
                    <Link className="button button-secondary" to="/">Return to List</Link>
                )}  
                </div>
            </div>

            <div className="wrap">
            <h2>Course Detail</h2>
            <form>
                <div className="main--flex">
                    <div>
                        <h3 className="course--detail--title">Course</h3>
                        <h4 className="course--name">{title}</h4>
                        <ReactMarkdown>
                        {description}
                        </ReactMarkdown>

                    </div>
                    <div>
                        <h3 className="course--detail--title">Estimated Time</h3>
                        <p>{estimatedTime}</p>

                        <h3 className="course--detail--title">Materials Needed</h3>
                        <ul className="course--detail--list">
                        <ReactMarkdown>
                        {materialsNeeded}
                        </ReactMarkdown>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
        </main>
			
		);
	}
	deleteCourse = () => {
		const { context } = this.props;
        const authUser = context.authenticatedUser;
        const userId = authUser.user.id;

		const {
			title,
			description,
			estimatedTime,
			materialsNeeded,
            id
		} = this.state;

		const course = {
			title,
			description,
			estimatedTime,
			materialsNeeded,
            id,
			userId
		};

		context.data.deleteCourse(course, authUser.user.emailAddress, authUser.password)
		.then(errors => {
			if(errors.length){
				this.setState({ errors })
			} else {
				console.log(`course deleted`);
				this.props.history.go(0)
                ;
			}
		})
    	.catch(err => {
			console.log(err);
			this.props.history.push('/error');
            
    	});
	}
}