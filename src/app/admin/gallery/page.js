"use client";

import { useState } from "react";
import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";
import { collection, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload, Trash2, Edit2, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

const categories = ["Campus", "Activities", "Events", "Sports", "Celebrations"];

export default function GalleryPage() {
  const { data: images, loading } = useRealtimeCollection("gallery", { orderByField: "createdAt", orderDirection: "desc" });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState("Campus");
  const [title, setTitle] = useState("");
  
  const [activeFilter, setActiveFilter] = useState("All");

  const openModal = () => {
    setImageFile(null);
    setCategory("Campus");
    setTitle("");
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!imageFile) return alert("Please select an image");
    
    setIsSubmitting(true);
    try {
      // 1. Upload to Storage
      const fileName = `${Date.now()}_${imageFile.name}`;
      const imageRef = ref(storage, `gallery/${fileName}`);
      const snapshot = await uploadBytes(imageRef, imageFile);
      const imageUrl = await getDownloadURL(snapshot.ref);

      // 2. Save metadata to Firestore
      await addDoc(collection(db, "gallery"), {
        title,
        category,
        imageUrl,
        fileName, // Store to easily delete from storage later
        createdAt: new Date()
      });

      closeModal();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (imageDoc) => {
    if (window.confirm("Are you sure you want to delete this image?")) {
      try {
        // Delete from Firestore
        await deleteDoc(doc(db, "gallery", imageDoc.id));
        
        // Delete from Storage
        if (imageDoc.fileName) {
          const imageRef = ref(storage, `gallery/${imageDoc.fileName}`);
          await deleteObject(imageRef).catch(e => console.log("Storage delete error (might not exist):", e));
        }
      } catch (error) {
        console.error("Error deleting image:", error);
        alert("Failed to delete image");
      }
    }
  };

  const handleCategoryChange = async (id, newCategory) => {
    try {
      await updateDoc(doc(db, "gallery", id), { category: newCategory });
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category");
    }
  };

  const filteredImages = activeFilter === "All" 
    ? images 
    : images?.filter(img => img.category === activeFilter);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold font-poppins text-foreground">Gallery Management</h1>
        <Button onClick={openModal}>
          <Upload className="mr-2 h-4 w-4" /> Upload Image
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Button 
          variant={activeFilter === "All" ? "default" : "outline"} 
          onClick={() => setActiveFilter("All")}
          size="sm"
          className="rounded-full"
        >
          All
        </Button>
        {categories.map(cat => (
          <Button 
            key={cat}
            variant={activeFilter === cat ? "default" : "outline"} 
            onClick={() => setActiveFilter(cat)}
            size="sm"
            className="rounded-full"
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Image Grid */}
      {filteredImages?.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground border-2 border-dashed rounded-xl">
          <ImageIcon className="mx-auto h-12 w-12 opacity-20 mb-3" />
          <p>No images found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages?.map((image) => (
            <div key={image.id} className="group relative rounded-xl overflow-hidden bg-muted aspect-square border border-muted-foreground/20">
              <Image 
                src={image.imageUrl} 
                alt={image.title || "Gallery image"} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                <div className="flex justify-end">
                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(image)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <p className="text-white font-medium text-sm line-clamp-1">{image.title || "Untitled"}</p>
                  <select 
                    value={image.category}
                    onChange={(e) => handleCategoryChange(image.id, e.target.value)}
                    className="w-full text-xs bg-white/20 text-white border-none rounded py-1 px-2 focus:ring-0 cursor-pointer"
                  >
                    {categories.map(cat => <option key={cat} value={cat} className="text-black">{cat}</option>)}
                  </select>
                </div>
              </div>
              
              {/* Category Badge (visible without hover) */}
              <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider group-hover:opacity-0 transition-opacity">
                {image.category}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-muted/30">
              <h2 className="text-xl font-bold font-poppins">Upload Image</h2>
              <button onClick={closeModal} className="text-muted-foreground hover:bg-muted p-2 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6">
              <form id="upload-form" onSubmit={handleUpload} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="imageFile">Select Image</Label>
                  <Input id="imageFile" type="file" accept="image/*" required onChange={e => setImageFile(e.target.files[0])} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Title (Optional)</Label>
                  <Input id="title" value={title} onChange={e => setTitle(e.target.value)} placeholder="E.g., Science Fair Winners" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <select 
                    id="category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t bg-muted/10 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
              <Button type="submit" form="upload-form" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Uploading...</> : 'Upload'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
