require('dotenv').config({ path: '.env.local' });
const { initializeApp, cert } = require('firebase-admin/app');
const { getStorage } = require('firebase-admin/storage');

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

const app = initializeApp({
  credential: cert({
    projectId,
    clientEmail,
    privateKey,
  }),
  storageBucket: storageBucket,
});

const bucket = getStorage(app).bucket();

const corsConfiguration = [
  {
    origin: ["*"], 
    method: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "HEAD"],
    responseHeader: ["Content-Type", "Authorization", "Content-Length", "User-Agent", "x-goog-resumable"],
    maxAgeSeconds: 3600
  }
];

async function configureCors() {
  try {
    console.log(`Setting CORS for bucket: ${bucket.name}`);
    await bucket.setCorsConfiguration(corsConfiguration);
    console.log("Successfully set CORS configuration!");
  } catch (error) {
    console.error("Failed to set CORS configuration:", error);
  }
}

configureCors();
