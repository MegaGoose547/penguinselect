// ---------------------------------------------------------------
// fill this in for every project
//   title
//   tag
//   description
//   url
//   image
// ---------------------------------------------------------------
const PROJECTS = [
  {
    title: "Tetris Friends",
    tag: "Arcade",
    description: "Clean looking Tetris game",
    url: "https://projects.penguinmod.com/3224119322",
    image: ""
  },
  {
    title: "CYNTAX",
    tag: "Idle",
    description: "Cool looking idle game",
    url: "https://projects.penguinmod.com/2479807702",
    image: ""
  },
  {
    title: "Flappy Bird Legacy",
    tag: "Arcade",
    description: "Flappy Bird remake with new gamemodes",
    url: "https://projects.penguinmod.com/5726165555",
    image: ""
  }
];

function renderGallery() {
  const gallery = document.getElementById('gallery');

  PROJECTS.forEach(p => {
    const card = document.createElement('a');
    card.className = 'card';
    card.href = p.url;
    card.target = "_blank";
    card.rel = "noopener noreferrer";

    const imgSrc = p.image && p.image.trim() !== ""
      ? p.image
      : "data:image/svg+xml;utf8," + encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300'>
            <rect width='100%' height='100%' fill='#eee'/>
            <text x='50%' y='52%' font-family='sans-serif' font-size='14' fill='#999' text-anchor='middle'>no thumbnail</text>
          </svg>`
        );

    card.innerHTML = `
      <img class="thumb" src="${imgSrc}" alt="${p.title} thumbnail">
      <div class="card-body">
        <span class="tag">${p.tag}</span>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <span class="play-link">Play on PenguinMod</span>
      </div>
    `;
    gallery.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', renderGallery);
