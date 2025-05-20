// Variabel global untuk menyimpan ID interval balon dan kejutan
let balloonInterval = null;
let surpriseInterval = null;
const surpriseContainer = document.createElement('div');
surpriseContainer.classList.add('surprise-container');
document.body.appendChild(surpriseContainer);

function openEnvelope() {
  // Tambahkan class untuk animasi buka amplop
  document.getElementById('envelope').classList.add('open');

  // Putar musik
  const music = document.getElementById('bgMusic');
  music.play();

  // Mulai interval balon jika belum berjalan
  if (!balloonInterval) {
    balloonInterval = setInterval(createBalloon, 200); // Balon lebih sering (200ms)
  }

  // Mulai interval kejutan jika belum berjalan
  if (!surpriseInterval) {
    surpriseInterval = setInterval(createSurprise, 100); // Kejutan jauh lebih sering (100ms)
  }
}

function closeEnvelope() {
  // Hapus class untuk menutup amplop
  document.getElementById('envelope').classList.remove('open');

  // Berhentikan musik
  const music = document.getElementById('bgMusic');
  music.pause();
  music.currentTime = 0;

  // Hentikan interval balon
  clearInterval(balloonInterval);
  balloonInterval = null;

  // Hentikan interval kejutan dan hapus semua elemen kejutan
  clearInterval(surpriseInterval);
  surpriseInterval = null;
  surpriseContainer.innerHTML = ''; // Bersihkan container kejutan
}

// Fungsi untuk membuat satu balon (tetap sama)
function createBalloon() {
  const colors = ['#ff6fa4', '#ffd700', '#87ceeb', '#98fb98', '#ffb6c1', '#dda0dd'];

  const balloon = document.createElement('div');
  balloon.classList.add('balloon');
  balloon.style.left = `${Math.random() * 100}%`;
  balloon.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  const container = document.getElementById('balloons-container');
  container.appendChild(balloon);
  setTimeout(() => {
    balloon.remove();
  }, 5000);
}

// Fungsi untuk membuat satu elemen kejutan dari posisi acak
function createSurprise() {
  const colors = ['#ff6fa4', '#ffd700', '#87ceeb', '#98fb98', '#ffb6c1', '#dda0dd'];
  const shapes = ['circle', 'star', 'heart'];
  const sizes = ['small', 'medium', 'large'];

  const surprise = document.createElement('div');
  surprise.classList.add('surprise');
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  const randomSize = sizes[Math.floor(Math.random() * sizes.length)];
  const startX = Math.random() * 100; // Posisi X acak (persen)
  const startY = Math.random() * 100; // Posisi Y acak (persen)
  const duration = Math.random() * 0.6 + 0.4; // Durasi lebih pendek (0.4 - 1 detik)
  const scale = Math.random() * 0.6 + 0.8; // Skala akhir acak

  surprise.style.backgroundColor = randomColor;
  surprise.style.width = surprise.style.height = getSize(randomSize);
  surprise.style.left = `${startX}%`;
  surprise.style.top = `${startY}%`;
  surprise.style.zIndex = 12; // Pastikan di atas elemen lain

  // Membuat animasi "tembakan" sederhana
  const angle = Math.random() * 360; // Arah acak
  const distanceX = Math.cos(angle * Math.PI / 180) * 40; // Jarak horizontal lebih pendek
  const distanceY = Math.sin(angle * Math.PI / 180) * 40; // Jarak vertikal lebih pendek

  surprise.style.transform = `translate(-50%, -50%) scale(0)`;
  surprise.style.opacity = 1;
  surprise.style.transition = `transform ${duration}s ease-out, opacity ${duration}s ease-out`;

  if (randomShape === 'star') {
    surprise.classList.add('star');
  } else if (randomShape === 'heart') {
    surprise.classList.add('heart');
  } else {
    surprise.classList.add('circle');
  }

  surpriseContainer.appendChild(surprise);

  // Jalankan animasi setelah ditambahkan ke DOM
  requestAnimationFrame(() => {
    surprise.style.transform = `translate(${distanceX - 50}%, ${distanceY - 50}%) scale(${scale})`;
    surprise.style.opacity = 0;
  });

  // Hapus elemen kejutan setelah animasinya selesai
  setTimeout(() => {
    if (surprise && surprise.parentNode) {
      surprise.remove();
    }
  }, duration * 1000);
}

function getSize(size) {
  if (size === 'small') return '8px'; // Ukuran lebih kecil
  if (size === 'medium') return '16px';
  return '24px';
}

