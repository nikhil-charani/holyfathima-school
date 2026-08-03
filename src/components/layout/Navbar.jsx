"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Academics", href: "/academics" },
  { name: "Admissions", href: "/admissions" },
  { name: "Facilities", href: "/facilities" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHiddenRoute = pathname.startsWith("/admin") || pathname.startsWith("/portal");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isHiddenRoute) return null;

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-50">
            <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="text-white h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className={`font-poppins font-bold text-lg leading-tight ${scrolled ? "text-foreground" : "text-white"}`}>
                Holy Fathima
              </span>
              <span className={`text-xs font-medium tracking-wider ${scrolled ? "text-primary" : "text-secondary"}`}>
                KIDZ HIGH SCHOOL
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-medium text-sm hover:text-primary transition-colors ${
                  scrolled ? "text-foreground" : "text-gray-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/admissions">
              <Button className="rounded-full px-6 shadow-md" variant={scrolled ? "default" : "secondary"}>
                Apply Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden z-50 p-2 rounded-md ${scrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-40 bg-background flex flex-col pt-24 px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-6 text-2xl font-poppins font-semibold">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="hover:text-primary transition-colors border-b pb-4 border-muted"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="mt-8 flex flex-col gap-4">
              <Link href="/admissions" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full h-14 text-lg rounded-xl">Apply for Admission</Button>
              </Link>
              <Link href="/portal/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full h-14 text-lg rounded-xl">Parent Portal Login</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
