const { Student } = require("../models/student")
const { Parser } = require("json2csv")

// Define the headers for the CSV file
const csvHeaders = [
  { label: "Student id", value: "_id" },
  { label: "Student name", value: "name" },
  { label: "Student college", value: "college" },
  { label: "Student status", value: "status" },
  { label: "DSA Final Score", value: "courseScores.dsaFinalScore" },
  { label: "WebD Final Score", value: "courseScores.webDFinalScore" },
  { label: "React Final Score", value: "courseScores.reactFinalScore" },
  { label: "Interview date", value: "interviews.date" },
  { label: "Interview company", value: "interviews.company" },
  { label: "Interview student result", value: "interviews.result" },
]

// Generate and download the CSV file
module.exports.downloadCSV = async function (req, res) {
  try {
    const students = await Student.find().lean().exec()
    const csvData = new Parser({ fields: csvHeaders }).parse(students)
    const fileName = "students.csv"
    res.setHeader("Content-disposition", "attachment; filename=" + fileName)
    res.set("Content-Type", "text/csv")
    res.status(200).send(csvData)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}
