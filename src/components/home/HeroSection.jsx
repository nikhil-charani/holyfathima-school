"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, MessageCircle, PhoneCall, PlayCircle } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Video Background Fallback / Gradient */}
      <div className="absolute inset-0 bg-primary/90 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
        >
          {/* We will use a placeholder reliable source or leave blank to show the nice gradient */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-students-walking-in-a-university-campus-4286-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 text-sm font-medium text-secondary mb-6 backdrop-blur-md"
        >
          <span className="flex h-2 w-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
          Admissions Open for 2026-2027
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-poppins max-w-4xl"
        >
          Empowering Minds for a <span className="text-secondary">Brighter</span> Tomorrow
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl font-inter"
        >
          Holy Fathima Kidz High School provides world-class education, fostering holistic development and academic excellence.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button size="lg" className="h-14 px-8 text-lg rounded-full" variant="secondary">
            Apply Now <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="glass" className="h-14 px-8 text-lg rounded-full">
            <PlayCircle className="mr-2 h-5 w-5" /> Virtual Tour
          </Button>
          <Button size="lg" variant="glass" className="h-14 px-8 text-lg rounded-full">
            <Download className="mr-2 h-5 w-5" /> Brochure
          </Button>
        </motion.div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="h-14 w-14 rounded-full bg-success text-white shadow-lg flex items-center justify-center hover:bg-success/90 transition-colors"
        >
          <MessageCircle className="h-6 w-6" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="h-14 w-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
        >
          <PhoneCall className="h-6 w-6" />
        </motion.button>
      </div>
    </section>
  );
}
