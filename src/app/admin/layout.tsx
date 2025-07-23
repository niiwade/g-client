'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/admin/sidebar';
import { MobileNav } from '@/components/admin/mobile-nav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname?.startsWith('/auth');

  // For auth pages, render without sidebar/topbar
  if (isAuthPage) {
    return (
      <div className="h-full">
        {children}
      </div>
    );
  }

  // For dashboard pages, render with sidebar/topbar
  return (
    <div className="h-full">
      {/* Mobile Navigation - Only visible on small screens */}
      <div className="md:hidden">
        <MobileNav />
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex h-full">
        <Sidebar />
        
        <div className="flex-1 h-full overflow-y-auto">
       
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
