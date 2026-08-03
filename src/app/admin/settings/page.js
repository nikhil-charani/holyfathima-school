"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRealtimeDocument } from "@/hooks/useRealtimeDocument";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase/config";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Loader2, Save, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import Image from "next/image";

const settingsSchema = z.object({
  schoolName: z.string().min(2, "School name is required"),
  phone: z.string().min(10, "Phone number is required"),
  whatsapp: z.string().optional(),
  email: z.string().email("Invalid email"),
  address: z.string().min(10, "Address is required"),
  googleMapsUrl: z.string().url().optional().or(z.literal("")),
  facebookUrl: z.string().url().optional().or(z.literal("")),
  instagramUrl: z.string().url().optional().or(z.literal("")),
  youtubeUrl: z.string().url().optional().or(z.literal("")),
});

export default function SettingsPage() {
  const { data: settingsData, loading: settingsLoading } = useRealtimeDocument("settings", "general");
  const [isSaving, setIsSaving] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(settingsSchema),
  });

  // Pre-fill form when data is loaded
  useEffect(() => {
    if (settingsData) {
      reset({
        schoolName: settingsData.schoolName || "",
        phone: settingsData.phone || "",
        whatsapp: settingsData.whatsapp || "",
        email: settingsData.email || "",
        address: settingsData.address || "",
        googleMapsUrl: settingsData.googleMapsUrl || "",
        facebookUrl: settingsData.facebookUrl || "",
        instagramUrl: settingsData.instagramUrl || "",
        youtubeUrl: settingsData.youtubeUrl || "",
      });
      setLogoPreview(settingsData.logoUrl || null);
    }
  }, [settingsData, reset]);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    setIsSaving(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      let logoUrl = settingsData?.logoUrl || null;

      // If new logo is selected, upload to Storage
      if (logoFile) {
        const logoRef = ref(storage, `settings/logo_${Date.now()}_${logoFile.name}`);
        const snapshot = await uploadBytes(logoRef, logoFile);
        logoUrl = await getDownloadURL(snapshot.ref);
      }

      // Save to Firestore
      const settingsRef = doc(db, "settings", "general");
      await setDoc(settingsRef, {
        ...data,
        logoUrl,
        updatedAt: new Date(),
      }, { merge: true });

      setSuccessMsg("Settings saved successfully!");
      setTimeout(() => setSuccessMsg(""), 5000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setErrorMsg("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (settingsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-poppins text-foreground">Global Settings</h1>
      </div>

      {successMsg && (
        <div className="bg-success/10 border border-success/20 text-success p-4 rounded-lg flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5" />
          <p className="font-medium">{successMsg}</p>
        </div>
      )}

      {errorMsg && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg">
          <p className="font-medium">{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>School Information</CardTitle>
            <CardDescription>Primary details displayed across the website.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Logo Upload */}
              <div className="space-y-4">
                <Label>School Logo</Label>
                <div className="relative h-32 w-32 border-2 border-dashed border-muted rounded-xl flex items-center justify-center overflow-hidden bg-muted/20 group hover:border-primary/50 transition-colors">
                  {logoPreview ? (
                    <Image src={logoPreview} alt="Logo preview" fill className="object-contain p-2" />
                  ) : (
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-white text-xs font-medium">Change Logo</span>
                  </div>
                </div>
              </div>

              {/* Basic Details */}
              <div className="flex-1 space-y-4 w-full">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input id="schoolName" {...register("schoolName")} placeholder="Holy Fathima Kidz High School" />
                  {errors.schoolName && <p className="text-xs text-destructive">{errors.schoolName.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address</Label>
                  <textarea
                    id="address"
                    {...register("address")}
                    rows={3}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="123 Education Blvd..."
                  />
                  {errors.address && <p className="text-xs text-destructive">{errors.address.message}</p>}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Official Email</Label>
                <Input id="email" type="email" {...register("email")} placeholder="info@school.edu" />
                {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" {...register("phone")} placeholder="+91 98765 43210" />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                <Input id="whatsapp" {...register("whatsapp")} placeholder="+91 98765 43210" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media & Maps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="googleMapsUrl">Google Maps Embed URL</Label>
              <Input id="googleMapsUrl" {...register("googleMapsUrl")} placeholder="https://www.google.com/maps/embed?pb=..." />
              {errors.googleMapsUrl && <p className="text-xs text-destructive">{errors.googleMapsUrl.message}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebookUrl">Facebook URL</Label>
                <Input id="facebookUrl" {...register("facebookUrl")} placeholder="https://facebook.com/..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagramUrl">Instagram URL</Label>
                <Input id="instagramUrl" {...register("instagramUrl")} placeholder="https://instagram.com/..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="youtubeUrl">YouTube URL</Label>
                <Input id="youtubeUrl" {...register("youtubeUrl")} placeholder="https://youtube.com/..." />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving} className="w-full md:w-auto md:min-w-[200px] h-12">
            {isSaving ? (
              <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving Changes...</>
            ) : (
              <><Save className="mr-2 h-5 w-5" /> Save Settings</>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
