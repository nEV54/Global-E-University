const CourseModel = require("../models/courseModel");

module.exports.getCourses = async (req, res) => {
    try {
        const courses = await CourseModel.find({});
        res.send({ code: 200, message: "success", data: courses });
    } catch (err) {
        res.send({ code: 500, message: "Internal Server Error" });
    }
};

module.exports.addCourse = async (req, res) => {
    try {
        const { title, description } = req.body;
        const imageUrl = req.file ? req.file.path : '';

        if (!title || !description|| !imageUrl ) {
            return res.send({ code: 400, message: "Bad Request" });
        }

        const newCourse = new CourseModel({ title, description, imageUrl});

        await newCourse.save();
        res.send({ code: 200, message: "Course added successfully" });
    } catch (err) {
        res.send({ code: 500, message: "Internal Server Error" });
    }
};
