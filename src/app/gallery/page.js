"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const galleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800", span: "md:col-span-2 md:row-span-2", title: "Classroom Learning" },
  { id: 2, src: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800", span: "md:col-span-1 md:row-span-1", title: "Sports Day" },
  { id: 3, src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800", span: "md:col-span-1 md:row-span-1", title: "Library" },
  { id: 4, src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800", span: "md:col-span-1 md:row-span-2", title: "Student Group" },
  { id: 5, src: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800", span: "md:col-span-1 md:row-span-1", title: "Science Fair" },
  { id: 6, src: "https://images.unsplash.com/photo-1511629091441-ee46146481b6?auto=format&fit=crop&q=80&w=800", span: "md:col-span-1 md:row-span-1", title: "Annual Day" },
  { id: 7, src: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800", span: "md:col-span-2 md:row-span-1", title: "School Transport" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="bg-muted/30 py-16 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold font-poppins text-foreground mb-4"
          >
            Photo Gallery
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Glimpses of vibrant campus life, memorable events, and the joyous journey of our students.
          </motion.p>
        </div>
      </section>

      {/* Masonry-style Grid */}
      <section className="py-16 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-3 gap-4 auto-rows-[250px]">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative rounded-2xl overflow-hidden group cursor-pointer ${image.span} min-h-[250px]`}
              >
                <Image
                  src={image.src}
                  alt={image.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-poppins font-semibold text-lg tracking-wide px-4 py-2 border-2 border-white/50 rounded-full">
                    {image.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
