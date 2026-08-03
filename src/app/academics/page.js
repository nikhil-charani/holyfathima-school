"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BookOpen, Monitor, Users, BrainCircuit, Activity, Globe } from "lucide-react";

const methodology = [
  { icon: BrainCircuit, title: "Experiential Learning", desc: "Moving beyond textbooks with hands-on projects, experiments, and real-world problem-solving." },
  { icon: Monitor, title: "Technology Integration", desc: "Using smart boards, digital labs, and e-learning platforms to enhance the modern classroom experience." },
  { icon: Users, title: "Collaborative Environment", desc: "Fostering teamwork and communication skills through group assignments and peer-to-peer learning." },
  { icon: Activity, title: "Continuous Assessment", desc: "Regular, stress-free evaluations focused on understanding and improvement rather than rote memorization." },
];

export default function AcademicsPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=2070"
          alt="Library"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-foreground/70" />
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white font-poppins mb-4"
          >
            Academic Excellence
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-inter"
          >
            A comprehensive curriculum designed to challenge, inspire, and prepare students for a dynamic future.
          </motion.p>
        </div>
      </section>

      {/* Curriculum Structure */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-foreground mb-4">Our Curriculum</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Structured progression that builds foundational knowledge and advances to specialized critical thinking.</p>
          </div>

          <div className="space-y-12">
            {/* Pre-Primary */}
            <div className="bg-white rounded-3xl shadow-lg border border-muted overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-primary/5 p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-primary/10">
                <h3 className="text-2xl font-bold font-poppins text-primary mb-2">Pre-Primary</h3>
                <p className="font-medium text-foreground">Nursery, LKG, UKG</p>
              </div>
              <div className="md:w-2/3 p-8">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Our early childhood program focuses on learning through play, developing fine and gross motor skills, and building early literacy and numeracy foundations. We create a safe, stimulating environment where children naturally develop curiosity.
                </p>
                <ul className="grid grid-cols-2 gap-3 text-sm font-medium text-foreground">
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-secondary" /> Phonics & Language</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-secondary" /> Number Concepts</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-secondary" /> Creative Arts</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-secondary" /> Physical Education</li>
                </ul>
              </div>
            </div>

            {/* Primary */}
            <div className="bg-white rounded-3xl shadow-lg border border-muted overflow-hidden flex flex-col md:flex-row-reverse">
              <div className="md:w-1/3 bg-secondary/10 p-8 flex flex-col justify-center border-b md:border-b-0 md:border-l border-secondary/20">
                <h3 className="text-2xl font-bold font-poppins text-foreground mb-2">Primary School</h3>
                <p className="font-medium text-primary">Class 1 to 5</p>
              </div>
              <div className="md:w-2/3 p-8">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  The primary curriculum emphasizes strong foundational concepts in Mathematics, Sciences, and Languages. We introduce structured conceptual learning while maintaining an interactive and engaging classroom environment.
                </p>
                <ul className="grid grid-cols-2 gap-3 text-sm font-medium text-foreground">
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> English Literature & Grammar</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> Core Mathematics</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> Environmental Science</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> Computer Basics</li>
                </ul>
              </div>
            </div>

            {/* High School */}
            <div className="bg-white rounded-3xl shadow-lg border border-muted overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/3 bg-foreground p-8 flex flex-col justify-center">
                <h3 className="text-2xl font-bold font-poppins text-white mb-2">High School</h3>
                <p className="font-medium text-secondary">Class 6 to 10</p>
              </div>
              <div className="md:w-2/3 p-8">
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  In High School, students engage in rigorous academic disciplines aimed at board examination preparation. The focus shifts to analytical thinking, deep subject matter expertise, and career orientation.
                </p>
                <ul className="grid grid-cols-2 gap-3 text-sm font-medium text-foreground">
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-secondary" /> Advanced Mathematics</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-secondary" /> Physics, Chemistry, Biology</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-secondary" /> Social Sciences</li>
                  <li className="flex items-center gap-2"><div className="h-1.5 w-1.5 rounded-full bg-secondary" /> Coding & AI</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-muted/30 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-foreground mb-4">Teaching Methodology</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">How we deliver education makes all the difference.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {methodology.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-muted flex gap-6"
              >
                <div className="shrink-0 h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-poppins text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
