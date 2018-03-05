import getElement from "./getElement";
import updateWindow from "./updateWindow";
import gameSecondElem from "./game-2";
import greetingElem from "./greeting";
import {levels} from "./data/game-data";
import statsElem from './stats';

const game = (state) => {
  const level = levels[state.level];
  const html = `
      <header class="header">
        <div class="header__back">
          <button class="back">
            <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
            <img src="img/logo_small.svg" width="101" height="44">
          </button>
        </div>
        <h1 class="game__timer">lvl:${state.level} pts:${state.points}</h1><!--NN-->
        <div class="game__lives">
          ${new Array(3 - state.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
          ${new Array(state.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
        </div>
      </header>
      <div class="game">
        <p class="game__task">${level.task}</p>
        <form class="game__content">
          ${new Array(level.options.length).fill(``).map((item, i) => {
            const option = level.options[i];
            return `
              <div class="game__option">
                <img src="${option.image}" alt="Option ${i}" width="468" height="458">
                <label class="game__answer game__answer--photo" data-option="${i}">
                  <input name="question${i}" type="radio" value="photo">
                  <span>Фото</span>
                </label>
                <label class="game__answer game__answer--paint" data-option="${i}">
                  <input name="question${i}" type="radio" value="paint">
                  <span>Рисунок</span>
                </label>
              </div>
            `;
          }).join(``)}
        </form>
        <div class="stats">
          <ul class="stats">
            ${state.history.map((answer) => `<li class="stats__result stats__result--${answer}"></li>`).join(``)}
          </ul>
        </div>
      </div>
      <footer class="footer">
        <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
        <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
        <div class="footer__social-links">
          <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
          <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
          <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
          <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
        </div>
      </footer>
    `;
  const gameFirstElem = getElement(html);
  const updateState = (isTrueAnswer) => {
    const nextState = state;
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
  const btnBack = gameFirstElem.querySelector(`.back`);
  const form = gameFirstElem.querySelector(`.game__content`);
  const fields = form.querySelectorAll(`.game__option`);

  btnBack.addEventListener(`click`, () => updateWindow(greetingElem));
  form.addEventListener(`change`, () => {
    if (level.levelType === 0) {
      const checkedInputs = form.querySelectorAll(`input[type="radio"]:checked`);
      if (checkedInputs.length === fields.length) {
        let correctAnswersCount = 0;
        checkedInputs.forEach((checkedInput, i) => {
          if (checkedInput.value === level.options[i].type) {
            correctAnswersCount += 1;
          }
        });
        if (correctAnswersCount === fields.length) {
          updateWindow(game(updateState(true)));
        } else {
          if (state.lives === 0) {
            updateWindow(statsElem);
          } else {
            updateWindow(game(updateState(false)));
          }
        }
      }
    }
  });
  return gameFirstElem;
};

export default game;
