import getElement from "./getElement";
import updateWindow from "./updateWindow";
import greetingElem from "./greeting";
import {levels} from "./data/game-data";
import stats from './stats';

import getHeaderTemplate from "./header";
import getFooterTemplate from "./footer";

const game = (state) => {
  const level = levels[state.level];
  const html = `
      ${getHeaderTemplate(state)}
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
          <ul class="stats">
            ${state.history.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`).join(``)}
          </ul>
        </div>
      </div>
      ${getFooterTemplate()}
    `;
  const gameFirstElem = getElement(html);
  const updateState = (isTrueAnswer) => {
    const nextState = Object.assign({}, state);
    nextState.level += 1;
    if (isTrueAnswer) {
      nextState.history[nextState.level - 1] = `correct`;
      nextState.points += 100;
    } else {
      nextState.history[nextState.level - 1] = `wrong`;
      nextState.lives -= 1;
    }
    return nextState;
  };
  const choosePath = (condition) => {
    let updatedState;
    if (condition) {
      updatedState = updateState(true);
    } else {
      updatedState = updateState(false);
    }
    if (state.level === 9) {
      updateWindow(stats(updatedState));
    } else {
      if (state.lives === 0) {
        updateWindow(stats(updatedState));
      } else {
        updateWindow(game(updatedState));
      }
    }
  };
  const btnBack = gameFirstElem.querySelector(`.back`);
  const form = gameFirstElem.querySelector(`.game__content`);
  const fields = form.querySelectorAll(`.game__option`);

  btnBack.addEventListener(`click`, () => updateWindow(greetingElem));
  if (level.levelType === `triple`) {
    form.addEventListener(`click`, (e) => {
      choosePath(level.options[e.target.dataset.option].type === `paint`);
    });
  } else {
    form.addEventListener(`change`, () => {
      const checkedInputs = form.querySelectorAll(`input[type="radio"]:checked`);
      if (checkedInputs.length === fields.length) {
        let correctAnswersCount = 0;
        checkedInputs.forEach((checkedInput, i) => {
          if (checkedInput.value === level.options[i].type) {
            correctAnswersCount += 1;
          }
        });
        choosePath(correctAnswersCount === fields.length);
      }
    });
  }
  return gameFirstElem;
};

export default game;
