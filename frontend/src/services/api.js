import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('skillgrow_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('skillgrow_token');
      localStorage.removeItem('skillgrow_user');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateLanguage: (lang) => api.put('/auth/update-language', { language: lang }),
  updateProfile: (data) => api.put('/auth/update-profile', data),
};

export const skillsAPI = {
  getAll: (params) => api.get('/skills', { params }),
  getById: (id) => api.get(`/skills/${id}`),
  addMySkill: (data) => api.post('/skills/add-my-skill', data),
  requestSkill: (id) => api.post(`/skills/request/${id}`),
  getMySkills: () => api.get('/skills/my-skills'),
  getTopDemand: () => api.get('/skills/top-demand'),
};

export const trainersAPI = {
  getAll: (params) => api.get('/trainers', { params }),
  getById: (id) => api.get(`/trainers/${id}`),
  getAvailable: () => api.get('/trainers/available'),
};

export const slotsAPI = {
  getAll: () => api.get('/slots'),
  getById: (id) => api.get(`/slots/${id}`),
  join: (id) => api.post(`/slots/join/${id}`),
  getMySlots: () => api.get('/slots/my-slots'),
};

export const jobsAPI = {
  getAll: (params) => api.get('/jobs', { params }),
  postJob: (data) => api.post('/jobs/post', data),
  getMyPosts: () => api.get('/jobs/my-posts'),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
};

export const groupsAPI = {
  getAll: (params) => api.get('/groups', { params }),
  getSuggestions: () => api.get('/groups/suggestions'),
  join: (id) => api.post(`/groups/join/${id}`),
};

export const ordersAPI = {
  getOpen: () => api.get('/orders/open'),
  apply: (id) => api.post(`/orders/apply/${id}`),
  uploadMilestone: (id, data) => api.put(`/orders/milestone/${id}`, data),
};

export default api;
