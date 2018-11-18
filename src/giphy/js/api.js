import API_KEY from './key';

export default {
  host: 'http://api.giphy.com',
  key: API_KEY,
  type: {
    gifs: '/v1/gifs',
    stickers: '/v1/stickers'
  },
  lang: {
    en: 'en',
    pl: 'pl'
  }
}