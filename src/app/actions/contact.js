"use server";

import { adminDb } from "@/lib/firebase/admin";
import { Timestamp } from "firebase-admin/firestore";

export async function submitContactForm(formData) {
  try {
    const inquiryRef = adminDb.collection('inquiries').doc();
    const payload = JSON.parse(formData);
    
    await inquiryRef.set({
      ...payload,
      status: "Unread",
      createdAt: Timestamp.now(),
    });

    return { success: true };
  } catch (error) {
    console.error("Contact Submission Error:", error);
    return { success: false, error: "Failed to send message. Please try again later." };
  }
}
