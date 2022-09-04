const mongoose = require("mongoose");

// Model data
const EmployeeModel = mongoose.model("Employee", {
  employee_id: { type: String, unique: true },
  name: String,
  address: String,
  phone: String,
});

module.exports = { EmployeeModel };
