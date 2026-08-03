require('dotenv').config({ path: '.env.local' });
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore } = require('firebase-admin/firestore');

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

const auth = getAuth();
const db = getFirestore();

async function createAdminUser() {
  const email = "admin@holyfathima.edu";
  const password = "AdminPassword123!";

  try {
    let userRecord;
    try {
      // Check if user already exists
      userRecord = await auth.getUserByEmail(email);
      console.log(`User ${email} already exists. Updating password...`);
      userRecord = await auth.updateUser(userRecord.uid, { password });
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        // Create new user
        console.log(`Creating new user ${email}...`);
        userRecord = await auth.createUser({
          email: email,
          password: password,
          displayName: "Super Admin",
        });
      } else {
        throw error;
      }
    }

    // Set custom claims (optional, but good practice)
    await auth.setCustomUserClaims(userRecord.uid, { admin: true });

    // Save to Firestore users collection
    await db.collection("users").doc(userRecord.uid).set({
      email: email,
      role: "admin",
      createdAt: new Date(),
    }, { merge: true });

    console.log("=========================================================");
    console.log("SUCCESS! Admin user created/updated successfully.");
    console.log("Email:    ", email);
    console.log("Password: ", password);
    console.log("=========================================================");

  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}

createAdminUser();
