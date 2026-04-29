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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
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
import { Lock, Unlock, Trash2, Search, AlertCircle } from 'lucide-react';
import adminApiService from '@/service/admin';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Account {
  _id: string;
  email: string;
  role?: 'user' | 'admin' | 'moderator';
  status?: 'active' | 'inactive' | 'suspended';
}

const AccountManagement = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApiService.getAccounts();
      // API response: { code, message, data: { hits: [...], pagination: {...} } }
      const accountsData = response?.data?.hits || response?.hits || [];
      setAccounts(Array.isArray(accountsData) ? accountsData : []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi tải danh sách tài khoản');
      setAccounts([]);
      console.error('Error fetching accounts:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredAccounts = Array.isArray(accounts)
    ? accounts.filter((account) => {
        const matchSearch =
          account.email && account.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchRole = filterRole === 'all' || account.role === filterRole;
        const matchStatus = filterStatus === 'all' || account.status === filterStatus;

        return matchSearch && matchRole && matchStatus;
      })
    : [];

  const handleUpdateRole = async (id: string, newRole: string) => {
    try {
      setUpdating(id);
      await adminApiService.updateAccountRole(id, newRole);
      setAccounts(
        accounts.map((account) =>
          account._id === id ? { ...account, role: newRole as any } : account,
        ),
      );
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi cập nhật vai trò');
    } finally {
      setUpdating(null);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      setUpdating(id);
      await adminApiService.updateAccountStatus(id, newStatus);
      setAccounts(
        accounts.map((account) =>
          account._id === id ? { ...account, status: newStatus as any } : account,
        ),
      );
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi cập nhật trạng thái');
    } finally {
      setUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setUpdating(id);
      await adminApiService.deleteAccount(id);
      setAccounts(accounts.filter((account) => account._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi xóa tài khoản');
    } finally {
      setUpdating(null);
    }
  };

  const getRoleColor = (role?: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-700';
      case 'moderator':
        return 'bg-blue-100 text-blue-700';
      case 'user':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case 'admin':
        return 'Quản Trị Viên';
      case 'moderator':
        return 'Người Duyệt';
      case 'user':
        return 'Người Dùng';
      default:
        return role || '-';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-700';
      case 'inactive':
        return 'bg-yellow-100 text-yellow-700';
      case 'suspended':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'active':
        return 'Hoạt Động';
      case 'inactive':
        return 'Không Hoạt Động';
      case 'suspended':
        return 'Tạm Khóa';
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
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Tài Khoản</h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center relative">
              <Search className="absolute left-3 text-gray-400" size={18} />
              <Input
                placeholder="Tìm kiếm email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger>
                <SelectValue placeholder="Lọc vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất Cả</SelectItem>
                <SelectItem value="admin">Quản Trị Viên</SelectItem>
                <SelectItem value="moderator">Người Duyệt</SelectItem>
                <SelectItem value="user">Người Dùng</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Lọc trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất Cả</SelectItem>
                <SelectItem value="active">Hoạt Động</SelectItem>
                <SelectItem value="inactive">Không Hoạt Động</SelectItem>
                <SelectItem value="suspended">Tạm Khóa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Vai Trò</TableHead>
                  <TableHead>Trạng Thái</TableHead>
                  <TableHead>Hành Động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAccounts.length > 0 ? (
                  filteredAccounts.map((account) => (
                    <TableRow key={account._id}>
                      <TableCell className="font-medium">{account.email}</TableCell>
                      <TableCell>
                        <Select
                          value={account.role || 'user'}
                          onValueChange={(value) => handleUpdateRole(account._id, value)}
                          disabled={updating === account._id}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">Người Dùng</SelectItem>
                            <SelectItem value="moderator">Người Duyệt</SelectItem>
                            <SelectItem value="admin">Quản Trị Viên</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            account.status,
                          )}`}
                        >
                          {getStatusLabel(account.status)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {account.status === 'active' ? (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600"
                              onClick={() => handleUpdateStatus(account._id, 'suspended')}
                              disabled={updating === account._id}
                            >
                              <Lock size={16} />
                            </Button>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-green-600"
                              onClick={() => handleUpdateStatus(account._id, 'active')}
                              disabled={updating === account._id}
                            >
                              <Unlock size={16} />
                            </Button>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600"
                                disabled={updating === account._id}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogTitle>Xóa Tài Khoản</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bạn có chắc chắn muốn xóa tài khoản {account.email}
                                không? Hành động này không thể hoàn tác.
                              </AlertDialogDescription>
                              <div className="flex justify-end space-x-2">
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(account._id)}
                                  className="bg-red-600"
                                >
                                  Xóa
                                </AlertDialogAction>
                              </div>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-10">
                      Không tìm thấy tài khoản nào
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

export default AccountManagement;
