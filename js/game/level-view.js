import AbstractView from "../view";
import footer from "../game/footer/footer";
import getHeader from "../game/header/header";
import {LevelType, LevelClass} from "../data/game-data";
import drawStats from "./stats/game-stats";

const TRIGGER_TIME = 5;

const drawLevel = (levelData, history) => {
  return `<p class="game__task">${levelData.question}</p>
    <form class="${LevelClass[levelData.type]}">
    ${levelData.answers.map((it, i) => {
    if (levelData.type === LevelType.ONE_OF_THREE) {
      return `<div class="game__option">
        <img src="${it.image.url}" alt="Option" width="${it.image.width}" height="${it.image.height}">
      </div>`;
    }

    return `<div class="game__option">
        <img src="${it.image.url}" alt="Option" width="${it.image.width}" height="${it.image.height}">
        <label class="game__answer  game__answer--photo">
          <input name="question${i + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question${i + 1}" type="radio" value="painting">
          <span>Рисунок</span>
        </label>
      </div>`;
  }).join(``)}
    </form>${drawStats(history)}`;
};

export default class LevelView extends AbstractView {
  constructor(game, level) {
    super();
    this.game = game;
    this._level = level;
  }

  get template() {
    return `${getHeader(this.game.state)}
    ${drawLevel(this._level, this.game.history)}
    ${footer}`;
  }

  updateTime(time) {
    this._timeElement.style.visibility = `visible`;
    this._timeElement.textContent = time;

    if (time <= TRIGGER_TIME) {
      setTimeout(() => {
        this._timeElement.style.visibility = `hidden`;
      }, 500);
    }
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);
    const fields = form.querySelectorAll(`.game__option`);
    const back = this.element.querySelector(`.back`);

    this._timeElement = this.element.querySelector(`.game__timer`);

    back.addEventListener(`click`, this.onBack);

    form.addEventListener(`click`, (evt) => {
      const radios = Array.from(form.querySelectorAll(`input[type="radio"]:checked`));
      const answers = this._level.answers.map((it) =>
        it.type);

      if (this._level.type === LevelType.ONE_OF_THREE) {
        if (evt.target.classList.contains(`game__option`)) {
          const index = Array.from(evt.target.parentNode.children).indexOf(evt.target);
          answers[index] = this._level.expect;

          this.onAnswer(answers);
        }
      } else if (radios.length === fields.length) {
        const userAnswers = radios.map((it) =>
          it.value);
        this.onAnswer(userAnswers);
      }
    });
  }

  onBack() {}

  onAnswer(answer) {
    return answer;
  }
}
