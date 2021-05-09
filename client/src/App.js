import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import withContext from './Context';


import Header from './components/Header';
import Courses from './components/Courses';

const CoursesWithContext = withContext(Courses);


export default () => (
  <Router>
    <div>
      <Header/>

      <Switch>
        <Route exact path="/" component= {CoursesWithContext}/>
      </Switch>

    </div>
  </Router>
);
