import Giphy from './giphy';
import { getParams, removeGifsOnSubmit } from './functions';

import 'normalize.css';
import '../scss/styles.scss';

const form = document.querySelector('form');
const gifsContainer = document.querySelector('.gifs');
const gifModal = document.querySelector('.gif-modal');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  removeGifsOnSubmit();
  const params = getParams();
  Giphy.getGifs(...params).then(
    gifs => {
      Giphy.render(gifs);
    });
});

gifsContainer.addEventListener('click', (e) => {
  const id = e.target.id;
  if(!id) return;
  Giphy.getGif(id).then(gif => {
    Giphy.render(gif);
  });
});

gifModal.addEventListener('click', () => {
  gifModal.classList.add('hidden');
  const gif = document.querySelector('.gif-modal__body figure');
  gif.remove();
});
