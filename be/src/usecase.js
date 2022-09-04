class EmployeeUseCase {
  constructor({ employeeModel }) {
    this.employeeModel = employeeModel;
  }

  async getAll() {
    return this.employeeModel.find();
  }

  async getById(id) {
    return this.employeeModel.findById(id);
  }

  async create({ employee_id, name, address, phone }) {
    const payload = { employee_id, name, address, phone };
    return this.employeeModel.create(payload);
  }

  async update(id, { employee_id, name, address, phone }) {
    const payload = { employee_id, name, address, phone };
    return this.employeeModel.findByIdAndUpdate(id, payload, { new: true });
  }

  async delete(id) {
    return this.employeeModel.findByIdAndRemove(id);
  }
}

module.exports = { EmployeeUseCase };
