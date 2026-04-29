'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdminPageWrapperProps {
  children: React.ReactNode;
}

/**
 * AdminPageWrapper - Ensures user is authenticated before accessing admin pages
 *
 * Usage:
 * export default function AdminPage() {
 *   return (
 *     <AdminPageWrapper>
 *       <YourAdminComponent />
 *     </AdminPageWrapper>
 *   );
 * }
 */
export const AdminPageWrapper = ({ children }: AdminPageWrapperProps) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const adminUser = localStorage.getItem('admin_user');

      if (token && adminUser) {
        setIsAuthenticated(true);
      } else {
        router.push('/admin/login');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will be redirected
  }

  return <>{children}</>;
};

export default AdminPageWrapper;
