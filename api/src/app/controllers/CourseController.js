const { response } = require("express");
const Course = require("../models/Course");

class CourseController {
  async getCourses(req, res) {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (error) {
      res.status(400).json(error);
    }
  }

  getCourse(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.json(course);
      })
      .catch(next);
  }

  createCourse(req, res, next) {
    const data = req.body;
    console.log(data);
    const course = new Course(data);
    course
      .save()
      .then(() => res.redirect(`/`))
      .catch((error) => {});

    res.send("Course saveed!!");
  }
}

module.exports = new CourseController();
