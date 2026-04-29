'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, ShoppingCart, Star, Users, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import adminApiService from '@/service/admin';

interface DashboardStats {
  totalTours: number;
  totalOrders: number;
  totalReviews: number;
  totalAccounts: number;
  totalRevenue: number;
  totalCustomers?: number;
}

interface ChartData {
  name: string;
  value: number;
  revenue?: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalTours: 0,
    totalOrders: 0,
    totalReviews: 0,
    totalAccounts: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  });

  const [chartData, setChartData] = useState<ChartData[]>([
    { name: 'Tháng 1', value: 400, revenue: 2400 },
    { name: 'Tháng 2', value: 300, revenue: 1398 },
    { name: 'Tháng 3', value: 200, revenue: 9800 },
    { name: 'Tháng 4', value: 278, revenue: 3908 },
    { name: 'Tháng 5', value: 189, revenue: 4800 },
    { name: 'Tháng 6', value: 239, revenue: 3800 },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await adminApiService.getDashboardStats();
      console.log('Dashboard stats response:', response);

      const dashboardData = response?.data || response;
      console.log('Dashboard data:', dashboardData);

      // Extract stats from backend response
      const transformedStats: DashboardStats = {
        totalTours: dashboardData?.totalTour?.total || 0,
        totalOrders: dashboardData?.totalBooking?.total || 0,
        totalReviews: 0, // Will need to fetch from reviews endpoint if needed
        totalAccounts: 0, // Will need to fetch from accounts endpoint if needed
        totalRevenue: dashboardData?.totalRevenue || 0,
        totalCustomers: dashboardData?.totalCustomers || 0,
      };

      console.log('Transformed stats:', transformedStats);
      setStats(transformedStats);

      // Fetch additional stats if needed
      await Promise.all([fetchReviewsCount(), fetchAccountsCount()]);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      setLoading(false);
    }
  };

  const fetchReviewsCount = async () => {
    try {
      const response = await adminApiService.getReviews();
      const reviewsData = response?.data?.hits || response?.hits || [];
      setStats((prev) => ({
        ...prev,
        totalReviews: Array.isArray(reviewsData) ? reviewsData.length : 0,
      }));
    } catch (error) {
      console.error('Error fetching reviews count:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAccountsCount = async () => {
    try {
      const response = await adminApiService.getAccounts();
      const accountsData = response?.data?.hits || response?.hits || [];
      setStats((prev) => ({
        ...prev,
        totalAccounts: Array.isArray(accountsData) ? accountsData.length : 0,
      }));
    } catch (error) {
      console.error('Error fetching accounts count:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-xl text-gray-500">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center justify-between">
              <span>Tổng Tour</span>
              <MapPin className="text-blue-500" size={20} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTours}</div>
            <p className="text-xs text-gray-500">Tour hoạt động</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center justify-between">
              <span>Tổng Đơn Hàng</span>
              <ShoppingCart className="text-green-500" size={20} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-gray-500">Đơn hàng tất cả</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center justify-between">
              <span>Tổng Đánh Giá</span>
              <Star className="text-yellow-500" size={20} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReviews}</div>
            <p className="text-xs text-gray-500">Đánh giá khách hàng</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center justify-between">
              <span>Tổng Tài Khoản</span>
              <Users className="text-purple-500" size={20} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAccounts}</div>
            <p className="text-xs text-gray-500">Người dùng hoạt động</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center justify-between">
              <span>Doanh Thu</span>
              <TrendingUp className="text-red-500" size={20} />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats.totalRevenue / 1000).toFixed(0)}K</div>
            <p className="text-xs text-gray-500">Tháng này</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Đơn Hàng Theo Tháng</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#3b82f6" name="Số đơn hàng" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Doanh Thu Theo Tháng</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#10b981" name="Doanh thu (VND)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Hoạt Động Gần Đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { id: 1, text: 'Khách hàng mới đăng ký', time: '5 phút trước' },
              { id: 2, text: 'Đơn hàng mới được tạo', time: '15 phút trước' },
              { id: 3, text: 'Tour mới được thêm', time: '1 giờ trước' },
              { id: 4, text: 'Đánh giá mới từ khách hàng', time: '2 giờ trước' },
            ].map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between py-3 border-b last:border-0"
              >
                <p className="text-gray-700">{activity.text}</p>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
