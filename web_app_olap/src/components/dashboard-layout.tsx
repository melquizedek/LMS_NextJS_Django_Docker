'use client';
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Landmark } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserNav } from '@/components/user-nav';
import { navLinks } from '@/lib/data';
import { cn } from '@/lib/utils';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Landmark className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="duration-200 group-data-[collapsible=icon]:opacity-0">
                <h1 className="font-headline text-xl font-semibold">LendFlow</h1>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                <SidebarMenuButton 
                  asChild 
                  isActive={pathname.startsWith(link.href)}
                  tooltip={{children: link.label}}
                  className="justify-start"
                >
                  <Link href={link.href}><link.icon /><span>{link.label}</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm lg:px-6">
           <SidebarTrigger className={cn("md:hidden", "group-data-[collapsible=offcanvas]:flex")}/>
           <div className="flex-1" />
           <UserNav />
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
        </main>
        <footer className="border-t p-4 text-center text-sm text-muted-foreground md:px-6">
          © {new Date().getFullYear()} LendFlow. All rights reserved.
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
