"use client";

import { LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function LogoutButton({ isMobile = false }) {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (isMobile) {
    return (
      <button 
        onClick={handleLogout}
        className="h-8 w-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200 transition-colors"
        title="Logout"
      >
        <LogOut className="h-4 w-4 ml-0.5" />
      </button>
    );
  }

  return (
    <button 
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/20 text-red-400 rounded-lg text-sm font-medium transition-colors"
    >
      <LogOut className="h-5 w-5" /> Logout
    </button>
  );
}
