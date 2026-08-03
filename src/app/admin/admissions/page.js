"use client";

import { useState } from "react";
import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, CheckCircle, XCircle, Trash2, Eye } from "lucide-react";

export default function AdmissionsPage() {
  const { data: admissions, loading } = useRealtimeCollection("admissions", { orderByField: "createdAt" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const docRef = doc(db, "admissions", id);
      await updateDoc(docRef, { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this admission record? This action cannot be undone.")) {
      try {
        await deleteDoc(doc(db, "admissions", id));
      } catch (error) {
        console.error("Error deleting record:", error);
        alert("Failed to delete record");
      }
    }
  };

  const filteredAdmissions = admissions?.filter(admission => {
    const matchesSearch = 
      admission.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.parentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.parentEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admission.parentPhone?.includes(searchTerm);
    
    const matchesStatus = filterStatus === "All" || admission.status === filterStatus || (!admission.status && filterStatus === "Pending");
    
    return matchesSearch && matchesStatus;
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
        <h1 className="text-3xl font-bold font-poppins text-foreground">Admissions Management</h1>
        
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search names, email, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="flex h-10 w-[140px] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Reviewed">Reviewed</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admission Applications ({filteredAdmissions?.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                <tr>
                  <th className="px-4 py-3 rounded-tl-lg font-semibold tracking-wider">Student Info</th>
                  <th className="px-4 py-3 font-semibold tracking-wider">Parent Info</th>
                  <th className="px-4 py-3 font-semibold tracking-wider">Parent Mobile</th>
                  <th className="px-4 py-3 font-semibold tracking-wider">Class</th>
                  <th className="px-4 py-3 font-semibold tracking-wider">Date</th>
                  <th className="px-4 py-3 font-semibold tracking-wider">Status</th>
                  <th className="px-4 py-3 text-right rounded-tr-lg font-semibold tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAdmissions?.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-4 py-8 text-center text-muted-foreground">
                      No admission records found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredAdmissions?.map((admission) => (
                    <tr key={admission.id} className="border-b last:border-0 hover:bg-muted/10 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-foreground">{admission.studentName}</p>
                        <p className="text-xs text-muted-foreground">DOB: {admission.dateOfBirth}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium">{admission.parentName}</p>
                        <p className="text-xs text-muted-foreground">{admission.parentEmail || "No Email"}</p>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {admission.parentPhone}
                      </td>
                      <td className="px-4 py-3 font-medium">{admission.gradeApplied}</td>
                      <td className="px-4 py-3 text-xs">
                        {admission.createdAt?.seconds 
                            ? new Date(admission.createdAt.seconds * 1000).toLocaleDateString() 
                            : 'Unknown Date'}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                          admission.status === 'Approved' ? 'bg-success/10 text-success' :
                          admission.status === 'Rejected' ? 'bg-destructive/10 text-destructive' :
                          admission.status === 'Reviewed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {admission.status || "Pending"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        {(!admission.status || admission.status === 'Pending' || admission.status === 'Reviewed') && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 text-success hover:text-success hover:bg-success/10"
                            onClick={() => handleStatusUpdate(admission.id, "Approved")}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" /> Approve
                          </Button>
                        )}
                        {(!admission.status || admission.status === 'Pending' || admission.status === 'Reviewed') && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleStatusUpdate(admission.id, "Rejected")}
                          >
                            <XCircle className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(admission.id)}
                          title="Delete Record"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
