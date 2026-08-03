"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Image as ImageIcon, FileText, Settings } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", href: "/admin", icon: LayoutDashboard },
  { name: "Admissions", href: "/admin/admissions", icon: Users },
  { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  { name: "Inquiries", href: "/admin/inquiries", icon: FileText },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminBottomNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-t border-muted px-2 py-2 safe-area-pb">
      <nav className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className="relative flex flex-col items-center justify-center w-16 h-14"
            >
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon 
                className={`h-5 w-5 z-10 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`} 
              />
              <span className={`text-[10px] z-10 font-medium mt-1 transition-colors ${isActive ? "text-primary font-bold" : "text-muted-foreground"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
