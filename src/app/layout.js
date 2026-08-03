import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AiChatbot from "@/components/chat/AiChatbot";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({ 
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins" 
});

export const metadata = {
  title: "Holy Fathima Kidz High School | Premium Enterprise Education Platform",
  description: "A premium modern school management platform and website for Holy Fathima Kidz High School.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased font-sans flex flex-col min-h-screen`}>
        <SmoothScrollProvider>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <AiChatbot />
          </AuthProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

