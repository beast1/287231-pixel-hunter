import AbstractView from "../view";
import footer from "../game/footer/footer";
import getHeader from "../game/header/header";
import {getLevel, LevelType, LevelClass} from "../data/game-data";
import drawStats from "./stats/game-stats";

const drawLevel = (levelData, history) => {
  return `<p class="game__task">${levelData.description}</p>
    <form class="${LevelClass[levelData.type]}">
    ${levelData.options.map((it, i) => {
    if (levelData.type === LevelType.TRIPLE) {
      return `<div class="game__option">
        <img src="${it.image}" alt="Option" width="304" height="455">
      </div>`;
    }

    return `<div class="game__option">
        <img src="${it.image}" alt="Option">
        <label class="game__answer  game__answer--photo">
          <input name="question${i + 1}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question${i + 1}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`;
  }).join(``)}
    </form>${drawStats(history)}`;
};

export default class LevelView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
    this.level = getLevel(this.game.state.level);
  }

  get template() {
    return `${getHeader(this.game.state)}
    ${drawLevel(this.level, this.game.history)}
    ${footer}`;
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);
    const fields = form.querySelectorAll(`.game__option`);
    const back = this.element.querySelector(`.back`);

    back.addEventListener(`click`, this.onBack);

    form.addEventListener(`click`, (evt) => {
      const radios = Array.from(form.querySelectorAll(`input[type="radio"]:checked`));
      const answers = this.level.options.map((it) =>
        it.type);

      if (this.level.type === LevelType.TRIPLE) {
        if (evt.target.classList.contains(`game__option`)) {
          const index = Array.from(evt.target.parentNode.children).indexOf(evt.target);
          answers[index] = this.level.expect;

          this.onAnswer(answers);
        }
      } else if (radios.length === fields.length) {
        const answer = radios.map((it) =>
          it.value);
        this.onAnswer(answer);
      }
    });
  }

  onBack() {}

  onAnswer(answer) {
    return answer;
  }

  updateTime(time) {
    this.timeElement = this.element.querySelector(`.game__timer`);
    this.timeElement.textContent = time;
  }
}
