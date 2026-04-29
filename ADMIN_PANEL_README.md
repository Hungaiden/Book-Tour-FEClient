# Admin Panel Documentation

## Tổng Quan

Admin Panel là giao diện quản lý toàn bộ hệ thống Book Tour, cung cấp các công cụ quản lý tour, danh mục, đơn hàng, đánh giá và tài khoản người dùng.

## Cấu Trúc Thư Mục

```
app/admin/
├── layout.tsx              # Layout chính của admin panel
├── page.tsx               # Dashboard (trang chủ)
├── login/
│   └── page.tsx           # Trang đăng nhập
├── tours/
│   ├── page.tsx           # Danh sách tour
│   ├── create/
│   │   └── page.tsx       # Tạo tour mới
│   └── [id]/
│       └── edit/
│           └── page.tsx   # Chỉnh sửa tour
├── categories/
│   └── page.tsx           # Quản lý danh mục
├── orders/
│   └── page.tsx           # Quản lý đơn hàng
├── reviews/
│   └── page.tsx           # Quản lý đánh giá
└── accounts/
    └── page.tsx           # Quản lý tài khoản
```

## Các Tính Năng Chính

### 1. Dashboard

- **Thống kê tổng quát**: Hiển thị tổng số tour, đơn hàng, đánh giá, tài khoản và doanh thu
- **Biểu đồ**: Cho thấy xu hướng đơn hàng và doanh thu theo tháng
- **Hoạt động gần đây**: Danh sách các hoạt động mới nhất trong hệ thống

### 2. Quản Lý Tour

- **Liệt kê tour**: Xem tất cả tour, tìm kiếm và lọc
- **Tạo tour**: Thêm tour mới với thông tin chi tiết
  - Tên tour, danh mục, giá tiền
  - Thời gian, điểm đến, số người tối đa
  - Mô tả, điểm nổi bật, bao gồm dịch vụ
- **Chỉnh sửa tour**: Cập nhật thông tin tour
- **Xóa tour**: Xóa tour khỏi hệ thống

### 3. Quản Lý Danh Mục

- **Liệt kê danh mục**: Xem tất cả danh mục tour
- **Thêm danh mục**: Tạo danh mục mới
- **Chỉnh sửa danh mục**: Cập nhật thông tin danh mục
- **Xóa danh mục**: Xóa danh mục
- **Hiển thị số tour**: Xem số lượng tour trong mỗi danh mục

Các danh mục mẫu:

- Du Lịch Biển
- Du Lịch Miền Núi
- Du Lịch Nông Thôn
- Du Lịch Văn Hóa
- Du Lịch Mạo Hiểm

### 4. Quản Lý Đơn Hàng

- **Liệt kê đơn hàng**: Xem tất cả đơn hàng với chi tiết
- **Tìm kiếm**: Tìm kiếm theo mã đơn, tên khách hàng, tên tour
- **Lọc theo trạng thái**:
  - Chờ Xác Nhận
  - Đã Xác Nhận
  - Hoàn Thành
  - Đã Hủy
- **Xem chi tiết**: Xem thông tin chi tiết của từng đơn hàng
- **Cập nhật trạng thái**: Thay đổi trạng thái đơn hàng

### 5. Quản Lý Đánh Giá

- **Liệt kê đánh giá**: Xem tất cả đánh giá từ khách hàng
- **Tìm kiếm**: Tìm kiếm theo khách hàng, tour, hoặc nội dung
- **Duyệt đánh giá**: Phê duyệt đánh giá chờ duyệt
- **Từ chối đánh giá**: Từ chối đánh giá không phù hợp
- **Xóa đánh giá**: Xóa đánh giá khỏi hệ thống
- **Xem chi tiết**: Xem toàn bộ nội dung đánh giá

### 6. Quản Lý Tài Khoản

- **Liệt kê tài khoản**: Xem tất cả tài khoản người dùng
- **Tìm kiếm**: Tìm kiếm theo tên, email, số điện thoại
- **Lọc theo vai trò**:
  - Người Dùng
  - Kiểm Duyệt
  - Quản Trị
- **Lọc theo trạng thái**:
  - Hoạt Động
  - Không Hoạt Động
  - Bị Khóa
- **Xem chi tiết**: Xem thông tin người dùng
- **Khóa/Mở khóa**: Khóa hoặc mở khóa tài khoản
- **Thay đổi vai trò**: Nâng cấp hoặc giáng chức tài khoản
- **Xóa tài khoản**: Xóa tài khoản khỏi hệ thống

## Đăng Nhập

### Demo Credentials

- **Email**: admin@booktour.com
- **Password**: admin123

## Giao Diện

### Thanh Bên (Sidebar)

- Menu chính với các liên kết đến tất cả các phần quản lý
- Nút ghi đôi để thu/mở rộng sidebar
- Nút đăng xuất ở cuối

### Bảng Điều Khiển (Dashboard)

- Tìm kiếm nhanh
- Lọc theo các tiêu chí khác nhau
- Bảng liệt kê với thông tin chi tiết
- Hành động (xem, chỉnh sửa, xóa) cho mỗi mục

## Services

### AdminApiService (`service/admin.ts`)

Cung cấp các phương thức để gọi API admin:

```typescript
// Dashboard
getDashboardStats()

// Tours
getTours(params?)
getTourById(id)
createTour(data)
updateTour(id, data)
deleteTour(id)

// Categories
getCategories(params?)
getCategoryById(id)
createCategory(data)
updateCategory(id, data)
deleteCategory(id)

// Orders
getOrders(params?)
getOrderById(id)
updateOrderStatus(id, status)

// Reviews
getReviews(params?)
getReviewById(id)
approveReview(id)
rejectReview(id)
deleteReview(id)

// Accounts
getAccounts(params?)
getAccountById(id)
updateAccountRole(id, role)
updateAccountStatus(id, status)
deleteAccount(id)
```

## Contexts

### AdminContext (`contexts/AdminContext.tsx`)

Cung cấp thông tin người dùng admin hiện tại và các phương thức xác thực:

```typescript
useAdmin() // Hook để sử dụng trong các component

// Trả về:
{
  user: AdminUser | null,
  isLoading: boolean,
  logout: () => void
}
```

## Các Thành Phần UI Được Sử Dụng

- Card, Button, Input, Label
- Textarea, Select
- Table, Dialog, Alert Dialog
- Icons từ lucide-react
- Recharts (biểu đồ)

## Hướng Phát Triển

### Kết Nối API Thực Tế

1. Cập nhật `service/admin.ts` để kết nối với backend API
2. Thay thế các dữ liệu giả lập bằng các gọi API thực tế
3. Cập nhật `NEXT_PUBLIC_API_URL` trong `.env.local`

### Thêm Tính Năng Mới

1. Tạo folder mới trong `app/admin/`
2. Tạo `page.tsx` cho tính năng mới
3. Thêm menu item vào `app/admin/layout.tsx`
4. Tạo service methods trong `service/admin.ts`

### Xác Thực

- Hiện tại sử dụng xác thực đơn giản (token trong localStorage)
- Nên triển khai JWT hoặc OAuth trong production

## Lưu Ý Quan Trọng

1. **Bảo mật**: Yêu cầu xác thực cho tất cả các tuyến admin
2. **Phân quyền**: Nên triển khai kiểm soát truy cập dựa trên vai trò (RBAC)
3. **Logging**: Ghi lại tất cả các hành động quản lý để kiểm tra
4. **Validation**: Xác thực dữ liệu từ phía client và server

## Hỗ Trợ

Nếu gặp vấn đề, vui lòng kiểm tra:

1. Kết nối API
2. Token xác thực
3. Quyền truy cập của người dùng
4. Console browser để xem các lỗi
