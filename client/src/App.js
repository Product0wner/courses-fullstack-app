import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import withContext from './Context';


import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';


const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);

const CreateCourseWithContext = withContext(CreateCourse);

export default () => (
  <Router>
    <div>
      <Header/>

      <Switch>
        <Route exact path="/" component= {CoursesWithContext}/>
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signup" component={UserSignUp} />
        <Route path="/course/create" component={CreateCourse} />

      </Switch>

    </div>
  </Router>
);
