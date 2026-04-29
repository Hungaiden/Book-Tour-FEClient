'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Edit, Trash2, Plus, Search, AlertCircle } from 'lucide-react';
import adminApiService from '@/service/admin';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Tour {
  _id: string;
  name: string;
  category?: string;
  price: number;
  duration: string;
  availability?: number;
  status?: 'active' | 'inactive';
  description?: string;
}

const TourManagement = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApiService.getTours();
      // API response: { code, message, data: { hits: [...], pagination: {...} } }
      const toursData = response?.data?.hits || response?.hits || [];
      setTours(Array.isArray(toursData) ? toursData : []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi tải danh sách tour');
      setTours([]);
      console.error('Error fetching tours:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredTours = Array.isArray(tours)
    ? tours.filter(
        (tour) =>
          (tour.title && tour.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (tour.category_id?.title &&
            tour.category_id.title.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    : [];

  const handleDelete = async (id: string) => {
    try {
      setDeleting(id);
      await adminApiService.deleteTour(id);
      setTours(tours.filter((tour) => tour._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi xóa tour');
    } finally {
      setDeleting(null);
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
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Tour</h1>
        <Link href="/admin/tours/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus size={20} className="mr-2" />
            Thêm Tour Mới
          </Button>
        </Link>
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
                placeholder="Tìm kiếm tour..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên Tour</TableHead>
                  <TableHead>Danh Mục</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Thời Gian</TableHead>
                  <TableHead>Hành Động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTours.length > 0 ? (
                  filteredTours.map((tour) => (
                    <TableRow key={tour._id}>
                      <TableCell className="font-medium">{tour.title}</TableCell>
                      <TableCell>{tour.category_id?.title || '-'}</TableCell>
                      <TableCell>{tour.price.toLocaleString('vi-VN')} VND</TableCell>
                      <TableCell>
                        {tour.duration_days ? `${tour.duration_days} ngày` : '-'}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Link href={`/admin/tours/${tour._id}/edit`}>
                            <Button variant="outline" size="sm" className="text-blue-600">
                              <Edit size={16} />
                            </Button>
                          </Link>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600"
                                disabled={deleting === tour._id}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogTitle>Xóa Tour</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bạn có chắc chắn muốn xóa tour này không? Hành động này không thể
                                hoàn tác.
                              </AlertDialogDescription>
                              <div className="flex justify-end space-x-2">
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(tour._id)}
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
                    <TableCell colSpan={5} className="text-center py-10">
                      Không tìm thấy tour nào
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

export default TourManagement;
