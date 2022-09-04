class EmployeeController {
  constructor({ employeeUseCase }) {
    this.employeeUseCase = employeeUseCase;
  }

  getAll() {
    return async (req, res) => {
      try {
        const data = await this.employeeUseCase.getAll();
        return res.json({ data });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    };
  }

  getById() {
    return async (req, res) => {
      try {
        const data = await this.employeeUseCase.getById(req.params.id);
        return res.json({ data });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    };
  }

  create() {
    return async (req, res) => {
      try {
        const data = await this.employeeUseCase.create(req.body);
        return res.json({ data });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    };
  }

  update() {
    return async (req, res) => {
      try {
        const data = await this.employeeUseCase.update(req.params.id, req.body);
        return res.json({ data });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    };
  }

  delete() {
    return async (req, res) => {
      try {
        const data = await this.employeeUseCase.delete(req.params.id);
        return res.json({ data });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    };
  }
}

module.exports = { EmployeeController };
