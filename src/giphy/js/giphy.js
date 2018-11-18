import api from './api';
import { createGif, createModalGif } from './functions';

export default {
  getGifs: async (query, type, lang, limit) => {
    const url = `${api.host}${api.type[type]}/search?q=${query}&api_key=${api.key}&lang=${api.lang[lang]}&limit=${limit}`;
    return await (await fetch(url)).json();
  },

  getGif: async id => {
    const url = `${api.host}/v1/gifs/${id}?api_key=${api.key}`;
    return await (await fetch(url)).json();
  },

  render: gifs => {
    const { data } = gifs;
    if (Array.isArray(data)) {
      data.forEach(element => {
        createGif(element.images.fixed_width.url, element.id);
      });
    } else {
      createModalGif(data.images.original.url);
    }
  },
}