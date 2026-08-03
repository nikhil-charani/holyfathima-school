"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, BookOpen, Heart, Users, Target, Shield } from "lucide-react";

const coreValues = [
  { icon: Award, title: "Excellence", desc: "Striving for the highest standards in everything we do." },
  { icon: Heart, title: "Compassion", desc: "Fostering a caring and inclusive environment for all." },
  { icon: Shield, title: "Integrity", desc: "Acting with honesty, transparency, and strong moral principles." },
  { icon: Users, title: "Community", desc: "Building strong partnerships between school, home, and society." },
  { icon: BookOpen, title: "Curiosity", desc: "Encouraging a lifelong love for learning and discovery." },
  { icon: Target, title: "Resilience", desc: "Equipping students to overcome challenges and adapt." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=2070"
          alt="School Campus"
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
            About Holy Fathima
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-inter"
          >
            Nurturing young minds to become tomorrow's leaders through holistic education and unwavering dedication since 1995.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold font-poppins text-primary mb-4">Our Mission</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To provide a dynamic educational environment that fosters intellectual, physical, and emotional growth. We are committed to empowering students with the knowledge, skills, and values needed to excel in a rapidly changing world.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold font-poppins text-primary mb-4">Our Vision</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To be a premier institution of excellence that shapes global citizens rooted in strong ethics, driven by innovation, and dedicated to serving society.
                </p>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1000"
                alt="Students learning"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principal's Message */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 h-full">
              <div className="md:col-span-2 relative h-[400px] md:h-auto">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                  alt="Principal"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-bold font-poppins text-foreground mb-6">Principal's Message</h2>
                <blockquote className="text-lg text-muted-foreground italic mb-6 leading-relaxed border-l-4 border-primary pl-4">
                  "Education is not just about academic excellence; it is about character building. At Holy Fathima Kidz High School, we strive to create a nurturing ecosystem where every child feels valued, inspired, and challenged to reach their highest potential."
                </blockquote>
                <div>
                  <h4 className="font-bold text-foreground font-poppins text-xl">Dr. Sarah Williams</h4>
                  <p className="text-primary font-medium">Principal, Holy Fathima</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">The principles that guide our educational philosophy and shape our school culture.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-muted hover:border-primary/50 transition-colors group"
              >
                <div className="h-14 w-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <value.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold font-poppins text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
