const express = require("express");
const router = express.Router();
const courseController = require("../controllers/CourseController");

router.post('/create', courseController.createCourse)
router.get("/:slug", courseController.getCourse);
router.get("/", courseController.getCourses);

module.exports = router;
