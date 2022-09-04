import axiosInstance from "../helpers/axios";

class EmployeeRemote {
  constructor() {
    this.url = "/employees";
  }

  async getAll() {
    const res = await axiosInstance.get(this.url);
    const data = await res.data;
    return data.data || [];
  }

  async getById(id) {
    const res = await axiosInstance.get(`${this.url}/${id}`);
    const data = await res.data;
    return data.data || null;
  }

  async create(payload) {
    const res = await axiosInstance.post(this.url, payload);
    const data = await res.data;
    return data.data || null;
  }

  async update(payload) {
    const res = await axiosInstance.put(`${this.url}/${payload._id}`, payload);
    const data = await res.data;
    return data.data || null;
  }

  async delete(id) {
    const res = await axiosInstance.delete(`${this.url}/${id}`);
    const data = await res.data;
    return data.data || null;
  }
}

export default EmployeeRemote;
