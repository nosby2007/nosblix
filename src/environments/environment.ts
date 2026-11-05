// Firebase client configuration (not a secret). Restrict API keys to authorized services/domains.
// Uses the SAME Firebase project as the canonical Innovacare Training app.
// Firebase Auth authorized domains and Firestore security rules must be verified before deployment.
export const environment = {
  firebase: {
    apiKey: 'AIzaSyBPdPmD8m9JqFf4v7tKUg71l79obSSzD-E',
    authDomain: 'innovacare-training.firebaseapp.com',
    projectId: 'innovacare-training',
    appId: '1:355807336211:web:1dc5e0916ff67f95ce2ce6',
  },
  trainingBaseUrl: 'https://innovacare-training.web.app'
};
