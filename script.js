// script.js - Modern Dark Site
const DEFAULT_BOTS = {
  sessionBot: "@session_user_bot",
  fakeMailBot: "@fake_mail_bot",
  emailtouserbot: "@email_to_user_bot"
};

// ⚠️ DEĞİŞTİR: Güvenlik için kendi kullanıcı adı ve şifreni koy
const ADMIN_USER = "admin";
const ADMIN_PASS = "12345";

document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("sessionBot")) {
    loadBots();
  }

  if (document.getElementById("loginForm")) {
    document.getElementById("loginForm").addEventListener("submit", login);
    document.getElementById("botForm").addEventListener("submit", saveBots);

    if (localStorage.getItem("adminLoggedIn")) {
      showEditForm();
    }
  }
});

function loadBots() {
  document.getElementById("sessionBot").textContent =
    localStorage.getItem("sessionBot") || DEFAULT_BOTS.sessionBot;
  document.getElementById("fakeMailBot").textContent =
    localStorage.getItem("fakeMailBot") || DEFAULT_BOTS.fakeMailBot;
  document.getElementById("otherBot").textContent =
    localStorage.getItem("otherBot") || DEFAULT_BOTS.otherBot;
}

function login(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    localStorage.setItem("adminLoggedIn", "true");
    showEditForm();
  } else {
    alert("❌ Kullanıcı adı veya şifre hatalı!");
  }
}

function showEditForm() {
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("editForm").style.display = "block";

  document.getElementById("sessionBot").value = localStorage.getItem("sessionBot") || DEFAULT_BOTS.sessionBot;
  document.getElementById("fakeMailBot").value = localStorage.getItem("fakeMailBot") || DEFAULT_BOTS.fakeMailBot;
  document.getElementById("otherBot").value = localStorage.getItem("otherBot") || DEFAULT_BOTS.otherBot;
}

function saveBots(e) {
  e.preventDefault();
  const sessionBot = document.getElementById("sessionBot").value.trim();
  const fakeMailBot = document.getElementById("fakeMailBot").value.trim();
  const otherBot = document.getElementById("otherBot").value.trim();

  localStorage.setItem("sessionBot", sessionBot);
  localStorage.setItem("fakeMailBot", fakeMailBot);
  localStorage.setItem("otherBot", otherBot);

  alert("✅ Bot bilgileri başarıyla kaydedildi!");
  loadBots();
}

function logout() {
  localStorage.removeItem("adminLoggedIn");
  alert("Çıkış yapıldı.");
  window.location.href = "index.html";
}
