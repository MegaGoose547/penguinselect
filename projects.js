// ---------------------------------------------------------------
// fill this in for every project
//   title
//   tag
//   description
//   url
// ---------------------------------------------------------------
const PROJECTS = [
  {
    title: "Bees!!",
    tag: "Idle",
    description: "Grow bees to farm flowers",
    url: "https://projects.penguinmod.com/4094095120"
  },
  {
    title: "Luigi Poker",
    tag: "Arcade",
    description: "Luigi Poker PenguinMod port",
    url: "https://projects.penguinmod.com/4314123354"
  },
  {
    title: "Save the Watermelon",
    tag: "Arcade",
    description: "Shoot the bees with the watermelon seeds",
    url: "https://projects.penguinmod.com/9659193762",
  },
  {
    title: "Tetris Friends",
    tag: "Arcade",
    description: "Clean looking Tetris game",
    url: "https://projects.penguinmod.com/3224119322"
  },
  {
    title: "CYNTAX",
    tag: "Idle",
    description: "Cool looking idle game",
    url: "https://projects.penguinmod.com/2479807702"
  },
  {
    title: "Flappy Bird Legacy",
    tag: "Arcade",
    description: "Flappy Bird remake with new gamemodes",
    url: "https://projects.penguinmod.com/5726165555"
  },
  {
    title: "blips",
    tag: "Idle",
    description: "Clean and addictive upgrade tree game",
    url: "https://projects.penguinmod.com/5713128876"
  }
];

const THUMBNAIL_FOLDER = "thumbnails";
const THUMBNAIL_EXTENSIONS = ["png", "jpg", "jpeg", "webp"];

const PLACEHOLDER_IMG = "data:image/svg+xml;utf8," + encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>
    <rect width='100%' height='100%' fill='#eee'/>
    <text x='50%' y='52%' font-family='sans-serif' font-size='14' fill='#999' text-anchor='middle'>no thumbnail</text>
  </svg>`
);

function getThumbnails(title) {
  return THUMBNAIL_EXTENSIONS.map(
    ext => `${THUMBNAIL_FOLDER}/${encodeURIComponent(title)}.${ext}`
  );
}

function setThumbnails(img, candidates) {
  let i = 0;
  img.src = candidates[i];
  img.onerror = () => {
    i++;
    if (i < candidates.length) {
      img.src = candidates[i];
    } else {
      img.onerror = null;
      img.src = PLACEHOLDER_IMG;
    }
  };
}

function populateTagFilter() {
  const select = document.getElementById('tagFilter');
  if (!select) return;

  const tags = [...new Set(PROJECTS.map(p => p.tag))].sort();
  tags.forEach(tag => {
    const option = document.createElement('option');
    option.value = tag;
    option.textContent = tag;
    select.appendChild(option);
  });

  select.addEventListener('change', () => renderGallery(select.value));
}

function renderGallery(activeTag = 'all') {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';

  const projects = PROJECTS
    .filter(p => activeTag === 'all' || p.tag === activeTag)
    .slice()
    .sort((a, b) => a.tag.localeCompare(b.tag) || a.title.localeCompare(b.title));

  projects.forEach(p => {
    const card = document.createElement('a');
    card.className = 'card';
    card.href = p.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    card.innerHTML = `
      <img class="thumb" alt="${p.title} thumbnail">
      <div class="card-body">
        <span class="tag">${p.tag}</span>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <span class="play-link">Play on PenguinMod</span>
      </div>
    `;

    const img = card.querySelector('.thumb');
    setThumbnails(img, getThumbnails(p.title));

    gallery.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  populateTagFilter();
  renderGallery();
});
