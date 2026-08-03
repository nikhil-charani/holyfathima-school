"use server";

import { adminDb } from "@/lib/firebase/admin";
import { Timestamp } from "firebase-admin/firestore";

export async function submitAdmissionForm(formData) {
  try {
    const admissionRef = adminDb.collection('admissions').doc();
    
    // Parse the payload if it's stringified
    const payload = JSON.parse(formData);
    
    await admissionRef.set({
      ...payload,
      status: "Pending",
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    });

    return { success: true, id: admissionRef.id };
  } catch (error) {
    console.error("Admission Submission Error:", error);
    return { success: false, error: "Failed to submit admission form. Please try again." };
  }
}
