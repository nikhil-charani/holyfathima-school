"use client";

import { useState } from "react";
import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Trash2, CheckCircle2, MessageSquare } from "lucide-react";

export default function InquiriesPage() {
  const { data: inquiries, loading } = useRealtimeCollection("inquiries", { orderByField: "createdAt" });
  const [searchTerm, setSearchTerm] = useState("");

  const handleMarkContacted = async (id) => {
    try {
      const docRef = doc(db, "inquiries", id);
      await updateDoc(docRef, { status: "Contacted" });
    } catch (error) {
      console.error("Error updating inquiry:", error);
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await deleteDoc(doc(db, "inquiries", id));
      } catch (error) {
        console.error("Error deleting record:", error);
        alert("Failed to delete inquiry");
      }
    }
  };

  const filteredInquiries = inquiries?.filter(inquiry => {
    return inquiry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inquiry.phone?.includes(searchTerm) ||
      inquiry.subject?.toLowerCase().includes(searchTerm.toLowerCase());
  });

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
        <h1 className="text-3xl font-bold font-poppins text-foreground">Inquiries</h1>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search inquiries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredInquiries?.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center h-48 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mb-4 opacity-20" />
              <p>No inquiries found.</p>
            </CardContent>
          </Card>
        ) : (
          filteredInquiries?.map((inquiry) => (
            <Card key={inquiry.id} className={`${inquiry.status === 'Contacted' ? 'bg-muted/30 opacity-75' : 'bg-white shadow-md'}`}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                          {inquiry.name}
                          {inquiry.status !== 'Contacted' && (
                            <span className="bg-primary/10 text-primary text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">New</span>
                          )}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {inquiry.email} • {inquiry.phone}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">
                        {inquiry.createdAt?.seconds 
                          ? new Date(inquiry.createdAt.seconds * 1000).toLocaleString() 
                          : 'Just now'}
                      </span>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <p className="font-semibold text-sm mb-1">Subject: {inquiry.subject}</p>
                      <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{inquiry.message}</p>
                    </div>
                  </div>

                  <div className="flex md:flex-col justify-end gap-2 shrink-0 md:w-32">
                    {inquiry.status !== 'Contacted' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full text-success hover:text-success hover:bg-success/10"
                        onClick={() => handleMarkContacted(inquiry.id)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        Done
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="w-full text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(inquiry.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
