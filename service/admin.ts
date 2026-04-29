import axios, { AxiosInstance, AxiosError } from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class AdminApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });

    // Add token to requests
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token') || localStorage.getItem('accessToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle response errors
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/admin/login';
        }
        return Promise.reject(error);
      },
    );
  }

  // Dashboard
  async getDashboardStats() {
    try {
      const response = await this.api.get('/dashboard');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Tours
  async getTours(params?: any) {
    try {
      const response = await this.api.get('/tours', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getTourById(id: string) {
    try {
      const response = await this.api.get(`/tours/detail/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createTour(data: any) {
    try {
      const response = await this.api.post('/tours/create', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateTour(id: string, data: any) {
    try {
      const response = await this.api.patch(`/tours/update/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteTour(id: string) {
    try {
      const response = await this.api.delete(`/tours/deleteOne/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Categories
  async getCategories(params?: any) {
    try {
      const response = await this.api.get('/tour-categories', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getCategoryById(id: string) {
    try {
      const response = await this.api.get(`/tour-categories/detail/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async createCategory(data: any) {
    try {
      const response = await this.api.post('/tour-categories/create', data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(id: string, data: any) {
    try {
      const response = await this.api.patch(`/tour-categories/update/${id}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id: string) {
    try {
      const response = await this.api.delete(`/tour-categories/deleteOne/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Bookings (Orders)
  async getBookings(params?: any) {
    try {
      const response = await this.api.get('/tours/bookings', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getBookingById(id: string) {
    try {
      const response = await this.api.get(`/tours/bookings/detail/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateBookingStatus(id: string, status: string) {
    try {
      const response = await this.api.patch(`/tours/bookings/update/${id}`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Reviews
  async getReviews(params?: any) {
    try {
      const response = await this.api.get('/tours/reviews', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getReviewById(id: string) {
    try {
      const response = await this.api.get(`/tours/reviews/detail/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateReviewStatus(id: string, status: string) {
    try {
      const response = await this.api.patch(`/tours/reviews/update/${id}`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteReview(id: string) {
    try {
      const response = await this.api.delete(`/tours/reviews/deleteOne/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Accounts
  async getAccounts(params?: any) {
    try {
      const response = await this.api.get('/accounts', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getAccountById(id: string) {
    try {
      const response = await this.api.get(`/accounts/detail/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateAccountRole(id: string, role: string) {
    try {
      const response = await this.api.patch(`/accounts/update/${id}`, { role });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async updateAccountStatus(id: string, status: string) {
    try {
      const response = await this.api.patch(`/accounts/update/${id}`, { status });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteAccount(id: string) {
    try {
      const response = await this.api.delete(`/accounts/deleteOne/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new AdminApiService();
