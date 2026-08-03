"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Calendar, TrendingUp, Loader2 } from "lucide-react";
import { useRealtimeCollection } from "@/hooks/useRealtimeCollection";

export default function AdminDashboard() {
  const { data: admissions, loading: loadingAdmissions } = useRealtimeCollection("admissions", { orderByField: "createdAt" });
  const { data: inquiries, loading: loadingInquiries } = useRealtimeCollection("inquiries", { orderByField: "createdAt" });
  const { data: events, loading: loadingEvents } = useRealtimeCollection("events", { orderByField: "createdAt" });

  // Calculate stats
  const totalAdmissions = admissions?.length || 0;
  const pendingAdmissions = admissions?.filter(a => a.status === "Pending")?.length || 0;
  const approvedAdmissions = admissions?.filter(a => a.status === "Approved")?.length || 0;
  const rejectedAdmissions = admissions?.filter(a => a.status === "Rejected")?.length || 0;
  
  const totalInquiries = inquiries?.length || 0;
  const totalEvents = events?.length || 0;

  // Recent 5 admissions
  const recentAdmissions = admissions?.slice(0, 5) || [];

  if (loadingAdmissions || loadingInquiries || loadingEvents) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-poppins text-foreground">Dashboard Overview</h1>
        <div className="text-sm text-muted-foreground">Real-time updates active •</div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Admissions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{totalAdmissions}</div>
            <p className="text-xs text-muted-foreground">{pendingAdmissions} Pending Review</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inquiries</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInquiries}</div>
            <p className="text-xs text-muted-foreground">From website contact form</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEvents}</div>
            <p className="text-xs text-muted-foreground">Upcoming & past events</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approval Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {totalAdmissions > 0 ? Math.round((approvedAdmissions / totalAdmissions) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">{rejectedAdmissions} Rejected</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Admissions List */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Admission Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {recentAdmissions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground bg-muted/20 rounded-xl">
                <Users className="h-12 w-12 mb-4 opacity-20" />
                <p>No admission records found.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-muted-foreground uppercase bg-muted/50 rounded-t-lg">
                    <tr>
                      <th className="px-4 py-3 rounded-tl-lg font-semibold tracking-wider">Student Name</th>
                      <th className="px-4 py-3 font-semibold tracking-wider">Class</th>
                      <th className="px-4 py-3 font-semibold tracking-wider">Parent Name</th>
                      <th className="px-4 py-3 font-semibold tracking-wider">Parent Mobile</th>
                      <th className="px-4 py-3 font-semibold tracking-wider">Date</th>
                      <th className="px-4 py-3 rounded-tr-lg font-semibold tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentAdmissions.map((admission) => (
                      <tr key={admission.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                        <td className="px-4 py-3 font-medium text-foreground">{admission.studentName}</td>
                        <td className="px-4 py-3">{admission.gradeApplied}</td>
                        <td className="px-4 py-3">{admission.parentName}</td>
                        <td className="px-4 py-3">{admission.parentPhone}</td>
                        <td className="px-4 py-3">
                          {admission.createdAt?.seconds 
                            ? new Date(admission.createdAt.seconds * 1000).toLocaleDateString() 
                            : 'Just now'}
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            admission.status === 'Approved' ? 'bg-success/10 text-success' :
                            admission.status === 'Rejected' ? 'bg-destructive/10 text-destructive' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {admission.status || "Pending"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
