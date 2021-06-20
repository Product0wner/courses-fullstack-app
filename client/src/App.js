import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';


import Header from './components/Header';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';
import UserSignOut from './components/UserSignOut';


const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const HeaderWithContext = withContext(Header)

const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);


const UserSignInWithContext = withContext(UserSignIn);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignOutWithContext = withContext(UserSignOut);

export default () => (
  <Router>
    <div>
      <HeaderWithContext/>

      <Switch>
        <Route exact path="/" component={CoursesWithContext}/>
        // This below two should be private
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} /> 
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />


        <Route path="/notfound" component={NotFound} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/error" component={UnhandledError} />

        <Route> <Redirect to="/notfound"/> </Route>
      </Switch>

    </div>
  </Router>
);
