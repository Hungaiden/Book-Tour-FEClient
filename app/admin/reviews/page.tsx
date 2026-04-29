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
import { Star, Trash2, Eye, Search, AlertCircle } from 'lucide-react';
import adminApiService from '@/service/admin';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Review {
  _id: string;
  user_id?: any;
  tour_id?: any;
  rating: number;
  comment?: string;
  created_at?: string;
  is_approved?: boolean;
  images?: string[];
  deleted?: boolean;
}

const ReviewManagement = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApiService.getReviews();
      console.log('Reviews response:', response);
      // API response: { code, message, data: { hits: [...], pagination: {...} } }
      const reviewsData = response?.data?.hits || response?.hits || [];
      console.log('Extracted reviewsData:', reviewsData);
      setReviews(Array.isArray(reviewsData) ? reviewsData : []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi tải danh sách đánh giá');
      setReviews([]);
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredReviews = Array.isArray(reviews)
    ? reviews.filter(
        (review) =>
          (review.comment && review.comment.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (review.user_id?.email &&
            review.user_id.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (review.tour_id?.title &&
            review.tour_id.title.toLowerCase().includes(searchTerm.toLowerCase())),
      )
    : [];

  const handleApprove = async (id: string) => {
    try {
      setProcessing(id);
      await adminApiService.updateReviewStatus(id, 'approved');
      setReviews(
        reviews.map((review) => (review._id === id ? { ...review, is_approved: true } : review)),
      );
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi duyệt đánh giá');
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (id: string) => {
    try {
      setProcessing(id);
      await adminApiService.updateReviewStatus(id, 'rejected');
      setReviews(
        reviews.map((review) => (review._id === id ? { ...review, is_approved: false } : review)),
      );
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi từ chối đánh giá');
    } finally {
      setProcessing(null);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setProcessing(id);
      await adminApiService.deleteReview(id);
      setReviews(reviews.filter((review) => review._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi xóa đánh giá');
    } finally {
      setProcessing(null);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  const getStatusColor = (is_approved?: boolean) => {
    switch (is_approved) {
      case true:
        return 'bg-green-100 text-green-700';
      case false:
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (is_approved?: boolean) => {
    switch (is_approved) {
      case true:
        return 'Đã Duyệt';
      case false:
        return 'Chờ Duyệt';
      default:
        return is_approved ? 'Đã Duyệt' : 'Chờ Duyệt';
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
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Đánh Giá</h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={18} />
              <Input
                placeholder="Tìm kiếm đánh giá..."
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
                  <TableHead>Đánh Giá</TableHead>
                  <TableHead>Nội Dung</TableHead>
                  <TableHead>Ngày</TableHead>
                  <TableHead>Trạng Thái</TableHead>
                  <TableHead>Hành Động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReviews.length > 0 ? (
                  filteredReviews.map((review) => (
                    <TableRow key={review._id}>
                      <TableCell>{renderStars(review.rating)}</TableCell>
                      <TableCell className="max-w-xs truncate">{review.comment || '-'}</TableCell>
                      <TableCell>
                        {review.created_at
                          ? new Date(review.created_at).toLocaleDateString('vi-VN')
                          : '-'}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            review.is_approved,
                          )}`}
                        >
                          {getStatusLabel(review.is_approved)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedReview(review)}
                              >
                                <Eye size={16} />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Chi Tiết Đánh Giá</DialogTitle>
                                <DialogDescription>Đánh giá chi tiết</DialogDescription>
                              </DialogHeader>
                              {selectedReview && (
                                <div className="space-y-4">
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">
                                      Đánh Giá
                                    </label>
                                    <div className="mt-1">{renderStars(selectedReview.rating)}</div>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-gray-500">
                                      Nhận Xét
                                    </label>
                                    <p className="text-gray-700 mt-1">
                                      {selectedReview.comment || '-'}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                          {review.is_approved === false && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-600"
                                onClick={() => handleApprove(review._id)}
                                disabled={processing === review._id}
                              >
                                Duyệt
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600"
                                onClick={() => handleReject(review._id)}
                                disabled={processing === review._id}
                              >
                                Từ Chối
                              </Button>
                            </>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600"
                                disabled={processing === review._id}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogTitle>Xóa Đánh Giá</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bạn có chắc chắn muốn xóa đánh giá này không? Hành động này không
                                thể hoàn tác.
                              </AlertDialogDescription>
                              <div className="flex justify-end space-x-2">
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(review._id)}
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
                      Không tìm thấy đánh giá nào
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

export default ReviewManagement;
