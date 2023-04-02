const express = require('express');
const router = express.Router();

const addStudentController = require('../controllers/addStudentController');

const passport=require('passport')
// Route to render the form for adding a new student
router.get('/add-student',passport.checkAuthentication, addStudentController.renderForm);

// Route to handle the submission of the new student form
router.post('/add-student', addStudentController.addStudent);

module.exports = router;
