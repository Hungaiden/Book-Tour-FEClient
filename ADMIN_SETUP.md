# Admin Panel Setup Guide

## Yêu Cầu

- Node.js 18+
- npm hoặc pnpm
- Book-Tour-FEClient project

## Cài Đặt

### 1. Cài Đặt Dependencies (nếu chưa có)

```bash
cd Book-Tour-FEClient
pnpm install
# hoặc
npm install
```

### 2. Cấu Hình Environment

Tạo file `.env.local` trong thư mục `Book-Tour-FEClient`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_NAME=Book Tour
```

### 3. Khởi Động Ứng Dụng

```bash
pnpm dev
# hoặc
npm run dev
```

Truy cập: `http://localhost:3000/admin/login`

## Thông Tin Đăng Nhập Demo

```
Email: admin@booktour.com
Password: admin123
```

## Cấu Trúc Dự Án

### Admin Pages

```
app/admin/
├── layout.tsx                      # Layout chính
├── page.tsx                        # Dashboard
├── login/page.tsx                 # Đăng nhập
├── tours/page.tsx                 # Danh sách tour
├── tours/create/page.tsx          # Tạo tour
├── tours/[id]/edit/page.tsx       # Chỉnh sửa tour
├── categories/page.tsx            # Danh mục
├── orders/page.tsx                # Đơn hàng
├── reviews/page.tsx               # Đánh giá
└── accounts/page.tsx              # Tài khoản
```

### Services

```
service/admin.ts                    # API client
```

### Contexts

```
contexts/AdminContext.tsx           # Auth context
```

### Utilities

```
lib/admin-utils.ts                 # Helper functions
```

## Tích Hợp Backend

### 1. Cập Nhật AdminApiService

Sửa đổi `service/admin.ts` để kết nối với backend thực tế:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
```

### 2. Implement Backend Routes

Backend cần hỗ trợ các routes sau:

```
POST   /admin/login
GET    /admin/dashboard/stats
GET    /admin/tours
POST   /admin/tours
PUT    /admin/tours/:id
DELETE /admin/tours/:id

GET    /admin/categories
POST   /admin/categories
PUT    /admin/categories/:id
DELETE /admin/categories/:id

GET    /admin/orders
PUT    /admin/orders/:id

GET    /admin/reviews
PUT    /admin/reviews/:id
DELETE /admin/reviews/:id

GET    /admin/accounts
PUT    /admin/accounts/:id
DELETE /admin/accounts/:id
```

### 3. Authentication

Cập nhật AdminContext để sử dụng API backend thực tế:

```typescript
// contexts/AdminContext.tsx
const loginAdmin = async (email: string, password: string) => {
  const response = await adminApiService.login(email, password);
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('admin_user', JSON.stringify(response.data.user));
};
```

## Tính Năng Chính

### 1. Dashboard

- Thống kê tổng quan
- Biểu đồ doanh thu
- Hoạt động gần đây

### 2. Quản Lý Tour

- CRUD operations
- Tìm kiếm và lọc
- Quản lý danh mục

### 3. Quản Lý Đơn Hàng

- Xem tất cả đơn hàng
- Cập nhật trạng thái
- Tìm kiếm nâng cao

### 4. Quản Lý Đánh Giá

- Duyệt đánh giá
- Từ chối hoặc xóa
- Xem chi tiết

### 5. Quản Lý Tài Khoản

- Xem tài khoản người dùng
- Khóa/Mở khóa
- Thay đổi vai trò
- Xóa tài khoản

## Tùy Chỉnh

### Thêm Menu Item Mới

Sửa `app/admin/layout.tsx`:

```typescript
const menuItems = [
  // ... items hiện tại
  {
    name: 'Tính Năng Mới',
    path: '/admin/new-feature',
    icon: NewIcon,
  },
];
```

### Thay Đổi Màu Sắc

Chỉnh sửa các class Tailwind trong các components

### Thêm Biểu Đồ Mới

Sử dụng Recharts trong `app/admin/page.tsx`

## Troubleshooting

### 1. Không thể đăng nhập

- Kiểm tra API URL trong `.env.local`
- Kiểm tra thông tin đăng nhập
- Xem console để lỗi chi tiết

### 2. Biểu đồ không hiển thị

- Kiểm tra nếu recharts được cài đặt
- Xem console browser

### 3. API lỗi

- Kiểm tra nếu backend đang chạy
- Kiểm tra CORS configuration
- Xem Network tab trong DevTools

## Performance

- Sidebar được tối ưu hóa với transition
- Dữ liệu được cache trong state
- Pagination có thể được thêm vào sau

## Bảo Mật

### Recommendations

1. **Authentication**: Sử dụng JWT tokens
2. **Authorization**: Triển khai RBAC
3. **HTTPS**: Sử dụng HTTPS trong production
4. **CORS**: Cấu hình CORS đúng cách
5. **Rate Limiting**: Thêm rate limiting để API
6. **Input Validation**: Validate input từ users

## Triển Khai

### Vercel

```bash
vercel deploy
```

### Docker

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables (Production)

```
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
```

## Hỗ Trợ

Nếu gặp vấn đề:

1. Kiểm tra ADMIN_PANEL_README.md
2. Xem console browser (F12)
3. Kiểm tra Network tab
4. Xem error logs từ backend

---

Happy coding! 🚀
