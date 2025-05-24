// Firebase Configuration
const authScreen = document.getElementById("authScreen");
const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const googleLoginBtn = document.getElementById("googleLoginBtn");

const logoutBtn = document.getElementById("logoutBtn");


// Initialize Firebase
let currentUserId = null; // Used to scope memory data

// Show auth screen until user signs in
auth.onAuthStateChanged((user) => {
  if (user) {
    currentUserId = user.uid;
    authScreen.style.display = "none";
    loadMemories(); // load user-specific memories
  } else {
    authScreen.style.display = "flex";
  }
});

// Email/password login
loginBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  auth.signInWithEmailAndPassword(email, password)
    .catch((err) => alert("Login failed: " + err.message));
});

// Email/password signup
signupBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  auth.createUserWithEmailAndPassword(email, password)
    .catch((err) => alert("Signup failed: " + err.message));
});

// Google sign-in
let isGoogleSigningIn = false;

googleLoginBtn.addEventListener("click", () => {
  if (isGoogleSigningIn) return;

  isGoogleSigningIn = true;

  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .catch((err) => {
      alert("Google sign-in failed: " + err.message);
    })
    .finally(() => {
      isGoogleSigningIn = false;
    });
});


logoutBtn.addEventListener("click", () => {
  auth.signOut()
    .then(() => {
      alert("You’ve been logged out.");
      window.location.reload(); // Refresh to show auth screen
    })
    .catch((err) => {
      alert("Logout failed: " + err.message);
    });
});

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.remove("hidden");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hidden");
  }, 3000);
}


// Select elements
const addMemoryBtn = document.getElementById("addMemoryBtn");
const memoryModal = document.getElementById("memoryModal");
const closeModal = document.getElementById("closeModal");

// Show modal
addMemoryBtn.addEventListener("click", () => {
  memoryModal.classList.remove("hidden");
});

// Hide modal
closeModal.addEventListener("click", () => {
  memoryModal.classList.add("hidden");
});

const memoryForm = document.getElementById("memoryForm");
const memoryText = document.getElementById("memoryText");
const colorPicker = document.getElementById("colorPicker");
const soundUpload = document.getElementById("soundUpload");

// Save memory to Firebase
memoryForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const text = memoryText.value.trim();
  const color = colorPicker.value;
  const soundFile = soundUpload.files[0];

  if (!text || !soundFile) {
    alert("Please enter text and upload a sound.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const memory = {
      text,
      color,
      sound: event.target.result
    };

    const newMemoryRef = db.ref(`users/${currentUserId}/memories`).push();

    newMemoryRef.set(memory, (error) => {
      if (error) {
        alert("Error saving memory: " + error);
      } else {
        memoryForm.reset();
        memoryModal.classList.add("hidden");
        showToast("Memory saved!");
        loadMemories(); // Refresh orbs from Firebase
      }
    });
  };

  reader.readAsDataURL(soundFile);
});

// 🎨 Canvas & Orb Animation
const canvas = document.getElementById("memoryCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Prevent orbs from going off-screen
  orbs.forEach((orb) => {
    orb.x = Math.min(orb.x, canvas.width - orb.radius);
    orb.y = Math.min(orb.y, canvas.height - orb.radius);
  });
});


// Memory Orbs
let orbs = [];

function loadMemories() {
  db.ref(`users/${currentUserId}/memories`).once("value", (snapshot) => {

    const data = snapshot.val();
    orbs = [];

    for (let id in data) {
      const mem = data[id];
      orbs.push({
        id,
        text: mem.text,
        color: mem.color,
        sound: mem.sound,
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 20 + Math.random() * 20,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 1
      });
    }
  });
}

// Animate Orbs
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  orbs.forEach((orb) => {
    ctx.beginPath();
    ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
    ctx.fillStyle = orb.color;
    ctx.fill();
    ctx.closePath();

    orb.x += orb.dx;
    orb.y += orb.dy;

    // Bounce off walls
    if (orb.x + orb.radius > canvas.width || orb.x - orb.radius < 0) orb.dx *= -1;
    if (orb.y + orb.radius > canvas.height || orb.y - orb.radius < 0) orb.dy *= -1;
  });

  requestAnimationFrame(animate);
}

// Initial Load
animate();

// Handle orb click
canvas.addEventListener("click", function (e) {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  orbs.forEach((orb) => {
    const dx = mouseX - orb.x;
    const dy = mouseY - orb.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < orb.radius) {
      showMemoryPopup(orb.text);

      const audio = new Audio(orb.sound);
      audio.play();
    }
  });
});

// Create floating memory popup
function showMemoryPopup(text) {
  const popup = document.createElement("div");
  popup.classList.add("memory-popup");
  popup.innerText = text;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add("fade-out");
  }, 2500);

  setTimeout(() => {
    popup.remove();
  }, 3500);
}
