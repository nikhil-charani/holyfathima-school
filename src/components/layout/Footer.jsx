"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const isHiddenRoute = pathname.startsWith("/admin") || pathname.startsWith("/portal");

  if (isHiddenRoute) return null;

  return (
    <footer className="bg-foreground text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="text-white h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-poppins font-bold text-xl leading-tight text-white">
                  Holy Fathima
                </span>
                <span className="text-xs font-medium tracking-wider text-secondary">
                  KIDZ HIGH SCHOOL
                </span>
              </div>
            </Link>
            <p className="text-gray-400 mb-6 font-inter">
              Empowering minds for a brighter tomorrow through holistic education and modern learning methodologies.
            </p>
            <div className="flex gap-4">
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6 border-b border-white/10 pb-2 inline-block">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/about" className="text-gray-400 hover:text-secondary transition-colors">About Us</Link></li>
              <li><Link href="/academics" className="text-gray-400 hover:text-secondary transition-colors">Academics</Link></li>
              <li><Link href="/admissions" className="text-gray-400 hover:text-secondary transition-colors">Admissions</Link></li>
              <li><Link href="/facilities" className="text-gray-400 hover:text-secondary transition-colors">Facilities</Link></li>
              <li><Link href="/gallery" className="text-gray-400 hover:text-secondary transition-colors">Gallery</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-secondary transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6 border-b border-white/10 pb-2 inline-block">Resources</h4>
            <ul className="flex flex-col gap-3">
              <li><Link href="/downloads" className="text-gray-400 hover:text-secondary transition-colors">Download Center</Link></li>
              <li><Link href="/notice-board" className="text-gray-400 hover:text-secondary transition-colors">Notice Board</Link></li>
              <li><Link href="/events" className="text-gray-400 hover:text-secondary transition-colors">Event Calendar</Link></li>
              <li><Link href="/portal/login" className="text-gray-400 hover:text-secondary transition-colors">Parent Portal</Link></li>
              <li><Link href="/achievements" className="text-gray-400 hover:text-secondary transition-colors">Student Achievements</Link></li>
              <li><Link href="/faq" className="text-gray-400 hover:text-secondary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-poppins font-semibold text-lg mb-6 border-b border-white/10 pb-2 inline-block">Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                <span className="text-gray-400">123 Education Boulevard, Knowledge City, Telangana, 500001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span className="text-gray-400">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-gray-400">admissions@holyfathima.edu</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Holy Fathima Kidz High School. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
