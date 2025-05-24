# 🧠 Memory Echo — Full Project Build Documentation

This document contains a **full step-by-step breakdown** of the Memory Echo project: a creative, interactive web application designed to capture emotional moments as floating, colorful, sound-reactive orbs.

---

## 🚀 Project Summary

**Memory Echo** is a web app that allows users to:
- Record short memory snippets
- Assign a color and sound file to each memory
- See memories float as orbs on a canvas
- Click orbs to play the sound and display the memory
- Authenticate with email or Google
- Have personal, cloud-synced memory data

---

## 🧱 PHASE 1: Project Foundation

### ✅ Set up local files:
- `index.html` for structure
- `style.css` for design
- `script.js` for interactivity

### ✅ Basic HTML setup:
- Added buttons: "Add Memory"
- Created modal with form:
  - Text input
  - Color picker
  - File upload
- Added a `<canvas>` for animation

---

## 🎨 PHASE 2: UI & Orb Animation

### ✅ Used Canvas API:
- Set up animation loop
- Created orb objects with:
  - Position, radius, color, velocity
- Orbs bounce around canvas continuously

### ✅ Added modal popups:
- Shows/hides on button click
- Handles form submission
- Styled with responsive CSS

---

## 🔉 PHASE 3: Memory Input & Audio

### ✅ On form submit:
- Captured text, color, audio file
- Converted sound to base64 string
- Stored data as objects

### ✅ Orb click:
- Matches mouse position to orb
- Plays sound via Web Audio API
- Displays text popup temporarily

---

## 💾 PHASE 4: Firebase Integration

### ✅ Firebase Setup:
- Created Firebase project
- Enabled Realtime Database
- Enabled Authentication (email/password and Google)

### ✅ In code:
- Linked Firebase SDK (compat version)
- Added config and initialized `firebase`, `db`, `auth`

### ✅ Data storage:
- On form submit:
  - Uploaded memory to `users/{uid}/memories` in Firebase
- On app load:
  - Fetched memories from Firebase and displayed orbs

---

## 🔐 PHASE 5: User Authentication

### ✅ UI:
- Created login modal with:
  - Email/password inputs
  - Google login button
- Added logout button

### ✅ Auth logic:
- Used `onAuthStateChanged()` to show/hide app
- `signInWithEmailAndPassword` and `createUserWithEmailAndPassword`
- Google sign-in via popup
- Logout resets app and returns to login screen

---

## 📱 PHASE 6: Responsiveness

### ✅ CSS media queries for:
- Resizing modal
- Adjusting font sizes
- Repositioning orbs

### ✅ Canvas resize:
- Listened to window resize
- Repositioned orbs to stay on screen

---

## ✨ PHASE 7: Polish & UX

### ✅ Replaced alert with toast:
- Created toast notification system
- Showed “Memory saved!” as non-blocking message

### ✅ Added visual polish:
- Background animation (CSS only)
- Hover effects on buttons
- Styled login modal
- Favicon & title

---

## 🌍 PHASE 8: Deployment

### ✅ GitHub:
- Created repo and pushed all code

### ✅ Firebase Hosting:
- Installed Firebase CLI
- Logged in and initialized hosting
- Set public directory as `.`
- Deployed via `firebase deploy`

---

## 🔗 Final Project Links

- **Live App:** https://memory-echo-67c32.web.app
- **Source Code:** https://github.com/Dutchborn/Memory-Echo

---

**Project Complete ✅ — Ready for portfolio, employers, or creative showcase.**