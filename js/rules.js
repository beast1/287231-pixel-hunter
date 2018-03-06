import getElement from "./getElement";
import updateWindow from "./updateWindow";
import game from "./game";
import {initialState} from "./data/game-data";

import getHeaderTemplate from "./header";
import getFooterTemplate from "./footer";

const html = `
    <div class="rules">
      ${getHeaderTemplate()}
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится 30 секунд.<br>
        Ошибиться можно не более 3 раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit">Go!</button><!--disabled-->
      </form>
    </div>
    ${getFooterTemplate()}
  `;

const rulesElem = getElement(html);
const btnContinue = rulesElem.querySelector(`.rules__button.continue`);

btnContinue.addEventListener(`click`, () => updateWindow(game(initialState())));

export default rulesElem;
