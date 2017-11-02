const URL = `https://es.dump.academy/pixel-hunter/questions`;

export default class Loader {
  static load() {
    return fetch(URL).then((data) => data.json());
  }
}
