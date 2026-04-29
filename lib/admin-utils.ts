// Admin Panel Constants and Utilities

export const ADMIN_MENU_ITEMS = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    path: '/admin',
    icon: 'LayoutDashboard',
  },
  {
    id: 'tours',
    name: 'Quản lý Tour',
    path: '/admin/tours',
    icon: 'MapPin',
  },
  {
    id: 'categories',
    name: 'Quản lý Danh Mục',
    path: '/admin/categories',
    icon: 'Folder',
  },
  {
    id: 'orders',
    name: 'Quản lý Đơn Hàng',
    path: '/admin/orders',
    icon: 'ShoppingCart',
  },
  {
    id: 'reviews',
    name: 'Quản lý Đánh Giá',
    path: '/admin/reviews',
    icon: 'Star',
  },
  {
    id: 'accounts',
    name: 'Quản lý Tài Khoản',
    path: '/admin/accounts',
    icon: 'Users',
  },
];

export const TOUR_CATEGORIES = [
  { value: 'beach', label: 'Du Lịch Biển' },
  { value: 'mountain', label: 'Du Lịch Miền Núi' },
  { value: 'rural', label: 'Du Lịch Nông Thôn' },
  { value: 'culture', label: 'Du Lịch Văn Hóa' },
  { value: 'adventure', label: 'Du Lịch Mạo Hiểm' },
];

export const ORDER_STATUSES = [
  { value: 'pending', label: 'Chờ Xác Nhận', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'confirmed', label: 'Đã Xác Nhận', color: 'bg-blue-100 text-blue-700' },
  { value: 'completed', label: 'Hoàn Thành', color: 'bg-green-100 text-green-700' },
  { value: 'cancelled', label: 'Đã Hủy', color: 'bg-red-100 text-red-700' },
];

export const REVIEW_STATUSES = [
  { value: 'approved', label: 'Đã Duyệt', color: 'bg-green-100 text-green-700' },
  { value: 'pending', label: 'Chờ Duyệt', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'rejected', label: 'Từ Chối', color: 'bg-red-100 text-red-700' },
];

export const USER_ROLES = [
  { value: 'user', label: 'Người Dùng' },
  { value: 'moderator', label: 'Kiểm Duyệt' },
  { value: 'admin', label: 'Quản Trị' },
];

export const ACCOUNT_STATUSES = [
  { value: 'active', label: 'Hoạt Động', color: 'bg-green-100 text-green-700' },
  { value: 'inactive', label: 'Không Hoạt Động', color: 'bg-gray-100 text-gray-700' },
  { value: 'suspended', label: 'Bị Khóa', color: 'bg-red-100 text-red-700' },
];

export const getStatusColor = (status: string, type: 'order' | 'review' | 'account' = 'order') => {
  let statuses: any[] = [];

  if (type === 'order') {
    statuses = ORDER_STATUSES;
  } else if (type === 'review') {
    statuses = REVIEW_STATUSES;
  } else if (type === 'account') {
    statuses = ACCOUNT_STATUSES;
  }

  const found = statuses.find((s) => s.value === status);
  return found?.color || 'bg-gray-100 text-gray-700';
};

export const getStatusLabel = (status: string, type: 'order' | 'review' | 'account' = 'order') => {
  let statuses: any[] = [];

  if (type === 'order') {
    statuses = ORDER_STATUSES;
  } else if (type === 'review') {
    statuses = REVIEW_STATUSES;
  } else if (type === 'account') {
    statuses = ACCOUNT_STATUSES;
  }

  const found = statuses.find((s) => s.value === status);
  return found?.label || status;
};

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};

export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(0|\+84)\d{9,10}$/;
  return phoneRegex.test(phone);
};

export const truncateText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;

  return function (...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
