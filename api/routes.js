'use strict';
const express = require('express');
const { User, Course } = require('./models');
const { authenticateUser } = require('./middleware/user-auth');

// Construct a router instance.
const router = express.Router();

// Handler function to wrap each route.
function asyncHandler(cb) {
    return async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError' || error.name === 'SequelizeValidationError'){
          error.status = 400;
          const errors = error.errors.map(err => err.message); 
        }
        next(error)
      } 
    }
  }

// Route that returns a list of users.
router.get('/users', authenticateUser, asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.currentUser, {
    attributes:{
      exclude: ['createdAt', 'updatedAt']
    }  
  });
  res.json({user})
}));

// Route that creates a new user.
router.post('/users', asyncHandler(async (req, res) => {
    try {
        await User.create(req.body);
        res.status(201).location('/').end();
    } catch (error) {
      if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
        const errors = error.errors.map(err => err.message);
        res.status(400).json({errors});   
      } else {
        throw error;
      }
    }
}));

// Route that returns a list of courses.
router.get('/courses', asyncHandler(async (req, res) => {
    const courses = await Course.findAll({
      attributes: ["id", "title", "description", "estimatedTime", "materialsNeeded", "userId"],
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'emailAddress']
        },
      ],
    })
    res.json(courses);
}));

// Route that returns a course based on its id.
router.get('/courses/:id', asyncHandler(async (req, res) => {
  const course = await Course.findByPk(req.params.id, {
    attributes: ["id", "title", "description", "estimatedTime", "materialsNeeded", "userId"],
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName', 'emailAddress']
        },
      ],
  })

  if(course) {
      res.json(course);
  } else{
      res.json("Course does not exist");
  }
}));

// Route that creates a new course.
router.post('/courses', authenticateUser, asyncHandler(async (req, res) => {
  let course
  try {
      course = await Course.create(req.body);
      res.status(201).location(`/api/courses/${course.id}`).end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({errors});   
    } else {
      throw error;
    }
  }
}));


// Route that updates a course
router.put('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  const course = await Course.findByPk(req.params.id);
  try {
    if (req.currentUser === course.userId) {
      await course.update(req.body);
      res.status(204).json('Course successfully updated');
    } else {
        const error = new Error();
        error.message = "Sorry, you need to be the owner of the course to make updates.";
        error.status = 403;
        throw error;
    }
      

  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({errors});   
    } else {
      throw error;
    }
  }
}));

// Route that deletes a course
router.delete('/courses/:id', authenticateUser, asyncHandler(async (req, res) => {
  const user = req.currentUser;
  const course = await Course.findByPk(req.params.id);
  
  try {
      if(course.userId === user) {
        await course.destroy();
        res.status(204).send({message: 'Course deleted'});
      } else {
        res.status(403).send({message: 'Only the owner can delete a course'});
      }
      
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({errors});   
    } else {
      throw error;
    }
  }
}));

module.exports = router;