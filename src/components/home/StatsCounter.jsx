"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card } from "@/components/ui/card";
import { GraduationCap, Users, Trophy, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { id: 1, label: "Total Students", value: 2500, suffix: "+", icon: Users },
  { id: 2, label: "Expert Faculty", value: 150, suffix: "+", icon: GraduationCap },
  { id: 3, label: "Awards Won", value: 50, suffix: "+", icon: Trophy },
  { id: 4, label: "Success Rate", value: 100, suffix: "%", icon: BookOpen },
];

export default function StatsCounter() {
  const sectionRef = useRef(null);
  const countersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      countersRef.current.forEach((counter, i) => {
        const target = stats[i].value;
        gsap.to(counter, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
          innerHTML: target,
          duration: 2.5,
          ease: "power2.out",
          snap: { innerHTML: 1 },
          onUpdate: function () {
            counter.innerHTML = Math.round(this.targets()[0].innerHTML);
          },
        });
      });

      gsap.from(".stat-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.id} className="stat-card border-none bg-white shadow-sm flex flex-col items-center justify-center p-8 text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Icon className="h-8 w-8 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-4xl font-bold font-poppins text-foreground flex items-center">
                  <span ref={(el) => (countersRef.current[index] = el)}>0</span>
                  {stat.suffix}
                </h3>
                <p className="text-muted-foreground mt-2 font-medium">{stat.label}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
