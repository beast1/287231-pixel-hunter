import AbstractView from "../AbstractView";
import {levels, LevelTypes} from "../data/game-data";

import getHeaderTemplate from "../header";
import getFooterTemplate from "../footer";

const getLevelTemplate = (state, level) => {
  return `
    <div class="game">
      <p class="game__task">${level.task}</p>
      <form class="game__content  game__content--${level.levelType}">
        ${new Array(level.options.length).fill(``).map((item, i) => {
            const option = level.options[i];
            if (level.levelType === `triple`) {
              return `
                <div class="game__option" data-option="${i}">
                  <img src="${option.image.src}" alt="Option ${i}" width="${option.image.width}" height="${option.image.height}">
                </div>
              `;
            } else {
              return `
                <div class="game__option">
                  <img src="${option.image.src}" alt="Option ${i}" width="${option.image.width}" height="${option.image.height}">
                  <label class="game__answer  game__answer--photo">
                    <input name="question${i}" type="radio" value="photo">
                    <span>Фото</span>
                  </label>
                  <label class="game__answer  game__answer--paint">
                    <input name="question${i}" type="radio" value="paint">
                    <span>Рисунок</span>
                  </label>
                </div>
              `;
            }
          }).join(``)}
        </form>
        <div class="stats">
          <ul class="stats">${state.history.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`).join(``)}
        </ul>
      </div>
    </div>
  `;
};

export default class LevelView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.level = levels[this.state.level];
  }
  get template() {
    return `
      ${getHeaderTemplate(this.state)}
      ${getLevelTemplate(this.state, this.level)}
      ${getFooterTemplate()}
    `;
  }
  bind() {
    const btnBack = this.element.querySelector(`.back`);
    const form = this.element.querySelector(`.game__content`);
    const fields = form.querySelectorAll(`.game__option`);
    this.timerElem = this.element.querySelector(`.game__timer`);
    btnBack.addEventListener(`click`, this.onBack);
    form.addEventListener(`click`, (e) => {
      if (e.target.classList.contains(`game__option`) && this.level.levelType === LevelTypes.TRIPLE) {
        this.onAnswer(this.level.options[e.target.dataset.option].type === `paint`);
      } else {
        const checkedInputs = Array.from(form.querySelectorAll(`input[type="radio"]:checked`));
        if (checkedInputs.length === fields.length) {
          this.onAnswer(checkedInputs.every((checkedInput, i) => checkedInput.value === this.level.options[i].type));
        }
      }
    });
  }
  onBack() {}
  onAnswer() {}
  updTime(time) {
    this.timerElem.textContent = time;
  }
}
