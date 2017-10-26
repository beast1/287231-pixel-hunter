import {getElementFromTemplate, showScreen} from "./utils";
import gameThree from "./game-3";
import greeting from "./greeting";
import getHeader from "./header";
import footer from "./footer";
import {initialState} from "./game-data";

const layout = `${getHeader(initialState)}
  <div class="game">
    <p class="game__task">Угадай, фото или рисунок?</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="http://placehold.it/705x455" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>
    <div class="stats">
      <ul class="stats">
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--correct"></li>
        <li class="stats__result stats__result--wrong"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--slow"></li>
        <li class="stats__result stats__result--unknown"></li>
        <li class="stats__result stats__result--fast"></li>
        <li class="stats__result stats__result--unknown"></li>
      </ul>
    </div>
  </div>
  ${footer}`;

const gameTwoElement = getElementFromTemplate(layout);
const form = gameTwoElement.querySelector(`.game__content`);
const back = gameTwoElement.querySelector(`.back`);

back.addEventListener(`click`, () => {
  showScreen(greeting);
});

form.addEventListener(`change`, () => {
  const radios = form.querySelectorAll(`input[type="radio"]:checked`);

  if (radios.length > 0) {
    showScreen(gameThree);
  }
});

export default gameTwoElement;
