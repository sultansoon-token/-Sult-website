// Dark mode toggle
const darkToggle = document.getElementById('dark-mode-toggle');
darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  darkToggle.setAttribute('aria-pressed', isDark);
});

// Language toggle
const langToggle = document.getElementById('lang-toggle');
const idDiv = document.getElementById('id');
const enDiv = document.getElementById('en');
langToggle.addEventListener('click', () => {
  const isIdActive = idDiv.classList.contains('active');
  if (isIdActive) {
    idDiv.classList.remove('active');
    idDiv.setAttribute('aria-hidden', 'true');
    enDiv.classList.add('active');
    enDiv.setAttribute('aria-hidden', 'false');
    langToggle.textContent = 'Indonesia';
    langToggle.setAttribute('aria-pressed', 'true');
  } else {
    enDiv.classList.remove('active');
    enDiv.setAttribute('aria-hidden', 'true');
    idDiv.classList.add('active');
    idDiv.setAttribute('aria-hidden', 'false');
    langToggle.textContent = 'English';
    langToggle.setAttribute('aria-pressed', 'false');
  }
});

// Countdown Timer Setup (Next burn date set arbitrarily to July 1, 2025)
const nextBurnDate = new Date('2025-07-01T00:00:00Z');

function updateCountdown() {
  const now = new Date();
  const diff = nextBurnDate - now;
  const countdownEl = document.getElementById('countdown');
  const countdownEnEl = document.getElementById('countdown-en');
  if (diff <= 0) {
    countdownEl.textContent = 'Pembakaran sedang berlangsung!';
    countdownEnEl.textContent = 'Burn is happening now!';
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdownEl.textContent = `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`;
  countdownEnEl.textContent = `${days} days ${hours} hrs ${minutes} mins ${seconds} secs`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// Burn tracker simulation (simple increment every second)
let totalBurned = 0;
const maxBurn = 5000000000; // 5 billion planned burn
const burnSpeed = 5000; // tokens per second (adjust as needed)

function updateBurnTracker() {
  totalBurned += burnSpeed;
  if (totalBurned > maxBurn) totalBurned = maxBurn;
  const burnTrackerEl = document.getElementById('burn-tracker');
  const burnTrackerEnEl = document.getElementById('burn-tracker-en');
  burnTrackerEl.textContent = `Total token terbakar: ${totalBurned.toLocaleString()} $SULT`;
  burnTrackerEnEl.textContent = `Total tokens burned: ${totalBurned.toLocaleString()} $SULT`;
}
setInterval(updateBurnTracker, 1000);
updateBurnTracker();

// Community shoutbox (local only, no backend)
function setupShoutbox(lang) {
  const messagesDiv = document.getElementById(`shoutbox-messages${lang ? '-' + lang : ''}`);
  const input = document.getElementById(`shoutbox-input${lang ? '-' + lang : ''}`);
  const sendBtn = document.getElementById(`shoutbox-send${lang ? '-' + lang : ''}`);

  sendBtn.addEventListener('click', () => {
    const msg = input.value.trim();
    if (!msg) return;
    const msgEl = document.createElement('div');
    msgEl.textContent = msg;
    messagesDiv.appendChild(msgEl);
    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  });

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendBtn.click();
  });
}

setupShoutbox('');
setupShoutbox('en');
                            
