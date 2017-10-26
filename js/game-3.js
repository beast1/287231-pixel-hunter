import {getElementFromTemplate, showScreen} from "./utils";
import stats from "./stats";
import greeting from "./greeting";
import getHeader from "./header";
import footer from "./footer";
import {initialState} from "./game-data";

const layout = `${getHeader(initialState)}
  <div class="game">
    <p class="game__task">Найдите рисунок среди изображений</p>
    <form class="game__content  game__content--triple">
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option  game__option--selected">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
      </div>
      <div class="game__option">
        <img src="http://placehold.it/304x455" alt="Option 1" width="304" height="455">
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

const gameThreeElement = getElementFromTemplate(layout);
const form = gameThreeElement.querySelector(`.game__content`);
const back = gameThreeElement.querySelector(`.back`);

back.addEventListener(`click`, () => {
  showScreen(greeting);
});

form.addEventListener(`click`, (evt) => {
  if (evt.target.classList.contains(`game__option`)) {
    showScreen(stats);
  }
});

export default gameThreeElement;
