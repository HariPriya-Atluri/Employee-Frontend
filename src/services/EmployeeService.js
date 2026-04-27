import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const EmployeeService = {
  getAll: async () => {
    const response = await api.get("/employees");
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/employee/${id}`);
    return response.data;
  },

  create: async (employee) => {
    const response = await api.post("/employee", employee);
    return response.data;
  },

  update: async (id, employee) => {
    const response = await api.put(`/employee/${id}`, employee);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/employee/${id}`);
    return response.data;
  },
};

export default EmployeeService;