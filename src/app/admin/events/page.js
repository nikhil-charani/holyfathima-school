"use client";

import { useState } from "react";
import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";
import { collection, doc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus, Trash2, Edit, Calendar, MapPin, X } from "lucide-react";
import Image from "next/image";

export default function EventsPage() {
  const { data: events, loading } = useRealtimeCollection("events", { orderByField: "date", orderDirection: "desc" });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");

  const openCreateModal = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setDate("");
    setLocation("");
    setImageFile(null);
    setExistingImageUrl("");
    setIsModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingId(event.id);
    setTitle(event.title);
    setDescription(event.description);
    setDate(event.date);
    setLocation(event.location);
    setImageFile(null);
    setExistingImageUrl(event.imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = existingImageUrl;

      if (imageFile) {
        const imageRef = ref(storage, `events/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const payload = {
        title,
        description,
        date,
        location,
        imageUrl,
        updatedAt: new Date()
      };

      if (editingId) {
        await updateDoc(doc(db, "events", editingId), payload);
      } else {
        payload.createdAt = new Date();
        await addDoc(collection(db, "events"), payload);
      }

      closeModal();
    } catch (error) {
      console.error("Error saving event:", error);
      alert("Failed to save event");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteDoc(doc(db, "events", id));
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-poppins text-foreground">Events Management</h1>
        <Button onClick={openCreateModal}>
          <Plus className="mr-2 h-4 w-4" /> Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events?.length === 0 ? (
          <div className="col-span-full py-12 text-center text-muted-foreground border-2 border-dashed rounded-xl">
            <Calendar className="mx-auto h-12 w-12 opacity-20 mb-3" />
            <p>No events found. Create your first event!</p>
          </div>
        ) : (
          events?.map((event) => (
            <Card key={event.id} className="overflow-hidden flex flex-col">
              <div className="relative h-48 w-full bg-muted">
                {event.imageUrl ? (
                  <Image src={event.imageUrl} alt={event.title} fill className="object-cover" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Calendar className="h-10 w-10 text-muted-foreground opacity-30" />
                  </div>
                )}
              </div>
              <CardContent className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-bold font-poppins text-foreground mb-2 line-clamp-1">{event.title}</h3>
                
                <div className="space-y-1 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
                
                <p className="text-sm text-foreground line-clamp-3 mb-6 flex-1">{event.description}</p>
                
                <div className="flex items-center gap-2 mt-auto">
                  <Button variant="outline" className="flex-1" onClick={() => openEditModal(event)}>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDelete(event.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-muted/30">
              <h2 className="text-xl font-bold font-poppins">{editingId ? 'Edit Event' : 'Create New Event'}</h2>
              <button onClick={closeModal} className="text-muted-foreground hover:bg-muted p-2 rounded-full transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="event-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title</Label>
                  <Input id="title" required value={title} onChange={e => setTitle(e.target.value)} placeholder="Annual Sports Day" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" required value={date} onChange={e => setDate(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" required value={location} onChange={e => setLocation(e.target.value)} placeholder="School Main Ground" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    required
                    rows={4}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Provide details about the event..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Banner Image</Label>
                  <Input id="image" type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} />
                  {(existingImageUrl || imageFile) && (
                    <p className="text-xs text-muted-foreground mt-1">Image selected.</p>
                  )}
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t bg-muted/10 flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={closeModal}>Cancel</Button>
              <Button type="submit" form="event-form" disabled={isSubmitting}>
                {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : 'Save Event'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
