import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';


export default class CourseDetail extends Component {
	state = {
		course: {},
		userInfo: {}
	};
    componentDidMount(){
		const { context } = this.props;
		const { match } = this.props;

		context.data.getCourse(match.params.id)
		.then((course) => {
			this.setState({ 
				course,
				userInfo: course.userId
			});
			console.log(this.state.course.userId)
		})
		.catch(err => {
			this.props.history.push('/notfound');
			console.log(`error fetching individual route: ${err}`);
		});
	}    
	render() {
		const { course, userInfo } = this.state;
    	const { context } = this.props;

		return (
			<React.Fragment>
				<div className="actions--bar">
					<div className="wrap">
						<React.Fragment>
							<Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
							<Link className="button" to="/" onClick={() => this.deleteCourse()}>Delete Course</Link>
							<Link className="button" to="/">Return to List</Link>
						</React.Fragment>
						<React.Fragment>
							<Link className="button" to="/">Return to List</Link>
						</React.Fragment>
					 </div>
				</div>
				<div className="wrap">
					<h2>Course Detail</h2>
						<form>
							<div className="main--flex">
								<div>
									<h3 className="course--detail--title">Course</h3>
									<h4 className="course--name">{course.title}</h4>
									<p>By {userInfo.firstName} {userInfo.lastName}</p>
									<ReactMarkdown children={course.description} />
								</div>
								<div>
									<h3 className="course--detail--title">Estimated Time</h3>
									<p>{course.estimatedTime}</p>
									<h3 className="course--detail--title">Materials Needed</h3>
									<ReactMarkdown className="course--detail--list" children={course.materialsNeeded} />
								</div>
							</div>
						</form>
					</div>
					
			</React.Fragment>
			
		);
	}
}