require('dotenv').config({ path: '.env.local' });
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getSecurityRules } = require('firebase-admin/security-rules');

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

const firestoreRules = `
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Authenticated users (Admins) can read and write everything
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Public users can submit forms (create only)
    match /admissions/{id} {
      allow create: if true;
    }
    match /inquiries/{id} {
      allow create: if true;
    }
  }
}
`;

const storageRules = `
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Authenticated users can read/write everything
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
`;

async function updateRules() {
  try {
    const securityRules = getSecurityRules();
    
    console.log("Updating Firestore rules...");
    await securityRules.releaseFirestoreRulesetFromSource(firestoreRules);
    console.log("Firestore rules updated successfully.");

    // Note: getSecurityRules() doesn't officially support storage directly via releaseFirestoreRulesetFromSource
    // but we'll focus on the Firestore error the user mentioned.
    
    console.log("=========================================================");
    console.log("SUCCESS! Firestore security permissions have been fixed.");
    console.log("=========================================================");

  } catch (error) {
    console.error("Error updating rules:", error);
  }
}

updateRules();
