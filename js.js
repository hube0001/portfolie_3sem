// ── ACCORDION ──
function toggleAcc(header) {
  const item = header.parentElement;
  const isOpen = item.classList.contains("open");
  document.querySelectorAll(".accordion-item.open").forEach((i) => i.classList.remove("open"));
  if (!isOpen) item.classList.add("open");
}

// ── PROJECT DATA ──
const projects = [
  {
    images: ["projekt_for_portfolio/projekt1.png"],
    total: 1,
  },
  {
    images: ["projekt_for_portfolio/projekt2.png", "projekt_for_portfolio/projekt2_2.png", "projekt_for_portfolio/projekt2_3.png"],
    total: 3,
  },
  {
    images: ["projekt_for_portfolio/projekt3.png", "projekt_for_portfolio/projekt3_2.png", "projekt_for_portfolio/projekt3_3.png"],
    total: 3,
  },
  {
    images: ["projekt_for_portfolio/projekt4.png"],
    total: 1,
  },
  {
    images: ["projekt_for_portfolio/projekt5.png"],
    total: 1,
  },
  {
    images: ["projekt_for_portfolio/projekt6.png", "projekt_for_portfolio/projekt6_2.png"],
    total: 2,
  },
  {
    images: ["projekt_for_portfolio/projekt7.png", "projekt_for_portfolio/projekt7_2.png", "projekt_for_portfolio/projekt7_3.png"],
    total: 3,
  },
  {
    images: ["projekt_for_portfolio/projekt8.png", "projekt_for_portfolio/projekt8_2.png", "projekt_for_portfolio/projekt8_3.png", "projekt_for_portfolio/projekt8_4.png", "projekt_for_portfolio/projekt8_5.png", "projekt_for_portfolio/projekt8_6.png"],
    total: 6,
  },
  {
    images: ["projekt_for_portfolio/projekt9.png", "projekt_for_portfolio/projekt9_2.png", "projekt_for_portfolio/projekt9_3.png", "projekt_for_portfolio/projekt9_4.png", "projekt_for_portfolio/projekt9_5.png"],
    total: 5,
  },
  {
    images: ["projekt_for_portfolio/projekt10.png"],
    total: 1,
  },
  {
    images: ["projekt_for_portfolio/projekt11.png", "projekt_for_portfolio/projekt11_2.png"],
    total: 2,
  },
];

const TOTAL_PROJECTS = 11;
let currentSlide = 0;
let currentImg = 0;

// ── GALLERY ──
function loadGallery(projectIndex) {
  const p = projects[projectIndex];
  currentImg = 0;

  const mainImg = document.getElementById("galleryMainImg");
  mainImg.src = p.images[0];
  mainImg.style.opacity = "1";

  const thumbsEl = document.getElementById("galleryThumbs");
  thumbsEl.innerHTML = "";

  if (p.images.length > 1) {
    p.images.forEach((src, i) => {
      const t = document.createElement("img");
      t.src = src;
      t.className = "gallery-thumb" + (i === 0 ? " active" : "");
      t.alt = "Thumbnail " + (i + 1);
      t.onclick = () => goToImg(i);
      thumbsEl.appendChild(t);
    });
  }

  updateImgCounter(projectIndex);
  updateGalleryArrows(projectIndex);
}

function goToImg(n) {
  const p = projects[currentSlide];
  currentImg = n;
  const mainImg = document.getElementById("galleryMainImg");
  mainImg.style.opacity = "0";
  setTimeout(() => {
    mainImg.src = p.images[n];
    mainImg.style.opacity = "1";
  }, 150);
  document.querySelectorAll(".gallery-thumb").forEach((t, i) => {
    t.classList.toggle("active", i === n);
  });
  updateImgCounter(currentSlide);
  updateGalleryArrows(currentSlide);
}

function prevImg() {
  if (currentImg > 0) goToImg(currentImg - 1);
}

function nextImg() {
  const p = projects[currentSlide];
  if (currentImg < p.images.length - 1) goToImg(currentImg + 1);
}

function updateImgCounter(projectIndex) {
  const p = projects[projectIndex];
  document.getElementById("imgCounter").textContent = p.images.length > 1 ? currentImg + 1 + " / " + p.images.length : "";
}

function updateGalleryArrows(projectIndex) {
  const p = projects[projectIndex];
  document.querySelector(".gallery-prev").disabled = currentImg === 0;
  document.querySelector(".gallery-next").disabled = currentImg === p.images.length - 1;
}

// ── PROJECT SLIDES ──
function goToSlide(n) {
  const slides = document.querySelectorAll(".modal-slide");
  slides[currentSlide].classList.remove("active");
  currentSlide = n;
  slides[currentSlide].classList.add("active");

  document.getElementById("prevBtn").disabled = currentSlide === 0;
  document.getElementById("nextBtn").disabled = currentSlide === TOTAL_PROJECTS - 1;
  document.getElementById("modalCounter").textContent = currentSlide + 1 + " / " + TOTAL_PROJECTS;

  loadGallery(currentSlide);
}

function slideProject(dir) {
  const next = currentSlide + dir;
  if (next >= 0 && next < TOTAL_PROJECTS) goToSlide(next);
}

// ── MODAL OPEN / CLOSE ──
function openProjectModal() {
  currentSlide = 0;
  currentImg = 0;

  document.querySelectorAll(".modal-slide").forEach((s, i) => {
    s.classList.toggle("active", i === 0);
  });

  document.getElementById("prevBtn").disabled = true;
  document.getElementById("nextBtn").disabled = TOTAL_PROJECTS <= 1;
  document.getElementById("modalCounter").textContent = "1 / " + TOTAL_PROJECTS;

  loadGallery(0);

  document.getElementById("projectModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProjectModal(e) {
  if (e && e.currentTarget !== e.target && !e.target.classList.contains("modal-close")) return;
  document.getElementById("projectModal").classList.remove("active");
  document.body.style.overflow = "";
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.getElementById("projectModal").classList.remove("active");
    document.body.style.overflow = "";
  }
});
