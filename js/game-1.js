import getElement from "./getElement";
import updateWindow from "./updateWindow";
import gameSecondElem from "./game-2";
import greetingElem from "./greeting";
// притянуть массив уровней
import {levels} from "./data/game-data";
// подставить состояние
// подставить уровень
// нзабиндить ответы
  // обновить состояние
  // вызвать себя же с новым состоянием

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
                <label class="game__answer game__answer--photo">
                  <input name="question${i}" type="radio" value="photo">
                  <span>Фото</span>
                </label>
                <label class="game__answer game__answer--paint">
                  <input name="question${i}" type="radio" value="paint">
                  <span>Рисунок</span>
                </label>
              </div>
            `;
          }).join(``)}
        </form>
        <div class="stats">
          <ul class="stats">
            <li class="stats__result stats__result--wrong"></li>
            <li class="stats__result stats__result--slow"></li>
            <li class="stats__result stats__result--fast"></li>
            <li class="stats__result stats__result--correct"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
            <li class="stats__result stats__result--unknown"></li>
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
      nextState.points += 100;
    } else {
      nextState.lives -= 1;
    }
    return nextState;
  };
  const btnBack = gameFirstElem.querySelector(`.back`);
  const btnTrue = gameFirstElem.querySelector(`.game__answer.${level.options[0].answers.photo ? `game__answer--photo` : `game__answer--paint`}`);
  const btnFalse = gameFirstElem.querySelector(`.game__answer.${level.options[0].answers.photo ? `game__answer--paint` : `game__answer--photo`}`);

  btnBack.addEventListener(`click`, () => updateWindow(greetingElem));
  btnTrue.addEventListener(`click`, () => updateWindow(game(updateState(true))));
  btnFalse.addEventListener(`click`, () => updateWindow(game(updateState(false))));
//  btnsContinue.forEach((item) => item.addEventListener(`click`, () => updateWindow(gameSecondElem)));
  return gameFirstElem;
};

export default game;
