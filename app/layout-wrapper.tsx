'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useEffect, useState } from 'react';

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsAdminRoute(pathname?.startsWith('/admin') ?? false);
    setMounted(true);
  }, [pathname]);

  if (!mounted) {
    return <>{children}</>;
  }

  return isAdminRoute ? (
    <>{children}</>
  ) : (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
