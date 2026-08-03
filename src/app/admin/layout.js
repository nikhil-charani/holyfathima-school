import Link from "next/link";
import { LayoutDashboard, Users, Image as ImageIcon, Calendar, FileText, Settings, BookOpen } from "lucide-react";
import AdminBottomNav from "@/components/admin/AdminBottomNav";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata = {
  title: "Admin Dashboard | Holy Fathima",
};

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-foreground text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold font-poppins">Admin Portal</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 bg-white/10 rounded-lg text-sm font-medium">
            <LayoutDashboard className="h-5 w-5" /> Dashboard
          </Link>
          <Link href="/admin/admissions" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">
            <Users className="h-5 w-5" /> Admissions
          </Link>
          <Link href="/admin/gallery" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">
            <ImageIcon className="h-5 w-5" /> Gallery
          </Link>
          <Link href="/admin/events" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">
            <Calendar className="h-5 w-5" /> Events & News
          </Link>
          <Link href="/admin/inquiries" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">
            <FileText className="h-5 w-5" /> Inquiries
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg text-sm font-medium transition-colors">
            <Settings className="h-5 w-5" /> Settings
          </Link>
          <LogoutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b flex items-center px-4 md:px-6 justify-between">
          <div className="flex items-center gap-2 md:hidden">
            <div className="h-8 w-8 bg-primary rounded flex items-center justify-center">
              <BookOpen className="text-white h-5 w-5" />
            </div>
            <span className="font-poppins font-bold text-foreground">Admin Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex h-8 w-8 rounded-full bg-primary text-white items-center justify-center font-bold">
              A
            </div>
            <span className="hidden md:block font-medium text-sm">Super Admin</span>
            <div className="md:hidden">
              <LogoutButton isMobile={true} />
            </div>
          </div>
        </header>
        <div className="p-4 md:p-6 flex-1 overflow-auto pb-24 md:pb-6">
          {children}
        </div>
      </main>
        <AdminBottomNav />
      </div>
    </ProtectedRoute>
  );
}
