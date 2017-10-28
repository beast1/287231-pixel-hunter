import {getElementFromTemplate, showScreen} from "./utils";
import gameElement from "./game";
import greeting from "./greeting";
import getHeader from "./header";
import footer from "./footer";

const layout = `${getHeader()}
  <div class="rules">
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
      <button class="rules__button  continue" type="submit">Go!</button>
    </form>
  </div>
  ${footer}`;

const rulesElement = getElementFromTemplate(layout);
const button = rulesElement.querySelector(`.rules__button`);
button.disabled = true;
const input = rulesElement.querySelector(`.rules__input`);
const back = rulesElement.querySelector(`.back`);

back.addEventListener(`click`, () => {
  showScreen(greeting);
});


input.addEventListener(`change`, () => {
  button.disabled = !input.value;
});

button.addEventListener(`click`, () => {
  showScreen(gameElement);
});

export default rulesElement;
