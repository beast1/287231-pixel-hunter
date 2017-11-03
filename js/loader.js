const URL = `https://es.dump.academy/pixel-hunter`;

export default class Loader {
  static load() {
    return fetch(`${URL}/questions`).then((data) => data.json());
  }

  static loadResults(name) {
    return fetch(`${URL}/stats/${name}`).then((data) => data.json());
  }

  static saveResults(game) {
    const requestSettings = {
      method: `POST`,
      body: JSON.stringify(game),
      headers: {
        'Content-Type': `application/json`
      }
    };

    console.log(game);

    return fetch(`${URL}/stats/${game.state.userName}`, requestSettings);
  }
}
