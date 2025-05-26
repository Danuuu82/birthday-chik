function createBalloon() {
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  balloon.style.left = Math.random() * window.innerWidth + 'px';
  balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 85%)`;
  document.body.appendChild(balloon);

  setTimeout(() => {
    balloon.remove();
  }, 6000);
}

// Fungsi yang memanggil createBalloon terus menerus tiap 300ms
function startBalloons() {
  setInterval(createBalloon, 300);
}

// Jalankan saat halaman dimuat
window.onload = startBalloons;
