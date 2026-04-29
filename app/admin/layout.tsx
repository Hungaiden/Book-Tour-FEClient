'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  MapPin,
  Folder,
  ShoppingCart,
  Star,
  Users,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: LayoutDashboard,
    },
    {
      name: 'Quản lý Tour',
      path: '/admin/tours',
      icon: MapPin,
    },
    {
      name: 'Quản lý Danh Mục',
      path: '/admin/categories',
      icon: Folder,
    },
    {
      name: 'Quản lý Đơn Hàng',
      path: '/admin/orders',
      icon: ShoppingCart,
    },
    {
      name: 'Quản lý Đánh Giá',
      path: '/admin/reviews',
      icon: Star,
    },
    {
      name: 'Quản lý Tài Khoản',
      path: '/admin/accounts',
      icon: Users,
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-slate-900 text-white transition-all duration-300 fixed h-screen overflow-y-auto`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          {sidebarOpen && <h1 className="text-xl font-bold">Admin Panel</h1>}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-700 rounded transition"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded transition ${
                  isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          {sidebarOpen && (
            <Button
              variant="outline"
              className="w-full text-white border-slate-600 hover:bg-slate-800"
              onClick={handleLogout}
            >
              <LogOut size={18} className="mr-2" />
              Đăng Xuất
            </Button>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className={`${sidebarOpen ? 'ml-64' : 'ml-20'} flex-1 transition-all duration-300`}>
        <div className="p-8 overflow-auto h-screen">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;
