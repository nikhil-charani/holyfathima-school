"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MonitorPlay, FlaskConical, Library, Trophy, Bus, BookOpen } from "lucide-react";

const facilities = [
  {
    title: "Smart Classrooms",
    desc: "Air-conditioned classrooms equipped with interactive smart boards, projectors, and high-speed internet to make learning engaging and visually stimulating.",
    icon: MonitorPlay,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Advanced Science Labs",
    desc: "State-of-the-art Physics, Chemistry, and Biology laboratories allowing students to perform hands-on experiments safely.",
    icon: FlaskConical,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Modern Library",
    desc: "A vast collection of academic books, fiction, journals, and digital resources in a quiet, comfortable reading environment.",
    icon: Library,
    image: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Sports Complex",
    desc: "Extensive playgrounds for football, cricket, and athletics, alongside indoor facilities for badminton, table tennis, and chess.",
    icon: Trophy,
    image: "https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Computer Center",
    desc: "High-end computing labs with the latest software and coding platforms to prepare students for the digital future.",
    icon: BookOpen, // Replacing Code icon with BookOpen for simplicity
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000",
  },
  {
    title: "Safe Transport",
    desc: "A fleet of GPS-enabled school buses covering all major routes, ensuring secure and timely transit for all students.",
    icon: Bus,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=1000",
  },
];

export default function FacilitiesPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=2070"
          alt="School Facilities"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white font-poppins mb-4"
          >
            World-Class Facilities
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-inter"
          >
            Providing the perfect infrastructure to support holistic development, creativity, and physical well-being.
          </motion.p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative h-[450px] rounded-3xl overflow-hidden shadow-lg cursor-pointer"
              >
                <Image
                  src={facility.image}
                  alt={facility.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end h-full">
                  <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <facility.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold font-poppins text-white mb-2">{facility.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed opacity-0 transform translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out">
                    {facility.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
