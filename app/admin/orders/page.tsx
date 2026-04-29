'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Eye, Search, AlertCircle } from 'lucide-react';
import adminApiService from '@/service/admin';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Booking {
  _id: string;
  tour_id?: { _id: string; title: string };
  user_id?: any;
  booking_date?: string;
  start_date?: string;
  number_of_people?: number;
  contact_info?: { name: string; phone: string; email: string };
  total_price: number;
  status?: 'pending' | 'cancelled' | 'completed';
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
  payment_method?: string;
  transaction_code?: string;
  payment_time?: string;
  note?: string;
}

const OrderManagement = () => {
  const [orders, setOrders] = useState<Booking[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Booking | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApiService.getBookings();
      console.log('Orders response:', response);
      console.log('response?.data:', response?.data);
      console.log('response?.data?.hits:', response?.data?.hits);
      // API response: { code, message, data: { hits: [...], pagination: {...} } }
      const ordersData = response?.data?.hits || response?.hits || [];
      console.log('Extracted ordersData:', ordersData);
      setOrders(Array.isArray(ordersData) ? ordersData : []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi tải danh sách đơn hàng');
      setOrders([]);
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = Array.isArray(orders)
    ? orders.filter((order) => {
        const matchSearch =
          (order._id &&
            order._id.substring(0, 8).toLowerCase().includes(searchTerm.toLowerCase())) ||
          (order.contact_info?.email &&
            order.contact_info.email.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchFilter = filterStatus === 'all' || order.status === filterStatus;

        return matchSearch && matchFilter;
      })
    : [];

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      setUpdating(id);
      await adminApiService.updateBookingStatus(id, newStatus);
      setOrders(
        orders.map((order) => (order._id === id ? { ...order, status: newStatus as any } : order)),
      );
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi cập nhật trạng thái');
    } finally {
      setUpdating(null);
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'completed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'pending':
        return 'Chờ Xác Nhận';
      case 'confirmed':
        return 'Đã Xác Nhận';
      case 'completed':
        return 'Hoàn Thành';
      case 'cancelled':
        return 'Đã Hủy';
      default:
        return status || '-';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Đơn Hàng</h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <Input
                placeholder="Tìm kiếm đơn hàng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Lọc trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất Cả</SelectItem>
                <SelectItem value="pending">Chờ Xác Nhận</SelectItem>
                <SelectItem value="confirmed">Đã Xác Nhận</SelectItem>
                <SelectItem value="completed">Hoàn Thành</SelectItem>
                <SelectItem value="cancelled">Đã Hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã Đơn</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Ngày Đặt</TableHead>
                  <TableHead>Trạng Thái</TableHead>
                  <TableHead>Hành Động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">{order._id.substring(0, 8)}</TableCell>
                      <TableCell>{order.contact_info?.email || '-'}</TableCell>
                      <TableCell>{order.total_price.toLocaleString('vi-VN')} VND</TableCell>
                      <TableCell>
                        {order.booking_date
                          ? new Date(order.booking_date).toLocaleDateString('vi-VN')
                          : '-'}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            order.status,
                          )}`}
                        >
                          {getStatusLabel(order.status)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye size={16} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Chi Tiết Đơn Hàng</DialogTitle>
                              <DialogDescription>
                                Mã đơn: {selectedOrder?._id.substring(0, 8)}
                              </DialogDescription>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">
                                      Email
                                    </label>
                                    <p className="text-lg font-semibold">
                                      {selectedOrder.contact_info?.email || '-'}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">
                                      Số Điện Thoại
                                    </label>
                                    <p className="text-lg font-semibold">
                                      {selectedOrder.contact_info?.phone || '-'}
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">Giá</label>
                                    <p className="text-lg font-semibold text-green-600">
                                      {selectedOrder.total_price.toLocaleString('vi-VN')} VND
                                    </p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">
                                      Ngày Đặt
                                    </label>
                                    <p className="text-lg font-semibold">
                                      {selectedOrder.booking_date
                                        ? new Date(selectedOrder.booking_date).toLocaleDateString(
                                            'vi-VN',
                                          )
                                        : '-'}
                                    </p>
                                  </div>
                                  <div className="col-span-2">
                                    <label className="text-sm font-medium text-gray-500">
                                      Trạng Thái
                                    </label>
                                    <Select
                                      value={selectedOrder.status || ''}
                                      onValueChange={(value) =>
                                        handleUpdateStatus(selectedOrder._id, value)
                                      }
                                      disabled={updating === selectedOrder._id}
                                    >
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="pending">Chờ Xác Nhận</SelectItem>
                                        <SelectItem value="confirmed">Đã Xác Nhận</SelectItem>
                                        <SelectItem value="completed">Hoàn Thành</SelectItem>
                                        <SelectItem value="cancelled">Đã Hủy</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-10">
                      Không tìm thấy đơn hàng nào
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagement;
