const fs = require('fs');

const rawKey = `-----BEGIN PRIVATE KEY----- 

\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC2Ud3AdibJ+zae\nX NJ6wv2srQd3mR3S3n4ixJ/4+a6e1Q3mbgfnmR0mMPypCNzzCiyjJdCJUPiW3dIy\nEqoJz KZbyNWU4DuwYt4u4DL7nWR8Zj/FCp97V+fiQfUaaBck9Oy4GzgNjEx8NEti\nztEeBiV7m mvgCMg+8XKhsn92IMNP0Ot6rMk9ovvkBD+JQyDJwjY2XXAe1ZfE6dnN\nYdDXvddwMCA 

0iswynajRE+lytDWnuLGNIGKs8MlU1a7lHglTSx1pxsakkenW8Dxh\nwagxsWCI2v0m53u PVU/l87jVQFeE4r2jgh50kk1CXhNl7E9Zy+/j38XitikRsvar\nPn1Y4PUPAgMBAAECggEAQK Gf40jfMk4ATD5qjQNPyyVhlsesV2LxQyEB9tCIUx0C\n+vN5kOPp/e5yuvd94Bh0v3c5yFv wbAcBqyeLqMKoHLSC5m5hKoO58NMgr6rZgvH6\nXD8KTz7X4JDyMyTAQ6Uhv5hClCbu vD8LlGDtp9+U7Q7OfBKQ7iNIuEKfRcCSjFnR\nu0VXxW913epCVi1cGL6ZHq7B/SqJ730v xDo9HWXuhROIEj993fi64MZc7kk/h6DF\nx5OjDuW5NXTZ3j5r6aVUv9GER1fervMLSjug2 uoYksFkqqERB5+B0N7AUyqyd3Rt\nds+W8yKAQdfioQpj6kbYegUvXo+AerbOtIAVkrS4RQ KBgQDhDe17CoSWCS67sTmy\nfmD/e+VfL6Ni7zAfp0IM6nNUgC8nL4SL9z+7nxKIzobjH WCQaixaTm95ll4Pq6hv\nhgdkjPBZ1lTZ1QKywU9QDS6RTzkDZ+z6XQ1kpvLkx0P6Kn6Qp 191iTJwwgYKOUPc\ncZuSkZPt7DqCOouWxfyZHD5GxQKBgQDPY6Z2aoft8QDDEmcOgT YNvW3RCSazjbhe\nddub1/f8N/O8uzlBve42Kz4XFmjWnE1N4vSe584KnTHReGLOWz4F Wu/HXgCcm2d3\nWqcliBtvNlly9fYEpsvByc3NcEftIimLVTZ4Hn4LL2yIFOUs4Q0cn+bREr 4mts9L\nc6oTaWWpwwKBgEAep7qWlI/qrdXr+HRSbXBc7EziVbqqSxu5m6fyZEl++/A+KZ V3\nLEFYYP95WBT9GbYLifdwwXHy1XnBfovHs/OB9DikSCiH9+zWBrLYDpx35daClZH/\n UQGMT0e/Pi7YTJcKGLh0Dlrx7KadCiiUda6cq3juBP11kK+0WPOGiHfBAoGBALYn\n5b8e xPO2eh/c2w3/adXZq0ouioKtGOJHDLQulo8/KeN8YscepsuHYcrvkPfnY3Lk\nxE2KdwwVk /tTjR2JQMl9XRw0sb7cNJ29zxAFI2ukRh7WcNcXFeLJeO1YEKT1G55Z\nIzWQOs9iQSapi7 3GkjixLhA3MTNZ4Gt6VUklivj3AoGAbsLEgTZv6kUo7o0MiJGW\nI32Uzmf7c4o8suy4fI+C 7e1ar9Zyy4Vryt3x9uwy11cR6UB6pT0Z29CsT5n4Vr44\nqAKG5kM7qKKQFCc8t1xuaH29 Z4lVsfu44xnGzYxJg1LkRyeRv2GOGTn6QE0hnVwJ\nSr+RivI7MRxeoU5BDjfQBYw=\n----END PRIVATE KEY-----`;

// Remove all spaces, \n, \r that are between BEGIN and END tags
let inner = rawKey.replace('-----BEGIN PRIVATE KEY-----', '').replace('----END PRIVATE KEY-----', '');
inner = inner.replace(/[\n\r\s]/g, '');

const finalKey = `-----BEGIN PRIVATE KEY-----\n${inner}\n-----END PRIVATE KEY-----\n`;

const envContent = `NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyCEh40-OKLukl8ucGX-Qf9CD2zl_6RvAns"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="holyfathima-school.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="holyfathima-school"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="holyfathima-school.firebasestorage.app"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="495872723815"
NEXT_PUBLIC_FIREBASE_APP_ID="1:495872723815:web:1b90feed90e0c29d6a7dc2"

FIREBASE_CLIENT_EMAIL="firebase-adminsdk-fbsvc@holyfathimaschool.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="${finalKey.replace(/\n/g, '\\n')}"

GEMINI_API_KEY=""
`;

fs.writeFileSync('C:\\Users\\nikhi\\OneDrive\\Desktop\\school-website\\.env.local', envContent);
console.log('.env.local created successfully');
