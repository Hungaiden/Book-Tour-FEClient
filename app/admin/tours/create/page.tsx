'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';

const CreateTour = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    duration: '',
    description: '',
    destination: '',
    maxParticipants: '',
    inclusions: '',
    highlights: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      router.push('/admin/tours');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Quay Lại</span>
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Tạo Tour Mới</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Thông Tin Tour</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Tên Tour</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Nhập tên tour"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Danh Mục</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beach">Du Lịch Biển</SelectItem>
                    <SelectItem value="mountain">Du Lịch Miền Núi</SelectItem>
                    <SelectItem value="rural">Du Lịch Nông Thôn</SelectItem>
                    <SelectItem value="culture">Du Lịch Văn Hóa</SelectItem>
                    <SelectItem value="adventure">Du Lịch Mạo Hiểm</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="price">Giá (VND)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Nhập giá"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="duration">Thời Gian</Label>
                <Input
                  id="duration"
                  name="duration"
                  placeholder="VD: 3 ngày 2 đêm"
                  value={formData.duration}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="destination">Điểm Đến</Label>
                <Input
                  id="destination"
                  name="destination"
                  placeholder="Nhập điểm đến"
                  value={formData.destination}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="maxParticipants">Số Người Tối Đa</Label>
                <Input
                  id="maxParticipants"
                  name="maxParticipants"
                  type="number"
                  placeholder="Nhập số người"
                  value={formData.maxParticipants}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Mô Tả</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Nhập mô tả chi tiết về tour"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div>
              <Label htmlFor="highlights">Điểm Nổi Bật</Label>
              <Textarea
                id="highlights"
                name="highlights"
                placeholder="Nhập các điểm nổi bật (mỗi dòng một điểm)"
                value={formData.highlights}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="inclusions">Bao Gồm</Label>
              <Textarea
                id="inclusions"
                name="inclusions"
                placeholder="Nhập những gì được bao gồm (mỗi dòng một mục)"
                value={formData.inclusions}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="flex space-x-4">
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? 'Đang Tạo...' : 'Tạo Tour'}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                Hủy
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTour;
