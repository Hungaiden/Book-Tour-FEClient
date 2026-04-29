'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Edit, Trash2, Plus, AlertCircle } from 'lucide-react';
import adminApiService from '@/service/admin';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Category {
  _id: string;
  title: string;
  description?: string;
  images?: string[];
  status?: string;
  position?: number;
  slug?: string;
  created_at?: string;
  updated_at?: string;
}

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminApiService.getCategories();
      // API response: { code, message, data: { hits: [...], pagination: {...} } }
      const categoriesData = response?.data?.hits || response?.hits || [];
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi tải danh mục');
      setCategories([]);
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.name.trim()) return;

    try {
      setSubmitting(true);
      const newCategory = await adminApiService.createCategory(formData);
      setCategories([...categories, newCategory]);
      setFormData({ name: '', description: '' });
      setOpenDialog(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi thêm danh mục');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category._id);
    setFormData({
      title: category.title,
      description: category.description || '',
    });
    setOpenDialog(true);
  };

  const handleSaveEdit = async () => {
    if (!formData.title.trim() || !editingId) return;

    try {
      setSubmitting(true);
      const updated = await adminApiService.updateCategory(editingId, formData);
      setCategories(categories.map((cat) => (cat._id === editingId ? updated : cat)));
      setEditingId(null);
      setFormData({ title: '', description: '' });
      setOpenDialog(false);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi cập nhật danh mục');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await adminApiService.deleteCategory(id);
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi xóa danh mục');
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setEditingId(null);
      setFormData({ title: '', description: '' });
    }
    setOpenDialog(open);
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
        <h1 className="text-3xl font-bold text-gray-900">Quản lý Danh Mục</h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Add/Edit Category Dialog */}
      <Dialog open={openDialog} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus size={20} className="mr-2" />
            Thêm Danh Mục
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? 'Chỉnh Sửa Danh Mục' : 'Thêm Danh Mục Mới'}</DialogTitle>
            <DialogDescription>
              {editingId ? 'Cập nhật thông tin danh mục' : 'Tạo danh mục tour mới'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="category-name">Tên Danh Mục</Label>
              <Input
                id="category-name"
                placeholder="Nhập tên danh mục"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="category-desc">Mô Tả</Label>
              <Textarea
                id="category-desc"
                placeholder="Nhập mô tả danh mục"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => handleOpenChange(false)}
                disabled={submitting}
              >
                Hủy
              </Button>
              <Button
                onClick={editingId ? handleSaveEdit : handleAdd}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={submitting}
              >
                {submitting ? 'Đang xử lý...' : editingId ? 'Cập Nhật' : 'Thêm'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Categories Table */}
      <Card>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên Danh Mục</TableHead>
                  <TableHead>Mô Tả</TableHead>
                  <TableHead>Hành Động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <TableRow key={category._id}>
                      <TableCell className="font-medium">{category.title}</TableCell>
                      <TableCell>{category.description || '-'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-600"
                            onClick={() => handleEdit(category)}
                          >
                            <Edit size={16} />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" className="text-red-600">
                                <Trash2 size={16} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogTitle>Xóa Danh Mục</AlertDialogTitle>
                              <AlertDialogDescription>
                                Bạn có chắc chắn muốn xóa danh mục này không? Hành động này không
                                thể hoàn tác.
                              </AlertDialogDescription>
                              <div className="flex justify-end space-x-2">
                                <AlertDialogCancel>Hủy</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(category._id)}
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
                    <TableCell colSpan={3} className="text-center py-10">
                      Không có danh mục nào
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

export default CategoryManagement;
