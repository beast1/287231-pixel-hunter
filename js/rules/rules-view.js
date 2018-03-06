import AbstractView from "../AbstractView";
import {initialState} from "../data/game-data";
import game from "../game";

import getHeaderTemplate from "../header";
import getFooterTemplate from "../footer";

export default class RulesView extends AbstractView {
  get template() {
    return `
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
  }
  bind() {
    const btnBack = this.element.querySelector(`.back`);
    const btnContinue = this.element.querySelector(`.rules__button.continue`);
    btnBack.addEventListener(`click`, () => this.onBack()); //updateWindow(greetingElem)
    btnContinue.addEventListener(`click`, () => this.onContinue()); //updateWindow(game(initialState()))
  }
  onBack() {}
  onContinue() {}
};
