const { Student } = require("../models/student")
// code to view students from database
module.exports.viewStudent = async function (req, res) {
  try {
    const students = await Student.find()
    res.render("showStudent", { students })
  } catch (err) {
    console.error(err)
    res.status(500).send("Internal server error")
  }
}
