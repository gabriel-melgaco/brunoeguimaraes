// ========================================
// ELEMENTOS DO DOM
// ========================================
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const heroVideo = document.querySelector('.hero-video');
const unmutBtn = document.getElementById('unmutBtn');
const unmutBtnNav = document.getElementById('unmutBtnNav');
const volumeIcon = document.getElementById('volumeIcon');

// Carousel
const carousel = document.getElementById('carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dotsContainer = document.getElementById('carouselDots');
const slides = document.querySelectorAll('.carousel-slide');

// ========================================
// MENU MOBILE
// ========================================
menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Fecha menu ao clicar em um link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ========================================
// CONTROLE DE ÁUDIO DO VÍDEO
// ========================================
function unmuteVideo() {
  if (heroVideo.muted) {
    heroVideo.muted = false;
    heroVideo.volume = 1;
    
    // Atualiza os ícones
    const allVolumeIcons = document.querySelectorAll('#volumeIcon, #unmutBtnNav i');
    allVolumeIcons.forEach(icon => {
      icon.className = 'lucide lucide-volume-2';
    });
    
    // Atualiza os botões
    unmutBtn.innerHTML = '<i class="lucide lucide-volume-2" id="volumeIcon"></i> Som Ativado <img src="media/mute.png" class="sound" alt="mute icon">';
    unmutBtnNav.innerHTML = '<i class="lucide lucide-volume-2"></i> Som Ativado <img src="media/mute.png" class="sound" alt="mute icon">';
  } else {
    heroVideo.muted = true;
    
    // Volta para mudo
    const allVolumeIcons = document.querySelectorAll('#volumeIcon, #unmutBtnNav i');
    allVolumeIcons.forEach(icon => {
      icon.className = 'lucide lucide-volume-x';
    });
    
    unmutBtn.innerHTML = '<i class="lucide lucide-volume-x" id="volumeIcon"></i> Ouça Agora <img src="media/sound.gif" class="sound" alt="sound icon">';
    unmutBtnNav.innerHTML = '<i class="lucide lucide-volume-x"></i> Ouça Agora <img src="media/sound.gif" class="sound" alt="sound icon">';
  }
}

// Event listeners para os botões de áudio
unmutBtn.addEventListener('click', unmuteVideo);
unmutBtnNav.addEventListener('click', unmuteVideo);

// ========================================
// SMOOTH SCROLL
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// CAROUSEL
// ========================================
let currentIndex = 0;
let slidesPerView = 3;

function updateSlidesPerView() {
  const w = window.innerWidth;
  slidesPerView = w <= 480 ? 1 : w <= 1024 ? 2 : 3;
  createDots();
  updateCarousel();
}

function createDots() {
  dotsContainer.innerHTML = '';
  const total = slides.length - slidesPerView + 1;

  for (let i = 0; i < total; i++) {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    if (i === currentIndex) dot.classList.add('active');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  }
}

function updateCarousel() {
  const slideWidth = slides[0].offsetWidth + 20;
  carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function goToSlide(index) {
  currentIndex = Math.max(0, Math.min(index, slides.length - slidesPerView));
  updateCarousel();
}

nextBtn.onclick = () => goToSlide(currentIndex + 1);
prevBtn.onclick = () => goToSlide(currentIndex - 1);

// Swipe mobile
let startX = 0;
carousel.addEventListener('touchstart', e => startX = e.touches[0].clientX);
carousel.addEventListener('touchend', e => {
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) {
    diff > 0 ? goToSlide(currentIndex + 1) : goToSlide(currentIndex - 1);
  }
});

window.addEventListener('resize', updateSlidesPerView);
updateSlidesPerView();

