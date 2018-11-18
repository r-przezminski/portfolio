const gifsContainer = document.querySelector('.gifs');

export const createGif = (src, id) => {
  const img = document.createElement('img');
  const figure = document.createElement('figure');
  img.setAttribute('id', id);
  figure.classList.add('gif');
  img.src = src;
  figure.appendChild(img)
  gifsContainer.appendChild(figure);
}

export const createModalGif = src => {
  const modal = document.querySelector('.gif-modal');
  const body = document.querySelector('.gif-modal__body');
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = src;
  figure.appendChild(img);
  body.appendChild(figure);
  modal.classList.remove('hidden');
}

export const removeGifsOnSubmit = () => {
  if(!gifsContainer.hasChildNodes()) return;
  const gifs = document.querySelectorAll('.gif');
  gifs.forEach(gif => {
    gif.remove();
  });
}

export const getParams = () => {
  const type = document.querySelector('input[name=type]:checked');
  const language = document.querySelector('input[name=lang]:checked');
  const limit = document.querySelector('input[name=limit]:checked');
  const query = document.querySelector('input[type=text]');

  return [
    query.value,
    type.value,
    language.value,
    limit.value
  ];
}
