const { Student } = require("../models/student")

// Handle POST request to /students/add
module.exports.addStudent = async function (req, res) {
  console.log(req.body) // Log the request body
  try {
    // Create a new student instance from the request body
    const student = new Student({
      name: req.body.name,
      college: req.body.college,
      batch: req.body.batch,
      status: req.body.status,
      courseScores: {
        dsaFinalScore: req.body.courseScores.dsaFinalScore,
        webDFinalScore: req.body.courseScores.webDFinalScore,
        reactFinalScore: req.body.courseScores.reactFinalScore,
      },
    })

    // Save the student instance to the database
    await student.save()

    // Redirect to the list of students page
    res.redirect("/")
  } catch (err) {
    console.error(err)
    res.status(500).send("Internal server error")
  }
}

module.exports.renderForm = function (req, res) {
  res.render("addStudent", { title: "Add New Student" })
}
